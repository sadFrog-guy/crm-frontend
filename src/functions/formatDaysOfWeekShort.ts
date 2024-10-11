const shortDayNames: { [key: string]: string } = {
  Понедельник: "Пн",
  Вторник: "Вт",
  Среда: "Ср",
  Четверг: "Чт",
  Пятница: "Пт",
  Суббота: "Сб",
  Воскресенье: "Вс",
};

export function formatDaysOfWeekShort(daysOfWeek: string[]): string {
  return daysOfWeek.map((day) => shortDayNames[day] || day).join(", ");
}
