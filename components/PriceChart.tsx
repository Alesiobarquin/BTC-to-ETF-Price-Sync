import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { PricePoint } from '../types';

interface PriceChartProps {
  data: PricePoint[];
  loading: boolean;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, loading }) => {
  const formatTime = (time: number) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Calculate domain for Y-Axis to make chart look dynamic
  // Default to some range if data is empty to avoid crashes
  const prices = data.length > 0 ? data.map(d => d.price) : [0];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const buffer = (maxPrice - minPrice) * 0.1 || 100; // Default buffer if flat line

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">BTC/USD Price Action</h2>
            <p className="text-sm text-slate-400">Live price feed</p>
          </div>
        </div>
      </div>
      
      <div className="h-[350px] w-full p-4 sm:p-6 bg-slate-900/50">
        {loading && data.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-slate-500 animate-pulse">
            Loading chart data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="time" 
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={formatTime}
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={[minPrice - buffer, maxPrice + buffer]}
                tickFormatter={formatPrice}
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderColor: '#334155', 
                  borderRadius: '0.5rem',
                  color: '#f8fafc' 
                }}
                itemStyle={{ color: '#818cf8' }}
                labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                formatter={(value: number) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 'BTC Price']}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={1000}
                isAnimationActive={false} 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};