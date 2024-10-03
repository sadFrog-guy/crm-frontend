export function formatTime(time: string): string {
  return time.slice(0, 5); // Extracts HH:MM from HH:MM:SS
}