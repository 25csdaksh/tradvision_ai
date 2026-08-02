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
  Bookmark,
  Compass,
  Cpu,
  Globe,
  Lock,
  Star
} from 'lucide-react';

// --- MOCK MARKET TICKER DATA ---
const INITIAL_TICKERS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.35, changePercent: 1.25, volume: '54.2M', cap: '$2.91T', pe: 31.2, rsi: 62.4, signal: 'BUY', confidence: '88%' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 124.20, change: 4.10, changePercent: 3.41, volume: '89.1M', cap: '$3.05T', pe: 72.8, rsi: 74.1, signal: 'BUY', confidence: '94%' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 210.50, change: -4.62, changePercent: -2.15, volume: '41.8M', cap: '$670B', pe: 61.4, rsi: 41.2, signal: 'HOLD', confidence: '62%' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 448.90, change: 3.80, changePercent: 0.85, volume: '22.4M', cap: '$3.33T', pe: 38.5, rsi: 58.9, signal: 'BUY', confidence: '85%' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 186.30, change: 1.90, changePercent: 1.03, volume: '33.1M', cap: '$1.94T', pe: 42.1, rsi: 55.3, signal: 'BUY', confidence: '81%' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 177.40, change: -1.10, changePercent: -0.62, volume: '19.5M', cap: '$2.21T', pe: 26.8, rsi: 48.6, signal: 'HOLD', confidence: '65%' }
];

const MARKET_INDICES = [
  { name: 'S&P 500', value: '5,521.82', change: '+34.20', percent: '+0.62%', isUp: true },
  { name: 'NASDAQ', value: '17,688.40', change: '+182.10', percent: '+1.04%', isUp: true },
  { name: 'DOW JONES', value: '40,842.30', change: '-45.10', percent: '-0.11%', isUp: false },
  { name: 'NIFTY 50', value: '24,520.15', change: '+208.40', percent: '+0.85%', isUp: true }
];

