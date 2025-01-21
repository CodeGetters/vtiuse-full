import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { LoggerService } from "@/common/logger/logger.service";

/**
 * Prisma 服务类
 * 用于管理数据库连接和日志记录
 * 继承自 PrismaClient 并实现了 OnModuleInit 和 OnModuleDestroy 接口
 */
@Injectable()
export class PrismaService
  extends PrismaClient<{
    log: { emit: "event"; level: "query" | "info" | "warn" | "error" }[];
  }>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private logger: LoggerService) {
    super({
      // 配置 Prisma 日志事件
      log: [
        { emit: "event", level: "query" }, // SQL 查询日志
        { emit: "event", level: "info" }, // 信息日志
        { emit: "event", level: "warn" }, // 警告日志
        { emit: "event", level: "error" }, // 错误日志
      ],
    });

    // 监听 Prisma 事件并记录日志
    this.$on("query", (e) => {
      this.logger.debug(`Query: ${e.query}`, "PrismaService");
    });

    this.$on("info", (e) => {
      this.logger.log(`${e.message}`, "PrismaService");
    });

    this.$on("warn", (e) => {
      this.logger.warn(`${e.message}`, "PrismaService");
    });

    this.$on("error", (e) => {
      this.logger.error(`${e.message}`, null, "PrismaService");
    });
  }

  /**
   * 模块初始化时连接数据库
   */
  async onModuleInit() {
    // await this.$connect();
    // console.log('database url must be set in .env file');
    this.logger.log("Database connected successfully", "PrismaService");
  }

  /**
   * 模块销毁时断开数据库连接
   */
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Database disconnected successfully", "PrismaService");
  }
}
