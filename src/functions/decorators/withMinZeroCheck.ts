import { CalendarDate } from "@internationalized/date";
import { Dispatch, SetStateAction } from "react";

export default function withMinZeroCheck(
  fn: (e: React.ChangeEvent<Element> | CalendarDate | string, callback: Dispatch<SetStateAction<any>>) => void,
  setIsMinZeroError: Dispatch<SetStateAction<boolean>>,
  setMinZeroError: Dispatch<SetStateAction<string>>
) {
  return (e: React.ChangeEvent<Element> | CalendarDate | string, callback: Dispatch<SetStateAction<any>>) => {
    if (typeof e === 'string') {
      const numberValue = Number(e);
      console.log(numberValue)
      
      // Проверяем, является ли строка числом и меньше ли оно нуля
      if (!isNaN(numberValue) && numberValue < 1) {
        setIsMinZeroError(true);
        setMinZeroError('Значение должно быть больше нуля');
      } else {
        setIsMinZeroError(false);
        setMinZeroError('');
      }
    }

    fn(e, callback);
  };
}