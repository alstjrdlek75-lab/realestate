import React from 'react';
import { ArrowRight, TrendingUp, Home, CheckCircle2, Layers, Compass, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-100/60 via-blue-50/40 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-[#03c75a]" />
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            2026 서울 & 경기도(남양주·구리·용인·수원·동탄) 부동산 매수 진단기
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.18]">
          살기 좋은 집<span className="text-[#03c75a]">(Living)</span>과 <br className="hidden sm:inline" />
          사야 하는 집<span className="text-[#0066ff]">(Buying)</span>은 다릅니다
        </h1>
        
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          서울 핵심지부터 <strong className="text-slate-900">남양주 다산·별내, 구리, 용인 수지, 수원 광교·영통</strong>까지 <br className="hidden sm:inline" />
          내 예산에 꼭 맞는 <span className="text-[#03c75a] font-bold">3대 부동산 매수 전략</span>과 권역별 추천 단지를 진단해보세요.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#03c75a] hover:bg-[#02b14f] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <Compass className="w-5 h-5" />
            <span>내 부동산 성향 & 최적 전략 진단하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
            <span>DSR 40% 기반 안전 예산 산출</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#0066ff]" />
            <span>2x2 매트릭스 & 6각 레이더 분석</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
            <span>수도권 15대 핵심 권역 1:1 비교</span>
          </div>
        </div>
      </div>

      {/* 3 Strategy Teaser Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Strategy Card 1 */}
        <div className="naver-card naver-card-hover p-6 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f8ee] flex items-center justify-center text-[#029f45] mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#029f45] bg-[#e8f8ee] px-2.5 py-1 rounded-full">
            전략 A
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-3">거주·투자 분리 전략</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            상급지 아파트 전세 낀 갭투자로 자본 상승을 선점하고, 실거주는 직주근접 가성비 전월세로 워라밸 확보
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>추천 타겟</span>
            <span className="text-slate-800 font-bold">사회초년생 · 직주근접 중시</span>
          </div>
        </div>

        {/* Strategy Card 2 */}
        <div className="naver-card naver-card-hover p-6 relative overflow-hidden border-2 border-[#0066ff]/30 shadow-md group bg-gradient-to-b from-[#edf4ff]/40 to-white">
          <div className="absolute top-0 right-0 bg-[#0066ff] text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            인기 전략
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#edf4ff] flex items-center justify-center text-[#0066ff] mb-4 group-hover:scale-110 transition-transform">
            <Home className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066ff] bg-[#edf4ff] px-2.5 py-1 rounded-full">
            전략 B
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-3">황금 교집합 실거주</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            업무지구 45분 이내 신축 대단지 자가 매수. 1주택 비과세 혜택과 하이엔드 주거 만족 동시 달성 (광교, 수지, 미사 등)
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>추천 타겟</span>
            <span className="text-slate-800 font-bold">신혼부부 · 학령기 자녀 가구</span>
          </div>
        </div>

        {/* Strategy Card 3 */}
        <div className="naver-card naver-card-hover p-6 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
            전략 C
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-3">스마트 징검다리 전략</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            감당 가능한 8호선(다산/별내/구리), 1기 신도시(평촌/산본) 역세권 1단계 매수 후, 비과세 차익으로 상급지 점프
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>추천 타겟</span>
            <span className="text-slate-800 font-bold">소자본 시드머니 · 첫 내집마련</span>
          </div>
        </div>
      </div>
    </section>
  );
};
