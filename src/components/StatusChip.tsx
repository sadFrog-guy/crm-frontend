import { Chip } from "@nextui-org/chip";

interface StatusChipProps {
  status:
    | "Активна"
    | "Завершена"
    | "Набор открыт"
    | "Учится"
    | "На отпуске"
    | "Бросил"
    | "Закончил"
    | "Скоро закончит"
    | "Оплата просрочена"
    | "Уволен"
    | "На отпуске"
    | "Работает";
}

export default function StatusChip({ status }: StatusChipProps) {
  const colorMap: Record<
    StatusChipProps["status"],
    "success" | "default" | "primary" | "secondary" | "warning" | "danger"
  > = {
    Активна: "success",
    Учится: "success",
    "На отпуске": "warning",
    Бросил: "danger",
    Закончил: "primary",
    "Скоро закончит": "secondary",
    "Оплата просрочена": "danger",
    Завершена: "default",
    "Набор открыт": "warning",
    Уволен: "danger",
    Работает: "success",
  };

  return (
    <Chip
      className="capitalize"
      color={colorMap[status]}
      size="sm"
      variant="flat"
    >
      {status}
    </Chip>
  );
}
