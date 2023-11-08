import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AppController } from "~/controllers/app.controller";
import { AppService } from "~/services/app.service";
import { join } from "path";
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from "nestjs-i18n";

import * as winston from "winston";
import { WinstonModule } from "nest-winston";
import "winston-daily-rotate-file";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      cache: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: join(__dirname, "/i18n/"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
        new HeaderResolver(["x-lang"]),
      ],
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          // 日志保存目录
          dirname: join(__dirname, "/logs/"),
          // 日志名称-占位符%DATE% 取值为 datePattern 值
          filename: "%DATE%.log",
          // 日志转换的频率-每天
          datePattern: "YYYY-MM-DD",
          // 是否通过压缩的方式归档被转换的日志文件
          zippedArchive: true,
          // 设置日志文件的最大大小-20 MB
          maxSize: "20m",
          // 保留日志文件得最大天数-自动删除超过 14 天的日志文件
          maxFiles: "14d",
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: "YYYY-MM-DD HH:mm:ss",
            }),
            winston.format.json(),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
