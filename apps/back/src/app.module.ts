import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { I18nConfigModule } from "@/common/locales/i18n.module";
import { LoggerModule } from "@/common/logger/logger.module";
import { HttpExceptionFilter } from "@/core/filters/http-exception.filter";
import { AllExceptionFilter } from "@/core/filters/all-exception.filter";
import { V1Module } from "@/api";

export const isVercelEnv = process.env.VERCEL_DEPLOY === "1";
export const isProduction =
  process.env.NODE_ENV === "production" ? "production" : "development";
console.log(
  "===========isProduction===============",
  isProduction,
  isVercelEnv,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
      cache: true,
    }),
    I18nConfigModule,
    LoggerModule.forRoot(),
    V1Module,
  ],
  providers: [
    // 执行顺序：从后往前！
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
