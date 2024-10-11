export default function formatDate(
  year: string | number,
  month: string | number,
  day: string | number,
): string {
  return `${year}-${month}-${day}`;
}
