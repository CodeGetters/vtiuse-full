/* eslint-disable no-console */
import { Logger } from "winston";
import { bgGreen, green, cyan } from "kolorist";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { getReqMainInfo } from "~/common/utils/logger";
import { formatTime } from "~/common/utils/formatTime";
import { NestMiddleware, Inject } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export default class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const {
      headers: { host },
      url,
      method,
      baseUrl,
    } = req;

    this.logger.info("route", {
      req: getReqMainInfo(req),
      resStatus: res.statusCode,
    });

    console.log(
      green(
        `############## ${bgGreen(
          formatTime(null, "YYYY-MM-DD HH:mm:ss"),
        )} ###################`,
      ),
    );
    const start: number = Date.now();
    next();
    const ms: number = Date.now() - start;
    console.log(cyan(`[HOST]         ${host}`));
    console.log(cyan(`[METHOD]       ${method}`));
    console.log(cyan(`[BASEURL]      ${baseUrl}/${url}`));
    console.log(cyan(`[TIME]         ${ms}ms`));
    console.log(cyan(`[STATUSCODE]   ${res.statusCode}`));

    console.log(green("#################################"));
  }
}
