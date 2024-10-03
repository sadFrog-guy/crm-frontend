export interface LessonSchedule {
  id: number;
  days_of_week: string[];
  start_time: string;
  end_time: string;
  group: number;
}
