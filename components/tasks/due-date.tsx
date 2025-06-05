import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { cn } from "../../utils/clsxtw";
interface DueDateProps {
  duedate?: Date | string | CalendarDate;
}
const DueDate: React.FC<DueDateProps> = ({ duedate }) => {
  const [date] = React.useState(today(getLocalTimeZone()));
  const [dueDate, setDueDate] = React.useState<CalendarDate | null>(null);
  const [daysLeft, setDaysLeft] = React.useState<number>();
  const formatted = useDateFormatter({ dateStyle: "full" });

  React.useEffect(() => {
    if (duedate) {
      let calendar: Date;
      if (duedate instanceof Date) {
        calendar = duedate;
      } else if (typeof duedate === "string") {
        calendar = new Date(duedate);
      } else if (duedate) {
        calendar = duedate.toDate(getLocalTimeZone());
      } else {
        throw new Error("Invalid duedate type");
      }
      const day = calendar.getDate();
      const month = calendar.getMonth() + 1; // Months are zero-based
      const year = calendar.getFullYear();
      const dateDate: CalendarDate = new CalendarDate(year, month, day);
      setDueDate(dateDate);
    }
  }, [duedate]);
  React.useEffect(() => {
    if (dueDate) {
      const dateLeft: number = dueDate.compare(date);
      setDaysLeft(dateLeft);
    } else {
      setDaysLeft(0);
    }
  }, [date, dueDate]);

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <button
            className={cn(
              (daysLeft ?? 0) < 0 ? "bg-red-800" : "bg-primary-300",
              "text-white hover:text-primary-800 focus:outline-none rounded-full py-2 px-3 text-lg font-semibold leading-none"
            )}
          >
            {Math.abs(daysLeft ?? 0)}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            (daysLeft ?? 0) < 0 ? "bg-red-800" : "bg-primary-300",
            "text-zinc-300"
          )}
        >
          <p className="text-tiny">
            {Math.abs(daysLeft ?? 0)}
            {daysLeft && daysLeft < 0 ? " Days Overdue - " : " Days Left - "}
            {dueDate
              ? formatted.format(dueDate.toDate(getLocalTimeZone()))
              : ""}
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DueDate;
