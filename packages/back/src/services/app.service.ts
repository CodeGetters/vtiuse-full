import { Injectable } from "@nestjs/common";
import { I18nLang, I18nService } from "nestjs-i18n";

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) {}

  getHello(@I18nLang() lang: string): string {
    return this.i18n.translate("test.Hello", { lang });
  }
}
