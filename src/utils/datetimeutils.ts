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
const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
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

export const convertTimestampToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = shortMonths[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes();
  const amPm = date.getHours() >= 12 ? "PM" : "AM";

  return `${day}-${month}-${year}, ${hours}:${minutes} ${amPm}`;
};
