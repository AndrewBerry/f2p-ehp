import Axios from "axios";
import { AccType, IStatsPit } from "@f2p/common";

export async function getHiscoresRaw(accType: AccType, ign: string) {
  const accTypeSuffixes = {
    reg: "",
    im: "_ironman",
    hcim: "_hardcore_ironman",
    uim: "_ultimate",
  };

  const hiscoresUrl = `https://secure.runescape.com/m=hiscore_oldschool${
    accTypeSuffixes[accType]
  }/index_lite.ws?player=${encodeURIComponent(ign)}`;

  try {
    const response = await Axios.get<string>(hiscoresUrl);
    return response.data;
  } catch {
    throw new Error("Could not retrieve hiscores.");
  }
}

export function parseHiscoresRaw(hiscoresRaw: string): number[][] {
  const hiscores = hiscoresRaw
    .trim()
    .split("\n")
    .map((row: string) => row.split(",").map((val: string) => parseInt(val)));

  if (hiscores.length !== 79) {
    throw new Error(
      `Unexpected number of rows returned from hiscores API (${hiscores.length}) - 79 expected.`
    );
  }

  return hiscores;
}

const p2pHiscoreCells = [
  { row: 10, cell: 2 },
  ...Array.from({ length: 5 }, (_, k) => ({ row: k + 16, cell: 2 })),
  ...Array.from({ length: 2 }, (_, k) => ({ row: k + 22, cell: 2 })),
  ...Array.from({ length: 3 }, (_, k) => ({ row: k + 24, cell: 1 })),
  ...Array.from({ length: 5 }, (_, k) => ({ row: k + 29, cell: 1 })),
  ...Array.from({ length: 3 }, (_, k) => ({ row: k + 35, cell: 1 })),
  ...Array.from({ length: 24 }, (_, k) => ({ row: k + 39, cell: 1 })),
  ...Array.from({ length: 15 }, (_, k) => ({ row: k + 64, cell: 1 })),
];

export function hiscoresIncludesP2p(hiscores: number[][]): boolean {
  return p2pHiscoreCells.some(({ row, cell }) => hiscores[row][cell] > 0);
}

export function extractStatsFromHiscores(hiscores: number[][]): IStatsPit {
  return {
    
    // overall_exp: Math.max(0, hiscores[0][2]),
    // att_exp: Math.max(0, hiscores[1][2]),
    // str_exp: Math.max(0, hiscores[3][2]),
    // def_exp: Math.max(0, hiscores[2][2]),
    // hp_exp: Math.max(0, hiscores[4][2]),
    // range_exp: Math.max(0, hiscores[5][2]),
    // pray_exp: Math.max(0, hiscores[6][2]),
    // mage_exp: Math.max(0, hiscores[7][2]),
    // cook_exp: Math.max(0, hiscores[8][2]),
    // wc_exp: Math.max(0, hiscores[9][2]),
    // fisk_exp: Math.max(0, hiscores[11][2]),
    // fm_exp: Math.max(0, hiscores[12][2]),
    // craft_exp: Math.max(0, hiscores[13][2]),
    // smith_exp: Math.max(0, hiscores[14][2]),
    // mining_exp: Math.max(0, hiscores[15][2]),
    // rc_exp: Math.max(0, hiscores[21][2]),
    // clues_kc: Math.max(0, hiscores[28][1]),
    // obor_kc: Math.max(0, hiscores[63][1]),
    // byro_kc: Math.max(0, hiscores[38][1]),
    // lms_score: Math.max(0, hiscores[34][1]),
  };
}
