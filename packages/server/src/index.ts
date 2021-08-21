import * as Koa from "koa";

import { Player } from "@f2p/common";

const me: Player = {
  ign: "so so much",
};

const app = new Koa();
app.use(async (ctx) => {
  ctx.body = me;
});

app.listen(3030);
