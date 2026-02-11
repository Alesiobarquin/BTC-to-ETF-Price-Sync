// Generic types used by components
export interface PricePoint {
  time: number;
  price: number;
}

export interface ETFDefinition {
  id: string;
  ticker: string;
  name: string;
  provider: string;
  btcPerShare: number;
  color: string;
}

export interface ETFPriceData extends ETFDefinition {
  currentPrice: number;
}

// CryptoCompare API Response Types
export interface CryptoComparePriceResponse {
  RAW: {
    BTC: {
      USD: {
        PRICE: number;
        CHANGEPCT24HOUR: number;
      };
    };
  };
}

export interface CryptoCompareHistoryResponse {
  Data: {
    Data: {
      time: number;
      close: number;
      high: number;
      low: number;
      open: number;
      volumefrom: number;
      volumeto: number;
    }[];
  };
}