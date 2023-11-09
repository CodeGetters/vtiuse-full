import "module-alias";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "~/modules/app.module";
import { blue } from "kolorist";
import overallConfig from "./config";
// import LoggerMiddleware from "~/common/middleware/logger.middler";
import type { OpenAPIObject } from "@nestjs/swagger";
declare const module: any;

/**
 *
 * 全局入口文件
 *
 * 引入 swagger 文档基本配置
 *
 * webpack 热更新启动
 *
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("back");
  // app.use(LoggerMiddleware);

  const config = new DocumentBuilder()
    .setTitle("Swagger example")
    .setDescription("The swagger API description")
    .setVersion("1.0.0")
    .addTag("example")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(overallConfig.port);
  console.log(blue(`[API Docs]${await app.getUrl()}/docs`));
  console.log(blue(`[Test API]${await app.getUrl()}/back/example`));
}
bootstrap();
