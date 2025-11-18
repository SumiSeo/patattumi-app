export const calcKoreanAge = (birth: string) => {
  const birthday = new Date(birth);
  const birthYear = birthday.getFullYear();
  const birthMonth = birthday.getMonth() + 1;
  const birthDate = birthday.getDate();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();

  if (birthYear >= currentYear) return { koreanAge: "", frenchAge: "" };

  const koreanAge = currentYear - birthYear + 1;

  let frenchAge = currentYear - birthYear;
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate < birthDate)
  ) {
    frenchAge--;
  }

  return { koreanAge: koreanAge + "", frenchAge: frenchAge + "" };
};