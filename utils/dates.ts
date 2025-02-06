/** @file 
 * Helper file for date data
 * Get todays date UTC
 * Transform string date to UTC
 * Transform UTC to string date
 * Get difference between two dates
 */

// This function will get the current date
const currentDate = (): Date => {
    return new Date();
}

// Transform String Date into Date
const stringToDate = (date: string): Date => {
    return new Date(date);
}

// Transform Date into string
const displayDate = (date: Date): string => {
    return date.toDateString();
} 

// Transform Date into UTC
const storeDate = (date: Date): string => {
    return date.toUTCString();
} 

// Get the difference between two dates in days
function getDifferenceInDays(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
}

// Find the difference between todays date and a given date in days
const dateDifference = (date: Date): number => {
    return getDifferenceInDays(currentDate(), date);
}


export { currentDate, stringToDate, displayDate, storeDate, dateDifference};

