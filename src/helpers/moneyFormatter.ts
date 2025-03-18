export function formatMoney(num: number | string): string {
  // Преобразуем в число и проверяем на валидность
  const numberValue = Number(num);
  if (isNaN(numberValue) || num === "" || num === null) {
    throw new Error("Invalid input: must be a valid number");
  }

  // Форматируем число с удалением ведущих нулей
  return numberValue.toLocaleString("en-US").replace(/,/g, " ");
}
