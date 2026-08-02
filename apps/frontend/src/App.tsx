import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Search,
  Bell,
  User,
  Shield,
  Layers,
  PieChart as PieChartIcon,
  Filter,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Plus,
  Trash2,
  DollarSign,
  Activity,
  BarChart2,
  Sliders,
  Send,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

// --- MOCK MARKET DATA ---
const INITIAL_TICKERS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.35, changePercent: 1.25, volume: '54.2M', cap: '$2.91T', pe: 31.2, rsi: 62.4, signal: 'BUY' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 124.20, change: 4.10, changePercent: 3.41, volume: '89.1M', cap: '$3.05T', pe: 72.8, rsi: 74.1, signal: 'BUY' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 210.50, change: -4.62, changePercent: -2.15, volume: '41.8M', cap: '$670B', pe: 61.4, rsi: 41.2, signal: 'HOLD' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 448.90, change: 3.80, changePercent: 0.85, volume: '22.4M', cap: '$3.33T', pe: 38.5, rsi: 58.9, signal: 'BUY' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 186.30, change: 1.90, changePercent: 1.03, volume: '33.1M', cap: '$1.94T', pe: 42.1, rsi: 55.3, signal: 'BUY' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 177.40, change: -1.10, changePercent: -0.62, volume: '19.5M', cap: '$2.21T', pe: 26.8, rsi: 48.6, signal: 'HOLD' }
];

const MARKET_INDICES = [
  { name: 'S&P 500', value: '5,521.82', change: '+34.20', percent: '+0.62%', isUp: true },
  { name: 'NASDAQ', value: '17,688.40', change: '+182.10', percent: '+1.04%', isUp: true },
  { name: 'DOW JONES', value: '40,842.30', change: '-45.10', percent: '-0.11%', isUp: false },
  { name: 'NIFTY 50', value: '24,520.15', change: '+208.40', percent: '+0.85%', isUp: true }
];

const INITIAL_HOLDINGS = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 100, avgPrice: 150.00, currentPrice: 189.84, allocation: 35 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 150, avgPrice: 85.00, currentPrice: 124.20, allocation: 40 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 40, avgPrice: 380.00, currentPrice: 448.90, allocation: 25 }
];

