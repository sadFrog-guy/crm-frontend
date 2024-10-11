import { Dispatch, SetStateAction } from "react";

export function withPhoneNumberCheck(
  fn: (value: string, callback: Dispatch<SetStateAction<any>>) => void,
  setIsPhoneError: Dispatch<SetStateAction<boolean>>,
  setPhoneError: Dispatch<SetStateAction<string>>,
) {
  return (value: string, callback: Dispatch<SetStateAction<any>>) => {
    const phoneRegex = /^\d{3}\d{2}\d{2}\d{2}$/;

    if (!phoneRegex.test(value)) {
      setPhoneError('Неверный формат номера. Ожидается "nnn-nn-nn-nn"');
      setIsPhoneError(true);
    } else {
      setPhoneError("");
      setIsPhoneError(false);
    }

    fn(value, callback);
  };
}
