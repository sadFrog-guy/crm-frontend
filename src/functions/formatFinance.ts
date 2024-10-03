export default function formatFinance(value: number): string {
  return value.toLocaleString('de-DE') + ' сом';
}