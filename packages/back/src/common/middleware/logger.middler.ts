import { cyan, green, bgGreen } from "kolorist";
import { Request, Response, NextFunction } from "express";
import { formatTime } from "~/common/utils/formatTime";

export async function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    green(
      `############## ${bgGreen(
        formatTime(undefined, "YYYY-MM-DD HH:mm:ss"),
      )} ###################`,
    ),
  );
  const start: number = Date.now();
  await next();
  const ms: number = Date.now() - start;

  // 获取请求信息
  const {
    headers: { host },
    baseUrl,
    url,
    method,
  } = req;

  console.log(cyan(`[HOST]       ${host}`));
  console.log(cyan(`[METHOD]     ${method}`));
  console.log(cyan(`[BASEURL]    ${baseUrl}/${url}`));
  console.log(cyan(`[TIME]       ${ms}ms`));

  console.log(green("#################################"));
}
