export default function shortenString(value: string): string {
  return value.length >= 18 ? value.slice(0, 15) + "..." : value;
}
