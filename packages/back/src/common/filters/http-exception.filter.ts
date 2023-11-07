import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exceptionMsg = exception.getResponse() as any;
    const msgLength = exceptionMsg.message.length;
    const messageLen = exceptionMsg.message[0].length;
    const finalMsg =
      msgLength > messageLen ? exceptionMsg.message : exceptionMsg.message[0];

    const message = finalMsg
      ? finalMsg
      : `${status >= 500 ? "Service Error" : "Client Error"}`;

    const errorResponse = {
      data: [],
      message: message,
      code: -1,
    };

    response.status(status);
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send(errorResponse);
  }
}
