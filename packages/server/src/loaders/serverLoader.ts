import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";

import { corsMiddleware } from "../middlewares/corsMiddleware";

export async function serverLoader(app: Koa) {
  app.use(corsMiddleware);
  app.use(bodyParser());
  app.keys = (process.env.APP_COOKIE_KEY as string).split(",");
}
