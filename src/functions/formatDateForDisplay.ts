export default function formatDateForDisplay(date: string | null) {
  if (date === null) {
    return date;
  } else {
    const [year, monthNumber, day] = date.split("-");
    const months = [
      "янв.",
      "февр.",
      "март",
      "апр.",
      "май",
      "июнь",
      "июль",
      "авг.",
      "сент.",
      "окт.",
      "нояб.",
      "дек.",
    ];
    const monthIndex = parseInt(monthNumber) - 1;

    return `${day} ${months[monthIndex]} ${year} г.`;
  }
}
