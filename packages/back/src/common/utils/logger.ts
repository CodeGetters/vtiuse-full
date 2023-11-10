import { Request } from "express";

/**
 * 获取请求头信息
 * @param req
 */
export const getReqMainInfo: (req: Request) => {
  [prop: string]: any;
} = (req) => {
  const { query, headers, url, method, body, connection, baseUrl } = req;

  // 获取 IP
  const xRealIp = headers["X-Real-IP"];
  const xForwardedFor = headers["X-Forwarded-For"];
  const { ip: cIp } = req;
  const { remoteAddress } = connection || {};
  const ip = xRealIp || xForwardedFor || cIp || remoteAddress;

  return {
    url,
    baseUrl,
    host: headers.host,
    ip,
    method,
    query,
    body,
  };
};
