import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Logger } from "winston";
import { Inject } from "@nestjs/common";
import { Response, Request } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { getReqMainInfo } from "~/common/utils/logger";

interface IResponse {
  message: string;
  error: string;
  statusCode: number;
}

/**
 * 全局异常过滤器
 */
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = exception.getResponse() as IResponse;

    let msg =
      exception.message || (status >= 500 ? "Service Error" : "Client Error");

    if (
      Object.prototype.toString.call(response) === "[object Object]" &&
      response.message
    ) {
      msg = response.message;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { query, headers, url, method, body } = req;

    this.logger.error(msg, {
      status,
      req: getReqMainInfo(req),
      stack: exception.stack,
    });

    res.status(status >= 500 ? status : 200).json({ code: 1, msg, status });
  }
}
