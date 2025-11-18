const sizeNumber: Record<string, string> = {
  "32": "XXS",
  "34": "XS",
  "36": "S",
  "38": "M",
  "40": "L",
  "42": "XL",
  "44": "2XL",
  "46": "3XL",
  "48": "4XL",
  "50": "5XL",
  "52": "6XL",
};

export const calcSizeNumber = (taille: string) => {
  return sizeNumber[taille];
};

const sizeLabel: Record<string, string> = {
  XXS: "XS",
  XS: "S",
  S: "M",
  M: "L",
  L: "XL",
  XL: "XXL",
  XXL: "XXXL",
};

export const calcSizeLabel = (taille: string) => {
  return sizeLabel[taille];
};

const sizeShoes: Record<string, string> = {
  "34": "215",
  "34.5": "220",
  "35": "225",
  "35.5": "230",
  "36": "235",
  "36.5": "235",
  "37": "240",
  "37.5": "245",
  "38": "250",
  "38.5": "250",
  "39": "255",
  "39.5": "260",
  "40": "265",
  "40.5": "265",
  "41": "270",
  "41.5": "275",
  "42": "280",
};

export const calcSizeShoes = (taille: string) => {
  return sizeShoes[taille];
};

const sizeJeans: Record<string, string> = {
  "32": "24",
  "34": "25",
  "36": "26",
  "38": "27",
  "40": "28",
  "42": "29",
  "44": "30",
  "46": "31",
  "48": "32",
};

export const calcSizeJean = (taille: string) => {
  return sizeJeans[taille];
};