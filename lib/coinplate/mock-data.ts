export interface MarketRow {
  symbol: string;
  pair: string;
  price: string;
  sub: string;
  changePct: number;
}

/** 列表 + 详情共用 */
export interface NewsArticle {
  id: string;
  coin: string;
  title: string;
  /** 列表摘要（可带省略） */
  summary: string;
  time: string;
  /** 详情正文段落 */
  paragraphs: string[];
}

export const MARKETS: MarketRow[] = [
  { symbol: "BTC", pair: "BTC/USDT", price: "67,432.50", sub: "Vol 2.1B", changePct: 2.35 },
  { symbol: "ETH", pair: "ETH/USDT", price: "3,245.80", sub: "Vol 890M", changePct: 1.82 },
  { symbol: "SOL", pair: "SOL/USDT", price: "142.30", sub: "Vol 120M", changePct: -1.24 },
  { symbol: "XRP", pair: "XRP/USDT", price: "0.5234", sub: "Vol 45M", changePct: 0.95 },
  { symbol: "DOGE", pair: "DOGE/USDT", price: "0.0842", sub: "Vol 88M", changePct: 3.12 },
  { symbol: "ADA", pair: "ADA/USDT", price: "0.4521", sub: "Vol 32M", changePct: -0.67 },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "1",
    coin: "BTC",
    title: "Bitcoin突破67000美元，市场情绪乐观",
    summary: "受美联储降息预期影响，BTC在过去24小时内突破67000美元大关，涨幅超过2%。市场交易量显著放大…",
    time: "2024-01-15 14:30",
    paragraphs: [
      "受美联储降息预期影响，比特币价格在过去24小时内突破67000美元大关，涨幅超过2%。市场交易量显著放大，24小时成交量达到12亿美元。",
      "分析师认为，随着美国现货比特币ETF持续获得资金流入，加上宏观经济环境的改善，BTC有望在短期内挑战70000美元关口。",
      "值得注意的是，链上数据显示大户地址持续增持，交易所存量创下近一年新低，供应端的紧缩进一步支撑了价格上行趋势。",
    ],
  },
  {
    id: "2",
    coin: "ETH",
    title: "Ethereum生态TVL创新高",
    summary: "DeFi协议锁仓总价值突破500亿美元，以太坊DeFi生态持续繁荣，全网TVL创下近六个月新高…",
    time: "2024-01-15 10:15",
    paragraphs: [
      "以太坊DeFi生态持续繁荣，根据DeFiLlama数据，全网总锁仓价值（TVL）已突破500亿美元大关，创下近六个月新高。",
      "其中，Lido、Aave和MakerDAO位列前三，锁仓额分别达到150亿美元、120亿美元和85亿美元。与此同时，Arbitrum和Optimism等Layer 2网络的TVL也迅速攀升，合计超过80亿美元。",
      "得益于Dencun升级引入的「blob」交易类型，Gas费用显著下降，用户交互成本降低，进一步推动了DeFi采用率的提升。",
    ],
  },
];

export function getNewsArticle(id: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.id === id);
}

/** 首页「最新资讯」列表（与 NEWS_ARTICLES 同源） */
export const NEWS = NEWS_ARTICLES;

export const BANNERS = [
  { id: "1", title: "Banner 1", subtitleKey: "banner1" as const },
  { id: "2", title: "Banner 2", subtitleKey: "banner2" as const },
  { id: "3", title: "Banner 3", subtitleKey: "banner3" as const },
];

/** 合约模式下的收益率（与 PERIODS 顺序一致） */
export const PERIOD_CONTRACT_RATES = ["75%", "78%", "82%", "85%"] as const;

/** 期权模式下的收益率 */
export const PERIOD_OPTIONS_RATES = ["78%", "81%", "85%", "88%"] as const;

export const PERIODS = [
  { label: "60秒" },
  { label: "120秒" },
  { label: "5分钟" },
  { label: "10分钟" },
];

export const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D"];
