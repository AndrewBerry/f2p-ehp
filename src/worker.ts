if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import * as statsModel from "./models/stats";

async function worker() {
  try {
    await statsModel.insert(
      "so_so_much",
      36100000,
      1025,
      1190
    );
  } catch (er) {
    console.error(er);
  }
}

worker();
