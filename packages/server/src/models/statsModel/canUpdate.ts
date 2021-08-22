import { dbPool } from "../../utils/dbPool";

export async function canUpdate(ign: string): Promise<boolean> {
  const res = await dbPool.query<{ can_update: boolean }>(
    `
      SELECT
      (now() - created_at) > interval '5 minutes' as can_update
      FROM stats_pit
      WHERE
        ign = $1 AND
        is_latest = TRUE
    `,
    [ign]
  );

  if (res.rowCount === 0) {
    return true;
  }

  return res.rows[0].can_update;
}
