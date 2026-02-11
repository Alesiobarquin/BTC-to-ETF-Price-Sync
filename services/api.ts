import { API_PRICE_URL, API_HISTORY_URL } from '../constants';
import { CryptoComparePriceResponse, CryptoCompareHistoryResponse, PricePoint } from '../types';

export const fetchBitcoinPrice = async (): Promise<{ price: number; change24h: number } | null> => {
  try {
    const response = await fetch(API_PRICE_URL);
    if (!response.ok) {
      throw new Error(`Error fetching price: ${response.statusText}`);
    }
    const json: CryptoComparePriceResponse = await response.json();
    
    // Defensive check
    if (!json?.RAW?.BTC?.USD) {
        throw new Error("Invalid price data format");
    }

    return {
      price: json.RAW.BTC.USD.PRICE,
      change24h: json.RAW.BTC.USD.CHANGEPCT24HOUR
    };
  } catch (error) {
    console.error("Failed to fetch Bitcoin price:", error);
    return null;
  }
};

export const fetchBitcoinHistory = async (): Promise<PricePoint[]> => {
  try {
    const response = await fetch(API_HISTORY_URL);
    if (!response.ok) {
      throw new Error(`Error fetching history: ${response.statusText}`);
    }
    const json: CryptoCompareHistoryResponse = await response.json();
    
    // Defensive check
    if (!json?.Data?.Data || !Array.isArray(json.Data.Data)) {
         throw new Error("Invalid history data format");
    }

    return json.Data.Data.map(item => ({
      // CryptoCompare returns time in seconds, we need milliseconds
      time: item.time * 1000,
      price: item.close
    }));
  } catch (error) {
    console.error("Failed to fetch Bitcoin history:", error);
    return [];
  }
};