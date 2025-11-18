export function dateFormatter(date: string) {
  const dateType = new Date(date);
  const year = dateType.getFullYear();
  const month = dateType.getMonth() + 1;
  const day = dateType.getDate();
  const finalFormat = `${day}/${month}/${year}`;
  return finalFormat;
}

export function convertMonth(m: number) {
  return m < 10 ? "0" + m : m + "";
}

export function dateTypeFormatter(date: string) {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6);
  const formatted = `${year}-${month}-${day}`;
  return dateFormatter(formatted);
}
