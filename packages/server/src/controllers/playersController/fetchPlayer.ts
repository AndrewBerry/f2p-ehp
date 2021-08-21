import { Context, Next } from "koa";

import { cleanIgn } from "../../utils/cleanIgn";

export const fetchPlayer = [
  async (ctx: Context, next: Next) => {
    const rawIgn: string = ctx.params.ign;
    const ign = cleanIgn(rawIgn);

    ctx.body = {
      success: true,
      ign,
    };

    await next();
  },
];
