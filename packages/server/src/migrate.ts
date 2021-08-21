if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import { migrate } from "postgres-migrations";

import { databaseLoader } from "./loaders/databaseLoader";
import { dbPool } from "./utils/dbPool";

async function execMigrations() {
  await databaseLoader();
  migrate({ client: dbPool }, "/migrations");
}

execMigrations();
