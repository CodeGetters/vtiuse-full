import { blue } from "kolorist";
import { Injectable } from "@nestjs/common";
import { I18nLang, I18nService } from "nestjs-i18n";

@Injectable()
export class DemoService {
  constructor(private readonly i18n: I18nService) {}

  getHello(@I18nLang() lang: string) {
    console.log(blue("[TEST]: app 示例请求成功！"));
    // return this.i18n.t('test.HELLO',{ lang:   I18nContext.current().lang });
    return { info: this.i18n.t("test.Hello", { lang }) };
  }

  createUser(userData) {
    console.log(blue("[CreateUser]:创建成功"), userData);
    return { info: userData };
  }
}
