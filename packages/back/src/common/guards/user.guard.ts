// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Observable } from "rxjs";
// import { Request } from "express";

// @Injectable()
// export class UserGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest<Request | any>();
//     // 直接检测是否有user对象，因为无user对象证明无token或者token无效
//     return !!request.user;
//   }
// }
