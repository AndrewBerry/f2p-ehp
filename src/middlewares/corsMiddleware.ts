import { Context } from "koa";

export async function corsMiddleware(ctx: Context, next: CallableFunction) {
  ctx.set("Access-Control-Allow-Origin", process.env.CORS_ORIGIN as string);
  ctx.set("Access-Control-Max-Age", "600");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Headers", "content-type");

  await next();
}
