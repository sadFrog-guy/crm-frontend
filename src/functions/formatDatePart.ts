export default function formatDatePart(num: number): string {
  return num.toString().padStart(2, "0");
}
