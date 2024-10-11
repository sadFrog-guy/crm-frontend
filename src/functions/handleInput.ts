import { CalendarDate, parseDate } from "@internationalized/date";
import { Dispatch, SetStateAction } from "react";

import formatDate from "./formatDate";
import formatDatePart from "./formatDatePart";

export default function handleInput(
  e: React.ChangeEvent<Element> | CalendarDate | string,
  callback: Dispatch<SetStateAction<any>>,
) {
  if (typeof e === "string") {
    callback(e);
  } else if (e.hasOwnProperty("target")) {
    const event = e as React.ChangeEvent<HTMLSelectElement>;

    callback(event.target.value);
  } else if (e.hasOwnProperty("calendar")) {
    const event = e as CalendarDate;
    const year = event.year;
    const month = formatDatePart(event.month);
    const day = formatDatePart(event.day);
    const date = parseDate(formatDate(year, month, day));

    callback(date);
  }
}
