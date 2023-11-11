import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Inject,
  Injectable,
} from "@nestjs/common";

import { Logger } from "winston";
import { Observable } from "rxjs";
import { Request } from "express";
import { map } from "rxjs/operators";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { getReqMainInfo } from "~/common/utils/logger";

/**
 * 统一成功返回的格式
 * {code:200,data,msg:"success"}
 */

@Injectable()
export default class ResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        this.logger.info("response", {
          responseData: data,
          req: getReqMainInfo(req),
        });
        return {
          code: 200,
          data,
          msg: "success",
        };
      }),
    );
  }
}
