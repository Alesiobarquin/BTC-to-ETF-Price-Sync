import { ETFDefinition } from './types';

// Ratios based on user specifications
export const ETFS: ETFDefinition[] = [
  {
    id: 'grayscale-mini',
    ticker: 'BTC',
    name: 'Grayscale Bitcoin Mini Trust',
    provider: 'Grayscale',
    btcPerShare: 0.000444,
    color: '#2563eb' // blue-600
  },
  {
    id: 'ishares-ibit',
    ticker: 'IBIT',
    name: 'iShares Bitcoin Trust',
    provider: 'BlackRock',
    btcPerShare: 0.000577,
    color: '#16a34a' // green-600
  },
  {
    id: 'fidelity-fbtc',
    ticker: 'FBTC',
    name: 'Fidelity Wise Origin',
    provider: 'Fidelity',
    btcPerShare: 0.000578,
    color: '#9333ea' // purple-600
  }
];

export const REFRESH_INTERVAL_MS = 10000; // 10 seconds

// Using CryptoCompare API which is generally more reliable for CORS in client-side apps
export const API_PRICE_URL = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD';
export const API_HISTORY_URL = 'https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=60';