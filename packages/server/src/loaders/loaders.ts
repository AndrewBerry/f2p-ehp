import * as Koa from "koa";

import { serverLoader } from "./serverLoader";
import { routerLoader } from "./routerLoader";

export async function loaders(app: Koa) {
  await serverLoader(app);
  await routerLoader(app);
}
