import { SetMetadata } from "@nestjs/common";

/**
 * 跳过 TransformInterceptor 拦截器
 * eg:
 * ```demo.controller.ts
 * @Get()
 * @SkipTransform()
 * export demo() {
 *   return 'demo';
 * }
 * ```
 */

export const SKIP_TRANSFORM_KEY = "skipTransform";
export const SkipTransform = () => SetMetadata(SKIP_TRANSFORM_KEY, true);
