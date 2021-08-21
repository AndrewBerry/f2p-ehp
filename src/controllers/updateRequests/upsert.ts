import { Context } from "koa";
import Joi from "joi";

import * as updateRequestsModel from "../../models/updateRequests";
import { createValidationMiddleware } from "../../utils/createValidationMiddleware";

export const upsert = [
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
  async function (ctx: Context, next: CallableFunction) {
    try {
      // console.log(ctx.request.body.ign);
      await updateRequestsModel.upsert("so_so_much");

      ctx.status = 201;
      ctx.body = {
        success: true,
      };
    } catch (er) {
      await next(er);
    }
  },
];
