import React, { useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Coins, 
  Train, 
  GraduationCap, 
  Building, 
  History, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface RealEstateHistoryProps {
  onStartDiagnostic?: () => void;
}

export const RealEstateHistory: React.FC<RealEstateHistoryProps> = () => {
  const [activeTab, setActiveTab] = useState<'REASONS' | 'TIMELINE' | 'DRIVERS' | 'LESSONS'>('REASONS');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Clean & High-Contrast Header Banner (Naver Style) */}
      <div className="naver-card p-6 sm:p-10 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30 text-xs font-black mb-3">
            <History className="w-3.5 h-3.5" />
            <span>대한민국 부동산 50년사 총정리</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            대한민국 집값은 왜 올랐고, <br />
            <span className="text-[#03c75a]">무엇이 부동산의 가치</span>를 결정하는가?
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-medium">
            1970년대 강남 개발부터 1기 신도시(분당·일산), 2000년대 버블세븐과 판교, 그리고 2026년 초양극화 시대까지 — <br className="hidden sm:inline" />
            50년의 역사를 분석하면 <strong>왜 사는(Living) 곳과 사야 하는(Buying) 곳이 달라야 하는지</strong> 그 해답이 보입니다.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs (4 Clean Historical Tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
        {[
          { id: 'REASONS', label: '1. 집값이 오른 4대 이유', icon: '💸' },
          { id: 'TIMELINE', label: '2. 50년 연표 (6대 변곡점)', icon: '📜' },
          { id: 'DRIVERS', label: '3. 4대 가치 유인 공식', icon: '🏛️' },
          { id: 'LESSONS', label: '4. 실전 5대 교훈', icon: '💡' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-2xl whitespace-nowrap font-black transition flex items-center gap-2 cursor-pointer border ${
              activeTab === tab.id
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 집값이 오른 4대 구조적 이유 (Why Housing Prices Rose) */}
      {/* ========================================================================= */}
      {activeTab === 'REASONS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Coins className="w-6 h-6 text-[#03c75a]" />
                <span>대한민국 집값이 50년간 우상향한 4대 핵심 구조적 원인</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                "집값이 오른 것이 아니라, 현금의 가치가 하락하고 수도권의 희소성이 폭발한 것입니다."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reason 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#029f45] bg-[#e8f8ee] px-2.5 py-1 rounded-md border border-[#03c75a]/20">
                    원인 ① 화폐적 요인
                  </span>
                  <span className="text-xs text-slate-400 font-bold">M2 통화량 팽창</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  통화량(M2)의 급격한 팽창과 실물자산 인플레이션
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  대한민국의 광의통화(M2)는 지난 20년간 연평균 6~8%씩 꾸준히 증가했습니다. 
                  시중에 풀린 돈의 양이 10배 늘어나는 동안, <strong>원화(현금)의 구매력은 급격히 감소</strong>했으며, 
                  한정된 토지와 신축 아파트는 이러한 화폐 인플레이션을 온전히 흡수하며 가격이 명목상 상승했습니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  💡 <strong>결론</strong>: 현금만 보유한 사람은 매년 6~8%씩 실질 자산이 증발하는 패배를 겪었습니다.
                </div>
              </div>

              {/* Reason 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#0066ff] bg-[#edf4ff] px-2.5 py-1 rounded-md border border-[#0066ff]/20">
                    원인 ② 인구·일자리 요인
                  </span>
                  <span className="text-xs text-slate-400 font-bold">수도권 초집중</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  수도권 일자리(GBD/판교/YBD) 및 인구 초밀집
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  대한민국 전체 국토의 11.8%에 불과한 수도권에 <strong>전국 인구의 50.6%</strong>와 <strong>고소득 일자리의 75%</strong>가 집중되어 있습니다. 
                  강남(GBD), 판교 테크노밸리, 여의도(YBD), 도심(CBD)으로 출퇴근할 수 있는 지하철 역세권 아파트는 대체 불가능한 '시간 절약 자산'이 되었습니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  💡 <strong>결론</strong>: 인구는 줄어도 '양질의 일자리와 연결된 수도권 핵심지'의 수요는 더 집중됩니다.
                </div>
              </div>

              {/* Reason 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    원인 ③ 금융 제도적 요인
                  </span>
                  <span className="text-xs text-slate-400 font-bold">전세 레버리지</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  세계 유일 '전세 제도'가 만든 무이자 갭투자 구조
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  한국 특유의 전세 제도는 매수자에게 <strong>이자 없는 거대한 사금융 대출(보증금)</strong>을 제공했습니다. 
                  전세가는 매매가의 강력한 하방 지지선 역할을 하며, 상승장에서는 갭투자 유동성이 폭발하여 시세를 밀어 올리고, 하락장에서는 전세가율이 바닥을 받쳐주는 완충 장치가 되었습니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  💡 <strong>결론</strong>: 전세가율이 높은 우량 입지는 하락장에서도 하방 경직성이 매우 뛰어납니다.
                </div>
              </div>

              {/* Reason 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                    원인 ④ 공급적 요인
                  </span>
                  <span className="text-xs text-slate-400 font-bold">토지 희소성 & 규제</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  핵심 입지 토지의 절대적 희소성과 신축 공급 부족
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  강남 3구, 마용성, 분당, 광교 등 핵심지는 <strong>더 이상 아파트를 지을 빈 땅이 없습니다.</strong> 
                  오직 '재건축·재개발'로만 신축이 공급될 수 있으나, 공사비 급등과 인허가 규제로 인해 핵심지 신축 대단지는 만성적인 공급 부족 상태에 놓여 희소 프리미엄이 극대화되었습니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  💡 <strong>결론</strong>: 누구나 살고 싶어 하는 '핵심지 신축 대단지'의 가치는 갈수록 높아집니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 대한민국 부동산 50년사 연표 (Historical Timeline) */}
      {/* ========================================================================= */}
      {activeTab === 'TIMELINE' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <History className="w-6 h-6 text-[#0066ff]" />
                <span>대한민국 부동산 50년사 6대 결정적 변곡점 (1970 ~ 2026)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                역사는 반복됩니다. 위기와 정책 속에서 부의 기회는 어디에서 생겨났을까요?
              </p>
            </div>

            <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
              {/* Era 1 */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-[#03c75a] border-4 border-white shadow-md absolute -left-[31px] sm:-left-[39px] top-1.5" />
                <span className="text-xs font-black text-[#029f45] bg-[#e8f8ee] px-2.5 py-0.5 rounded-full border border-[#03c75a]/30">
                  1970년대 ~ 1980년대
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  1. 강남 영동지구 개발과 8학군 이전 — "강남 불패 신화의 탄생"
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  경부고속도로 개통과 한남대교 준공으로 허허벌판이었던 강남(영동) 개발이 시작되었습니다. 
                  정부는 경기고, 서울고 등 종로의 명문고들을 강남으로 강제 이전시켰고, 압구정 현대아파트와 대치동 은마아파트가 들어서며 <strong>'강남 8학군 프리미엄'</strong>이라는 대한민국 부동산 불패 공식이 완성되었습니다.
                </p>
              </div>

              {/* Era 2 */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-[#0066ff] border-4 border-white shadow-md absolute -left-[31px] sm:-left-[39px] top-1.5" />
                <span className="text-xs font-black text-[#0066ff] bg-[#edf4ff] px-2.5 py-0.5 rounded-full border border-[#0066ff]/30">
                  1989년 ~ 1995년
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  2. 주택 200만 호 건설과 1기 신도시(분당·일산·평촌)의 기적
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  88올림픽 이후 집값이 폭등하자 정부는 <strong>분당, 일산, 평촌, 산본, 중동</strong> 등 1기 신도시를 조성했습니다. 
                  대규모 공급으로 집값이 10년간 안정세를 보였으며, 그중에서도 강남 접근성이 가장 뛰어났던 <strong>'분당'과 '평촌(학원가)'</strong>이 1기 신도시의 압도적 대장주로 자리 잡았습니다.
                </p>
              </div>

              {/* Era 3 */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-md absolute -left-[31px] sm:-left-[39px] top-1.5" />
                <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  2000년 ~ 2007년
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  3. IMF 극복, 버블세븐(강남·분당·용인·평촌)과 판교/광교 2기 신도시
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  외환위기 이후 경기 부양책과 유동성으로 부동산이 폭등하며 '버블세븐(강남·서초·송파·목동·분당·평촌·용인)'이라는 신조어가 탄생했습니다. 
                  도곡동 타워팰리스 등 하이엔드 주상복합이 유행했고, 자족 일자리를 갖춘 <strong>판교 테크노밸리와 광교신도시(2기 신도시)</strong>가 계획되며 경기 남부 황금벨트가 열렸습니다.
                </p>
              </div>

              {/* Era 4 */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-slate-500 border-4 border-white shadow-md absolute -left-[31px] sm:-left-[39px] top-1.5" />
                <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
                  2008년 ~ 2013년
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  4. 글로벌 금융위기, '하우스푸어'의 공포와 전세가율 80% 근접
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  미국 서브프라임 모기지 사태로 5년간 기나긴 조정기가 찾아왔습니다. 매매가는 하락하고 미분양이 쌓였으나, 
                  사람들이 집을 사지 않고 전세로만 몰리면서 <strong>전세가가 매매가의 75~85%까지 치솟는 기현상</strong>이 발생했습니다. 이 시기에 축적된 높은 전세가는 다음 대세 상승장의 강력한 화약고가 되었습니다.
                </p>
              </div>

              {/* Era 5 */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-md absolute -left-[31px] sm:-left-[39px] top-1.5" />
                <span className="text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  2014년 ~ 2021년
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  5. 초저금리 유동성 랠리, 마용성 급등, 2030 '영끌 패닉바잉'
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  신분당선, 8호선 연장, GTX-A 등 신설 철도망 호재와 제로금리 유동성이 결합되며 역사상 가장 강력한 상승장이 펼쳐졌습니다. 
                  마포·용산·성동(마용성)이 신흥 강자로 떠올랐고, 하남 미사, 남양주 다산/별내, 동탄 등 신도시가 급성장했습니다. 임대차 3법 이후 전세가 폭등과 함께 2030 세대의 패닉바잉이 이어졌습니다.
                </p>
              </div>

              {/* Era 6 */}
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-md absolute -left-[31px] sm:-left-[39px] top-1.5" />
                <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  2022년 ~ 2026년 현재
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  6. 고금리 충격 후 '초양극화(Super Polarization)'와 똘똘한 1채 쏠림
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  급격한 기준금리 인상 이후 시장은 <strong>'모두가 오르는 장'에서 '철저한 양극화 장'</strong>으로 전환되었습니다. 
                  강남 3구, 마용성, 분당/판교, 광교, 과천, 수지, 하남 미사 등 <strong>[GBD 직결 철도망 + 1,000세대 신축 대단지 + 탄탄한 학군]</strong>을 갖춘 똘똘한 1채는 전고점을 회복하며 신고가를 경신한 반면, 외곽 비역세권 나홀로 단지는 침체되는 차별화가 고착화되었습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 불변의 4대 부동산 가치 유인 공식 (Core Value Drivers) */}
      {/* ========================================================================= */}
      {activeTab === 'DRIVERS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Building className="w-6 h-6 text-[#03c75a]" />
                <span>50년 역사가 증명한 불변의 4대 부동산 가치 유인 공식</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                아파트 가격의 80%는 아래 4가지 핵심 가치 팩터에 의해 결정됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Driver 1 */}
              <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500/30 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-[#029f45]">
                  <Train className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-black text-slate-900">
                    1. 철도망의 계급도 (GBD/강남 직결 황금 노선)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  수도권에서 집값 상승률 1위는 예외 없이 <strong>'강남역/신논현/잠실 30분 컷'</strong> 철도망입니다.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 font-medium text-slate-700">
                  <div>👑 <strong>1티어 (황금선)</strong>: 2호선(순환), 신분당선(판교·강남 15분), 9호선(급행), 3호선</div>
                  <div>💎 <strong>2티어 (직결선)</strong>: 8호선(다산·별내·구리 ➡️ 잠실 20분), 7호선(강남구청), GTX-A(수서·동탄·운정)</div>
                  <div>⚡ <strong>가치 규칙</strong>: 지하철역 개찰구까지 <strong>도보 5분 이내(초역세권)</strong>와 15분 이상은 시세가 2~4억 원 차이납니다.</div>
                </div>
              </div>

              {/* Driver 2 */}
              <div className="p-6 rounded-2xl bg-white border-2 border-blue-500/30 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-[#0066ff]">
                  <GraduationCap className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-black text-slate-900">
                    2. 명문 학군 & 대형 학원가 (하방 경직성의 절대 방패)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  학령기 자녀를 둔 3040 고소득 부모는 집값이 떨어져도 학군지를 떠나지 않습니다. 
                  대치동, 목동, 중계동, 평촌, 분당 수내/서현, 용인 수지구청 학원가는 <strong>하락장에서 시세 방어율 전국 1위</strong>를 기록합니다.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-medium text-slate-700">
                  <div>🎒 <strong>초품아 프리미엄</strong>: 차도를 건너지 않고 등하교하는 초등학교를 품은 단지 필수</div>
                  <div>📚 <strong>학원가 밀집도</strong>: 도보권 내 100개 이상의 유해시설 없는 학원가 형성 여부</div>
                </div>
              </div>

              {/* Driver 3 */}
              <div className="p-6 rounded-2xl bg-white border-2 border-amber-500/30 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-amber-700">
                  <Building className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-black text-slate-900">
                    3. 1,000세대 이상 대단지 & 1군 브랜드 커뮤니티
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  소형 나홀로 단지와 1,000세대 이상 대단지는 거주 만족도와 환금성에서 완전히 다른 세상입니다. 
                  피트니스, 실내 골프장, 수영장, 게스트하우스, 조식 서비스, 지하주차장 엘리베이터 직결 등은 신축 프리미엄의 핵심입니다.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-medium text-slate-700">
                  <div>🏢 <strong>관리비 절감</strong>: 세대수가 많을수록 공용 관리비 분담률이 낮아짐</div>
                  <div>🔄 <strong>환금성 보장</strong>: 매수/매도 대기 수요가 연중 유지되어 급매 처분 수월</div>
                </div>
              </div>

              {/* Driver 4 */}
              <div className="p-6 rounded-2xl bg-white border-2 border-purple-500/30 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-purple-700">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-black text-slate-900">
                    4. 한강·호수공원 자연환경 & 슬세권 대형 복합몰
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  소득 수준이 높아질수록 쾌적한 힐링 주거지에 대한 지불 용의가 커집니다. 
                  한강 조망, 광교호수공원, 하남 망월천 수변공원과 함께 스타필드, 롯데몰, 현대프리미엄아울렛 등 '슬세권' 상권이 시세를 견인합니다.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-medium text-slate-700">
                  <div>🌿 <strong>영구 조망권</strong>: 호수/공원/산 영구 조망 세대는 동일 단지 내에서도 1~2억 프리미엄</div>
                  <div>🛍️ <strong>몰세권</strong>: 복합 쇼핑몰 도보 이용 가능 여부가 주말 삶의 질 결정</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 실전 매수자를 위한 5대 역사적 교훈 (Lessons) */}
      {/* ========================================================================= */}
      {activeTab === 'LESSONS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-600" />
                <span>대한민국 부동산 역사가 주는 5대 실전 매수 교훈</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                감정에 휘둘리지 않고 자산을 지키는 스마트한 매수자의 원칙
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  num: '01',
                  title: '현금만 쥐고 있으면 자산 인플레이션에 반드시 패배한다',
                  desc: 'M2 통화량이 매년 6~8%씩 팽창하는 자본주의 사회에서 실물자산(부동산) 없이 현금만 쥐고 있는 것은 가장 안전한 자살골입니다. 인플레이션을 방어할 수 있는 우량 입지 등기를 반드시 선점해야 합니다.'
                },
                {
                  num: '02',
                  title: '하락장에서도 버티는 곳은 "다음 매수자가 원하는 1급지"뿐이다',
                  desc: '내가 살기 편한 집(소비재)과 남이 사줄 집(투자재)을 철저히 분리하세요. 비역세권 나홀로 아파트는 하락장에서 거래 자체가 실종되지만, 강남 직결 대단지 초역세권은 하방 경직성을 유지합니다.'
                },
                {
                  num: '03',
                  title: '철도망 호재는 "발표 때 1차, 착공 때 2차, 개통 때 3차"로 반영된다',
                  desc: '말뿐인 계획 단계(구상)에 진입하지 마세요. 최소 실시계획인가 및 착공 단계에 진입한 확실한 철도망(8호선, 신분당선 연장, GTX 등)을 선별해야 시간 낭비 없이 프리미엄을 온전히 수확합니다.'
                },
                {
                  num: '04',
                  title: '타이밍을 맞추려 하지 말고, 감당 가능한 자금(DSR 40%)으로 시간을 내 편으로 만들어라',
                  desc: '바닥의 최저점을 완벽히 맞추는 것은 불가능합니다. 무리한 영끌이 아닌 가계 소득 대비 안전한 원리금 상환 범위(DSR 40%) 내에서 우량 자산을 매수한 뒤, 비과세 2년 이상 보유하며 시간을 내 편으로 만드는 것이 승자의 전략입니다.'
                },
                {
                  num: '05',
                  title: '자본이 부족할 때는 "거주·투자 분리" 또는 "스마트 징검다리"를 실행하라',
                  desc: '완벽한 상급지 자가를 바로 살 수 없다고 무주택자로 머무르지 마세요. 시드머니는 최상급지 갭투자로 묶어두고 몸은 전월세로 살거나, 8호선/신분당선 축 1단계 매수 후 3~5년 주기로 상급지로 갈아타는 전략을 구사해야 합니다.'
                }
              ].map((lesson) => (
                <div key={lesson.num} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {lesson.num}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{lesson.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                      {lesson.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
