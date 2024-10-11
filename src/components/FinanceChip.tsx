import { Chip } from "@nextui-org/chip";

interface FinanceChipProps {
  value: string;
}

const financeTypes = {
  course_payment: "Оплата за обучение",
  advance_payment: "Авансовый платеж",
  material_sales: "Продажа учебных материалов",
  consultation: "Платные консультации",
  teacher_salary: "Зарплата преподавателям",
  rent: "Аренда помещения",
  materials_purchase: "Закупка учебных материалов",
  marketing: "Маркетинг и реклама",
  operation: "Операционные расходы",
  it_support: "Техническое обслуживание и IT",
  stationery: "Покупка канцелярии",
  taxes: "Налоги и сборы",
  income: "Доход",
  expense: "Расход",
} as const;

type FinanceTypeKeys = keyof typeof financeTypes;

const getColorByLabel = (
  label: string,
): "primary" | "secondary" | "warning" | "success" | "danger" => {
  switch (label) {
    case "Оплата за обучение":
    case "Авансовый платеж":
    case "Доход":
      return "success";
    case "Зарплата преподавателям":
    case "Аренда помещения":
    case "Налоги и сборы":
    case "Расход":
      return "danger";
    case "Маркетинг и реклама":
    case "Операционные расходы":
    case "Техническое обслуживание и IT":
      return "warning";
    case "Закупка учебных материалов":
    case "Покупка канцелярии":
      return "secondary";
    default:
      return "primary";
  }
};

export default function FinanceChip({ value }: FinanceChipProps) {
  const label = financeTypes[value as FinanceTypeKeys] || value; // Получаем соответствующий текст

  return (
    <Chip color={getColorByLabel(label)} size="sm" variant="flat">
      {label}
    </Chip>
  );
}
