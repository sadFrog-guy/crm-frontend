export interface Group {
    id: number,
    name: string,
    status: "Активна" | "Набор открыт" | "Завершена",
    start_date: string,
    end_date: string,
    duration_months: number,
    max_students: number,
    branch: number,
}