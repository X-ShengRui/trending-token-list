import { useEffect } from 'react';
import { trendingTokenWS, TokenData } from '@/lib/websocket';
import { useTrendingTokens } from '@/hooks/useTrendingTokens';
import SearchBar from '@/components/SearchBar';
import TokenTable from '@/components/TokenTable';

export default function Home() {
  const {
    tokens,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    isLoading,
    setIsLoading,
    error,
    setError,
    setInitialTokens,
    updateTokens,
  } = useTrendingTokens();

  useEffect(() => {
    let isMounted = true;

    const initializeWebSocket = async () => {
      try {
        // 连接到WebSocket
        await trendingTokenWS.connect();

        // 设置消息回调
        trendingTokenWS.onMessage((data: TokenData[]) => {
          if (isMounted) {
            if (tokens.length === 0) {
              // 初始数据
              setInitialTokens(data);
            } else {
              // 更新数据
              updateTokens(data);
            }
          }
        });

        // 设置错误回调
        trendingTokenWS.onError((err: Error) => {
          if (isMounted) {
            setError(err.message);
            console.error('WebSocket error:', err);
          }
        });

        // 设置连接成功回调
        trendingTokenWS.onConnect(() => {
          console.log('WebSocket connected successfully');
        });

        // 设置断开连接回调
        trendingTokenWS.onDisconnect(() => {
          console.log('WebSocket disconnected');
        });
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to connect to WebSocket';
          setError(errorMessage);
          console.error('Initialization error:', err);
        }
      }
    };

    initializeWebSocket();

    // 清理函数
    return () => {
      isMounted = false;
      trendingTokenWS.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 头部 */}
      <header className="border-b bg-black sticky top-0 z-50" style={{ borderColor: 'rgb(60, 43, 47)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold" style={{ color: 'rgb(238, 171, 189)' }}>Trending Tokens</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time trending token list powered by WebSocket</p>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 搜索和排序栏 */}
        <SearchBar
          onSearch={setSearchQuery}
          onSort={(value) => setSortBy(value as any)}
          currentSort={sortBy}
        />

        {/* Token表格 */}
        <div className="bg-black border overflow-hidden" style={{ borderColor: 'rgb(60, 43, 47)' }}>
          <TokenTable
            tokens={tokens}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* 底部信息 */}
        {tokens.length > 0 && !isLoading && !error && (
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Showing {tokens.length} tokens • Data updates every 1-3 seconds</p>
          </div>
        )}
      </main>
    </div>
  );
}
