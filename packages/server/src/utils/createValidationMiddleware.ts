import { Context } from "koa";
import { Schema, ValidationOptions } from "joi";

export function createValidationMiddleware(
  schema: Schema,
  opts: ValidationOptions = { allowUnknown: true }
) {
  return async function (ctx: Context, next: CallableFunction) {
    const { error } = schema.validate(ctx.request, opts);

    if (error) {
      ctx.status = 400;
      ctx.body = error.message;

      return;
    }

    await next();
  };
}
