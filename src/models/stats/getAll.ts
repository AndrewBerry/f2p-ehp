import { dbPool } from "../../utils/dbPool";

export async function getAll() {
  try {
    return await dbPool.query(
      `
        SELECT
          stats.ign,
          stats.acc_type,
          stats.total_exp as exp,
          stats.total_ehp as ehp,
          stats.total_level as level,
          ranks.total_rank as rank
        FROM stats
        LEFT JOIN ranks
          ON stats.ign = ranks.ign
        WHERE
          stats.is_latest IS TRUE
        ORDER BY stats.total_ehp DESC;
      `
    )
  } catch (er) {
    throw er;
  }
}
