// import { cyan, green, bgGreen } from "kolorist";
import { Request, Response, NextFunction } from "express";
// import { formatTime } from "~/common/utils/formatTime";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { getReqMainInfo } from "~/common/utils/logger";
import { NestMiddleware, Inject } from "@nestjs/common";

export default class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      headers: { host },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      url,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      method,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      body,
    } = req;

    this.logger.info("route", {
      req: getReqMainInfo(req),
    });

    next();
  }
}

// export async function LoggerMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   console.log(
//     green(
//       `############## ${bgGreen(
//         formatTime(undefined, "YYYY-MM-DD HH:mm:ss"),
//       )} ###################`,
//     ),
//   );
//   const start: number = Date.now();
//   await next();
//   const ms: number = Date.now() - start;

//   // 获取请求信息
//   const {
//     headers: { host },
//     baseUrl,
//     url,
//     method,
//   } = req;

//   console.log(cyan(`[HOST]       ${host}`));
//   console.log(cyan(`[METHOD]     ${method}`));
//   console.log(cyan(`[BASEURL]    ${baseUrl}/${url}`));
//   console.log(cyan(`[TIME]       ${ms}ms`));

//   console.log(green("#################################"));
// }
