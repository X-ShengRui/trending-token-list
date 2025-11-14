/**
 * 格式化价格为美元显示
 */
export function formatPrice(price: number): string {
  if (price === 0) return '$0.00';
  
  if (price < 0.01) {
    return `$${price.toExponential(2)}`;
  }
  
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  
  if (price < 1000) {
    return `$${price.toFixed(2)}`;
  }
  
  if (price < 1000000) {
    return `$${(price / 1000).toFixed(2)}K`;
  }
  
  return `$${(price / 1000000).toFixed(2)}M`;
}

/**
 * 格式化百分比变化
 */
export function formatPercentage(value: number): string {
  const percentage = (value * 100).toFixed(2);
  return `${percentage}%`;
}

/**
 * 格式化数字为缩写形式
 */
export function formatNumber(value: number): string {
  if (value === 0) return '0';
  
  if (Math.abs(value) < 1000) {
    return value.toFixed(2);
  }
  
  if (Math.abs(value) < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  
  if (Math.abs(value) < 1000000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  
  return `${(value / 1000000000).toFixed(2)}B`;
}

/**
 * 格式化市值
 */
export function formatMarketCap(marketCap: number): string {
  return formatNumber(marketCap);
}

/**
 * 格式化流动性
 */
export function formatLiquidity(liquidity: number): string {
  return formatNumber(liquidity);
}

/**
 * 格式化交易量
 */
export function formatVolume(volume: number): string {
  return formatNumber(volume);
}

/**
 * 获取百分比变化的颜色类名
 */
export function getPercentageColorClass(value: number): string {
  if (value > 0) {
    return 'text-green-500'; // 绿色，上升
  } else if (value < 0) {
    return 'text-red-500'; // 红色，下降
  }
  return 'text-gray-400'; // 灰色，无变化
}

/**
 * 将秒转换为时间字符串
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  
  if (seconds < 3600) {
    return `${Math.round(seconds / 60)}m`;
  }
  
  if (seconds < 86400) {
    return `${Math.round(seconds / 3600)}h`;
  }
  
  return `${Math.round(seconds / 86400)}d`;
}
