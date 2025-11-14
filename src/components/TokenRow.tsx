import { TokenData } from '@/lib/websocket';
import {
  formatPrice,
  formatPercentage,
  formatNumber,
  getPercentageColorClass,
} from '@/lib/format';

interface TokenRowProps {
  token: TokenData;
  index: number;
}

export default function TokenRow({ token, index }: TokenRowProps) {
  const getChangeColor = (value: number) => {
    if (value > 0) return 'text-green-up';
    if (value < 0) return 'text-red-down';
    return 'text-gray-400';
  };

  return (
    <tr className="border-b hover:transition-colors" style={{ borderColor: 'rgb(60, 43, 47)', backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(244, 188, 204)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
      {/* 排名和代币信息 */}
      <td className="px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="w-6 text-center text-gray-400">{index + 1}</span>
          <div>
            <div className="font-semibold text-white">{token.baseSymbol}</div>
            <div className="text-xs text-gray-400">{token.baseName}</div>
          </div>
        </div>
      </td>

      {/* Age */}
      <td className="px-4 py-3 text-white text-right">
        <div className="text-sm">{token.count24h}h</div>
      </td>

      {/* Liq / MC */}
      <td className="px-4 py-3 text-white text-right">
        <div className="text-sm">${formatNumber(token.liquidity)}</div>
        <div className="text-xs text-gray-400">${formatNumber(token.marketCap)}</div>
      </td>

      {/* Price */}
      <td className="px-4 py-3 text-white text-right">
        <div className="text-sm">{formatPrice(token.priceUsd)}</div>
      </td>

      {/* 24h chg % */}
      <td className={`px-4 py-3 text-right text-sm ${getChangeColor(token.priceChange24h)}`}>
        {formatPercentage(token.priceChange24h)}
      </td>

      {/* 24h Txs */}
      <td className="px-4 py-3 text-white text-right">
        <div className="text-sm text-green-up">{token.buyCount24h}</div>
        <div className="text-xs text-red-down">{token.sellCount24h}</div>
      </td>

      {/* 24h Vol */}
      <td className="px-4 py-3 text-white text-right">
        <div className="text-sm">${formatNumber(token.volumeUsd24h)}</div>
      </td>

      {/* 1m% */}
      <td className={`px-4 py-3 text-right text-sm ${getChangeColor(token.priceChange1m)}`}>
        {formatPercentage(token.priceChange1m)}
      </td>

      {/* 5m% */}
      <td className={`px-4 py-3 text-right text-sm ${getChangeColor(token.priceChange5m)}`}>
        {formatPercentage(token.priceChange5m)}
      </td>

      {/* 1h% */}
      <td className={`px-4 py-3 text-right text-sm ${getChangeColor(token.priceChange1h)}`}>
        {formatPercentage(token.priceChange1h)}
      </td>
    </tr>
  );
}
