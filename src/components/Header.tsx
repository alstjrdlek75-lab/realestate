import React from 'react';
import { Building2, RefreshCw, Share2, Compass, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onGoToDiagnostic: () => void;
  onGoToRegionalExplorer?: () => void;
  isResultView: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onReset, 
  onGoToDiagnostic, 
  onGoToRegionalExplorer,
  isResultView 
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isResultView ? (
            <>
              {onGoToRegionalExplorer && (
                <button
                  onClick={onGoToRegionalExplorer}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition"
                >
                  <MapPin className="w-4 h-4 text-[#03c75a]" />
                  <span>지역별 탐색기</span>
                </button>
              )}
              <button
                onClick={onGoToDiagnostic}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>재진단</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-bold shadow-sm transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? '복사됨!' : '리포트 공유'}</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#03c75a]" />
                <span>2026 수도권 실거래 데이터 기반</span>
              </div>
              <button
                onClick={onGoToDiagnostic}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4" />
                <span>지금 진단 시작</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
