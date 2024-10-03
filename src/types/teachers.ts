import { Gender } from "./gender";

export interface Teacher {
  id: number;
  group: number;
  branch: number;
  sex: Gender;
  status: "Уволен" |
          "На отпуске" |
          "Работает";
  name: string;
  surname: string;
  phone: string;
  whatsapp: string;
  description: string;
  salary_rate: string;
  start_date: string;
  next_payment_date: string;
}