import formatDate from "./formatDate";
import formatDatePart from "./formatDatePart";

export default function returnCurrentDate() {
  let now = new Date();
  const year = now.getFullYear();
  const month = formatDatePart(now.getMonth() + 1);
  const day = formatDatePart(now.getDate());
  const date = formatDate(year, month, day);

  return date;
}
