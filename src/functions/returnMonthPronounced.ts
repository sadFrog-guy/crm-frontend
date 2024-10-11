export default function returnMonthPronounced(month: number): string {
  const lastTwoDigits = month % 100;
  const lastDigit = month % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${month} месяцев`;
  }

  switch (lastDigit) {
    case 1:
      return `${month} месяц`;
    case 2:
    case 3:
    case 4:
      return `${month} месяца`;
    default:
      return `${month} месяцев`;
  }
}
