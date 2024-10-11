import { CalendarDate } from "@internationalized/date";

export interface Finance {
  id?: number;
  category: "Доход" | "Расход";
  type:
    | "Оплата за обучение"
    | "Авансовый платеж"
    | "Продажа учебных материалов"
    | "Зарплата преподавателям"
    | "Зарплата сотруднику"
    | "Аренда помещения"
    | "Закупка учебных материалов"
    | "Маркетинг и реклама"
    | "Операционные расходы"
    | "Техническое обслуживание и IT"
    | "Покупка канцелярии"
    | "Налоги и сборы";
  name: string;
  amount: string;
  description?: string;
  date?: string | CalendarDate;
  time?: string;
  student?: number | null;
  teacher?: number | null;
  branch?: number | null;
}
