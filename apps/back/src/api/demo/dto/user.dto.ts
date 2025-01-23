import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class createUserDto {
  @ApiProperty({ description: "用户名" })
  @Length(5, 10, {
    message: "用户名在 5 个到 10 个之间",
  })
  readonly name: string;

  readonly gender?: string;

  @ApiProperty({ description: "密码" })
  @IsNotEmpty({ message: "用户密码必填" })
  readonly pwd: string;
}
