import * as Koa from "koa";

import { serverLoader } from "./serverLoader";
import { routerLoader } from "./routerLoader";
import { databaseLoader } from "./databaseLoader";

export async function loaders(app: Koa) {
  await serverLoader(app);
  await routerLoader(app);
  await databaseLoader();
}
