import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./modules/app.module";
import { blue } from "kolorist";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Swagger example")
    .setDescription("The swagger API description")
    .setVersion("1.0.0")
    .addTag("example")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
  console.log(blue(`[API Docs]${await app.getUrl()}/docs`));
  console.log(blue(`[Test API]${await app.getUrl()}/example`));
}
bootstrap();
