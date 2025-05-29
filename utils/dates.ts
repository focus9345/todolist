import { DateValue } from "@heroui/react";
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
* TODO: consider using  closures and higher order functions to create a more functional approach
* TODO: simplify the error handling and validation 
*/
//! Dev Note: I think this might return the Server Time, not the clients time.
// validate the date object or string specific for HeroUI 
// see documentation: https://www.heroui.com/docs/components/date-input
// see internationalized: https://react-spectrum.adobe.com/internationalized/date/CalendarDate.html
// Calendar Dates must be DateValue
// This utility should help transforming and validating dates for use with HeroUI components.

const ensureDateStringFormat = (date: string): string => {
    const formattedDate = new Date(date), 
    year = formattedDate.getFullYear();
    let month = "" + (formattedDate.getMonth() + 1),
    day = "" + formattedDate.getDate();
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }
    return [year, month, day].join("-"); // returns YYYY-MM-DD
};

// This function will validate the date object or string specific for HeroUI
const isValidateDate = (date: CalendarDate | DateValue | Date): boolean => {
    if (date === null || date === undefined) {
        throw new Error("Unable to create the date, no date was provided");
    }
    if (typeof date === "string" || date instanceof CalendarDate === false || date instanceof Date === true) {
        return false;
    }
    return true;
};
// This function will return the current date and time in the local time zone
const CreateDate = (): DateValue  => {
    const date: DateValue = today(getLocalTimeZone());
    if (!isValidateDate(date)) {
        throw new Error("Unable to create the date, please check the date input");
    }
    return date;
};
// This function will return the current date as a string in the local time zone
const FormatDate = (date: string | DateValue | Date | CalendarDate): string => {
    if(date === null || date === undefined) {
        throw new Error("Unable to create the date, no date was provided");
    }
    const parsedDate = parseDate(typeof date === "string" ? date : date.toString());
    if (!(parsedDate)) {
        throw new Error("Invalid date input, expected a CalendarDate or compatible type.");
    }
    const caldate: DateValue = parsedDate;
    if (!isValidateDate(caldate)) {
        throw new Error("Invalid date input, if you are using a string make sure it is in the format 'YYYY-MM-DD'");
    }
    const dateFormatter = useDateFormatter({ dateStyle: "long" });
    return dateFormatter.format(caldate.toDate(getLocalTimeZone()));
};

const DateParts = (date: string | CalendarDate): Intl.DateTimeFormatPart[] => {
    const caldate: CalendarDate = date instanceof CalendarDate ? date : parseDate(date);
    if (!isValidateDate(caldate)) {
        throw new Error("Invalid date input, if you are using a string make sure it is in the format 'YYYY-MM-DD'");
    };
    const dateFormatter = useDateFormatter({ dateStyle: "long" });
    return dateFormatter.formatToParts(caldate.toDate(getLocalTimeZone()));
};

const DueDateDefault = (): DateValue => {
    const date = CreateDate();
    const duedate: DateValue = date.add({ days: 7 }) as DateValue;
    if (!isValidateDate(duedate)) {
        throw new Error("Unable to create the date");
    }
    return duedate;
};
const DateString = (date: string | CalendarDate | DateValue | Date): string => {
    if (date === null || date === undefined) {
        throw new Error("Unable to create the date, no date was provided");
    }
    const caldate: string = ensureDateStringFormat(typeof date === "string" ? date : date.toString());
    if (typeof caldate !== "string") {
        throw new Error("Invalid date input, expected a string");
    };
    return caldate; // returns 2022-02-22
};
const DateMonthDay = (date: string | CalendarDate | DateValue | Date): string[] => {
    if (date === null || date === undefined) {
        throw new Error("Unable to create the date, no date was provided");
    }
    const jsDate = date instanceof CalendarDate ? date.toDate(getLocalTimeZone()) : new Date(typeof date === "string" ? date : date.toString());
    const month = jsDate.toLocaleString("default", { month: "short" }).toUpperCase();
    const day = jsDate.getDate().toString();
    // const calendarDateFormated: CalendarDate = new CalendarDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
    // //const parsedDate = parseDate(typeof date === "string" ? date : date.toString());
    // if (!(calendarDateFormated)) {
    //     throw new Error("Invalid date input, expected a CalendarDate or compatible type.");
    // }
    // const caldate: CalendarDate = date instanceof CalendarDate ? date : parseDate(typeof date === "string" ? date : "");
    // if (!validateDate(caldate)) {
    //     throw new Error("Invalid date input, if you are using a string make sure it is in the format 'YYYY-MM-DD'");
    // };
    // const month = DateParts(caldate)[0].value.slice(0, 3).toLocaleUpperCase();
    // const day = caldate.day.toString();
    return [month, day];
};

export { CreateDate, FormatDate, DateParts, DateMonthDay, DueDateDefault, DateString, ensureDateStringFormat };