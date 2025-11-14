# Trending Token List

A real-time trending token list application built with Next.js, TypeScript, and React. This project demonstrates a modern web application that consumes WebSocket data, performs real-time updates, and provides interactive search and sorting capabilities.

## Features

- **Real-time Data Updates**: WebSocket connection to fetch trending token data every 1-3 seconds
- **Data Decompression**: Automatic GZIP decompression of incoming data using pako library
- **Search Functionality**: Filter tokens by symbol, name, or token address
- **Sorting Options**: Sort by price, 24h change, volume, and liquidity
- **Heartbeat Mechanism**: Automatic ping/pong heartbeat to maintain WebSocket connection
- **Dark Theme UI**: Modern dark theme design with custom color palette
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **WebSocket**: Native WebSocket API
- **Data Compression**: pako (GZIP decompression)
- **UI Components**: shadcn/ui
- **Routing**: Wouter

## Project Structure

```
public/              # Static assets (icons, etc.)
src/
  ├── components/      # Reusable React components
  │
  |── contexts/
  |
  ├── hooks/           # Custom React hooks
  │   
  ├── lib/             # Utility functions
  │ 
  ├── pages/           # Page components
  │  
  ├── App.tsx          # Main app component
  |
  |── const.ts      
  │── index.css        # Global styles
  └── main.tsx         # React entry point
index.html           # HTML template
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## WebSocket API

The application connects to `wss://web-t.pinkpunk.io/ws` and subscribes to trending token data on the BSC (Binance Smart Chain) network.

### Subscription Message

```json
{
  "topic": "trending",
  "event": "sub",
  "interval": "",
  "pair": "",
  "chainId": "56",
  "compression": 0
}
```

### Data Updates

The WebSocket server pushes updates containing an array of token data with the following structure:

```typescript
interface TokenData {
  baseDecimals: number;
  baseName: string;
  baseSupply: number;
  baseSymbol: string;
  baseToken: string;
  buyCount24h: number;
  chainId: string;
  count24h: number;
  dex: string;
  info: { twitter: string; website: string; telegram: string };
  liquidity: number;
  marketCap: number;
  pair: string;
  price: number;
  priceChange1h: number;
  priceChange1m: number;
  priceChange24h: number;
  priceChange5m: number;
  priceNative: number;
  priceUsd: number;
  quoteName: string;
  quoteSymbol: string;
  quoteToken: string;
  sellCount24h: number;
  timeDiff: string;
  volumeUsd24h: number;
}
```

## Key Features Implementation

### WebSocket Management

The `TrendingTokenWebSocket` class in `src/lib/websocket.ts` handles:

- Connection establishment and reconnection logic
- Message parsing and decompression
- Ping/pong heartbeat mechanism
- Error handling and recovery

### Data Filtering and Sorting

The `useTrendingTokens` hook provides:

- Real-time token data management
- Search filtering by symbol, name, or address
- Multiple sorting options (price, change, volume, liquidity)
- Optimized re-renders using memoization

### UI Components

- **SearchBar**: Search and sort controls with icon integration
- **TokenTable**: Responsive table display with header information
- **TokenRow**: Individual token row with formatted data and color-coded changes

## Color Palette

The application uses a custom dark theme with the following colors:

- **Primary Text**: `rgb(255, 255, 255)` - Full white
- **Secondary Text**: `rgba(255, 255, 255, 0.4)` - Dimmed white
- **Primary Pink**: `rgb(238, 171, 189)` - Main accent color
- **Hover State**: `rgb(244, 188, 204)` - Light pink
- **Upside (Green)**: `rgb(70, 193, 127)` - Positive changes
- **Downside (Red)**: `rgb(229, 56, 56)` - Negative changes
- **Background**: `rgb(0, 0, 0)` - Pure black
- **Border**: `rgb(60, 43, 47)` - Dark gray-brown

## Development Guidelines

### Code Quality

- TypeScript is used throughout for type safety
- Components are modular and reusable
- Custom hooks encapsulate complex logic
- Error boundaries and error handling are implemented

### Performance Considerations

- Data updates are optimized using React hooks
- Memoization prevents unnecessary re-renders
- WebSocket data is efficiently merged with existing state
- Search and sort operations are memoized

### Error Handling

- WebSocket connection failures trigger automatic reconnection
- User-friendly error messages are displayed
- Network errors are logged for debugging

## Future Enhancements

- Add token detail pages with chart history
- Implement favorites/watchlist functionality
- Add price alerts and notifications
- Support for multiple blockchain networks
- Advanced filtering and analytics
- Export data to CSV/JSON

## License

This project is created as a coding test for Tritium Research Frontend Team.

## Author

Created as part of the Tritium Research Frontend Team interview process.
