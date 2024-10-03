import { Chip } from '@nextui-org/chip';

interface PositionChipProps {
  position: "Группа" | "Ученик" | "Педагог" | "Урок";
}

export default function PositionChip({ position }: PositionChipProps) {
  const colorMap: Record<PositionChipProps['position'], "primary" | "success" | "secondary" | "warning"> = {
    "Группа": "primary",
    "Ученик": "primary",
    "Педагог": "secondary",
    "Урок": "secondary",
  };

  return (
    <Chip className="capitalize" color={colorMap[position]} size="sm" variant="solid">
      {position}
    </Chip>
  );
}