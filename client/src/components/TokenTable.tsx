import { TokenData } from '@/lib/websocket';
import TokenRow from './TokenRow';

interface TokenTableProps {
  tokens: TokenData[];
  isLoading: boolean;
  error: string | null;
}

export default function TokenTable({ tokens, isLoading, error }: TokenTableProps) {
  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Error Loading Data</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading && tokens.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-primary mb-4"></div>
          <p className="text-gray-400">Loading trending tokens...</p>
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        <p>No tokens found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: 'rgb(60, 43, 47)' }}>
            <th className="px-4 py-3 text-left font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Token</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Age ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Liq / MC ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Price ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>24h chg % ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>24h Txs ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>24h Vol ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>1m% ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>5m% ↓</th>
            <th className="px-4 py-3 text-right font-semibold" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>1h% ↓</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <TokenRow key={token.pair} token={token} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
