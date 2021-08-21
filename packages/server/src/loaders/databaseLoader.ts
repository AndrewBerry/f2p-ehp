import { dbPool } from "../utils/dbPool";

export async function databaseLoader() {
  await dbPool.connect();
}
