
import React, { useState, useEffect } from 'react';

interface DiceProps {
  value: number | null;
  onRoll: () => void;
  rolling: boolean;
}

const DiceFace: React.FC<{ value: number }> = ({ value }) => {
    const pips = [];
    const pip = <div className="w-4 h-4 bg-slate-900 rounded-full" />;

    if (value === 1) pips.push(<div key="1" className="absolute">{pip}</div>);
    if (value === 2) pips.push(<div key="2" className="absolute top-2 left-2">{pip}</div>, <div key="3" className="absolute bottom-2 right-2">{pip}</div>);
    if (value === 3) pips.push(<div key="4" className="absolute top-2 left-2">{pip}</div>, <div key="5" className="absolute">{pip}</div>, <div key="6" className="absolute bottom-2 right-2">{pip}</div>);
    if (value === 4) pips.push(<div key="7" className="absolute top-2 left-2">{pip}</div>, <div key="8" className="absolute top-2 right-2">{pip}</div>, <div key="9" className="absolute bottom-2 left-2">{pip}</div>, <div key="10" className="absolute bottom-2 right-2">{pip}</div>);
    if (value === 5) pips.push(<div key="11" className="absolute top-2 left-2">{pip}</div>, <div key="12" className="absolute top-2 right-2">{pip}</div>, <div key="13" className="absolute">{pip}</div>, <div key="14" className="absolute bottom-2 left-2">{pip}</div>, <div key="15" className="absolute bottom-2 right-2">{pip}</div>);
    if (value === 6) pips.push(<div key="16" className="absolute top-2 left-2">{pip}</div>, <div key="17" className="absolute top-2 right-2">{pip}</div>, <div key="18" className="absolute left-2">{pip}</div>, <div key="19" className="absolute right-2">{pip}</div>, <div key="20" className="absolute bottom-2 left-2">{pip}</div>, <div key="21" className="absolute bottom-2 right-2">{pip}</div>);

    return (
        <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center relative p-2">
            {pips}
        </div>
    );
};

const Dice: React.FC<DiceProps> = ({ value, onRoll, rolling }) => {
  const [displayValue, setDisplayValue] = useState(value || 1);

  useEffect(() => {
    if (rolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        if(value) setDisplayValue(value);
      }, 1000);

      return () => clearInterval(interval);
    } else if(value) {
        setDisplayValue(value);
    }
  }, [rolling, value]);

  return (
    <div className={`p-2 rounded-xl transition-transform duration-300 ${rolling ? 'animate-spin' : ''}`}>
        <DiceFace value={displayValue} />
    </div>
  );
};

export default Dice;
