import { Global, Module } from "@nestjs/common";
import { join } from "node:path";
import { isProduction } from "@/app.module";
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from "nestjs-i18n";

const i18nPath = isProduction
  ? join(process.cwd(), "dist/i18n/")
  : join(__dirname, "/i18n/");
console.log("=======i18nPath=======", i18nPath);

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: i18nPath,
        watch: !isProduction,
        // typesOutputPath: join(i18nPath, '../generated/i18n.generated.ts'),
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
        new HeaderResolver(["x-lang"]),
      ],
    }),
  ],
  exports: [I18nModule],
})
export class I18nConfigModule {}
