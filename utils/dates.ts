import { CalendarDate } from '@internationalized/date';

/** @file 
 * Helper file for date data
 * Get todays date as a Date object
 * Modify date object to display in different formats
 * Get the difference between two dates in days
 * No Longer used in the project
 */

// This function will get the current date
const todaysDate = (): Date => {
    return new Date();
}

// Get the difference between two dates in days
function getDifferenceInDays(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
}

function convertDateToCalendarDate(date: Date): CalendarDate {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed in Date
    const day = date.getDate();
    return new CalendarDate(year, month, day);
  }

// Closure approach to modifying the date
const dateModifier = (date: Date | string | number ) => {
    const currentDate: Date = new Date(date);
    const today: Date = todaysDate();
    return {
        dateString: () => currentDate.toDateString(), // Display date as string - Expected output: "Wed Jul 28 2020"
        dateUTC: () => currentDate.toUTCString(), // Display date as UTC
        dateObject: () => currentDate, // Display date as object
        dateISO: () => currentDate.toISOString(), // Display date as ISO
        dateLocale: () => currentDate.toLocaleDateString(), // Display date as locale
        dateDifference: () => getDifferenceInDays(currentDate, today), // Get difference between two dates
        addDays: (days: number) => {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        convertDateToCalendarDate: () => convertDateToCalendarDate(currentDate),
        };
    }

export { todaysDate, dateModifier, getDifferenceInDays, convertDateToCalendarDate };

