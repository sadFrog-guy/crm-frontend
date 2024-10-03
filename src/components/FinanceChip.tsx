import { Chip } from '@nextui-org/chip';

interface FinanceChipProps {
  value: string;
}

const financeTypes = {
  course_payment: 'Оплата за обучение',
  advance_payment: 'Авансовый платеж',
  material_sales: 'Продажа учебных материалов',
  consultation: 'Платные консультации',
  teacher_salary: 'Зарплата преподавателям',
  rent: 'Аренда помещения',
  materials_purchase: 'Закупка учебных материалов',
  marketing: 'Маркетинг и реклама',
  operation: 'Операционные расходы',
  it_support: 'Техническое обслуживание и IT',
  stationery: 'Покупка канцелярии',
  taxes: 'Налоги и сборы',
  income: 'Доход',
  expense: 'Расход',
} as const;

type FinanceTypeKeys = keyof typeof financeTypes;

const getColorByValue = (value: FinanceTypeKeys): 'primary' | 'secondary' | 'warning' | 'success' | 'danger' => {
  switch (value) {
    case 'course_payment':
    case 'advance_payment':
    case 'income':
      return 'success';
    case 'teacher_salary':
    case 'rent':
    case 'taxes':
    case 'expense':
      return 'danger';
    case 'marketing':
    case 'operation':
    case 'it_support':
      return 'warning';
    case 'materials_purchase':
    case 'stationery':
      return 'secondary';
    default:
      return 'primary';
  }
};

export default function FinanceChip({ value }: FinanceChipProps) {
  const label = financeTypes[value as FinanceTypeKeys] || value;
  return (
    <Chip size="sm" variant="flat" color={getColorByValue(value as FinanceTypeKeys)}>
      {label}
    </Chip>
  );
}
