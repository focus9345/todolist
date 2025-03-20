'use client';
import React from "react";
import {
    CalendarDate,
    getLocalTimeZone,
    parseDate,
    today,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

/** @file 
 * Helper file for date data
 * Get more information about the date object https://react-spectrum.adobe.com/internationalized/date/index.html
 * Note that the date object is a CalendarDate object
 * This Wont work it calls the date object over and over again!
 * @module utils/dates
 * @requires react
 * @requires internationalized/date
 * @requires react-aria/i18n
 */

// This function will return the current date and time in the local time zone
const CreateDate = (): CalendarDate => {
    const [date, setDate] = React.useState(today(getLocalTimeZone()));
    console.log('Cla' + date);
    React.useEffect(() => {
        const updateDate = () => {
            const now = today(getLocalTimeZone());
            if (now !== date) {
                setDate(now);
            }
        };
        updateDate();
        const intervalId = setInterval(updateDate, 10800000); // 3 hours
        return () => clearInterval(intervalId); // This is important, clear the interval

    }, [date.day, date.month, date.year]);
    if (date === null || date === undefined || date instanceof CalendarDate === false) {
        throw new Error("Invalid date object, unable to update the date");
    };
    return date;
};

// This function will return an array of date parts for the sent date and time in the local time zone
// string example: "YYYY-MM-DD"
// CalendarDate example: CalendarDate.fromObject({year: 2022, month: 12, day: 31})
// will return https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
const useDailyUpdateParts = (date: string | CalendarDate)  => {

    const caldate: CalendarDate = date instanceof CalendarDate ? date : parseDate(date);
    if (caldate === null || caldate === undefined || caldate instanceof CalendarDate === false) {
        throw new Error("Invalid date object, if you are using a string make sure it is in the format 'YYYY-MM-DD'");
    };
    const dateFormatter = useDateFormatter({ dateStyle: "long" });
    const [dateParts, setDateParts] = React.useState(dateFormatter.formatToParts(caldate.toDate(getLocalTimeZone())));
    
    React.useEffect(() => {
        const updateDateParts = () => {
            // Check if the dateParts has nothing assigned to it
            if (dateParts === null || dateParts === undefined) {
                // Update the date parts
                setDateParts(dateFormatter.formatToParts(caldate.toDate(getLocalTimeZone())));
            }
        };
        updateDateParts();
        const intervalId = setInterval(updateDateParts, 10800000); // 3 hours
        return () => clearInterval(intervalId); // This is important, clear the interval

    }, [caldate.day, dateParts, dateFormatter]);

    return dateParts;
};
export { CreateDate, useDailyUpdateParts };

