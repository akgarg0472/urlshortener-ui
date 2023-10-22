const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

export const getCurrentDateTime = (): string => {
  const currentDate = new Date();
  const day = daysOfWeek[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

export const convertTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const month = months[date.getMonth()];

  return `${date.getDate()} ${month}`;
};
