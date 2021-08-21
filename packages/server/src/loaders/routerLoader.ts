import * as Koa from "koa";
import * as Router from "koa-router";

import * as playersController from "../controllers/playersController";

export async function routerLoader(app: Koa) {
  const router = new Router();

  router.get("/players", ...playersController.fetchAllPlayers);
  router.get("/players/:ign", ...playersController.fetchPlayer);

  app.use(router.routes()).use(router.allowedMethods());
}
