import { cn } from './clsxtw';

// filepath: /Users/joshuaconnor/Local Projects/Personal/todolist/utils/clsxtw.test.ts

describe('cn utility function', () => {
  it('should merge multiple class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should merge class names with tailwind classes', () => {
    const result = cn('class1', 'bg-red-500', 'text-white');
    expect(result).toBe('class1 bg-red-500 text-white');
  });

  it('should handle undefined and null values', () => {
    const result = cn('class1', undefined, null, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should merge duplicate class names correctly', () => {
    const result = cn('class1', 'class1', 'class2');
    expect(result).toBe('class1 class2');
  });
});