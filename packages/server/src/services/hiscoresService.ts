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

export interface IStats {
  totalLevel: number;
  totalExp: number;
  attLevel: number;
  attExp: number;
  defLevel: number;
  defExp: number;
  strLevel: number;
  strExp: number;
  hpLevel: number;
  hpExp: number;
  rangeLevel: number;
  rangeExp: number;
  prayLevel: number;
  prayExp: number;
  mageLevel: number;
  mageExp: number;
  cookLevel: number;
  cookExp: number;
  wcLevel: number;
  wcExp: number;
  fishLevel: number;
  fishExp: number;
  fmLevel: number;
  fmExp: number;
  craftLevel: number;
  craftExp: number;
  miningLevel: number;
  miningExp: number;
  smithLevel: number;
  smithExp: number;
  rcLevel: number;
  rcExp: number;
  oborKc: number;
  bryoKc: number;
  clues: number;
  lms: number;
}

function getStatsFromValues(hiscoresValues: number[][]): IStats {
  return {
    totalLevel: hiscoresValues[0][1] - 8,
    totalExp: hiscoresValues[0][2],
    attLevel: hiscoresValues[1][1],
    attExp: hiscoresValues[1][2],
    defLevel: hiscoresValues[2][1],
    defExp: hiscoresValues[2][2],
    strLevel: hiscoresValues[3][1],
    strExp: hiscoresValues[3][2],
    hpLevel: hiscoresValues[4][1],
    hpExp: hiscoresValues[4][2],
    rangeLevel: hiscoresValues[5][1],
    rangeExp: hiscoresValues[5][2],
    prayLevel: hiscoresValues[6][1],
    prayExp: hiscoresValues[6][2],
    mageLevel: hiscoresValues[7][1],
    mageExp: hiscoresValues[7][2],
    cookLevel: hiscoresValues[8][1],
    cookExp: hiscoresValues[8][2],
    wcLevel: hiscoresValues[9][1],
    wcExp: hiscoresValues[9][2],
    fishLevel: hiscoresValues[11][1],
    fishExp: hiscoresValues[11][2],
    fmLevel: hiscoresValues[12][1],
    fmExp: hiscoresValues[12][2],
    craftLevel: hiscoresValues[13][1],
    craftExp: hiscoresValues[13][2],
    miningLevel: hiscoresValues[14][1],
    miningExp: hiscoresValues[14][2],
    smithLevel: hiscoresValues[15][1],
    smithExp: hiscoresValues[15][2],
    rcLevel: hiscoresValues[21][1],
    rcExp: hiscoresValues[21][2],

    oborKc: hiscoresValues[65][1],
    bryoKc: hiscoresValues[39][1],
    clues: hiscoresValues[28][1],
    lms: hiscoresValues[34][1],
  };
}

interface IAccount {
  ign: string;
  accType: AccType;
  isP2p: boolean;
}

export type AccStats = IAccount & IStats;

export async function fetchPlayer(
  ign: string,
  lastKnownAccType?: AccType
): Promise<AccStats> {
  const accTypes = getAccTypesToCheck(lastKnownAccType);

  const allAccTypeStats = await Promise.all(
    accTypes.map(async (accType) => {
      try {
        const raw = await getRaw(accType, ign);
        const values = getValuesFromRaw(raw);
        const isP2p = doValuesIncludeP2p(values);
        const stats = getStatsFromValues(values);

        return { ign, accType, isP2p, ...stats };
      } catch (er) {
        return null;
      }
    })
  );

  const validAccTypeStats = allAccTypeStats
    .flatMap((stats) => (!!stats ? [stats] : []))
    .sort((a, b) => b.totalExp - a.totalExp);

  if (validAccTypeStats.length === 0) {
    throw new Error(`Unable to find any valid stats for ign: ${ign}`);
  }

  return validAccTypeStats[0];
}
