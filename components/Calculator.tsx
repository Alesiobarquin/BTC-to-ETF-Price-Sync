import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, ArrowRight, Target } from 'lucide-react';
import { ETFS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CalculatorProps {
  currentBtcPrice: number | null;
}

export const Calculator: React.FC<CalculatorProps> = ({ currentBtcPrice }) => {
  const [targetPrice, setTargetPrice] = useState<string>('');
  
  // Initialize with current price when available if empty
  useEffect(() => {
    if (currentBtcPrice && targetPrice === '') {
      setTargetPrice(Math.floor(currentBtcPrice).toString());
    }
  }, [currentBtcPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setTargetPrice(val);
    }
  };

  const numericTarget = parseFloat(targetPrice) || 0;

  const chartData = ETFS.map(etf => ({
    name: etf.ticker,
    price: numericTarget * etf.btcPerShare,
    color: etf.color
  }));

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <CalculatorIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Limit Order Calculator</h2>
            <p className="text-sm text-slate-400">Plan your entry. Enter a target Bitcoin price below.</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Target Bitcoin Price (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-400 font-bold">$</span>
              </div>
              <input
                type="text"
                value={targetPrice}
                onChange={handleInputChange}
                className="block w-full pl-8 pr-12 py-4 bg-slate-900 border border-slate-600 rounded-xl text-white text-2xl font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600"
                placeholder="60000"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                 <Target className="w-5 h-5 text-slate-500" />
              </div>
            </div>
            <div className="mt-2 flex gap-2">
               {[55000, 60000, 65000, 70000].map(preset => (
                 <button
                   key={preset}
                   onClick={() => setTargetPrice(preset.toString())}
                   className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors"
                 >
                   ${preset.toLocaleString()}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Implied ETF Prices</div>
            {ETFS.map((etf) => (
              <div key={etf.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: etf.color }}></div>
                  <div>
                    <span className="block font-bold text-white">{etf.ticker}</span>
                    <span className="text-xs text-slate-500">{etf.btcPerShare.toFixed(6)} ratio</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <span className="text-xl font-bold text-white font-mono">
                    ${(numericTarget * etf.btcPerShare).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Section */}
        <div className="hidden lg:block bg-slate-900/30 rounded-xl p-4 border border-slate-700/30">
          <h3 className="text-sm font-medium text-slate-400 mb-4 text-center">Price Comparison at Target ${numericTarget.toLocaleString()}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#475569' }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8' }} 
                  axisLine={{ stroke: '#475569' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                />
                <Bar dataKey="price" radius={[4, 4, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};