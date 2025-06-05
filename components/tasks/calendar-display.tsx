import React from "react";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
interface DueDateProps {
  anydate?: string | CalendarDate;
}
const CalendarDisplay: React.FC<DueDateProps> = ({ anydate }) => {
  let caldate: CalendarDate;
  if (anydate instanceof CalendarDate) {
    caldate = anydate;
  } else if (typeof anydate === "string") {
    caldate = parseDate(anydate);
  } else {
    caldate = today(getLocalTimeZone());
  }
  const [date] = React.useState(caldate);
  const formatParts = useDateFormatter({ dateStyle: "long" }).formatToParts(
    date.toDate(getLocalTimeZone())
  );
  const formatShortMonth =
    formatParts[0].type === "month"
      ? formatParts[0].value.slice(0, 3).toLocaleUpperCase()
      : "NA";
  const formatDay = formatParts[2].type === "day" ? formatParts[2].value : "00";
  return (
    <div className="flex gap-1">
      <div className="bg-primary-200 text-white text-sm rounded-lg text-center pt-2 pb-1 px-3 size-fit">
        <span className="font-semibold text-[.6rem] block leading-tight">
          {formatShortMonth}
        </span>
        <span className="font-bold text-[1rem]">{formatDay}</span>
      </div>
    </div>
  );
};
export default CalendarDisplay;
