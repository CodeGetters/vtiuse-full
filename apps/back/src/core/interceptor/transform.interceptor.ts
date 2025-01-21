import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Reflector } from "@nestjs/core";
import { SKIP_TRANSFORM_KEY } from "../decorator/skip-transform.decorator";

export interface Response<T> {
  code: string;
  data: T;
  message: string;
  timestamp: string;
}

// 定义自定义响应类
export class CustomResponse<T> {
  constructor(
    public data: T,
    public message: string = "请求成功",
    public code: string = "SUCCESS",
  ) {}
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T> | T>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T> | T> {
    const skipTransform = this.reflector.get<boolean>(
      SKIP_TRANSFORM_KEY,
      context.getHandler(),
    );

    if (skipTransform) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        // 检查是否是自定义响应
        if (data instanceof CustomResponse) {
          return {
            code: data.code,
            data: data.data,
            message: data.message,
            timestamp: new Date().toISOString(),
          };
        }
        // 使用默认响应
        return {
          code: "SUCCESS",
          data,
          message: "请求成功",
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
