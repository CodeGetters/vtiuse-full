import { Get, Controller } from "@nestjs/common";
import { I18nLang } from "nestjs-i18n";
import { DemoService } from "@/api/demo/demo.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { createUserDto } from "./dto/user.dto";
import { Post, Body, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("测试")
@Controller()
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  @ApiOperation({
    summary: "示例 get 请求",
    description: "app 连接测试请求",
  })
  getHello(@I18nLang() lang: string) {
    return this.demoService.getHello(lang);
  }

  @Post("create")
  @ApiOperation({ summary: "创建用户" })
  @UseInterceptors(FileInterceptor("file"))
  createUser(@Body() userData: createUserDto) {
    return this.demoService.createUser(userData);
  }
}
