import * as Koa from "koa";

import { serverLoader } from "./serverLoader";
import { routerLoader } from "./routerLoader";
import { workerLoader } from "./workerLoader";

export async function loaders(app: Koa) {
  await serverLoader(app);
  await routerLoader(app);
  workerLoader();
}
