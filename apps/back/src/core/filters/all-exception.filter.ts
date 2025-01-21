import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoggerService } from "@/common/logger/logger.service";

/**
 * 全局异常过滤器
 * 处理所有未被 HttpExceptionFilter 捕获的异常
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string;
    let code: string;

    // 处理验证异常
    if (exception instanceof BadRequestException) {
      statusCode = HttpStatus.BAD_REQUEST;
      const response = exception.getResponse() as any;
      message = Array.isArray(response.message)
        ? response.message.join(", ")
        : response.message || "请求参数验证失败";
      code = "VALIDATION_ERROR";
    }
    // 处理 Prisma 异常
    // else if (exception instanceof PrismaClientKnownRequestError) {
    //   const prismaError = exception as PrismaClientKnownRequestError;
    //   switch (prismaError.code) {
    //     case 'P2002':
    //       statusCode = HttpStatus.CONFLICT;
    //       message = '数据已存在';
    //       code = 'PRISMA_P2002';
    //       break;
    //     case 'P2025':
    //       statusCode = HttpStatus.NOT_FOUND;
    //       message = '记录不存在';
    //       code = 'PRISMA_P2025';
    //       break;
    //     default:
    //       message = '数据库操作错误';
    //       code = `PRISMA_${prismaError.code}`;
    //   }
    // }
    // 处理其他异常
    else {
      message =
        exception instanceof Error ? exception.message : "服务器内部错误";
      code = "INTERNAL_SERVER_ERROR";
    }

    // 记录错误日志
    this.logger.error(
      message,
      exception instanceof Error ? exception.stack : undefined,
      "AllExceptionFilter",
    );

    // 构造错误响应
    const responseBody = {
      code,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    // 使用 httpAdapter 发送响应
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
