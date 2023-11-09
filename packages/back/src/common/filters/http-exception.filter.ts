import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response, Request } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { getReqMainInfo } from "~/common/utils/logger";
import { Inject } from "@nestjs/common";

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
  // 注入日志服务相关依赖
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取当前执行上下文
    const res = ctx.getResponse<Response>(); // 获取响应对象
    const req = ctx.getRequest<Request>(); // 获取请求对象
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

    // 记录日志（错误消息，错误码，请求信息等）
    this.logger.error(msg, {
      status,
      req: getReqMainInfo(req),
      // 错误信息
      stack: exception.stack,
    });

    res.status(status >= 500 ? status : 200).json({ code: 1, msg });
  }

  // constructor(
  //   @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  // ) {}
  // catch(exception: HttpException, host: ArgumentsHost) {
  //   const ctx = host.switchToHttp();
  //   const res = ctx.getResponse();
  //   const req = ctx.getRequest();
  //   const status =
  //     exception instanceof HttpException
  //       ? exception.getStatus()
  //       : HttpStatus.INTERNAL_SERVER_ERROR;
  // const response = exception.getResponse();
  // const msg =
  //   exception.message || (status >= 500 ? "Service Error" : "Client Error");
  // if (
  //   Object.prototype.toString.call(response) === "[Object Object]" &&
  //   response.message
  // ) {
  //   msg = response.message;
  // }
  // const { query, headers, url, method, body } = req;
  // 记录日志（错误消息，错误码，请求信息等）
  // this.logger.error(msg, {
  //   status,
  //   req: getReqMainInfo(req),
  //   // stack: exception.stack,
  // });
  // res.status(status >= 500 ? status : 200).json({ code: 1, msg });
  // const exceptionMsg = exception.getResponse() as any;
  // const msgLength = exceptionMsg.message.length;
  // const messageLen = exceptionMsg.message[0].length;
  // const finalMsg =
  //   msgLength > messageLen ? exceptionMsg.message : exceptionMsg.message[0];
  // const message = finalMsg
  //   ? finalMsg
  //   : `${status >= 500 ? "Service Error" : "Client Error"}`;
  // const errorResponse = {
  //   data: [],
  //   message: message,
  //   code: -1,
  // };
  // res.status(status);
  // res.header("Content-Type", "application/json; charset=utf-8");
  // res.send(errorResponse);
  // }
}
