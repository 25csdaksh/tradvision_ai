import React, { useState } from 'react';
import {
  LayoutGrid,
  TrendingUp,
  Wallet,
  FileText,
  Clock,
  Users,
  Settings,
  LogOut,
  Search,
  Bell,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Sparkles,
  Wifi,
  CreditCard,
  PieChart,
  Activity,
  CheckCircle2
} from 'lucide-react';

// --- MOCK TRANSACTION HISTORY ---
const TRANSACTIONS = [
  {
    id: 1,
    name: 'Dribbble Design',
    change: '+18.67%',
    date: '16 Jun 2025',
    time: '10:30 PM',
    status: 'Successful',
    amount: '89,345.23 USD',
    color: 'bg-pink-500/10 text-pink-600',
    initials: '🎨'
  },
  {
    id: 2,
    name: 'Google Pay',
    change: '+9.34%',
    date: '15 Jun 2025',
    time: '11:45 PM',
    status: 'Successful',
    amount: '12,345.89 USD',
    color: 'bg-blue-500/10 text-blue-600',
    initials: 'G'
  },
  {
    id: 3,
    name: 'Amazon Shopping',
    change: '+12.23%',
    date: '14 Jun 2025',
    time: '10:15 PM',
    status: 'Successful',
    amount: '32,123.67 USD',
    color: 'bg-amber-500/10 text-amber-600',
    initials: 'a'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'documents' | 'history' | 'contacts'>('dashboard');
  const [activeDock, setActiveDock] = useState<'home' | 'analytics' | 'wallet' | 'transactions' | 'settings'>('home');
  const [chartToggle, setChartToggle] = useState<'Monthly' | 'Annually'>('Annually');

  return (
    <div className="min-h-screen bg-[#EFEFF4] p-4 sm:p-6 md:p-8 flex items-center justify-center font-sans antialiased text-slate-800 selection:bg-emerald-500 selection:text-white">
      
      {/* MAIN CONTAINER DASHBOARD BOX */}
      <div className="bg-[#FAFAFC] rounded-[36px] border border-slate-200/90 shadow-2xl p-6 md:p-8 max-w-[1360px] w-full space-y-6">
        
        {/* --- TOP HEADER NAVIGATION --- */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-2">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
              <div className="grid grid-cols-2 gap-1 p-1">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="w-2 h-2 rounded-full bg-white/60"></span>
                <span className="w-2 h-2 rounded-full bg-white/60"></span>
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Quixotic</span>
          </div>

          {/* Center Pill Tab Navigation */}
          <nav className="bg-white border border-slate-200/80 rounded-full px-2 py-1.5 shadow-sm flex items-center gap-1">
            {(['Dashboard', 'Reports', 'Documents', 'History', 'Contacts'] as const).map(tab => {
              const lower = tab.toLowerCase() as typeof activeTab;
              const isActive = activeTab === lower;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(lower)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Avatar */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition">
              <Search className="w-4.5 h-4.5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2.5 right-2.5"></span>
            </button>
            
            {/* User Profile Avatar Pill */}
            <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-full p-1 pl-1 pr-3 shadow-sm cursor-pointer hover:bg-slate-50 transition">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

        </header>

        {/* --- WELCOME BANNER & ACTION BAR --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back, <span className="text-slate-700 font-normal">Sujon</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Selector Pill */}
            <div className="bg-white border border-slate-200/80 rounded-full px-4 py-2.5 shadow-sm flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 transition">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>29 Jun, 2025 - 29 August, 2025</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Add New Wallet Button */}
            <button className="bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-sm transition">
              <Plus className="w-4 h-4" /> Add New Wallet
            </button>
          </div>
        </div>

        {/* --- MAIN GRID LAYOUT WITH LEFT ICON DOCK --- */}
        <div className="flex gap-6">
          
          {/* LEFT FLOATING DOCK SIDEBAR */}
          <aside className="bg-white border border-slate-200/90 rounded-full p-2.5 flex flex-col justify-between items-center shadow-sm w-14 shrink-0">
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setActiveDock('home')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeDock === 'home' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <LayoutGrid className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => setActiveDock('analytics')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeDock === 'analytics' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => setActiveDock('wallet')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeDock === 'wallet' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Wallet className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => setActiveDock('transactions')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeDock === 'transactions' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4.5 h-4.5" />
              </button>

              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
                <Wallet className="w-4.5 h-4.5" />
              </button>

              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
                <Clock className="w-4.5 h-4.5" />
              </button>

              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
                <Activity className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Bottom Dock Settings & Logout */}
            <div className="flex flex-col items-center gap-3 pt-6">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
                <Settings className="w-4.5 h-4.5" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </aside>

          {/* RIGHT GRID CONTENT AREA */}
          <div className="flex-1 space-y-6 overflow-hidden">
            
            {/* ROW 1: THREE CARDS (CREDIT CARD + BAR CHART + BALANCE CHART) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* CARD 1: VISA CREDIT CARD & REVENUE */}
              <div className="space-y-4">
                {/* Green VISA Debit Card */}
                <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white rounded-[28px] p-6 shadow-lg shadow-emerald-700/20 relative overflow-hidden space-y-6">
                  
                  {/* Diagonal Arrow Action Button */}
                  <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center absolute top-5 right-5 text-white transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-emerald-100">Payment Goal</div>
                    <div className="text-[10px] text-emerald-200/80">Total amount goal</div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs font-bold tracking-widest uppercase mb-1">
                      <span>VISA</span>
                      <Wifi className="w-4 h-4 rotate-90 opacity-80" />
                    </div>
                    <div className="text-[10px] text-emerald-200/80">Credit Card</div>
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">$ 78,989.09</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono opacity-90 pt-2 border-t border-white/10">
                    <span>•••• 909090</span>
                    <span>EXP 09/26</span>
                  </div>
                </div>

                {/* Weekly Revenue Card */}
                <div className="bg-white border border-slate-200/80 rounded-[28px] p-5 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Weekly Revenue</span>
                    <span className="text-xl font-extrabold text-slate-900">+3,945 USD</span>
                  </div>
                  <span className="bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    +12.8%
                  </span>
                </div>
              </div>

              {/* CARD 2: MONTHLY ENGAGEMENT / RETURN BAR CHART */}
              <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm flex flex-col justify-between relative space-y-4">
                
                {/* Card Header & Toggle */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">Engagement Rate</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-1 rounded-full flex gap-1 text-[11px] font-semibold">
                      <button
                        onClick={() => setChartToggle('Monthly')}
                        className={`px-3 py-1 rounded-full transition ${chartToggle === 'Monthly' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setChartToggle('Annually')}
                        className={`px-3 py-1 rounded-full transition ${chartToggle === 'Annually' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Annually
                      </button>
                    </div>

                    <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Vertical Bar Chart Rendering */}
                <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 relative">
                  
                  {/* Highlight Tooltip Pill on Peak Bar */}
                  <div className="absolute top-2 left-[58%] -translate-x-1/2 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    +17.8%
                  </div>

                  {/* Monthly Bars */}
                  {[
                    { label: 'JAN', height: '45%', striped: true },
                    { label: 'FEB', height: '65%', striped: true },
                    { label: 'MAR', height: '55%', striped: true },
                    { label: 'APR', height: '90%', active: true },
                    { label: 'MAY', height: '70%', striped: true },
                    { label: 'JUN', height: '80%', striped: true }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end gap-2">
                      <div
                        className={`w-full rounded-2xl transition-all ${
                          bar.active ? 'bg-emerald-700 shadow-md' : 'bg-emerald-600/30 hover:bg-emerald-600/40'
                        }`}
                        style={{ height: bar.height }}
                      ></div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{bar.label}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* CARD 3: TOTAL BALANCE & WAVE CHART */}
              <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm flex flex-col justify-between space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Payment Goal</span>
                    <span className="text-[10px] text-slate-400">Total amount goal</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Balance Amount */}
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Total Balance</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">$32,678.90</div>
                </div>

                {/* Smooth Wavy Line Graphic */}
                <div className="h-20 w-full relative overflow-hidden flex items-center">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 300 80" fill="none">
                    <path
                      d="M0,50 Q40,10 80,40 T160,20 T240,60 T300,20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,50 Q40,10 80,40 T160,20 T240,60 T300,20 V80 H0 Z"
                      fill="currentColor"
                      fillOpacity="0.08"
                    />
                  </svg>
                </div>

                {/* Send & Receive Pill Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 shadow-md transition">
                    Send <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 transition">
                    Receive <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

            {/* ROW 2: TWO COLUMNS (TRANSACTION HISTORY TABLE + CREDIT METRIC) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* CARD 4: PAYMENT HISTORY TABLE */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Payment History</h3>
                    <span className="text-[11px] text-slate-400 font-medium">Recent payments history</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 font-mono">
                      <tr>
                        <th className="pb-3 font-semibold">Name</th>
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Time</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {TRANSACTIONS.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
                              {item.initials}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">{item.name}</span>
                              <span className="text-[10px] text-emerald-600 font-semibold">{item.change}</span>
                            </div>
                          </td>
                          <td className="py-3.5 font-medium text-slate-600">{item.date}</td>
                          <td className="py-3.5 font-mono text-slate-500 text-[11px]">{item.time}</td>
                          <td className="py-3.5">
                            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right font-extrabold font-mono text-slate-900">{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* CARD 5: AMOUNT OF CREDIT & MANDATORY PAYMENTS */}
              <div className="space-y-4">
                
                {/* Top Credit Amount Card */}
                <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Amount of credit</span>
                      <span className="text-[10px] text-slate-400">Total refund amount with fee</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">$8,945.89</span>
                    <span className="bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      +12.8%
                    </span>
                  </div>
                </div>

                {/* Bottom Mandatory Payments / Team Stack Card */}
                <div className="bg-white border border-slate-200/80 rounded-[28px] p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Mandatory Payments</span>
                      <span className="text-[10px] text-slate-400">Recent payments</span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Team Avatar Stack */}
                  <div className="flex items-center gap-2 pt-1">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" alt="User 1" />
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm -ml-3" alt="User 2" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm -ml-3" alt="User 3" />
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm -ml-3" alt="User 4" />
                    <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm -ml-3">
                      +2
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
