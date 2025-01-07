import timezones from "@/config/timezones.json";
import { getName } from "country-list";

const countryDetector = () => {
  const timezoneToISO = (timeZone) => {
    const tz = timezones?.find((zone) => zone.timeZone === timeZone);
    return tz?.regionCode || "";
  };

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const country = getName(timezoneToISO(timeZone));
  return country;
};

export default countryDetector;
