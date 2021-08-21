import { dbPool } from "../../utils/dbPool";

export async function insert(ign: String, exp: number, ehp: number, level: number) {
  const client = await dbPool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        UPDATE stats
        SET
          is_latest = FALSE
        WHERE
          ign = $1 AND
          is_latest IS TRUE
      `,
      [ign]
    );

    await client.query(
      `
        INSERT INTO stats
          (
            ign,
            total_level,
            total_exp,
            total_ehp
          )
        VALUES
          (
            $1,
            $2,
            $3,
            $4
          )
      `,
      [ign, level, exp, ehp]
    );

    await client.query(`
      UPDATE stats
      SET
        total_rank = ranks.total_rank
      FROM ranks
      WHERE
        stats.ign = ranks.ign AND
        stats.is_latest IS TRUE
    `);

    await client.query("COMMIT");
  } catch (er) {
    await client.query("ROLLBACK");
    throw er;
  } finally {
    client.release();
    dbPool.end();
  }
}
