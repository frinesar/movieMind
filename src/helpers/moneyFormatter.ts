export function formatMoney(num: number | string): string {
  const numberValue = Number(num);
  if (isNaN(numberValue) || num === "" || num === null) {
    throw new Error("Invalid input: must be a valid number");
  }
  return numberValue.toLocaleString("en-US").replace(/,/g, " ");
}
