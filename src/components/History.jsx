import { Clock3, Trash2, Calculator as CalcIcon, ArrowLeftRight } from 'lucide-react';
import { formatDate } from '../utils/format';
export default function History({items,onClear}) {
  return <aside className="history-card"><div className="history-header"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Recent history</h2></div><button className="clear-button" disabled={!items.length} onClick={onClear}><Trash2 size={15}/> Clear</button></div>
    {items.length===0?<div className="empty-history"><Clock3 size={32}/><strong>No history yet</strong><span>Your calculations and saved conversions will appear here.</span></div>:<div className="history-list">{items.map(item=><div className="history-item" key={item.id}><div className="history-icon">{item.type==='conversion'?<ArrowLeftRight size={17}/>:<CalcIcon size={17}/>}</div><div className="history-content"><span className="history-expression">{item.expression}</span><strong>{item.result}</strong><small>{formatDate(item.createdAt)}</small></div></div>)}</div>}
    <p className="history-note">Stored locally on this device · Last 30 entries</p>
  </aside>;
}