const INITIAL_HOLDINGS = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 100, avgPrice: 150.00, currentPrice: 189.84, sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 150, avgPrice: 85.00, currentPrice: 124.20, sector: 'Semiconductor' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 40, avgPrice: 380.00, currentPrice: 448.90, sector: 'Software' }
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
    { sender: 'ai', text: 'Hello! I am your TradeVision Gemini AI Assistant. Ask me about technical indicators, stock price targets, or portfolio rebalancing strategies.' }
  ]);

  // Live simulation tick updates
  const [tickers, setTickers] = useState(INITIAL_TICKERS);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev =>
        prev.map(item => {
          const delta = (Math.random() - 0.49) * 0.75;
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
    }, 2500);
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
      let reply = `Based on Gemini AI analysis for "${userText}": Momentum indicators remain strongly bullish. EMA(20) at $185.40 acts as key dynamic support, with target resistance at $195.00.`;
      if (userText.toLowerCase().includes('nvda')) {
        reply = "NVIDIA (NVDA) maintains an exceptional 94% bullish confidence rating driven by hyperscaler AI datacenter spend. Current RSI sits at 74.1. Brief consolidation near $122 before leg up to $132.";
      } else if (userText.toLowerCase().includes('portfolio')) {
        reply = "Your portfolio total value is $124,850.00 (+12.9% return). However, 100% of holdings are allocated to Tech/Semiconductors. Rebalancing 15% into Defensive Dividend or Index ETFs is recommended.";
      }
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      
      {/* --- TOP LIVE MARKET STREAMING TICKER BAR --- */}
      <div className="bg-[#070A10] border-b border-slate-800/80 px-4 py-2 overflow-x-auto flex items-center gap-6 text-xs text-slate-400 no-scrollbar">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider shrink-0 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Live Stream
        </div>
        {MARKET_INDICES.map((idx, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0 border-r border-slate-800/60 pr-4">
            <span className="font-medium text-slate-300">{idx.name}</span>
            <span className="font-mono text-slate-100 font-semibold">{idx.value}</span>
            <span className={`font-mono flex items-center font-bold text-[11px] ${idx.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {idx.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {idx.percent}
            </span>
          </div>
        ))}
      </div>

      {/* --- MAIN HEADER NAVBAR --- */}
      <header className="bg-[#131B2E]/95 backdrop-blur-md border-b border-slate-800/90 sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between gap-4 shadow-xl">
        {/* Brand Logo */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              TradeVision <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase font-semibold">Institutional SaaS Platform</span>
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
            className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-10 pr-12 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
          <kbd className="hidden sm:inline-block absolute right-3 text-[10px] font-mono text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </div>

        {/* User Actions & Tier Status */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold shadow-ai-glow">
            <Sparkles className="w-3.5 h-3.5" /> PRO TIER ACTIVE
          </span>
          <button className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 relative transition border border-slate-700/60">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-2"></span>
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-bold text-xs flex items-center justify-center shadow-md">
            TV
          </div>
        </div>
      </header>

      {/* --- APP BODY LAYOUT --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* --- NAVIGATION SIDEBAR --- */}
        <aside className="w-64 bg-[#0E1524] border-r border-slate-800/80 p-4 hidden lg:flex flex-col justify-between shrink-0">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500 px-3 mb-2 uppercase tracking-wider font-mono">Workspace Navigation</div>
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'dashboard' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-glow' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" /> Market Overview
            </button>

            <button
              onClick={() => setActiveTab('stocks')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'stocks' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-glow' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <BarChart2 className="w-4 h-4" /> Technical Analysis
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'ai' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-ai-glow' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" /> Gemini AI Intelligence
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'portfolio' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-glow' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <PieChartIcon className="w-4 h-4" /> Portfolio Management
            </button>

            <button
              onClick={() => setActiveTab('screener')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'screener' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-glow' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Filter className="w-4 h-4" /> Stock Screener Engine
            </button>

            <button
              onClick={() => setActiveTab('backtest')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'backtest' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-glow' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" /> Strategy Backtester
            </button>
          </div>

          {/* Quick Watchlist Card in Sidebar */}
          <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5"><Bookmark className="w-3.5 h-3.5 text-emerald-400" /> Watchlist</span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{watchlist.length} Tickers</span>
            </div>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {tickers.filter(t => watchlist.includes(t.symbol)).map(t => (
                <div
                  key={t.symbol}
                  onClick={() => { setSelectedStock(t); setActiveTab('stocks'); }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 cursor-pointer text-xs transition border border-transparent hover:border-slate-700"
                >
                  <span className="font-bold text-slate-100">{t.symbol}</span>
                  <div className="text-right font-mono">
                    <div className="text-slate-200 font-semibold">${t.price.toFixed(2)}</div>
                    <div className={t.change >= 0 ? 'text-emerald-400 text-[10px] font-bold' : 'text-rose-400 text-[10px] font-bold'}>
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
              
              {/* Hero Banner with Gemini AI Daily Brief */}
              <div className="bg-gradient-to-r from-[#131B2E] via-[#1C2742] to-[#141F38] border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold tracking-wider uppercase font-mono">
                    <Sparkles className="w-4 h-4 animate-pulse" /> Gemini AI Daily Market Intelligence Brief
                  </div>
                  <h1 className="text-2xl font-black text-white tracking-tight leading-snug">
                    Institutional Bullish Momentum Sustained in Semiconductors & Big Tech
                  </h1>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">
                    Gemini AI sentiment algorithms detect high-conviction order flow across tech equities following favorable CPI inflation reads. Target resistance test projected for <span className="text-emerald-400 font-bold font-mono">NVDA ($128.50)</span> and <span className="text-emerald-400 font-bold font-mono">AAPL ($195.00)</span> over the coming trading sessions.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('ai')}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
                    >
                      Run Full AI Audit <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('stocks')}
                      className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition"
                    >
                      Open Live Technical Chart
                    </button>
                  </div>
                </div>
              </div>

              {/* Ticker Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickers.map(stock => (
                  <div
                    key={stock.symbol}
                    onClick={() => { setSelectedStock(stock); setActiveTab('stocks'); }}
                    className="bg-[#131B2E] border border-slate-800/90 hover:border-emerald-500/60 rounded-2xl p-4.5 transition-all cursor-pointer group shadow-xl hover:shadow-2xl hover:translate-y-[-2px]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg text-white group-hover:text-emerald-400 transition">{stock.symbol}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                            stock.signal === 'BUY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            AI: {stock.signal} ({stock.confidence})
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-0.5 font-medium">{stock.name}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleWatchlist(stock.symbol); }}
                        className="text-slate-500 hover:text-amber-400 transition p-1"
                      >
                        <Bookmark className={`w-4 h-4 ${watchlist.includes(stock.symbol) ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between font-mono">
                      <span className="text-2xl font-black text-white">${stock.price.toFixed(2)}</span>
                      <span className={`text-xs font-bold flex items-center ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {stock.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>RSI(14): <strong className={stock.rsi > 70 ? 'text-amber-400 font-bold' : 'text-slate-200 font-bold'}>{stock.rsi}</strong></span>
                      <span>Volume: <strong className="text-slate-200 font-bold">{stock.volume}</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Layout: Portfolio & News */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Portfolio Summary Card */}
                <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <PieChartIcon className="w-4 h-4 text-emerald-400" /> Portfolio Holdings
                    </span>
                    <button onClick={() => setActiveTab('portfolio')} className="text-xs text-emerald-400 hover:underline font-bold">Manage</button>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Total Asset Value</span>
                    <span className="text-2xl font-black font-mono text-white">$124,850.00</span>
                    <span className="text-xs font-mono text-emerald-400 ml-2 font-bold">+$14,250.00 (+12.9%)</span>
                  </div>
                  <div className="space-y-2">
                    {INITIAL_HOLDINGS.map(h => (
                      <div key={h.symbol} className="flex items-center justify-between text-xs p-2.5 bg-[#0B0F17] rounded-xl border border-slate-800/80">
                        <span className="font-bold text-slate-200">{h.symbol} ({h.shares} sh)</span>
                        <span className="font-mono text-emerald-400 font-bold">+${((h.currentPrice - h.avgPrice) * h.shares).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live News Feed */}
                <div className="lg:col-span-2 bg-[#131B2E] border border-slate-800/90 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400" /> AI-Scored Live Market News
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Updated Real-Time</span>
                  </div>
                  <div className="space-y-3">
                    {NEWS_FEED.map(news => (
                      <div key={news.id} className="p-3.5 bg-[#0B0F17] border border-slate-800/80 rounded-xl hover:border-slate-700 transition space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">{news.symbol} • {news.source}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                            news.sentiment === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {news.sentiment} (Score: {news.score})
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 hover:text-white cursor-pointer transition">{news.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono block">{news.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: TECHNICAL ANALYSIS */}
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              
              {/* Header Selector Bar */}
              <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <select
                    value={selectedStock.symbol}
                    onChange={e => {
                      const found = tickers.find(t => t.symbol === e.target.value);
                      if (found) setSelectedStock(found);
                    }}
                    className="bg-[#0B0F17] border border-slate-700 text-white font-black text-xl rounded-xl px-4 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    {tickers.map(t => (
                      <option key={t.symbol} value={t.symbol}>{t.symbol} - {t.name}</option>
                    ))}
                  </select>
                  <div>
                    <span className="text-3xl font-black font-mono text-white">${selectedStock.price.toFixed(2)}</span>
                    <span className={`ml-2.5 text-xs font-bold font-mono ${selectedStock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent}%
                    </span>
                  </div>
                </div>

                {/* Timeframe Selectors */}
                <div className="flex items-center bg-[#0B0F17] border border-slate-800 rounded-xl p-1 text-xs font-bold font-mono">
                  {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3.5 py-1.5 rounded-lg transition ${timeframe === tf ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Component */}
              <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Interactive TradingView Technical Candlestick Engine</span>
                  <div className="flex gap-2 font-mono">
                    <span className="px-2.5 py-1 bg-[#0B0F17] border border-slate-800 rounded text-slate-300">EMA(20): 185.40</span>
                    <span className="px-2.5 py-1 bg-[#0B0F17] border border-slate-800 rounded text-slate-300">RSI(14): {selectedStock.rsi}</span>
                  </div>
                </div>

                {/* Candlestick Graphic */}
                <div className="h-80 w-full bg-[#0B0F17] border border-slate-800/80 rounded-xl flex items-end p-4 gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                  {Array.from({ length: 32 }).map((_, idx) => {
                    const isUp = Math.sin(idx * 1.4) > -0.25;
                    const heightPercent = 25 + Math.abs(Math.sin(idx)) * 60;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div className={`w-1 font-mono text-[8px] ${isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ height: `${heightPercent + 12}%` }}></div>
                        <div className={`w-full rounded-sm ${isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ height: `${heightPercent}%` }}></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Indicator Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
                  <span className="text-slate-400 block font-sans">Relative Strength (RSI)</span>
                  <span className="text-xl font-black text-slate-100">{selectedStock.rsi}</span>
                  <span className="text-[10px] text-emerald-400 block font-bold">Neutral Momentum</span>
                </div>
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
                  <span className="text-slate-400 block font-sans">Market Cap</span>
                  <span className="text-xl font-black text-slate-100">{selectedStock.cap}</span>
                  <span className="text-[10px] text-slate-500 block">Mega Cap Ticker</span>
                </div>
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
                  <span className="text-slate-400 block font-sans">P/E Ratio</span>
                  <span className="text-xl font-black text-slate-100">{selectedStock.pe}</span>
                  <span className="text-[10px] text-slate-500 block">Industry Avg: 28.5</span>
                </div>
                <div className="bg-[#131B2E] border border-slate-800 p-4 rounded-xl space-y-1 shadow-md">
                  <span className="text-slate-400 block font-sans">AI Signal & Score</span>
                  <span className="text-xl font-black text-emerald-400">{selectedStock.signal}</span>
                  <span className="text-[10px] text-emerald-400 block font-bold">{selectedStock.confidence} Confidence</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: GEMINI AI INSIGHTS */}
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: AI Sentiment Report */}
              <div className="lg:col-span-2 bg-[#131B2E] border border-slate-800/90 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 shadow-ai-glow">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Gemini AI Deep Sentiment Audit</h2>
                      <span className="text-xs text-slate-400 font-mono">Target Symbol: {selectedStock.symbol} ({selectedStock.name})</span>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs rounded-full font-mono">
                    88% BULLISH CONFIDENCE
                  </span>
                </div>

                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Catalysts & Growth Drivers
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                    <li>Sustained institutional accumulation over 20 consecutive trading sessions.</li>
                    <li>MACD bullish crossover confirmed on 1-Day timeframe chart.</li>
                    <li>NLP sentiment score across global financial press sits at +0.84 (Highly Optimistic).</li>
                  </ul>

                  <h3 className="text-sm font-bold text-white flex items-center gap-2 pt-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Risk Factors
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                    <li>RSI indicator approaching overbought levels ({selectedStock.rsi}). Minor consolidation possible.</li>
                    <li>Macroeconomic volatility ahead of upcoming FOMC rate announcements.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Conversational AI Chat Box */}
              <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl p-5 flex flex-col h-[520px] shadow-xl">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-3 text-xs font-bold text-slate-200">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Gemini AI Chat Assistant
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
                  {aiChatMessages.map((msg, i) => (
                    <div key={i} className={`p-3.5 rounded-xl max-w-[85%] leading-relaxed ${
                      msg.sender === 'user' ? 'bg-emerald-600 text-white ml-auto font-medium shadow-md' : 'bg-[#0B0F17] text-slate-200 border border-slate-800'
                    }`}>
                      {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendAiMessage} className="mt-3 flex gap-2 pt-3 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask Gemini AI about stock targets..."
                    value={aiChatInput}
                    onChange={e => setAiChatInput(e.target.value)}
                    className="flex-1 bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <button type="submit" className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition shadow-md">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 4: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Investment Portfolio Overview</h2>
                  <span className="text-xs text-slate-400">Track holdings, return & PnL</span>
                </div>
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition">
                  <Plus className="w-4 h-4" /> Add Position
                </button>
              </div>

              <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl">
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
            <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-white">Stock Screener Engine</h2>
              <p className="text-xs text-slate-400">Filter tickers by RSI, Market Cap, PE Ratio, and AI Signals.</p>
              <div className="flex gap-4">
                <input type="text" placeholder="Min Market Cap ($B)" className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white" />
                <input type="text" placeholder="Max RSI" className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white" />
                <button className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md">Run Filter</button>
              </div>
            </div>
          )}

          {/* TAB 6: BACKTESTING */}
          {activeTab === 'backtest' && (
            <div className="bg-[#131B2E] border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-white">Algorithmic Strategy Backtester</h2>
              <p className="text-xs text-slate-400">Simulate strategy returns and Sharpe ratio across historical data.</p>
              <div className="p-4 bg-[#0B0F17] border border-slate-800 rounded-xl text-xs space-y-2 font-mono">
                <div>Strategy: <span className="text-emerald-400 font-bold">EMA 20/50 Golden Cross</span></div>
                <div>Simulated CAGR: <span className="text-emerald-400 font-bold">+24.5% / Year</span></div>
                <div>Sharpe Ratio: <span className="text-emerald-400 font-bold">2.15</span></div>
                <div>Max Drawdown: <span className="text-rose-400 font-bold">-14.2%</span></div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#070A10] border-t border-slate-800/80 px-6 py-3.5 text-center text-xs text-slate-500 flex flex-wrap justify-between items-center gap-2">
        <span>© 2026 TradeVision AI Inc. All rights reserved.</span>
        <div className="flex gap-4 font-medium">
          <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition">API Documentation</a>
        </div>
      </footer>

    </div>
  );
}
