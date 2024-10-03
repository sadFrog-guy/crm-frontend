export interface WorkSchedule {
  id: number;
  days_of_week: string[];
  start_time: string;
  end_time: string;
  teacher: number;
}