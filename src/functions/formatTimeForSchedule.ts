import { addLeadingZero } from "./addLeadingZero";

export function formatTimeForSchedule(hours, minutes, seconds) {
  const h = addLeadingZero(hours);
  const m = addLeadingZero(minutes);
  const s = addLeadingZero(seconds);

  return `${h}:${m}:${s}`;
}
