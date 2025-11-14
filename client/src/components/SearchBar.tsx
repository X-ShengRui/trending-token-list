import { useState, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
  currentSort: string;
}

export default function SearchBar({ onSearch, onSort, currentSort }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query);
    },
    [onSearch]
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSort(e.target.value);
    },
    [onSort]
  );

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* 搜索框 */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 pl-10 bg-black border rounded text-white placeholder-gray-400 focus:outline-none transition-colors"
          style={{ borderColor: 'rgb(60, 43, 47)' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(238, 171, 189)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(60, 43, 47)'; }}
        />
        <img
          src="/search-icon.svg"
          alt="Search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60"
        />
      </div>

      {/* 排序下拉框 */}
      <div className="relative">
        <select
          value={currentSort}
          onChange={handleSortChange}
          className="px-4 py-2 bg-black border rounded text-white focus:outline-none transition-colors appearance-none pr-8"
          style={{ borderColor: 'rgb(60, 43, 47)' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgb(238, 171, 189)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgb(60, 43, 47)'; }}
        >
          <option value="none">Sort by</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="change24h-asc">24h Change (Low to High)</option>
          <option value="change24h-desc">24h Change (High to Low)</option>
          <option value="volume-asc">Volume (Low to High)</option>
          <option value="volume-desc">Volume (High to Low)</option>
          <option value="liquidity-asc">Liquidity (Low to High)</option>
          <option value="liquidity-desc">Liquidity (High to Low)</option>
        </select>
        <img
          src="/sort-icon.svg"
          alt="Sort"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60 pointer-events-none"
        />
      </div>
    </div>
  );
}
