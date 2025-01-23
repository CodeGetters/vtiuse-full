import { Module } from "@nestjs/common";
import { DemoModule } from "./demo/demo.module";
import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    DemoModule,
    RouterModule.register([
      { path: "v1", children: [{ path: "demo", module: DemoModule }] },
    ]),
  ],
})
export class V1Module {}
