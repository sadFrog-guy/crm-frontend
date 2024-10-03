import { Dispatch, SetStateAction } from "react";

export function withEmptyFieldCheck(
  fn: (value: string, callback: Dispatch<SetStateAction<any>>) => void,
  setIsNameError: Dispatch<SetStateAction<boolean>>,
  setEmptyFieldError: Dispatch<SetStateAction<string>>
) {
  return (value: string, callback: Dispatch<SetStateAction<any>>) => {
    // Проверка на пустое значение
    if (!value.trim()) {
      setEmptyFieldError('Поле не должно быть пустым');
      setIsNameError(true);
    } else {
      setEmptyFieldError('');
      setIsNameError(false);
    }

    // Вызов оригинальной функции, если ошибок нет
    fn(value, callback);
  };
}