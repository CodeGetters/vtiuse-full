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

    // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
    // exception 的对象是否是 HttpException 的实例
    // console.log(exception instanceof HttpException);

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

    // 返回状态码、错误信息
    res.status(status >= 500 ? status : 200).json({ code: 1, msg, status });
  }
}
