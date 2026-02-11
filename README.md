# BTC-to-ETF Price Sync

A real-time dashboard for cryptocurrency traders that tracks the "Fair Market Value" of Bitcoin ETFs (IBIT, FBTC, Grayscale Mini) based on live BTC spot prices. It includes a Limit Order Calculator to help traders execute precise entries.

## Features

- **Real-time Price Sync**: Fetches live BTC/USD price data via CryptoCompare API.
- **Fair Value Calculation**: Instantly calculates implied share prices for major ETFs based on their official BTC-per-share ratios.
- **Limit Order Calculator**: Interactive tool to plan ETF buy orders based on Bitcoin price targets.
- **Live Chart**: 1-minute interval historical price chart (BTC/USD).
- **Responsive Design**: Built with React, Tailwind CSS, and Recharts in a clean dark-mode UI.

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment (GitHub Pages)

This repository is configured with GitHub Actions for automatic deployment.

1. Go to **Settings > Pages** in your GitHub repository.
2. Under "Build and deployment", select **GitHub Actions** as the source.
3. Push changes to the `main` branch. The action will automatically build and deploy the site.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (CDN)
- **Charts**: Recharts
- **Icons**: Lucide React
