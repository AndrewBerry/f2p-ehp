import Koa from "koa";
import Router from "koa-router";

import * as playersController from "../controllers/players";
import * as updateRequestsController from "../controllers/updateRequests";

export async function routerLoader(app: Koa) {
  const router = new Router();

  router.get("/players", ...playersController.getAll);
  router.post("/updateRequests", ...updateRequestsController.upsert);

  app.use(router.routes()).use(router.allowedMethods());
}