const NEWS_FEED = [
  { id: 1, title: 'Fed Signals Potential Interest Rate Cut in September Meeting', source: 'Bloomberg', time: '12m ago', sentiment: 'BULLISH', score: 0.88, symbol: 'MARKET' },
  { id: 2, title: 'NVIDIA Expands AI Chip Production Line to Meet Enterprise Demand', source: 'Reuters', time: '45m ago', sentiment: 'BULLISH', score: 0.94, symbol: 'NVDA' },
  { id: 3, title: 'Apple Q3 Services Revenue Reaches All-Time High of $24.2 Billion', source: 'CNBC', time: '2h ago', sentiment: 'BULLISH', score: 0.82, symbol: 'AAPL' },
  { id: 4, title: 'Tesla Faces EU Import Tariff Adjustment Amid EV Market Shift', source: 'Financial Times', time: '4h ago', sentiment: 'BEARISH', score: -0.65, symbol: 'TSLA' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stocks' | 'ai' | 'portfolio' | 'screener' | 'backtest'>('dashboard');
  const [selectedStock, setSelectedStock] = useState(INITIAL_TICKERS[0]);
  const [watchlist, setWatchlist] = useState<string[]>(['AAPL', 'NVDA', 'TSLA', 'MSFT']);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Hello! I am your TradeVision AI Assistant. Ask me anything about stock technicals, sentiment, portfolio rebalancing, or backtesting strategies.' }
  ]);

  // Live simulation tick update effect
  const [tickers, setTickers] = useState(INITIAL_TICKERS);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev =>
        prev.map(item => {
          const delta = (Math.random() - 0.49) * 0.8;
          const newPrice = Number((item.price + delta).toFixed(2));
          const newChange = Number((item.change + delta).toFixed(2));
          const newPercent = Number((((newPrice - (item.price - item.change)) / (item.price - item.change)) * 100).toFixed(2));
          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newPercent
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleWatchlist = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      setWatchlist(watchlist.filter(s => s !== symbol));
    } else {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;

    const userText = aiChatInput;
    setAiChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setAiChatInput('');

    setTimeout(() => {
      let reply = `Based on Gemini AI analysis for "${userText}": Momentum indicators remain bullish with RSI at 62.4. Key support is held at $182.50. Target resistance stands at $195.00.`;
      if (userText.toLowerCase().includes('nvda')) {
        reply = "NVIDIA (NVDA) shows an exceptional 0.94 bullish confidence rating due to massive AI infrastructure spending. RSI is slightly overbought at 74.1, suggesting potential brief consolidation before continuation.";
      } else if (userText.toLowerCase().includes('portfolio')) {
        reply = "Your portfolio has an estimated 12.9% return. However, 100% of your holdings are concentrated in the Technology Sector. Consider rebalancing into Financials or Index ETFs to reduce drawdown risk.";
      }
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      
      {/* --- TOP ANIMATED TICKER BAR --- */}
      <div className="bg-[#070A10] border-b border-slate-800/80 px-4 py-1.5 overflow-x-auto flex items-center gap-6 text-xs text-slate-400 no-scrollbar">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Stream
        </div>
        {MARKET_INDICES.map((idx, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="font-medium text-slate-300">{idx.name}</span>
            <span className="font-mono text-slate-200">{idx.value}</span>
            <span className={`font-mono flex items-center font-semibold ${idx.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {idx.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {idx.percent}
            </span>
          </div>
        ))}
      </div>

      {/* --- MAIN HEADER NAVBAR --- */}
      <header className="bg-[#131B2E]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
              TradeVision <span className="text-emerald-400">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase">Enterprise SaaS Platform</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            placeholder="Search stock ticker (e.g. AAPL, NVDA, TSLA) or press Cmd+K..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition"
          />
        </div>

        {/* User Actions & Upgrade Badge */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> PRO PRO TIER
          </span>
          <button className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 relative transition">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5"></span>
          </button>
          <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
            TV
          </div>
        </div>
      </header>

      {/* --- APP BODY LAYOUT --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* --- NAVIGATION SIDEBAR --- */}
        <aside className="w-64 bg-[#0E1524] border-r border-slate-800/80 p-4 hidden lg:flex flex-col justify-between shrink-0">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-500 px-3 mb-2 uppercase tracking-wider">Main Workspace</div>
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'dashboard' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" /> Market Overview
            </button>

            <button
              onClick={() => setActiveTab('stocks')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'stocks' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <BarChart2 className="w-4 h-4" /> Technical Analysis
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'ai' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" /> Gemini AI Insights
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'portfolio' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <PieChartIcon className="w-4 h-4" /> Portfolio Management
            </button>

            <button
              onClick={() => setActiveTab('screener')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'screener' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Filter className="w-4 h-4" /> Stock Screener
            </button>

            <button
              onClick={() => setActiveTab('backtest')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'backtest' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" /> Strategy Backtesting
            </button>
          </div>

          {/* Quick Watchlist Card in Sidebar */}
          <div className="bg-[#131B2E] border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><Bookmark className="w-3.5 h-3.5 text-emerald-400" /> Watchlist</span>
              <span className="text-[10px] text-slate-500">{watchlist.length} Tickers</span>
            </div>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {tickers.filter(t => watchlist.includes(t.symbol)).map(t => (
                <div
                  key={t.symbol}
                  onClick={() => { setSelectedStock(t); setActiveTab('stocks'); }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/60 cursor-pointer text-xs transition"
                >
                  <span className="font-bold text-slate-200">{t.symbol}</span>
                  <div className="text-right font-mono">
                    <div className="text-slate-200">${t.price.toFixed(2)}</div>
                    <div className={t.change >= 0 ? 'text-emerald-400 text-[10px]' : 'text-rose-400 text-[10px]'}>
                      {t.change >= 0 ? '+' : ''}{t.changePercent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN DYNAMIC CONTENT AREA --- */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: MAIN DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Hero Banner with Gemini AI Brief */}
              <div className="bg-gradient-to-r from-[#131B2E] via-[#1A253D] to-[#141E36] border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-0"></div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold tracking-wider uppercase">
                    <Sparkles className="w-4 h-4 animate-pulse" /> Gemini AI Daily Market Intelligence Brief
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Bullish Momentum Sustained Across Semiconductor & Tech Sectors
                  </h1>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">
                    Institutional capital inflows remain strong following positive CPI data. High-conviction AI sentiment algorithms project target resistance test for <span className="text-emerald-400 font-semibold">NVDA ($128.50)</span> and <span className="text-emerald-400 font-semibold">AAPL ($195.00)</span> over the next 10 trading sessions.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('ai')}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
                    >
                      Run Full Gemini AI Audit <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveTab('stocks')}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 transition"
                    >
                      Open Live Technical Chart
                    </button>
                  </div>
                </div>
              </div>

              {/* Ticker Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickers.slice(0, 6).map(stock => (
                  <div
                    key={stock.symbol}
                    onClick={() => { setSelectedStock(stock); setActiveTab('stocks'); }}
                    className="bg-[#131B2E] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition cursor-pointer group shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-white group-hover:text-emerald-400 transition">{stock.symbol}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            stock.signal === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            AI: {stock.signal}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-0.5">{stock.name}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleWatchlist(stock.symbol); }}
                        className="text-slate-500 hover:text-amber-400 transition"
                      >
                        <Bookmark className={`w-4 h-4 ${watchlist.includes(stock.symbol) ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between font-mono">
                      <span className="text-xl font-bold text-white">${stock.price.toFixed(2)}</span>
                      <span className={`text-xs font-semibold flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {stock.change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                      </span>
                    </div>

                    {/* Mini Sparkline Simulation */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>RSI(14): <strong className={stock.rsi > 70 ? 'text-amber-400' : 'text-slate-200'}>{stock.rsi}</strong></span>
                      <span>Vol: {stock.volume}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout: Portfolio PnL & News Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Portfolio Summary Card */}
                <div className="bg-[#131B2E] border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                      <PieChartIcon className="w-4 h-4 text-emerald-400" /> Portfolio Holdings
                    </span>
                    <button onClick={() => setActiveTab('portfolio')} className="text-xs text-emerald-400 hover:underline font-medium">Manage</button>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Total Asset Value</span>
                    <span className="text-2xl font-bold font-mono text-white">$124,850.00</span>
                    <span className="text-xs font-mono text-emerald-400 ml-2 font-semibold">+$14,250.00 (+12.9%)</span>
                  </div>
                  <div className="space-y-2">
                    {INITIAL_HOLDINGS.map(h => (
                      <div key={h.symbol} className="flex items-center justify-between text-xs p-2 bg-[#0B0F17] rounded-lg">
                        <span className="font-bold text-slate-200">{h.symbol} ({h.shares} sh)</span>
                        <span className="font-mono text-emerald-400 font-medium">+${((h.currentPrice - h.avgPrice) * h.shares).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Financial News Feed */}
                <div className="lg:col-span-2 bg-[#131B2E] border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400" /> Live AI-Scored Market News
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Updated real-time</span>
                  </div>
                  <div className="space-y-3">
                    {NEWS_FEED.map(news => (
                      <div key={news.id} className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl hover:border-slate-700 transition space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{news.symbol} • {news.source}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            news.sentiment === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {news.sentiment} (Score: {news.score})
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-200 hover:text-white cursor-pointer">{news.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono block">{news.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: TECHNICAL ANALYSIS & STOCK DETAIL */}
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              
              {/* Header Selector Bar */}
              <div className="bg-[#131B2E] border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <select
                    value={selectedStock.symbol}
                    onChange={e => {
                      const found = tickers.find(t => t.symbol === e.target.value);
                      if (found) setSelectedStock(found);
                    }}
                    className="bg-[#0B0F17] border border-slate-700 text-white font-bold text-lg rounded-xl px-4 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    {tickers.map(t => (
                      <option key={t.symbol} value={t.symbol}>{t.symbol} - {t.name}</option>
                    ))}
                  </select>
                  <div>
                    <span className="text-2xl font-bold font-mono text-white">${selectedStock.price.toFixed(2)}</span>
                    <span className={`ml-2 text-xs font-semibold font-mono ${selectedStock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent}%
                    </span>
                  </div>
                </div>

                {/* Timeframe Selectors */}
                <div className="flex items-center bg-[#0B0F17] border border-slate-800 rounded-xl p-1 text-xs font-semibold font-mono">
                  {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-lg transition ${timeframe === tf ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Placeholder Box */}
              <div className="bg-[#131B2E] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>Interactive Technical Chart (TradingView Lightweight Engine)</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">EMA(20): 185.40</span>
                    <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">RSI(14): {selectedStock.rsi}</span>
                  </div>
                </div>

                {/* Canvas / SVG Candlestick Mock Rendering */}
                <div className="h-80 w-full bg-[#0B0F17] border border-slate-800 rounded-xl flex items-end p-4 gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                  {Array.from({ length: 28 }).map((_, idx) => {
                    const isUp = Math.sin(idx * 1.5) > -0.2;
                    const heightPercent = 20 + Math.abs(Math.sin(idx)) * 65;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div className={`w-1 font-mono text-[8px] ${isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ height: `${heightPercent + 10}%` }}></div>
                        <div className={`w-full rounded-sm ${isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ height: `${heightPercent}%` }}></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Indicator Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1">
                  <span className="text-slate-400 block">Relative Strength (RSI)</span>
                  <span className="text-lg font-bold text-slate-100">{selectedStock.rsi}</span>
                  <span className="text-[10px] text-emerald-400 block">Neutral Momentum</span>
                </div>
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1">
                  <span className="text-slate-400 block">Market Cap</span>
                  <span className="text-lg font-bold text-slate-100">{selectedStock.cap}</span>
                  <span className="text-[10px] text-slate-500 block">Mega Cap</span>
                </div>
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1">
                  <span className="text-slate-400 block">P/E Ratio</span>
                  <span className="text-lg font-bold text-slate-100">{selectedStock.pe}</span>
                  <span className="text-[10px] text-slate-500 block">Industry Avg: 28.5</span>
                </div>
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1">
                  <span className="text-slate-400 block">AI Trading Signal</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedStock.signal}</span>
                  <span className="text-[10px] text-emerald-400 block">88% Confidence</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: GEMINI AI INSIGHTS & CHAT */}
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: AI Sentiment Report */}
              <div className="lg:col-span-2 bg-[#131B2E] border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Gemini AI Technical & Sentiment Audit</h2>
                      <span className="text-xs text-slate-400">Target Ticker: {selectedStock.symbol} ({selectedStock.name})</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs rounded-full">
                    88% BULLISH CONFIDENCE
                  </span>
                </div>

                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Growth Drivers & Catalysts
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
                    <li>Sustained institutional accumulation observed over 20 consecutive trading days.</li>
                    <li>MACD bullish crossover confirmed on 1-Day timeframe chart.</li>
                    <li>Gemini NLP sentiment score across financial media news sits at +0.84 (Highly Optimistic).</li>
                  </ul>

                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 pt-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Risk Factors
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
                    <li>RSI indicator approaching overbought territory (74.1). Short-term pullback possible.</li>
                    <li>Macroeconomic volatility ahead of upcoming Federal Reserve rate announcements.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Conversational AI Chat Box */}
              <div className="bg-[#131B2E] border border-slate-800 rounded-2xl p-5 flex flex-col h-[500px]">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-3 text-xs font-bold text-slate-200">
                  <Sparkles className="w-4 h-4 text-purple-400" /> TradeVision AI Chat Assistant
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
                  {aiChatMessages.map((msg, i) => (
                    <div key={i} className={`p-3 rounded-xl max-w-[85%] ${
                      msg.sender === 'user' ? 'bg-emerald-600 text-white ml-auto font-medium' : 'bg-[#0B0F17] text-slate-200 border border-slate-800'
                    }`}>
                      {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendAiMessage} className="mt-3 flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask AI about NVDA support level or portfolio..."
                    value={aiChatInput}
                    onChange={e => setAiChatInput(e.target.value)}
                    className="flex-1 bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <button type="submit" className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 4: PORTFOLIO MANAGEMENT */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Investment Portfolio Overview</h2>
                  <span className="text-xs text-slate-400">Track holdings, total return & PnL</span>
                </div>
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition">
                  <Plus className="w-4 h-4" /> Add Transaction
                </button>
              </div>

              {/* Holdings Table */}
              <div className="bg-[#131B2E] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0E1524] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Ticker Symbol</th>
                      <th className="p-4">Shares</th>
                      <th className="p-4">Avg Price</th>
                      <th className="p-4">Current Price</th>
                      <th className="p-4">Total Value</th>
                      <th className="p-4">Unrealized PnL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {INITIAL_HOLDINGS.map(h => {
                      const value = h.shares * h.currentPrice;
                      const pnl = (h.currentPrice - h.avgPrice) * h.shares;
                      const pnlPercent = ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100;
                      return (
                        <tr key={h.symbol} className="hover:bg-slate-800/50 transition">
                          <td className="p-4 font-bold text-white">{h.symbol}</td>
                          <td className="p-4">{h.shares}</td>
                          <td className="p-4">${h.avgPrice.toFixed(2)}</td>
                          <td className="p-4">${h.currentPrice.toFixed(2)}</td>
                          <td className="p-4 font-bold text-white">${value.toFixed(2)}</td>
                          <td className="p-4 font-bold text-emerald-400">
                            +${pnl.toFixed(2)} (+{pnlPercent.toFixed(2)}%)
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SCREENER */}
          {activeTab === 'screener' && (
            <div className="bg-[#131B2E] border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Stock Screener Engine</h2>
              <p className="text-xs text-slate-400">Filter tickers by RSI, Market Cap, PE Ratio, and AI Sentiment Signals.</p>
              <div className="flex gap-4">
                <input type="text" placeholder="Min Market Cap ($B)" className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                <input type="text" placeholder="Max RSI" className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
                <button className="px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-xl">Run Filter</button>
              </div>
            </div>
          )}

          {/* TAB 6: BACKTESTING */}
          {activeTab === 'backtest' && (
            <div className="bg-[#131B2E] border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Algorithmic Strategy Backtester</h2>
              <p className="text-xs text-slate-400">Simulate historical strategy returns and Sharpe ratio across 5 years of stock price data.</p>
              <div className="p-4 bg-[#0B0F17] border border-slate-800 rounded-xl text-xs space-y-2 font-mono">
                <div>Strategy: <span className="text-emerald-400">EMA 20/50 Golden Cross</span></div>
                <div>Simulated CAGR: <span className="text-emerald-400">+24.5% / Year</span></div>
                <div>Sharpe Ratio: <span className="text-emerald-400">2.15</span></div>
                <div>Max Drawdown: <span className="text-rose-400">-14.2%</span></div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#070A10] border-t border-slate-800/80 px-6 py-3 text-center text-xs text-slate-500 flex flex-wrap justify-between items-center gap-2">
        <span>© 2026 TradeVision AI Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">API Documentation</a>
        </div>
      </footer>

    </div>
  );
}
