import {
    CalendarDate,
    getLocalTimeZone,
    parseDate,
    today,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

/*
    * @module utils/dates
    * @requires react
    * @requires internationalized/date
    * @requires react-aria/i18n
    */
// Dev Note: I think this might return the Server Time, not the clients time.
// validate the date object or string
const validateDate = (date: CalendarDate): boolean => {
    if (date === null || date === undefined || date instanceof CalendarDate === false) {
        return false;
    }
    return true;
};
// This function will return the current date and time in the local time zone
const CreateDate = (): CalendarDate => {
    const date = today(getLocalTimeZone());
    if (!validateDate(date)) {
        throw new Error("Unable to create the date");
    }
    return date;
};
// This function will return the current date as a string in the local time zone
const FormatDate = (date: string | CalendarDate): string => {
    const caldate: CalendarDate = date instanceof CalendarDate ? date : parseDate(date);
    if (!validateDate(caldate)) {
        throw new Error("Invalid date input, if you are using a string make sure it is in the format 'YYYY-MM-DD'");
    }
    const dateFormatter = useDateFormatter({ dateStyle: "long" });
    return dateFormatter.format(caldate.toDate(getLocalTimeZone()));
};

const DateParts = (date: string | CalendarDate): Intl.DateTimeFormatPart[] => {
    const caldate: CalendarDate = date instanceof CalendarDate ? date : parseDate(date);
    if (!validateDate(caldate)) {
        throw new Error("Invalid date input, if you are using a string make sure it is in the format 'YYYY-MM-DD'");
    };
    const dateFormatter = useDateFormatter({ dateStyle: "long" });
    return dateFormatter.formatToParts(caldate.toDate(getLocalTimeZone()));
};

const DateMonthDay = (date: string | CalendarDate): string[] => {
    const caldate: CalendarDate = date instanceof CalendarDate ? date : parseDate(date);
    if (!validateDate(caldate)) {
        throw new Error("Invalid date input, if you are using a string make sure it is in the format 'YYYY-MM-DD'");
    };
    const month = DateParts(caldate)[0].value.slice(0, 3).toLocaleUpperCase();
    const day = caldate.day.toString();
    return [month, day];
};

export { CreateDate, FormatDate, DateParts, DateMonthDay };