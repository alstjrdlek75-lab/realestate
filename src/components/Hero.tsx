import React from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Home, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Sparkles, 
  AlertTriangle, 
  Scale, 
  Coins, 
  ShieldAlert, 
  HelpCircle,
  Building2,
  Check
} from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-100/60 via-blue-50/40 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-[#03c75a]" />
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            2026 서울 & 경기도(남양주·구리·하남·용인·수원·성남) 부동산 매수 전략 진단기
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
          내 직장, 라이프스타일만 보고 덜컥 매수했다가 자산이 묶이는 실수를 피하세요. <br className="hidden sm:inline" />
          <strong className="text-slate-900">실거주 만족도</strong>와 <strong className="text-[#0066ff]">미래 자산 가치</strong>의 교집합을 찾아 가장 안전한 매수 전략을 도출합니다.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#03c75a] hover:bg-[#02b14f] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Compass className="w-5 h-5" />
            <span>내 부동산 성향 & 최적 전략 진단하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
            <span>DSR 40% 기반 안전 예산 산출</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#0066ff]" />
            <span>네이버 부동산 실거래가 기준 비교</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
            <span>수도권 29개 권역 단지별 실전 픽</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 핵심 설명 섹션: 왜 구매하는 곳과 사는 곳을 구분하여 신중히 매수해야 하는가? */}
      {/* ========================================================================= */}
      <div className="mt-14 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-5 border-b border-slate-100">
            <div>
              <div className="mb-2">
                <span className="text-[11px] font-black text-amber-600 tracking-wider uppercase bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  부동산 매수 필독 원칙
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug break-keep">
                왜 '살고 싶은 곳(Living)'과 '사야 하는 곳(Buying)'을 분리해야 할까요?
              </h2>
            </div>

            <span className="text-xs text-slate-500 font-medium break-keep">
              대한민국 가계 자산의 70%가 묶이는 부동산의 본질
            </span>
          </div>

          {/* 3 Core Reason Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: 소비재 vs 투자재의 본질적 차이 */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs mb-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>1. '소비재'와 '투자재'의 충돌</span>
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  내가 살기 편한 집이 <br />
                  남에게도 비싼 집은 아닙니다
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  직장 바로 앞 원룸, 부모님 댁 옆 노후 구축, 조용한 외곽 숲세권은 <strong>'현재 내 개인의 편의(소비)'</strong>를 채워줄 뿐입니다. 
                  하지만 자산 가치는 <strong>'다음 매수자가 줄을 서는가(환금성·일자리 철도망·학군)'</strong>에 의해 결정됩니다.
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-700 font-bold">
                ⚠️ 주거 감정에만 휩쓸려 매수하면 하락장에서 매도가 불가능해집니다.
              </div>
            </div>

            {/* Card 2: 5~10년 자본 잠김과 갈아타기 비용 */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs mb-2">
                  <Coins className="w-4 h-4 shrink-0" />
                  <span>2. 무거운 거래세와 자본 잠김</span>
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  한 번 잘못 사면 <br />
                  5~10년 동안 자본이 묶입니다
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  부동산은 주식과 다릅니다. 취득세(수천만 원), 중개보수, 주담대 이자, 2년 실거주 비과세 요건 때문에 <strong>한번 매수하면 쉽게 되돌릴 수 없습니다.</strong> 상승장에서 소외된 단지에 전 재산이 묶이면 상급지와의 격차가 영원히 벌어집니다.
                </p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-700 font-bold">
                💡 첫 매수 버튼을 누르기 전, DSR과 하방 경직성을 철저히 계산해야 합니다.
              </div>
            </div>

            {/* Card 3: 상황별 맞춤 최적화 해법 */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[#029f45] font-bold text-xs mb-2">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>3. 상황별 맞춤 최적화 해법</span>
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  내 자본 크기에 따라 <br />
                  전략을 명확히 선택해야 합니다
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  • <strong>예산이 충분할 때</strong>: 직주근접 + 대단지 1채 자가 실거주 (황금 교집합)<br />
                  • <strong>예산이 부족할 때</strong>: 핵심지 갭투자 + 직장 근처 전월세 거주 (거주·투자 분리)<br />
                  • <strong>첫 내집마련</strong>: 8호선/신분당선/GTX 축 1단계 매수 후 상급지 점프 (스마트 징검다리)
                </p>
              </div>
              <div className="p-2.5 bg-[#e8f8ee] rounded-xl border border-[#03c75a]/30 text-[11px] text-[#029f45] font-black">
                ✨ 본 진단기를 통해 내게 딱 맞는 최적의 매수 방식을 도출해드립니다.
              </div>
            </div>

          </div>

          {/* Comparison Matrix Box */}
          <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-[#03c75a] tracking-wider">
                CORE PRINCIPLE
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-100">
                "사는(거주) 곳은 내 삶의 질을 결정하지만, 사는(매수) 곳은 10년 뒤 내 순자산을 결정합니다."
              </p>
            </div>

            <button
              onClick={onStart}
              className="px-5 py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white font-extrabold text-xs sm:text-sm shrink-0 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>지금 나의 최적 포지션 진단하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Strategy Teaser Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Strategy Card 1 */}
        <div className="naver-card naver-card-hover p-6 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f8ee] flex items-center justify-center text-[#029f45] mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#029f45] bg-[#e8f8ee] px-2.5 py-1 rounded-full">
            전략 A
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-3">거주·투자 분리 전략</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            상급지 아파트 전세 낀 갭투자로 자본 상승을 선점하고, 실거주는 직주근접 가성비 전월세로 워라밸 확보
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
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
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            업무지구 45분 이내 신축 대단지 자가 매수. 1주택 비과세 혜택과 하이엔드 주거 만족 동시 달성 (광교, 수지, 미사 등)
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
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
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            감당 가능한 8호선(다산/별내/구리), 1기 신도시(평촌/산본) 역세권 1단계 매수 후, 비과세 차익으로 상급지 점프
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>추천 타겟</span>
            <span className="text-slate-800 font-bold">소자본 시드머니 · 첫 내집마련</span>
          </div>
        </div>
      </div>
    </section>
  );
};
