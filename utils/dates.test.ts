import {
    CalendarDate,
    getLocalTimeZone,
    parseDate,
    today,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { CreateDate, FormatDate, DateParts, DateMonthDay } from "./dates";

// Mocking the necessary functions
jest.mock("@internationalized/date", () => ({
    CalendarDate: jest.fn(),
    getLocalTimeZone: jest.fn(),
    parseDate: jest.fn(),
    today: jest.fn(),
}));

jest.mock("@react-aria/i18n", () => ({
    useDateFormatter: jest.fn(),
}));

describe("dates utility functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("CreateDate should return the current date", () => {
        const mockDate = new CalendarDate(2025, 3, 14);
        today.mockReturnValue(mockDate);
        getLocalTimeZone.mockReturnValue("America/New_York");

        const result = CreateDate();
        expect(result).toBe(mockDate);
    });

    test("FormatDate should return a formatted date string", () => {
        const mockDate = new CalendarDate(2025, 3, 14);
        parseDate.mockReturnValue(mockDate);
        getLocalTimeZone.mockReturnValue("America/New_York");
        useDateFormatter.mockReturnValue({
            format: jest.fn().mockReturnValue("March 14, 2025"),
        });

        const result = FormatDate("2025-03-14");
        expect(result).toBe("March 14, 2025");
    });

    test("DateParts should return date parts", () => {
        const mockDate = new CalendarDate(2025, 3, 14);
        parseDate.mockReturnValue(mockDate);
        getLocalTimeZone.mockReturnValue("America/New_York");
        useDateFormatter.mockReturnValue({
            formatToParts: jest.fn().mockReturnValue([
                { type: "month", value: "March" },
                { type: "day", value: "14" },
                { type: "year", value: "2025" },
            ]),
        });

        const result = DateParts("2025-03-14");
        expect(result).toEqual([
            { type: "month", value: "March" },
            { type: "day", value: "14" },
            { type: "year", value: "2025" },
        ]);
    });

    test("DateMonthDay should return month and day", () => {
        const mockDate = new CalendarDate(2025, 3, 14);
        parseDate.mockReturnValue(mockDate);
        getLocalTimeZone.mockReturnValue("America/New_York");
        useDateFormatter.mockReturnValue({
            formatToParts: jest.fn().mockReturnValue([
                { type: "month", value: "March" },
                { type: "day", value: "14" },
                { type: "year", value: "2025" },
            ]),
        });

        const result = DateMonthDay("2025-03-14");
        expect(result).toEqual(["MAR", "14"]);
    });
});