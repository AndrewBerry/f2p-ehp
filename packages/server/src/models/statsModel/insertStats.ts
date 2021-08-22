import { AccStats } from "../../services/hiscoresService";
import { dbPool } from "../../utils/dbPool";

export async function insertStats(stats: AccStats) {
  const client = await dbPool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        UPDATE stats_pit
        SET
          is_latest = FALSE
        WHERE
          ign = $1 AND
          is_latest IS TRUE
      `,
      [stats.ign]
    );

    await client.query(
      `
        INSERT INTO stats_pit
          (
            ign,
            acc_type,
            is_p2p,
            total_level,
            total_exp,
            att_level,
            att_exp,
            def_level,
            def_exp,
            str_level,
            str_exp,
            hp_level,
            hp_exp,
            range_level,
            range_exp,
            pray_level,
            pray_exp,
            mage_level,
            mage_exp,
            cook_level,
            cook_exp,
            wc_level,
            wc_exp,
            fish_level,
            fish_exp,
            fm_level,
            fm_exp,
            craft_level,
            craft_exp,
            mining_level,
            mining_exp,
            smith_level,
            smith_exp,
            rc_level,
            rc_exp,
            obor_kc,
            bryo_kc,
            clue,
            lms
          )
        VALUES
          (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13,
            $14,
            $15,
            $16,
            $17,
            $18,
            $19,
            $20,
            $21,
            $22,
            $23,
            $24,
            $25,
            $26,
            $27,
            $28,
            $29,
            $30,
            $31,
            $32,
            $33,
            $34,
            $35,
            $36,
            $37,
            $38,
            $39
          )
      `,
      [
        stats.ign,
        stats.accType,
        stats.isP2p,
        stats.totalLevel,
        stats.totalExp,
        stats.attLevel,
        stats.attExp,
        stats.defLevel,
        stats.defExp,
        stats.strLevel,
        stats.strExp,
        stats.hpLevel,
        stats.hpExp,
        stats.rangeLevel,
        stats.rangeExp,
        stats.prayLevel,
        stats.prayExp,
        stats.mageLevel,
        stats.mageExp,
        stats.cookLevel,
        stats.cookExp,
        stats.wcLevel,
        stats.wcExp,
        stats.fishLevel,
        stats.fishExp,
        stats.fmLevel,
        stats.fmExp,
        stats.craftLevel,
        stats.craftExp,
        stats.miningLevel,
        stats.miningExp,
        stats.smithLevel,
        stats.smithExp,
        stats.rcLevel,
        stats.rcExp,
        stats.oborKc,
        stats.bryoKc,
        stats.clues,
        stats.lms,
      ]
    );

    await client.query(
      `
        UPDATE stats_pit
        SET
          total_rank = ranks.total_rank,
          def_rank = ranks.def_rank,
          att_rank = ranks.att_rank,
          str_rank = ranks.str_rank,
          hp_rank = ranks.hp_rank,
          range_rank = ranks.range_rank,
          pray_rank = ranks.pray_rank,
          mage_rank = ranks.mage_rank,
          cook_rank = ranks.cook_rank,
          wc_rank = ranks.wc_rank,
          fish_rank = ranks.fish_rank,
          fm_rank = ranks.fm_rank,
          craft_rank = ranks.craft_rank,
          mining_rank = ranks.mining_rank,
          smith_rank = ranks.smith_rank,
          rc_rank = ranks.rc_rank,
          obor_rank = ranks.obor_rank,
          bryo_rank = ranks.bryo_rank,
          clue_rank = ranks.clue_rank,
          lms_rank = ranks.lms_rank
        FROM ranks
        WHERE
          ranks.ign = $1 AND
          stats_pit.ign = $1 AND
          is_latest = TRUE
      `,
      [stats.ign]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    throw new Error("Unable to persist stats to databse.");
  } finally {
    client.release();
  }
}
