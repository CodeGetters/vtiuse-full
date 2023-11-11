import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from "nestjs-i18n";
import {
  MiddlewareConsumer,
  RequestMethod,
  Module,
  NestModule,
} from "@nestjs/common";
import { join } from "path";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "~/services/app.service";
import { AppController } from "~/controllers/app.controller";

import * as winston from "winston";
import "winston-daily-rotate-file";
import { WinstonModule } from "nest-winston";
import LoggerMiddleware from "~/common/middleware/logger.middler";
import HttpExceptionFilter from "~/common/filters/http-exception.filter";
import ResponseInterceptor from "~/common/interceptor/response.interceptor";

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
          dirname: join(__dirname, "/logs/"),
          filename: "%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
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
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
