import * as path from "path";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import { migrate } from "postgres-migrations";

import { dbPool } from "./utils/dbPool";

async function execMigrations() {
  await migrate(
    { client: dbPool },
    path.resolve(__filename, "../../migrations")
  );
  await dbPool.end();
}

execMigrations();
