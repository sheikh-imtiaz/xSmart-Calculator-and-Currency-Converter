const BASE = 'https://api.frankfurter.dev/v2';
export const FALLBACK_CURRENCIES = [
  ['NZD','New Zealand Dollar'], ['USD','US Dollar'], ['BDT','Bangladeshi Taka'],
  ['AUD','Australian Dollar'], ['EUR','Euro'], ['GBP','British Pound'],
  ['CAD','Canadian Dollar'], ['INR','Indian Rupee'], ['JPY','Japanese Yen'],
  ['SGD','Singapore Dollar'], ['CHF','Swiss Franc'], ['CNY','Chinese Yuan']
].map(([code,name]) => ({code,name}));
async function request(path, signal) {
  const response = await fetch(`${BASE}${path}`, { signal });
  if (!response.ok) throw new Error(`Exchange-rate service unavailable (${response.status}). Please try again.`);
  return response.json();
}
export async function getCurrencies(signal) {
  const data = await request('/currencies', signal);
  if (!Array.isArray(data)) throw new Error('Unexpected currency list');
  return data.map(item => ({code:item.iso_code, name:item.name})).filter(item => item.code && item.name).sort((a,b)=>a.code.localeCompare(b.code));
}
export async function getExchangeRate(from, to, signal) {
  if (from === to) return {rate:1,date:new Date().toISOString().slice(0,10),sameCurrency:true};
  const data = await request(`/rate/${encodeURIComponent(from.toLowerCase())}/${encodeURIComponent(to.toLowerCase())}`, signal);
  if (!Number.isFinite(data.rate) || data.rate <= 0) throw new Error('No rate available for this currency pair.');
  return {rate:data.rate,date:data.date,sameCurrency:false};
}
