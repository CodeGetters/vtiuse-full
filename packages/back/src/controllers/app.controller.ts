import { Controller, Get } from "@nestjs/common";
import { AppService } from "../services/app.service";
import { I18nLang } from "nestjs-i18n";

@Controller("/example")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@I18nLang() lang: string): string {
    // 需要一个语言参数：zh|en
    return this.appService.getHello(lang);
  }
}
