export interface Finance {
  id: number;
  category: 'income' | 'expense';
  type:
    | 'course_payment'
    | 'advance_payment'
    | 'material_sales'
    | 'consultation'
    | 'teacher_salary'
    | 'rent'
    | 'materials_purchase'
    | 'marketing'
    | 'operation'
    | 'it_support'
    | 'stationery'
    | 'taxes';
  name: string;
  amount: string;
  description?: string;
  date: string;
  time?: string;
  student?: number | null;
  teacher?: number | null;
  branch?: number | null;
}