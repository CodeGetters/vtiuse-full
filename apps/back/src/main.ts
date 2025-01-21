import { blue } from "kolorist";
import overallConfig from "./config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { ValidationPipe } from "@nestjs/common";
import type { OpenAPIObject } from "@nestjs/swagger";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import fastifyStatic from "@fastify/static";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { LoggerService } from "@/common/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Swagger example")
    .setDescription("The swagger API description")
    .setVersion("1.0.0")
    .addTag("example")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document, {
    // 指定 Swagger JSON 文档的访问路径
    jsonDocumentUrl: "docs/json",
    // 设置文档页面的标题
    customSiteTitle: "API Documentation",
    // 自定义 JavaScript 文件，使用 CDN 资源
    customJs: [
      // Swagger UI 的核心功能包
      "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-bundle.js",
      // Swagger UI 的独立预设包，提供额外功能
      "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js",
    ],
    // 自定义 CSS 样式文件，使用 CDN 资源
    customCssUrl: [
      // Swagger UI 的默认样式
      "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui.css",
    ],
    // Swagger UI 的具体配置选项
    swaggerOptions: {
      // 持久化认证信息，页面刷新后保持登录状态
      persistAuthorization: true,
      // 显示接口响应时间
      displayRequestDuration: true,
      // 默认折叠所有接口文档
      // docExpansion: 'none',
      // 启用搜索过滤功能
      filter: true,
      // 显示通用扩展属性
      showCommonExtensions: true,
    },
  });

  // 添加静态文件服务
  await app.register(fastifyStatic as any, {
    root: join(process.cwd(), "uploads"),
    prefix: "/uploads/",
    decorateReply: false, // 避免多个静态文件插件之间的装饰器冲突
  });

  await app.register(fastifyStatic as any, {
    root: join(process.cwd(), "..", "public"),
    prefix: "/",
    decorateReply: false, // 避免多个静态文件插件之间的装饰器冲突
    schemaHide: true, // 隐藏该路由在 Swagger 中的显示
    serve: false, // 禁用自动文件服务
  });

  const logger = app.get(LoggerService);
  app
    .getHttpAdapter()
    .getInstance()
    .addHook("onRequest", (req, reply, done) => {
      // 处理静态文件请求日志
      if (req.url.startsWith("/uploads/")) {
        logger.log(
          [
            `Static file request: ${req.url}`,
            `IP: ${req.ip}`,
            `User-Agent: ${req.headers["user-agent"]}`,
            `Referer: ${req.headers.referer || "Direct access"}`,
          ].join("\n"),
          "StaticFileService",
        );
      }

      // 处理根路径和 index.html 请求
      if (req.url === "/" || req.url === "/index.html") {
        const filePath = join(process.cwd(), "public", "index.html");
        try {
          const html = readFileSync(filePath, "utf-8");
          reply
            .status(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(html);
        } catch (error) {
          logger.error(
            `Failed to read index.html: ${error.message}`,
            "StaticFileService",
          );
          reply
            .status(500)
            .header("Content-Type", "text/plain; charset=utf-8")
            .send("Internal Server Error");
        }
      }
      done();
    });
  app.enableCors({
    // TODO：允许所有域名的请求
    origin: ["*"],
    // 不启动凭证
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });
  await app.listen(overallConfig.port);
  console.log(blue(`[HTML DOC]${await app.getUrl()}`));
  console.log(blue(`[API Docs]${await app.getUrl()}/docs`));
  console.log(blue(`[Test API]${await app.getUrl()}/api/v1/demo`));
}
bootstrap();
