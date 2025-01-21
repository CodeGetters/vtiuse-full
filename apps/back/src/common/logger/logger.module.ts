import { Global, Module, DynamicModule } from "@nestjs/common";
import { LoggerService, NoopLoggerService } from "./logger.service";
import { isVercelEnv } from "~/app.module";

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useClass: isVercelEnv ? NoopLoggerService : LoggerService,
        },
      ],
      exports: [LoggerService],
    };
  }
}
