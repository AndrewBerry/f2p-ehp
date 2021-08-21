import { Context } from "koa";

import * as statsModel from "../../models/stats";

export const getAll = [
  async function(ctx: Context, next: CallableFunction) {
    try {
      const players = await statsModel.getAll();

      ctx.status = 200;
      ctx.body = {
        success: true,
        body: players.rows
      };  

      await next();
    } catch (er) {
      await next(er);
    }
  }
];
