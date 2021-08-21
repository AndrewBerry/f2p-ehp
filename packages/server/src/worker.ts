import { dbPool } from "./utils/dbPool";
import * as hiscoresService from "./services/hiscoresService";
import { cleanIgn } from "./utils/cleanIgn";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function worker() {
  const ign = cleanIgn("so so much");

  try {
    const stats = await hiscoresService.fetchPlayer(ign);

    console.log(stats);
  } catch (err) {
    console.log("Error");
    console.log(err);
  }

  await dbPool.end();
}

worker();
