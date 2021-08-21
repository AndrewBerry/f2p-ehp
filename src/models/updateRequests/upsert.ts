import { dbPool } from "../../utils/dbPool";

export async function upsert(ign: string) {
  try {
    return await dbPool.query(
      `
        INSERT INTO update_requests
          (
            ign
          )
        VALUES
          (
            $1
          )
      `,
      [ign]
    );
  } catch (er) {
    throw er;
  }
}
