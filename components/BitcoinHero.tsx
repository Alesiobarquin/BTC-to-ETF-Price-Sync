import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface BitcoinHeroProps {
  price: number | null;
  change24h: number | null;
  loading: boolean;
}

export const BitcoinHero: React.FC<BitcoinHeroProps> = ({ price, change24h, loading }) => {
  const isPositive = (change24h || 0) >= 0;

  if (loading && !price) {
    return (
      <div className="w-full bg-slate-800/50 rounded-2xl p-8 animate-pulse flex flex-col items-center justify-center border border-slate-700">
        <div className="h-4 w-32 bg-slate-700 rounded mb-4"></div>
        <div className="h-12 w-64 bg-slate-700 rounded mb-4"></div>
        <div className="h-6 w-24 bg-slate-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2 text-orange-400 font-medium tracking-wide uppercase text-sm">
          <DollarSign className="w-4 h-4" />
          Bitcoin Live Price (USD)
        </div>
        
        <div className="text-5xl sm:text-7xl font-bold text-white tracking-tighter mb-4 font-mono">
          {price 
            ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
            : '$--,--.--'
          }
        </div>

        {price && change24h !== null && (
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/30 border border-slate-700/50 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-semibold">{Math.abs(change24h).toFixed(2)}%</span>
            <span className="text-slate-400 text-sm">24h Change</span>
          </div>
        )}
      </div>
    </div>
  );
};