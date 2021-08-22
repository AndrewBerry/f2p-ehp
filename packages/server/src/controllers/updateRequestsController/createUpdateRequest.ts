import { Context, Next } from "koa";
import * as Joi from "joi";

import * as statsModel from "../../models/statsModel";
import * as updateRequestsModel from "../../models/updateRequestsModel";
import { createValidationMiddleware } from "../../utils/createValidationMiddleware";
import { cleanIgn } from "../../utils/cleanIgn";

export const createUpdateRequest = [
  createValidationMiddleware(
    Joi.object({
      body: Joi.object({
        ign: Joi.string()
          .pattern(/[a-z0-9 ]/i)
          .max(12)
          .required(),
      }),
    })
  ),
  async (ctx: Context, next: Next) => {
    ctx.state.ign = cleanIgn(ctx.request.body.ign);
    await next();
  },
  async (ctx: Context, next: Next) => {
    const canUpdate = await statsModel.canUpdate(ctx.state.ign);
    if (!canUpdate) {
      ctx.status = 429;
      return;
    }

    await next();
  },
  async (ctx: Context, next: Next) => {
    await updateRequestsModel.createUpdateRequest(ctx.state.ign);
    ctx.status = 201;

    await next();
  },
];
