import "module-alias";
import { blue } from "kolorist";
import overallConfig from "./config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "~/app.module";
import { ValidationPipe } from "@nestjs/common";
import type { OpenAPIObject } from "@nestjs/swagger";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
/**
 *
 * 全局入口文件
 * 引入 swagger 文档基本配置
 *
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("back");
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Swagger example")
    .setDescription("The swagger API description")
    .setVersion("1.0.0")
    .addTag("example")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  await app.listen(overallConfig.port);
  // eslint-disable-next-line no-console
  console.log(blue(`[API Docs]${await app.getUrl()}/docs`));
  // eslint-disable-next-line no-console
  console.log(blue(`[Test API]${await app.getUrl()}/back/v1/demo`));
}
bootstrap();
