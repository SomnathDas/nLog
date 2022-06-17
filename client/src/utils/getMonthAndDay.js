import dayjs from "dayjs";

const getMonthAndDay = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const current_year = dayjs(date).year();
  const current_month = months[dayjs(date).month()];
  const current_day = dayjs(date).$D;
  return [current_day, current_month, current_year];
};

export default getMonthAndDay;
