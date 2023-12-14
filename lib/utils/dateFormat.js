import { formatInTimeZone } from "date-fns-tz";

export const dateFormat = (date, format) => {
  if (!date) return "";
  return formatInTimeZone(
    date,
    "America/New_York",
    format ? format : "dd MMM yyyy",
  );
};
