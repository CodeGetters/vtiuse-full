import { Get, Controller } from "@nestjs/common";
import { I18nLang } from "nestjs-i18n";
import { AppService } from "~/services/app.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { createUserDto } from "~/common/dto/user.dto";
import { Post, Body, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("测试")
@Controller("example")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: "示例 get 请求",
    description: "app 连接测试请求",
  })
  getHello(@I18nLang() lang: string) {
    return this.appService.getHello(lang);
  }

  @Post("create")
  @ApiOperation({ summary: "创建用户" })
  @UseInterceptors(FileInterceptor("file"))
  createUser(@Body() userData: createUserDto) {
    return this.appService.createUser(userData);
  }
}
