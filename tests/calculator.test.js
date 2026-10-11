import { describe, expect, it } from 'vitest';
import { applyPercent, calculate, formatDisplay, isOperator } from '../src/utils/calculator';
describe('calculator engine',()=>{
 it('handles four operations',()=>{expect(calculate(8,'+',2)).toBe(10);expect(calculate(8,'-',2)).toBe(6);expect(calculate(8,'×',2)).toBe(16);expect(calculate(8,'÷',2)).toBe(4);});
 it('prevents divide by zero',()=>expect(()=>calculate(1,'÷',0)).toThrow('Cannot divide by zero'));
 it('handles decimal precision',()=>expect(calculate(.1,'+',.2)).toBe(.3));
 it('supports percent',()=>expect(applyPercent(25)).toBe(.25));
 it('formats the display',()=>expect(formatDisplay('12345.67')).toBe('12,345.67'));
 it('validates operators',()=>{expect(isOperator('×')).toBe(true);expect(isOperator('7')).toBe(false);});
});
