import React from 'react';
import { Building2, RefreshCw, Share2, Compass, ShieldCheck, MapPin, Sparkles, BookOpen, History, Flame, Radio } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onGoToDiagnostic: () => void;
  onGoToHistory: () => void;
  onGoToFuture: () => void;
  onGoToRegionalExplorer?: () => void;
  currentView: 'HERO' | 'DIAGNOSTIC' | 'RESULT' | 'HISTORY' | 'FUTURE';
}

export const Header: React.FC<HeaderProps> = ({ 
  onReset, 
  onGoToDiagnostic, 
  onGoToHistory,
  onGoToFuture,
  onGoToRegionalExplorer,
  currentView
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isResultView = currentView === 'RESULT';
  const isHistoryView = currentView === 'HISTORY';
  const isFutureView = currentView === 'FUTURE';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo (Naver Land style) */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#03c75a] flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900">
                <span className="text-[#03c75a]">부동산</span> 매트릭스
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30">
                PRO 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              살기 좋은 집(Living) vs 사야 하는 집(Buying) 맞춤 진단기
            </p>
          </div>
        </div>

        {/* Center Nav Tabs (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={onReset}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
              currentView === 'HERO' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            홈 · 진단 안내
          </button>

          <button
            onClick={onGoToHistory}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer ${
              isHistoryView ? 'bg-white text-[#0066ff] shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>부동산 역사</span>
          </button>

          <button
            onClick={onGoToFuture}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer ${
              isFutureView ? 'bg-white text-[#029f45] shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#03c75a]" />
            <span>부동산 미래 & 3기 신도시</span>
          </button>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Nav Tabs */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={onGoToHistory}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition border cursor-pointer ${
                isHistoryView ? 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              역사
            </button>
            <button
              onClick={onGoToFuture}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition border cursor-pointer ${
                isFutureView ? 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              미래·3기
            </button>
          </div>

          {isResultView ? (
            <>
              {onGoToRegionalExplorer && (
                <button
                  onClick={onGoToRegionalExplorer}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#03c75a]" />
                  <span>지역별 탐색기</span>
                </button>
              )}
              <button
                onClick={onGoToDiagnostic}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>재진단</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? '복사됨!' : '공유'}</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onGoToDiagnostic}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>진단 시작</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
