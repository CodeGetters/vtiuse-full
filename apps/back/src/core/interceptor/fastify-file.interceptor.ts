import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
@Injectable()
export class FastifyUploadInterceptor implements NestInterceptor {
  constructor(
    private fieldName: string,
    private options: { multiple?: boolean } = {},
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (this.options.multiple) {
      // 处理多文件上传
      // files() 方法返回包含多个文件的数组
      const files = await request.files();
      request.incomingFiles = files;
    } else {
      // 处理单文件上传
      const file = await request.file();
      request.incomingFile = file;
    }

    return next.handle();
  }
}

export function FastifyUpload(
  fieldName: string,
  options: { multiple?: boolean } = {},
) {
  return new FastifyUploadInterceptor(fieldName, options);
}
