import uniqueName from './uniqueName';

describe('uniqueName', () => {
    test('should generate a string of the specified length', () => {
        const length = 10;
        const result = uniqueName(length);
        expect(result).toHaveLength(length);
    });

    test('should generate a string containing only alphanumeric characters', () => {
        const length = 20;
        const result = uniqueName(length);
        const alphanumericRegex = /^[A-Za-z0-9]+$/;
        expect(result).toMatch(alphanumericRegex);
    });

    test('should generate different strings for subsequent calls', () => {
        const length = 15;
        const result1 = uniqueName(length);
        const result2 = uniqueName(length);
        expect(result1).not.toBe(result2);
    });

    test('should return an empty string if length is 0', () => {
        const length = 0;
        const result = uniqueName(length);
        expect(result).toBe('');
    });
});