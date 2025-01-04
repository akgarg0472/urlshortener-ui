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

export const convertUtcTimeStringToLocalTime = (utcString: string): string => {
  const utcDate = new Date(utcString);

  const day = utcDate.getDate().toString().padStart(2, "0");
  const month = utcDate.toLocaleString("en-US", { month: "short" });
  const year = utcDate.getFullYear();
  const hours = utcDate.getHours() % 12 || 12;
  const minutes = utcDate.getMinutes().toString().padStart(2, "0");
  const ampm = utcDate.getHours() >= 12 ? "PM" : "AM";

  return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
};

export const getCurrentDateTime = (): string => {
  const currentDate = new Date();
  const day = daysOfWeek[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

export const convertTimestampToDateAndShortMonth = (
  timestamp: number
): string => {
  const date = new Date(timestamp);
  const month = shortMonths[date.getMonth()];
  return `${date.getDate()} ${month}`;
};

export const convertTimestampToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = shortMonths[date.getMonth()];
  const year = date.getFullYear();
  const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = date.getHours() >= 12 ? "PM" : "AM";
  return `${day}-${month}-${year}, ${hours}:${minutes} ${amPm}`;
};

export const getCurrentDayStartTimeInMs = (): number => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate.getTime();
};

export const getOneWeekOldTimeInMsFromCurrentDate = (): number => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const oneWeekAgoTimestamp = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
  return oneWeekAgoTimestamp;
};

export const getUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e: any) {
    return "UTC";
  }
};
