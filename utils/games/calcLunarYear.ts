import solarlunar from "solarlunar";

export const lunarBirthdayToSolar = (value: string) => {
  const parsed = new Date(value);
  const converetd = `${parsed.getFullYear()}-${parsed.getMonth()+1}-${parsed.getDate()}`;
  const [year, month, day] = converetd.split("-").map(Number);
  const solar = solarlunar.lunar2solar(year, month, day, false);
  if (solar === -1) return `Cette date lunaire n'existe pas.`;

  return `Votre anniversaire en calendrier solaire est le ${solar.cDay}/${solar.cMonth}/${solar.cYear}.`;
};
