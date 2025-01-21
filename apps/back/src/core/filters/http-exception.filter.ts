import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import { LoggerService } from "@/common/logger/logger.service";

/**
 * HTTP 异常过滤器
 * 专门处理 HttpException 及其子类的异常
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 获取异常响应信息
    const exceptionResponse = exception.getResponse();
    let errorMessage: string;
    let errorCode: string;

    // 特殊处理 favicon.ico 的 404 请求
    if (request.url === "/favicon.ico" && status === 404) {
      return response.status(204).send();
    }

    if (typeof exceptionResponse === "string") {
      errorMessage = exceptionResponse;
      errorCode = `HTTP_${status}`;
    } else {
      const response = exceptionResponse as any;
      errorMessage = response.message || "请求失败";
      errorCode = response.code || `HTTP_${status}`;
    }

    // 只记录非 favicon.ico 的错误
    this.logger.error(errorMessage, exception.stack, "HttpExceptionFilter");

    response.status(status).send({
      code: errorCode,
      message: errorMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
