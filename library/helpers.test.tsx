import { uniqueName } from './helpers';
import { describe, it, expect } from '@jest/globals';

// test the uniqueName function
describe('uniqueName', () => {
    it('should return a string of the length given', () => {
        expect(uniqueName(4).length).toBe(4);
    });
    it('should return a unique string', () => {
        expect(uniqueName(4)).not.toBe(uniqueName(4));
    });
    it('should return a string that only contains letters and numbers', () => {
        expect(uniqueName(4)).toMatch(/^[A-Za-z0-9]+$/);
    });
});

