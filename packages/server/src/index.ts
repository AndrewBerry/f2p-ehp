if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import * as Koa from "koa";

import { loaders } from "./loaders/loaders";

async function start() {
  const app = new Koa();
  await loaders(app);

  const port = process.env.port || 3030;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
}

start();
