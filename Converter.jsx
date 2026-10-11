import { useEffect, useMemo, useState } from 'react';
import { ArrowDownUp, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { FALLBACK_CURRENCIES, getCurrencies, getExchangeRate } from '../services/exchange';
import { formatMoney, formatRate } from '../utils/format';
export default function Converter({onSave}) {
  const [currencies,setCurrencies] = useState(FALLBACK_CURRENCIES);
  const [from,setFrom] = useState('NZD'); const [to,setTo] = useState('BDT');
  const [amount,setAmount] = useState('100');const [rateInfo,setRateInfo] = useState(null);
  const [loading,setLoading] = useState(false);const [error,setError] = useState('');
  const [refresh,setRefresh] = useState(0);
  useEffect(()=>{const controller = new AbortController();getCurrencies(controller.signal).then(setCurrencies).catch(()=>{});return ()=>controller.abort();},[]);
  useEffect(()=>{
    const controller = new AbortController();setLoading(true);setError('');setRateInfo(null);
    getExchangeRate(from,to,controller.signal).then(setRateInfo).catch(err=>{if(err.name!=='AbortError')setError(err.message || 'Could not fetch exchange rates');}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[from,to,refresh]);
  const valid = amount.trim()!=='' && Number.isFinite(Number(amount)) && Number(amount)>=0;
  const result = useMemo(()=>valid && rateInfo ? Number(amount)*rateInfo.rate : null,[valid,rateInfo,amount]);
  function save() {if(result===null || !Number.isFinite(result))return;onSave({type:'conversion',expression:`${formatMoney(Number(amount),from)} → ${to}`,result:formatMoney(result,to),rateDate:rateInfo.date});}
  return <section className="tool-card converter" aria-label="Currency converter">
    <div className="card-heading"><div><span className="eyebrow">GLOBAL EXCHANGE</span><h2>Currency converter</h2></div><button className="icon-button" onClick={()=>setRefresh(v=>v+1)} title="Refresh exchange rate" aria-label="Refresh exchange rate"><RefreshCw size={18} className={loading?'spin':''}/></button></div>
    <label className="field-label" htmlFor="amount">Amount</label><input id="amount" className="amount-input" type="number" min="0" step="any" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter an amount"/>
    <div className="currency-grid"><div><label className="field-label" htmlFor="from">From</label><select id="from" value={from} onChange={e=>setFrom(e.target.value)}>{currencies.map(c=><option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}</select></div>
    <button className="swap-button" title="Swap currencies" aria-label="Swap currencies" onClick={()=>{setFrom(to);setTo(from);}}><ArrowDownUp size={20}/></button>
    <div><label className="field-label" htmlFor="to">To</label><select id="to" value={to} onChange={e=>setTo(e.target.value)}>{currencies.map(c=><option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}</select></div></div>
    <div className="conversion-result" aria-live="polite"><span className="eyebrow">CONVERTED AMOUNT</span><div className="converted-number">{loading?'Fetching rate…':result===null?'—':formatMoney(result,to)}</div><div className="rate-detail">{rateInfo?`1 ${from} = ${formatRate(rateInfo.rate)} ${to}`:'Exchange-rate reference'}</div></div>
    {error && <div className="error" role="alert"><WifiOff size={16}/>{error}</div>}
    {!valid && <div className="error" role="alert">Enter a valid amount of zero or more.</div>}
    <div className="rate-footer"><span><Wifi size={15}/> {rateInfo?.sameCurrency?'Same currency':rateInfo?`Reference rate: ${rateInfo.date}`:'Rate unavailable'}</span><span>Frankfurter API</span></div>
    <button className="primary-button" disabled={loading || result===null || !Number.isFinite(result)} onClick={save}>Save conversion to history</button>
    <p className="hint">Reference rates update periodically, not in real time. Your bank may use different rates or fees.</p>
  </section>;
}
