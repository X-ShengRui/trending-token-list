import { useState, useCallback, useMemo } from 'react';
import { TokenData } from '@/lib/websocket';

type SortType = 'none' | 'price-asc' | 'price-desc' | 'change24h-asc' | 'change24h-desc' | 'volume-asc' | 'volume-desc' | 'liquidity-asc' | 'liquidity-desc';

export function useTrendingTokens() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('none');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * 更新Token数据
   */
  const updateTokens = useCallback((newTokens: TokenData[]) => {
    setTokens((prevTokens) => {
      // 创建一个Map以便快速查找和更新
      const tokenMap = new Map(prevTokens.map((t) => [t.pair, t]));

      // 更新或添加新的tokens
      newTokens.forEach((newToken) => {
        tokenMap.set(newToken.pair, newToken);
      });

      // 返回更新后的tokens数组，保持原有的顺序
      return Array.from(tokenMap.values());
    });
    setIsLoading(false);
  }, []);

  /**
   * 设置初始Token数据
   */
  const setInitialTokens = useCallback((initialTokens: TokenData[]) => {
    setTokens(initialTokens);
    setIsLoading(false);
  }, []);

  /**
   * 搜索和排序逻辑
   */
  const filteredAndSortedTokens = useMemo(() => {
    let result = [...tokens];

    // 应用搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (token) =>
          token.baseSymbol.toLowerCase().includes(query) ||
          token.baseName.toLowerCase().includes(query) ||
          token.baseToken.toLowerCase().includes(query)
      );
    }

    // 应用排序
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceUsd - b.priceUsd);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceUsd - a.priceUsd);
        break;
      case 'change24h-asc':
        result.sort((a, b) => a.priceChange24h - b.priceChange24h);
        break;
      case 'change24h-desc':
        result.sort((a, b) => b.priceChange24h - a.priceChange24h);
        break;
      case 'volume-asc':
        result.sort((a, b) => a.volumeUsd24h - b.volumeUsd24h);
        break;
      case 'volume-desc':
        result.sort((a, b) => b.volumeUsd24h - a.volumeUsd24h);
        break;
      case 'liquidity-asc':
        result.sort((a, b) => a.liquidity - b.liquidity);
        break;
      case 'liquidity-desc':
        result.sort((a, b) => b.liquidity - a.liquidity);
        break;
      case 'none':
      default:
        // 保持原有顺序
        break;
    }

    return result;
  }, [tokens, searchQuery, sortBy]);

  return {
    tokens: filteredAndSortedTokens,
    allTokens: tokens,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateTokens,
    setInitialTokens,
  };
}
