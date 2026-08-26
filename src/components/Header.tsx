import React from 'react';
import { Building2, RefreshCw, Share2, Compass, ShieldCheck, MapPin, Sparkles, BookOpen, History, Flame, Radio, Newspaper } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onGoToDiagnostic: () => void;
  onGoToHistory: () => void;
  onGoToFuture: () => void;
  onGoToNews: () => void;
  onGoToRegionalExplorer?: () => void;
  currentView: 'HERO' | 'DIAGNOSTIC' | 'RESULT' | 'HISTORY' | 'FUTURE' | 'NEWS';
}

export const Header: React.FC<HeaderProps> = ({ 
  onReset, 
  onGoToDiagnostic, 
  onGoToHistory,
  onGoToFuture,
  onGoToNews,
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
  const isNewsView = currentView === 'NEWS';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo (Naver Land style) */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#03c75a] flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-black text-base sm:text-xl tracking-tight text-slate-900 whitespace-nowrap">
                <span className="text-[#03c75a]">부동산</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30 hidden sm:inline-block">
                PRO 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden md:block">
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
            <span>신도시 & 재개발 미래지도</span>
          </button>

          <button
            onClick={onGoToNews}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              isNewsView ? 'bg-[#03c75a] text-white shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="px-1 py-0.2 rounded bg-white/20 text-[10px] font-black">Npay</span>
            <span>부동산 뉴스</span>
          </button>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Mobile Nav Tabs */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={onGoToNews}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition border cursor-pointer ${
                isNewsView ? 'bg-[#03c75a] text-white border-[#03c75a]' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              뉴스
            </button>
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
              미래지도
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
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>재진단</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? '복사됨!' : '공유'}</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onGoToDiagnostic}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>진단 시작</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
