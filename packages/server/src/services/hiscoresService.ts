import Axios from "axios";

const accTypeSuffixes = {
  uim: "_ultimate",
  hcim: "_hardcore_ironman",
  im: "_ironman",
  reg: "",
};
type AccType = keyof typeof accTypeSuffixes;

function getAccTypesToCheck(lastKnownAccType?: AccType): AccType[] {
  switch (lastKnownAccType) {
    case "uim":
      return ["uim", "im", "reg"];
    case "hcim":
      return ["hcim", "im", "reg"];
    case "im":
      return ["im", "reg"];
    default:
      return ["uim", "hcim", "im", "reg"];
  }
}

async function getRaw(accType: AccType, ign: string) {
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

function getValuesFromRaw(hiscoresRaw: string): number[][] {
  const hiscores = hiscoresRaw
    .trim()
    .split("\n")
    .map((row: string) => row.split(",").map((val: string) => parseInt(val)));

  if (hiscores.length !== 83) {
    throw new Error(
      `Unexpected number of rows returned from hiscores API (${hiscores.length}) - 83 expected.`
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
  ...Array.from({ length: 4 }, (_, k) => ({ row: k + 35, cell: 1 })),
  ...Array.from({ length: 25 }, (_, k) => ({ row: k + 40, cell: 1 })),
  ...Array.from({ length: 17 }, (_, k) => ({ row: k + 66, cell: 1 })),
];

export function doValuesIncludeP2p(hiscores: number[][]): boolean {
  return p2pHiscoreCells.some(({ row, cell }) => hiscores[row][cell] > 0);
}

function getStatsFromValues(hiscoresValues: number[][]) {
  return {
    total_level: hiscoresValues[0][1] - 8,
    total_exp: hiscoresValues[0][2],
    att_level: hiscoresValues[1][1],
    att_exp: hiscoresValues[1][2],
    def_level: hiscoresValues[2][1],
    def_exp: hiscoresValues[2][2],
    str_level: hiscoresValues[3][1],
    str_exp: hiscoresValues[3][2],
    hp_level: hiscoresValues[4][1],
    hp_exp: hiscoresValues[4][2],
    range_level: hiscoresValues[5][1],
    range_exp: hiscoresValues[5][2],
    pray_level: hiscoresValues[6][1],
    pray_exp: hiscoresValues[6][2],
    mage_level: hiscoresValues[7][1],
    mage_exp: hiscoresValues[7][2],
    cook_level: hiscoresValues[8][1],
    cook_exp: hiscoresValues[8][2],
    wc_level: hiscoresValues[9][1],
    wc_exp: hiscoresValues[9][2],
    fish_level: hiscoresValues[11][1],
    fish_exp: hiscoresValues[11][2],
    fm_level: hiscoresValues[12][1],
    fm_exp: hiscoresValues[12][2],
    craft_level: hiscoresValues[13][1],
    craft_exp: hiscoresValues[13][2],
    mining_level: hiscoresValues[14][1],
    mining_exp: hiscoresValues[14][2],
    smith_level: hiscoresValues[15][1],
    smith_exp: hiscoresValues[15][2],
    rc_level: hiscoresValues[21][1],
    rc_exp: hiscoresValues[21][2],

    obor_kc: hiscoresValues[65][1],
    bryo_kc: hiscoresValues[39][1],
    clues: hiscoresValues[28][1],
    lms: hiscoresValues[34][1],
  };
}

export async function fetchPlayer(ign: string, lastKnownAccType?: AccType) {
  const accTypes = getAccTypesToCheck(lastKnownAccType);

  const allAccTypeStats = await Promise.all(
    accTypes.map(async (accType) => {
      try {
        const raw = await getRaw(accType, ign);
        const values = getValuesFromRaw(raw);
        const isP2p = doValuesIncludeP2p(values);
        const stats = getStatsFromValues(values);

        return { accType, isP2p, ...stats };
      } catch (er) {
        return null;
      }
    })
  );

  const validAccTypeStats = allAccTypeStats
    .flatMap((stats) => (!!stats ? [stats] : []))
    .sort((a, b) => b.total_exp - a.total_exp);

  if (validAccTypeStats.length === 0) {
    throw new Error(`Unable to find any valid stats for ign: ${ign}`);
  }

  return validAccTypeStats[0];
}
