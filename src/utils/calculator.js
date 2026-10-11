const operators = new Set(['+', '-', '×', '÷']);
export function calculate(a, operator, b) {
  const x = Number(a), y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error('Invalid number');
  let result;
  switch (operator) {
    case '+': result = x + y; break;
    case '-': result = x - y; break;
    case '×': result = x * y; break;
    case '÷': if (y === 0) throw new Error('Cannot divide by zero'); result = x / y; break;
    default: throw new Error('Unknown operation');
  }
  if (!Number.isFinite(result)) throw new Error('Result is too large');
  return Number(result.toPrecision(12));
}
export function applyPercent(value) { return Number((Number(value) / 100).toPrecision(12)); }
export function isOperator(value) { return operators.has(value); }
export function formatDisplay(value) {
  if (value === 'Error' || value === '-' || value === '') return value || '0';
  const [whole, fractional] = String(value).split('.');
  const formatted = Number(whole).toLocaleString('en-US');
  return fractional === undefined ? formatted : `${formatted}.${fractional}`;
}
