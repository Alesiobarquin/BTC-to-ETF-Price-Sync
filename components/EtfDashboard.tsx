import React from 'react';
import { ETFS } from '../constants';

interface EtfDashboardProps {
  btcPrice: number | null;
}

export const EtfDashboard: React.FC<EtfDashboardProps> = ({ btcPrice }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Live ETF Fair Value</h2>
        <span className="text-xs text-slate-400 hidden sm:block">Calculated from live BTC spot price</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ETFS.map((etf) => {
          const calculatedPrice = btcPrice ? btcPrice * etf.btcPerShare : 0;
          
          return (
            <div 
              key={etf.id}
              className="group relative bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50"
            >
              <div 
                className="absolute top-0 left-0 w-full h-1 rounded-t-xl opacity-75 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: etf.color }}
              ></div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{etf.ticker}</h3>
                  <p className="text-sm text-slate-400">{etf.provider}</p>
                </div>
                <div className="text-xs font-mono bg-slate-900/50 px-2 py-1 rounded text-slate-400">
                  {etf.btcPerShare.toFixed(6)} BTC/sh
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Implied Value</p>
                <div className="text-3xl font-bold text-white font-mono tracking-tight">
                  {btcPrice 
                    ? `$${calculatedPrice.toFixed(2)}` 
                    : <div className="h-9 w-24 bg-slate-700 animate-pulse rounded"></div>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};