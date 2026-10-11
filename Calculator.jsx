import { useCallback, useEffect, useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { applyPercent, calculate, formatDisplay, isOperator } from '../utils/calculator';
const keys = ['AC','±','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','⌫','0','.','='];
export default function Calculator({onSave}) {
  const [display,setDisplay] = useState('0');
  const [previous,setPrevious] = useState(null);
  const [operator,setOperator] = useState(null);
  const [waiting,setWaiting] = useState(false);
  const [expression,setExpression] = useState('');
  const press = useCallback((key) => {
    if (key === 'AC') { setDisplay('0');setPrevious(null);setOperator(null);setWaiting(false);setExpression('');return; }
    if (key === '⌫') { setDisplay(v => v === 'Error' || waiting || v.length <= 1 ? '0' : v.slice(0,-1));setWaiting(false);return; }
    if (key === '±') {setDisplay(v => v === 'Error' ? '0' : String(-Number(v)));return;}
    if (key === '%') {setDisplay(v => v === 'Error' ? '0' : String(applyPercent(v)));return;}
    if (/^\d$/.test(key) || key === '.') {
      setDisplay(v => { if (waiting || v === 'Error') return key === '.' ? '0.' : key; if (key === '.' && v.includes('.')) return v; if (v.replace(/[-.]/g,'').length >= 14) return v; return v === '0' && key !== '.' ? key : v + key; });
      setWaiting(false);return;
    }
    if (isOperator(key)) {
      if (operator && previous !== null && !waiting) {
        try { const result = calculate(previous,operator,display);setPrevious(String(result));setDisplay(String(result));setExpression(`${result} ${key}`); }
        catch (error) {setDisplay('Error');setExpression(error.message);setPrevious(null);setOperator(null);return;}
      } else {setPrevious(display === 'Error' ? '0' : display);setExpression(`${display} ${key}`);}
      setOperator(key);setWaiting(true);return;
    }
    if (key === '=' && operator && previous !== null && !waiting) {
      const label = `${previous} ${operator} ${display}`;
      try {const result = calculate(previous,operator,display);setDisplay(String(result));setExpression(`${label} =`);onSave({type:'calculation',expression:label,result:String(result)});}
      catch(error) {setDisplay('Error');setExpression(error.message);}
      setPrevious(null);setOperator(null);setWaiting(true);
    }
  },[display,operator,previous,waiting,onSave]);
  useEffect(() => {
    const handler = event => {
      if (event.ctrlKey || event.metaKey || event.altKey || ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
      const mapped = {'/':'÷','*':'×','x':'×','X':'×','Enter':'=','=':'=','Backspace':'⌫','Escape':'AC'}[event.key] || event.key;
      if (keys.includes(mapped)) {event.preventDefault();press(mapped);}
    };
    window.addEventListener('keydown',handler);return ()=>window.removeEventListener('keydown',handler);
  },[press]);
  return <section className="tool-card calculator" aria-label="General calculator">
    <div className="card-heading"><div><span className="eyebrow">STANDARD MODE</span><h2>Calculator</h2></div><button className="icon-button" onClick={()=>press('AC')} title="Reset calculator" aria-label="Reset calculator"><RotateCcw size={18}/></button></div>
    <div className="calc-screen" aria-live="polite"><div className="expression">{expression || 'Ready to calculate'}</div><div className="calc-result" title={display}>{formatDisplay(display)}</div></div>
    <div className="keypad">{keys.map(key=><button key={key} onClick={()=>press(key)} className={`calc-key ${isOperator(key)?'operator':''} ${key==='='?'equals':''} ${['AC','±','%','⌫'].includes(key)?'utility':''}`} aria-label={key==='⌫'?'Backspace':key==='AC'?'All clear':key}>{key==='⌫'?<Delete size={20}/>:key}</button>)}</div>
    <p className="hint">Keyboard supported: numbers, +, −, ×, ÷, Enter and Backspace</p>
  </section>;
}
