import { Context, Next } from "koa";

export const fetchAllPlayers = [
  async (ctx: Context, next: Next) => {
    ctx.body = {
      success: true,
    };

    await next();
  },
];
