export function formatMoney(amount, currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
}
export function formatRate(rate) { return Number(rate).toLocaleString('en-US', { maximumFractionDigits: 6 }); }
export function formatDate(iso) { return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); }
