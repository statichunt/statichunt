import { format } from "date-fns";

export const dateFormat = (date, pattern = "dd MMM, yyyy") => {
  if (!date) return "";
  const dateObj = new Date(date);
  const output = format(dateObj, pattern);
  return output;
};
