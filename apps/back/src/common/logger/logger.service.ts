import { Injectable } from "@nestjs/common";
import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import { join } from "node:path";
import { isVercelEnv } from "@/app.module";

const LOG_DIR = "logs";

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    console.log("=========isVercelEnv:LoggerService========");
    const transports = [];
    if (!isVercelEnv) {
      transports.push(
        // 错误日志
        new DailyRotateFile({
          dirname: join(LOG_DIR, "error"),
          filename: "error-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          level: "error",
          maxSize: "20m",
          maxFiles: "14d",
        }),
        // 自动按照日期｜文件大小来进行轮转日志文件
        new DailyRotateFile({
          dirname: join(LOG_DIR, "combined"),
          filename: "combined-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxSize: "20m",
          maxFiles: "14d",
        }),
      );
    }

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports,
    });

    // 开发环境下添加控制台输出
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      );
    }
  }

  /**
   * 记录信息日志
   * @param message 日志信息
   * @param context 上下文
   */
  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  /**
   * 记录错误日志
   * @param message 日志信息
   * @param trace 错误追踪
   * @param context 上下文
   */
  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  /**
   * 记录警告日志
   * @param message 日志信息
   * @param context 上下文
   */
  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  /**
   * 记录调试日志
   * @param message 日志信息
   * @param context 上下文
   */
  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  /**
   * 记录详细日志
   * @param message 日志信息
   * @param context 上下文
   */
  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}

@Injectable()
export class NoopLoggerService {
  log() {
    console.log("=========isVercelEnv========");
  }
  error() {}
  warn() {}
  debug() {}
  verbose() {}
}
