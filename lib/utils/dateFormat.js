import { formatInTimeZone } from "date-fns-tz";

export const dateFormat = (date) => {
  return formatInTimeZone(date, "America/New_York", "dd MMM yyyy");
};
