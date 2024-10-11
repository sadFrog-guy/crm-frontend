import { addLeadingZero } from "./addLeadingZero";

export function formatDateISO(year: string | number, month: string | number, day: string | number): string {
  return `${addLeadingZero(year)}-${addLeadingZero(month)}-${addLeadingZero(day)}`
}