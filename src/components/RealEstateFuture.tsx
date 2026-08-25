import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Train, 
  Building, 
  Newspaper, 
  Radio, 
  ExternalLink, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Scale, 
  Coins, 
  Calculator, 
  X, 
  MapPin, 
  Briefcase, 
  TrendingUp,
  Flame,
  Home,
  Compass
} from 'lucide-react';

interface RealEstateFutureProps {
  onStartDiagnostic?: () => void;
}

type FutureTab = 'NEW_TOWNS' | 'FUTURE_NEWS' | 'GLOSSARY';
type CalcMode = 'DSR' | 'LTV' | 'GAP';

interface NewTownDetail {
  id: string;
  name: string;
  location: string;
  units: string;
  expectedMoveIn: string;
  statusTag: string;
  statusTagColor: string;
  transitSummary: string;
  transitLines: string[];
  anchorCompanies: string;
  selfSufficientLand: string;
  currentStatus: string;
  proTip: string;
  naverNewsQuery: string;
}

const NEW_TOWNS_DATA: NewTownDetail[] = [
  {
    id: 'namyangju_wangsook',
    name: '남양주 왕숙 (1·2지구)',
    location: '경기도 남양주시 진접읍·진건읍·일패동·이패동',
    units: '약 66,000호 (3기 신도시 최대 규모)',
    expectedMoveIn: '2027~2028년 순차 입주 목표',
    statusTag: '조성공사 & 본청약 진행',
    statusTagColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
    transitSummary: 'GTX-B(왕숙역), 9호선 연장(강동하남남양주선), 8호선 별내선 환승 연계, 경춘선·4호선',
    transitLines: ['GTX-B', '지하철 9호선', '지하철 8호선', '경춘선', '수도권제1순환고속도로'],
    anchorCompanies: '카카오·판교급 IT·소프트웨어 R&D 기업, 바이오·메디컬 클러스터, 데이터센터 및 첨단 제조 융복합 단지',
    selfSufficientLand: '판교테크노밸리의 약 2배 규모 (약 140만㎡ 도시첨단산업단지 조성)',
    currentStatus: '부지 조성 공사 본격 진행 중이며 2024~2025년 주요 블록 본청약 진행. 9호선 연장선 기본계획 승인 완료.',
    proTip: '왕숙1은 GTX-B와 9호선이 교차하는 자족 첨단도시, 왕숙2는 경의중앙선과 문화예술 특화 주거단지로 조성됩니다.',
    naverNewsQuery: '남양주 왕숙 3기 신도시 분양 9호선'
  },
  {
    id: 'hanam_gyosan',
    name: '하남 교산',
    location: '경기도 하남시 천현동·교산동·춘궁동·덕풍동',
    units: '약 33,000호',
    expectedMoveIn: '2028~2029년 순차 입주 목표',
    statusTag: '토지보상 완료 & 착공 순항',
    statusTagColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
    transitSummary: '지하철 3호선 연장(송파하남선, 오금역~감일~교산~하남시청), 송파~양평고속도로, 서하남로 확장',
    transitLines: ['지하철 3호선', '송파하남선', '중부고속도로', '수도권제1순환'],
    anchorCompanies: 'AI 혁신 클러스터, 첨단 바이오·헬스케어 앵커 기업, 판교·강남 연계 테크 스타트업 파크',
    selfSufficientLand: '판교테크노밸리 1.4배 규모 (약 92만㎡ 자족용지)',
    currentStatus: '토지 보상 100% 완료 후 지장물 철거 및 단지 조성 공사 순항 중. 3호선 송파하남선 기본계획 확정.',
    proTip: '강남(GBD) 및 송파와 가장 가까운 입지로 3기 신도시 중 실수요자 선호도 1위. 3호선 개통 시 수서·양재 20분대 진입.',
    naverNewsQuery: '하남 교산 3기 신도시 3호선 송파하남선'
  },
  {
    id: 'goyang_changreung',
    name: '고양 창릉',
    location: '경기도 고양시 덕양구 원흥동·동산동·용두동·화전동',
    units: '약 38,000호',
    expectedMoveIn: '2027~2028년 순차 입주 목표',
    statusTag: 'GTX-A 창릉역 확정 & 본청약 개시',
    statusTagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    transitSummary: 'GTX-A 창릉역(삼성역 10분대), 고양은평선(새절~창릉~고양시청), 화랑로 확장 및 BRT',
    transitLines: ['GTX-A (창릉역)', '고양은평선', '서부선 직결', '자유로'],
    anchorCompanies: '상암DMC·마곡 연계 방송·영상 미디어 콘텐츠 기업, 스마트 물류·드론 R&D, ICT 융합 혁신 기업',
    selfSufficientLand: '약 130만㎡ 자족용지 (판교 1.5배 규모 테크노밸리)',
    currentStatus: '2024년 말 첫 본청약(A4, S5, S6블록) 진행 시작. GTX-A 창릉역 신설 확정 및 공사진행.',
    proTip: 'GTX-A 개통 시 서울역 8분, 삼성역 13분 컷. 상암DMC 직주근접 수요와 일산·은평 거주민의 최고 선호지.',
    naverNewsQuery: '고양 창릉 3기 신도시 GTX 창릉역'
  },
  {
    id: 'bucheon_daejang',
    name: '부천 대장',
    location: '경기도 부천시 오정구 대장동·삼정동·오정동',
    units: '약 20,000호',
    expectedMoveIn: '2027~2028년 순차 입주 목표',
    statusTag: 'SK 1조 R&D 센터 유치 확정',
    statusTagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    transitSummary: '대장~홍대선(홍대입구역 20분 직결, 2030년 개통 목표), S-BRT(김포공항 환승), 오정로 확장',
    transitLines: ['대장홍대선', 'S-BRT', '서해선 연계', '경인고속도로 지하화'],
    anchorCompanies: 'SK그룹 핵심 8개 계열사(SK이노베이션, SK하이닉스 등) 1조 원 규모 [SK 그린테크노캠퍼스] 입주 확정',
    selfSufficientLand: '약 68만㎡ 도시첨단산업단지 (SK 앵커기업 중심 클러스터)',
    currentStatus: '3기 신도시 중 가장 빠른 2024년 상반기 단지 착공 완료. 대장홍대선 민자적격성 통과 및 연내 조기 착공 추진.',
    proTip: '3기 신도시 중 유일하게 대기업(SK그룹) 대규모 입주가 확정되어 자족 기능이 가장 확실한 앵커 단지.',
    naverNewsQuery: '부천 대장 3기 신도시 SK 대장홍대선'
  },
  {
    id: 'incheon_gyeyang',
    name: '인천 계양',
    location: '인천광역시 계양구 귤현동·동양동·박촌동',
    units: '약 17,000호',
    expectedMoveIn: '2026년 말 첫 입주 개시 (3기 중 최속)',
    statusTag: '3기 최초 본청약 완료 & 2026 입주',
    statusTagColor: 'bg-emerald-50 text-[#029f45] border-[#03c75a]/30',
    transitSummary: '인천 1호선 박촌역, S-BRT(김포공항역 9호선/공항철도/5호선 환승), 대장홍대선 계양 연장 검토',
    transitLines: ['인천 1호선', 'S-BRT', '공항철도 환승', '수도권제1순환'],
    anchorCompanies: '디지털 트윈, ICT·스마트 모빌리티 제조, 바이오·헬스 벤처 밸리',
    selfSufficientLand: '약 75만㎡ 자족시설용지 (계양테크노밸리)',
    currentStatus: '3기 신도시 전체 중 최초로 2024년 9월 본청약(A2, A3블록) 완료. 2026년 하반기 최초 입주 예정.',
    proTip: '3기 신도시 중 입주시기가 가장 빠르며 김포공항역을 통한 마곡/여의도 출퇴근 실수요자에게 실속형 대안.',
    naverNewsQuery: '인천 계양 3기 신도시 본청약 입주'
  },
  {
    id: 'gwacheon_gwacheon',
    name: '과천 과천지구',
    location: '경기도 과천시 과천동·주암동·막계동',
    units: '약 10,000호',
    expectedMoveIn: '2029년 전후 순차 입주 목표',
    statusTag: '지구계획 승인 완료 (준강남 입지)',
    statusTagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    transitSummary: '지하철 4호선(선바위역·경마공원역), GTX-C(정부과천청사역), 위례과천선 연계, 과천~우면산 도시고속화',
    transitLines: ['지하철 4호선', 'GTX-C', '위례과천선', '과천대로 지하화'],
    anchorCompanies: '과천지식정보타운(펄어비스, 넷마블, JW중외제약, 코오롱 등)과 연계된 바이오·IT·AI 첨단 밸리',
    selfSufficientLand: '약 36만㎡ 자족용지 (서초 양재 R&CD 혁신지구 연계)',
    currentStatus: '2024년 8월 국토부 지구계획 승인 완료. 2025~2026년 주택 분양 착수 예정.',
    proTip: '서초구 양재동과 맞닿아 사실상 강남 생활권. 3기 신도시 중 시세 상승 잠재력과 평당 분양가가 가장 높은 최상급지.',
    naverNewsQuery: '과천 과천지구 3기 신도시 분양 4호선'
  }
];

export const RealEstateFuture: React.FC<RealEstateFutureProps> = ({ onStartDiagnostic }) => {
  const [activeTab, setActiveTab] = useState<FutureTab>('NEW_TOWNS');
  const [selectedTownId, setSelectedTownId] = useState<string>(NEW_TOWNS_DATA[0].id);

  // Interactive Calculator Modal State
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [calcMode, setCalcMode] = useState<CalcMode>('DSR');

  // Calculator Inputs
  const [annualIncome, setAnnualIncome] = useState<number>(8000);
  const [interestRate, setInterestRate] = useState<number>(4.0);
  const [loanPeriodYears, setLoanPeriodYears] = useState<number>(40);
  const [otherMonthlyDebt, setOtherMonthlyDebt] = useState<number>(0);
  const [applyStressDsr, setApplyStressDsr] = useState<boolean>(true);
  const [housePrice, setHousePrice] = useState<number>(100000);
  const [ltvRate, setLtvRate] = useState<number>(70);
  const [gapBuyPrice, setGapBuyPrice] = useState<number>(100000);
  const [gapJeonsePrice, setGapJeonsePrice] = useState<number>(65000);

  // Calculations
  const maxYearlyPaymentDsr40 = Math.round(annualIncome * 0.4);
  const availableYearlyPayment = Math.max(0, maxYearlyPaymentDsr40 - (otherMonthlyDebt * 12));
  const availableMonthlyPayment = Math.round(availableYearlyPayment / 12);

  const effectiveRate = applyStressDsr ? interestRate + 1.2 : interestRate;
  const monthlyRate = effectiveRate / 100 / 12;
  const numPayments = loanPeriodYears * 12;
  
  const maxLoanDsrPrincipal = monthlyRate > 0 && numPayments > 0
    ? Math.round(availableMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate))
    : 0;

  const normalRate = interestRate / 100 / 12;
  const normalLoanPrincipal = normalRate > 0 && numPayments > 0
    ? Math.round(availableMonthlyPayment * ((1 - Math.pow(1 + normalRate, -numPayments)) / normalRate))
    : 0;

  const stressReductionAmount = Math.max(0, normalLoanPrincipal - maxLoanDsrPrincipal);
  const maxLoanLtv = Math.round(housePrice * (ltvRate / 100));
  const minRequiredCashLtv = Math.max(0, housePrice - maxLoanLtv);
  const estAcquisitionTax = Math.round(housePrice * 0.033);

  const gapJeonseRatio = gapBuyPrice > 0 ? ((gapJeonsePrice / gapBuyPrice) * 100).toFixed(1) : '0';
  const pureGapCash = Math.max(0, gapBuyPrice - gapJeonsePrice);
  const gapAcquisitionTax = Math.round(gapBuyPrice * 0.033);
  const totalGapNeedCash = pureGapCash + gapAcquisitionTax;

  const handleOpenCalculator = (mode: CalcMode) => {
    setCalcMode(mode);
    setIsCalcOpen(true);
  };

  const handleOpenNaverNews = (keyword: string) => {
    const url = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(keyword)}&sort=1`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const selectedTown = NEW_TOWNS_DATA.find(t => t.id === selectedTownId) || NEW_TOWNS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Clean & High-Contrast Header Banner */}
      <div className="naver-card p-6 sm:p-10 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30 text-xs font-black mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>수도권 미래 핵심 분석 & 신도시 전망</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            3기 신도시 총정리와 <br />
            <span className="text-[#03c75a]">부동산 미래 핵심 변수</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-medium">
            왕숙·교산·창릉·대장·계양·과천 등 <strong>3기 신도시의 실시간 진행 상황과 유치 확정 기업</strong>부터 <br className="hidden sm:inline" />
            미래 주목 4대 핵심 변수, 실시간 네이버 부동산 뉴스, 필수 대출 규제 계산기까지 한눈에 확인하세요.
          </p>
        </div>
      </div>

      {/* Main 3 Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
        {[
          { id: 'NEW_TOWNS', label: '1. 3기 신도시 심층 분석 (진행상황 & 앵커기업)', icon: '🏗️' },
          { id: 'FUTURE_NEWS', label: '2. 미래 주목 변수 & 실시간 네이버 뉴스', icon: '📡' },
          { id: 'GLOSSARY', label: '3. 필수 부동산·대출 용어 & 실시간 계산기', icon: '📚' },
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
      {/* SUB-TAB 1: 3기 신도시 심층 분석 (진행상황 & 앵커기업) */}
      {/* ========================================================================= */}
      {activeTab === 'NEW_TOWNS' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Quick Town Pill Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {NEW_TOWNS_DATA.map((town) => (
              <button
                key={town.id}
                onClick={() => setSelectedTownId(town.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                  selectedTownId === town.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#03c75a]" />
                <span>{town.name}</span>
              </button>
            ))}
          </div>

          {/* Detailed Town Hero Profile Card */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${selectedTown.statusTagColor}`}>
                    {selectedTown.statusTag}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {selectedTown.units}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {selectedTown.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedTown.location}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-left lg:text-right">
                  <span className="text-[11px] text-slate-400 font-bold block">입주 목표 시기</span>
                  <span className="text-base font-black text-[#029f45]">{selectedTown.expectedMoveIn}</span>
                </div>

                <button
                  onClick={() => handleOpenNaverNews(selectedTown.naverNewsQuery)}
                  className="px-3.5 py-2 rounded-xl bg-[#e8f8ee] hover:bg-[#03c75a] text-[#029f45] hover:text-white text-xs font-black border border-[#03c75a]/30 transition flex items-center gap-1 cursor-pointer"
                  title="네이버에서 이 신도시의 최신 분양 및 개발 뉴스 검색"
                >
                  <span>실시간 뉴스</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 4 Pillars Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pillar 1: Transit */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-[#0066ff] font-bold text-sm">
                  <Train className="w-4 h-4" />
                  <span>핵심 교통망 & 서울 직결 철도</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
                  {selectedTown.transitSummary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTown.transitLines.map(line => (
                    <span key={line} className="text-[11px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                      #{line}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillar 2: Anchor Companies & Self-Sufficient Land */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-[#029f45] font-bold text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>유치/약속된 핵심 앵커 기업 및 자족 용지</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-medium">
                  <p className="font-bold text-slate-900">
                    🏢 <strong>유치 기업</strong>: {selectedTown.anchorCompanies}
                  </p>
                  <p className="text-slate-600 text-xs mt-1">
                    📐 <strong>자족용지 규모</strong>: {selectedTown.selfSufficientLand}
                  </p>
                </div>
              </div>

              {/* Pillar 3: Current Status */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>현재 진행 상황 & 분양 일정</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedTown.currentStatus}
                </p>
              </div>

              {/* Pillar 4: Pro Tip & Strategic Analysis */}
              <div className="p-5 rounded-2xl bg-[#e8f8ee]/60 border border-[#03c75a]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#029f45] font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>실전 청약 & 매수 판단 팁</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedTown.proTip}
                </p>
              </div>
            </div>
          </div>

          {/* All 6 New Towns Summary Comparison Table */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#03c75a]" />
                <span>수도권 3기 신도시 6개 지구 한눈에 비교</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                지구명을 클릭하시면 상세 분석 카드로 바로 전환됩니다.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                    <th className="py-3 px-3.5">지구명</th>
                    <th className="py-3 px-3.5">공급 규모</th>
                    <th className="py-3 px-3.5">핵심 교통망</th>
                    <th className="py-3 px-3.5">약속된 기업 / 자족 특화</th>
                    <th className="py-3 px-3.5">입주 목표</th>
                    <th className="py-3 px-3.5 text-right">상세</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {NEW_TOWNS_DATA.map((town) => (
                    <tr 
                      key={town.id}
                      onClick={() => setSelectedTownId(town.id)}
                      className={`hover:bg-slate-50 transition cursor-pointer ${
                        selectedTownId === town.id ? 'bg-[#e8f8ee]/40 font-bold' : ''
                      }`}
                    >
                      <td className="py-3 px-3.5 font-black text-slate-900">
                        {town.name}
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">
                        {town.units.split(' ')[1] || town.units}
                      </td>
                      <td className="py-3 px-3.5 text-slate-700">
                        {town.transitLines.slice(0, 2).join(', ')}
                      </td>
                      <td className="py-3 px-3.5 text-slate-600 max-w-[200px] truncate" title={town.anchorCompanies}>
                        {town.anchorCompanies}
                      </td>
                      <td className="py-3 px-3.5 text-[#029f45] font-black">
                        {town.expectedMoveIn.split(' ')[0]}
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <button 
                          type="button"
                          className="text-[#0066ff] hover:underline font-bold"
                        >
                          보기 →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: 미래 주목 변수 & 실시간 뉴스 */}
      {/* ========================================================================= */}
      {activeTab === 'FUTURE_NEWS' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Section: 4 Future Megatrends */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-6 h-6 text-[#03c75a] animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  앞으로 우리가 반드시 주목해야 할 4대 미래 핵심 변수
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                2026~2030년 수도권 부동산 시장의 승패를 가를 메가트렌드와 투자 체크포인트
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Point 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#029f45] bg-[#e8f8ee] px-2.5 py-1 rounded-md border border-[#03c75a]/20">
                    미래 변수 ①
                  </span>
                  <span className="text-xs text-slate-400 font-bold">인구 감소 vs 가구 분화</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  '초양극화'의 고착화 — 모두가 오르는 장은 끝났다
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  전국 총인구는 줄어들지만, <strong>수도권 1~2인 가구 및 고소득 3040 가구는 2040년까지 지속 증가</strong>합니다. 
                  지방 및 외곽 비역세권 나홀로 단지는 인구 소멸 위험에 노출되는 반면, <strong>강남 직결 황금노선 역세권과 학군지 대단지</strong>는 자산 쏠림 현상이 극대화되어 시세 격차가 2배 이상 벌어집니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: 입지가 애매한 2~3채 다주택보다 '확실한 수도권 똘똘한 1채'로 자산을 집중하세요.
                </div>
              </div>

              {/* Point 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#0066ff] bg-[#edf4ff] px-2.5 py-1 rounded-md border border-[#0066ff]/20">
                    미래 변수 ②
                  </span>
                  <span className="text-xs text-slate-400 font-bold">공사비 폭등</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  평당 공사비 1,000만 원 시대 — 신축 품귀와 분양가 급등
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  원자재와 인건비 폭등으로 아파트 평당 건축비가 900~1,000만 원을 돌파했습니다. 
                  사업성이 떨어지는 구축 재건축은 추가분담금 부담으로 사업이 장기 중단되고 있으며, 이에 따라 <strong>향후 3~5년간 수도권 신축 아파트 입주 물량이 급감(절벽)</strong>하여 기존 신축·준신축 대단지의 몸값이 치솟고 있습니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: 재건축 기대감만 있는 구축보다 '이미 지어진 5~10년 차 준신축 대단지'를 선점하세요.
                </div>
              </div>

              {/* Point 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                    미래 변수 ③
                  </span>
                  <span className="text-xs text-slate-400 font-bold">철도망 혁명</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  수도권 30분 혁명 — GTX, 8호선 연장, 신분당선 확장
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  GTX-A 부분 개통을 필두로, <strong>8호선 별내 연장(잠실 20분 직결), 신분당선 호매실/용산 연장, GTX-B/C 착공</strong>이 가시화되고 있습니다. 
                  서울 핵심 업무지구까지 30분 이내로 물리적 시간을 압축해 주는 역세권은 판교/분당 수준의 위상을 갖추게 됩니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: 말뿐인 계획이 아니라 '실제 착공/개통 단계'에 진입한 역세권 단지만 집중 타겟팅하세요.
                </div>
              </div>

              {/* Point 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    미래 변수 ④
                  </span>
                  <span className="text-xs text-slate-400 font-bold">금리 & 대출 환경</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  기준금리 인하 유동성 vs '스트레스 DSR'의 줄다리기
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  금리 인하가 시작되더라도 금융당국의 <strong>스트레스 DSR 2~3단계 규제</strong>로 대출 한도가 묶여있습니다. 
                  따라서 '무리한 영끌'보다는 <strong>가구 소득이 높고 순현금을 보유한 실수요자가 탄탄한 9억~15억 원대 중상급지 아파트</strong>가 가장 안정적으로 상승 랠리를 이끌게 됩니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: DSR 40% 범위 내에서 감당 가능한 원리금 구조를 유지하며 장기 보유하세요.
                </div>
              </div>
            </div>
          </div>

          {/* News Hub */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-[#0066ff]" />
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    실시간 네이버 부동산 주요 뉴스 & 토픽 연동
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  버튼을 클릭하면 네이버 포털의 최신 부동산 뉴스와 실시간 속보가 새 탭에서 즉시 열립니다.
                </p>
              </div>

              <button
                onClick={() => window.open('https://land.naver.com/news/', '_blank', 'noopener,noreferrer')}
                className="px-4 py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto cursor-pointer"
              >
                <span>네이버 부동산 뉴스 홈 ↗</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* 6 News Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: '수도권 아파트 시세 & 실거래가',
                  desc: '서울 및 경기 주요 지역 아파트 매매·전세 실거래가 추이 및 주간 상승률',
                  keyword: '수도권 아파트 실거래가 시세',
                  tag: '📊 시세 동향',
                  tagColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30'
                },
                {
                  title: '3기 신도시 본청약 & 착공',
                  desc: '왕숙, 교산, 창릉, 대장, 계양, 과천 3기 신도시 분양가 및 사전청약 본청약 일정',
                  keyword: '3기 신도시 본청약 분양가 일정',
                  tag: '🏗️ 신도시',
                  tagColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30'
                },
                {
                  title: 'GTX & 신분당선·8호선 철도망',
                  desc: 'GTX-A/B/C 노선 개통 및 8호선 별내선, 신분당선 연장선 최신 진행 상황',
                  keyword: 'GTX 신분당선 8호선 연장 개통',
                  tag: '🚇 철도망 호재',
                  tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
                },
                {
                  title: '기준금리 & 스트레스 DSR 대출',
                  desc: '한국은행 기준금리 결정, 주택담보대출 금리 변동 및 스트레스 DSR 규제',
                  keyword: '스트레스 DSR 주택담보대출 금리',
                  tag: '💰 금융 & 대출',
                  tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
                },
                {
                  title: '1기 신도시 재건축 선도지구',
                  desc: '분당, 일산, 평촌, 산본, 중동 특별법 선도지구 지정 및 공사비 현황',
                  keyword: '1기 신도시 재건축 선도지구 분당 평촌',
                  tag: '🏢 재건축 & 공급',
                  tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
                },
                {
                  title: '전세 시장 & 갭투자 동향',
                  desc: '가을/봄 이사철 수도권 아파트 전세가율 상승세 및 매매가 하방 지지력',
                  keyword: '수도권 아파트 전세가율 갭투자',
                  tag: '🔑 전세 & 임대차',
                  tagColor: 'bg-teal-50 text-teal-700 border-teal-200'
                },
              ].map((news) => (
                <div
                  key={news.title}
                  onClick={() => handleOpenNaverNews(news.keyword)}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#0066ff] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${news.tagColor}`}>
                        {news.tag}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066ff] transition-colors" />
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#0066ff] transition-colors leading-snug">
                      {news.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                      {news.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#0066ff]">
                    <span>실시간 네이버 뉴스 보기</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Search Bar */}
            <div className="mt-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                <Search className="w-4 h-4 text-[#03c75a]" />
                <span>내가 관심 있는 특정 아파트나 지역의 뉴스를 직접 검색해보세요:</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  id="futureNewsInput"
                  type="text"
                  placeholder="예: 왕숙 9호선, 교산 3호선, 대장 SK"
                  className="bg-white text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#03c75a] font-medium w-full sm:w-64"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const input = (e.target as HTMLInputElement).value.trim();
                      if (input) handleOpenNaverNews(input + ' 부동산');
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('futureNewsInput') as HTMLInputElement;
                    if (el && el.value.trim()) {
                      handleOpenNaverNews(el.value.trim() + ' 부동산');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold whitespace-nowrap transition cursor-pointer"
                >
                  검색
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: 필수 용어 & 대출 계산기 */}
      {/* ========================================================================= */}
      {activeTab === 'GLOSSARY' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
            
            {/* Header & Direct Calculator Launch Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#03c75a]" />
                  <span>알아두면 돈이 되는 필수 부동산 & 대출 용어 사전</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  용어 카드의 <strong>[🧮 직접 계산해보기]</strong> 버튼을 누르면 내 소득과 주택 가격에 맞춘 대출 한도를 즉시 계산할 수 있습니다.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => handleOpenCalculator('DSR')}
                  className="px-3.5 py-2 rounded-xl bg-[#e8f8ee] hover:bg-[#03c75a] text-[#029f45] hover:text-white text-xs font-black border border-[#03c75a]/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>DSR 대출 한도 계산기</span>
                </button>

                <button
                  onClick={() => handleOpenCalculator('LTV')}
                  className="px-3.5 py-2 rounded-xl bg-[#edf4ff] hover:bg-[#0066ff] text-[#0066ff] hover:text-white text-xs font-black border border-[#0066ff]/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>LTV 계산기</span>
                </button>
              </div>
            </div>

            {/* Category 1: 대출 및 금융 규제 용어 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black text-[#0066ff]">
                  <Scale className="w-4 h-4" />
                  <span>1. 대출 & 금융 규제 용어 (클릭하여 실시간 계산하기)</span>
                </div>
                <span className="text-[11px] text-[#0066ff] font-bold">
                  👇 카드를 클릭하면 계산기가 열립니다
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DSR Card */}
                <div 
                  onClick={() => handleOpenCalculator('DSR')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#03c75a] hover:shadow-md transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base group-hover:text-[#029f45] transition-colors flex items-center gap-1.5">
                      <span>DSR (총부채원리금상환비율)</span>
                      <Calculator className="w-4 h-4 text-slate-400 group-hover:text-[#03c75a]" />
                    </span>
                    <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      가장 엄격한 규제
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    내 <strong>1년 연봉 중 모든 빚의 '원금+이자'를 갚는 데 쓸 수 있는 최대 한도 비율(보통 40%)</strong>입니다. 주택담보대출뿐만 아니라 신용대출, 마이너스통장, 자동차 할부까지 전부 합산하여 계산합니다.
                  </p>
                  <div className="p-2.5 bg-white group-hover:bg-[#e8f8ee] rounded-xl border border-slate-200 group-hover:border-[#03c75a]/30 text-xs text-slate-800 font-bold flex items-center justify-between">
                    <span>💡 연봉 8천만 ➡️ 최대 대출액 약 5.4억~6.2억</span>
                    <span className="text-[#029f45] font-black text-[11px]">계산기 열기 ↗</span>
                  </div>
                </div>

                {/* LTV Card */}
                <div 
                  onClick={() => handleOpenCalculator('LTV')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#0066ff] hover:shadow-md transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base group-hover:text-[#0066ff] transition-colors flex items-center gap-1.5">
                      <span>LTV (주택담보인정비율)</span>
                      <Calculator className="w-4 h-4 text-slate-400 group-hover:text-[#0066ff]" />
                    </span>
                    <span className="text-[10px] font-black text-[#0066ff] bg-[#edf4ff] px-2 py-0.5 rounded border border-[#0066ff]/20">
                      담보 가치 기준
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    <strong>집값 대비 최대로 빌릴 수 있는 대출 금액의 비율</strong>입니다. 예를 들어 10억 원짜리 아파트의 LTV가 70%라면 최대 7억 원까지 대출이 가능합니다. (단, DSR 소득 한도를 초과할 수는 없습니다.)
                  </p>
                  <div className="p-2.5 bg-white group-hover:bg-[#edf4ff] rounded-xl border border-slate-200 group-hover:border-[#0066ff]/30 text-xs text-slate-800 font-bold flex items-center justify-between">
                    <span>💡 10억 주택 LTV 70% ➡️ 최대 7억 대출</span>
                    <span className="text-[#0066ff] font-black text-[11px]">계산기 열기 ↗</span>
                  </div>
                </div>

                {/* 스트레스 DSR Card */}
                <div 
                  onClick={() => handleOpenCalculator('DSR')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base group-hover:text-purple-700 transition-colors flex items-center gap-1.5">
                      <span>스트레스 DSR</span>
                      <Calculator className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                    </span>
                    <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      최신 대출 규제
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    향후 금리가 오를 위험에 대비하여, <strong>대출 한도를 계산할 때 실제 금리에 '가산 금리(+1.2%p)'를 얹어서 한도를 줄이는 제도</strong>입니다. 결과적으로 대출 총액이 수천만 원 축소됩니다.
                  </p>
                  <div className="p-2.5 bg-white group-hover:bg-purple-50 rounded-xl border border-slate-200 group-hover:border-purple-200 text-xs text-slate-800 font-bold flex items-center justify-between">
                    <span>⚡ 스트레스 금리 적용 시 대출 한도 5~10% 축소</span>
                    <span className="text-purple-700 font-black text-[11px]">한도 축소 계산 ↗</span>
                  </div>
                </div>

                {/* DTI Card */}
                <div 
                  onClick={() => handleOpenCalculator('DSR')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base">DTI (총부채상환비율)</span>
                    <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      기존 전통 규제
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    주택담보대출 원리금 + '기타 대출의 이자만' 연소득과 비교하던 과거의 지표입니다. 현재는 기타 대출의 원금까지 전부 합산하는 더 강력한 DSR로 대체되어 적용됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Category 2: 매수 & 투자 실전 용어 */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm font-black text-[#029f45]">
                <Coins className="w-4 h-4" />
                <span>2. 매수 & 투자 실전 용어 (어떻게 사는가?)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 갭투자 */}
                <div 
                  onClick={() => handleOpenCalculator('GAP')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#03c75a] hover:shadow-md transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base group-hover:text-[#029f45] transition-colors">
                      갭투자
                    </span>
                    <Calculator className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#03c75a]" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    매매가와 전세가의 차액(Gap)만큼만 순수 현금을 넣고, 세입자의 전세보증금을 안고 소유권을 확보하는 매수 방식입니다.
                  </p>
                  <div className="p-2 bg-white group-hover:bg-[#e8f8ee] rounded-lg border border-slate-200 group-hover:border-[#03c75a]/30 text-[11px] text-[#029f45] font-bold flex items-center justify-between">
                    <span>예: 매매 10억 - 전세 6.5억 = 갭 3.5억</span>
                    <span>계산기 ↗</span>
                  </div>
                </div>

                {/* 전세가율 */}
                <div 
                  onClick={() => handleOpenCalculator('GAP')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base block">전세가율</span>
                    <Calculator className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#03c75a]" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    매매가 대비 전세가의 비율입니다. 전세가율이 65~70%로 높을수록 실거주 수요가 탄탄하여 하락장 방어력이 강하고 갭투자금이 적게 듭니다.
                  </p>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700 font-bold">
                    공식: (전세가 ÷ 매매가) × 100
                  </div>
                </div>

                {/* 환금성 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-black text-slate-900 text-base block">환금성</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    내가 집을 팔고 싶을 때 얼마나 제값에 빠르게 현금화할 수 있는가의 척도입니다. 1,000세대 이상 대단지일수록 환금성이 극상입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Category 3: 아파트 입지 & 시세 은어 */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm font-black text-amber-700">
                <Home className="w-4 h-4" />
                <span>3. 아파트 입지 & 시장 은어 (무엇을 봐야 하는가?)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-black text-slate-900 text-sm block">🏢 국평 (국민평형 / 84㎡)</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    전용면적 84㎡(공급 약 33~34평형), 방 3개 화장실 2개의 대한민국 3~4인 가족 표준 선호 평형입니다.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-black text-slate-900 text-sm block">🎒 초품아</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    '초등학교를 품은 아파트'의 줄임말로, 아이들이 큰 도로를 건너지 않고 단지와 바로 연결되어 등하교 가능한 초안전 단지입니다.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-black text-slate-900 text-sm block">👑 RR (로열동·로열층)</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    단지 내에서 조망, 일조권, 소음 차단, 역 접근성이 가장 뛰어난 최고의 동과 중고층 매물로, 시세가 5~10% 더 비쌉니다.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-black text-slate-900 text-sm block">💰 1주택 양도세 비과세</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    1주택자가 2년 이상 보유(취득 당시 조정지역은 2년 실거주) 후 매도 시, 양도가액 12억 원까지 양도소득세를 전액 면제받습니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🧮 INTERACTIVE CALCULATOR MODAL */}
      {/* ========================================================================= */}
      {isCalcOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-scaleUp my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center font-black">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    실시간 대출 규제 & 자금 한도 계산기
                  </h3>
                  <p className="text-xs text-slate-500">
                    내 소득과 자산에 맞춘 DSR 40%, 스트레스 DSR, LTV, 갭투자금을 즉시 시뮬레이션합니다.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCalcOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setCalcMode('DSR')}
                className={`py-2.5 rounded-xl transition cursor-pointer ${
                  calcMode === 'DSR' ? 'bg-[#03c75a] text-white shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. DSR & 스트레스 DSR
              </button>
              <button
                onClick={() => setCalcMode('LTV')}
                className={`py-2.5 rounded-xl transition cursor-pointer ${
                  calcMode === 'LTV' ? 'bg-[#0066ff] text-white shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. LTV 담보비율
              </button>
              <button
                onClick={() => setCalcMode('GAP')}
                className={`py-2.5 rounded-xl transition cursor-pointer ${
                  calcMode === 'GAP' ? 'bg-amber-600 text-white shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3. 전세가율 & 갭투자
              </button>
            </div>

            {/* DSR Calc */}
            {calcMode === 'DSR' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-bold">
                      <span className="text-slate-700">가구 연소득 (세전 총소득)</span>
                      <span className="text-base font-black text-[#029f45]">{annualIncome.toLocaleString()}만 원 ({(annualIncome / 10000).toFixed(1)}억)</span>
                    </div>
                    <input
                      type="range"
                      min={3000}
                      max={25000}
                      step={500}
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(Number(e.target.value))}
                      className="w-full accent-[#03c75a]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">기본 대출 금리 (%)</label>
                      <input
                        type="number"
                        step={0.1}
                        min={2.0}
                        max={8.0}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">대출 상환 만기</label>
                      <select
                        value={loanPeriodYears}
                        onChange={(e) => setLoanPeriodYears(Number(e.target.value))}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                      >
                        <option value={30}>30년 만기 (원리금균등)</option>
                        <option value={35}>35년 만기 (원리금균등)</option>
                        <option value={40}>40년 만기 (원리금균등)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">기존 기타 대출 월 상환액 (만원)</label>
                      <input
                        type="number"
                        min={0}
                        max={500}
                        step={10}
                        value={otherMonthlyDebt}
                        onChange={(e) => setOtherMonthlyDebt(Number(e.target.value))}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                      />
                    </div>

                    <div className="flex flex-col justify-end">
                      <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={applyStressDsr}
                          onChange={(e) => setApplyStressDsr(e.target.checked)}
                          className="w-4 h-4 accent-[#03c75a]"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          스트레스 DSR 2단계 (+1.2%p 가산)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#e8f8ee] to-emerald-50/50 border border-[#03c75a]/30 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>연간 DSR 40% 법적 원리금 상환 한도:</span>
                    <strong className="text-slate-900 font-black">
                      연 {maxYearlyPaymentDsr40.toLocaleString()}만 원 (월 {Math.round(maxYearlyPaymentDsr40 / 12).toLocaleString()}만 원)
                    </strong>
                  </div>

                  <div className="pt-2 border-t border-[#03c75a]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-600">
                        {applyStressDsr ? '⚡ 스트레스 DSR 적용 시 최대 대출 가능액:' : '🏦 일반 DSR 기준 최대 대출 가능액:'}
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-[#029f45]">
                        약 {(maxLoanDsrPrincipal / 10000).toFixed(2)}억 원
                        <span className="text-sm font-bold text-slate-700 ml-1.5">
                          ({maxLoanDsrPrincipal.toLocaleString()}만 원)
                        </span>
                      </div>
                    </div>

                    {applyStressDsr && stressReductionAmount > 0 && (
                      <div className="text-left sm:text-right bg-white p-2.5 rounded-xl border border-rose-200">
                        <span className="text-[10px] text-rose-600 font-bold block">가산금리로 인한 한도 축소:</span>
                        <span className="text-xs font-black text-rose-700">
                          -{(stressReductionAmount / 10000).toFixed(2)}억 원 감소
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LTV Calc */}
            {calcMode === 'LTV' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-bold">
                      <span className="text-slate-700">매수 희망 주택 가격 (KB시세 기준)</span>
                      <span className="text-base font-black text-[#0066ff]">{(housePrice / 10000).toFixed(1)}억 원 ({housePrice.toLocaleString()}만 원)</span>
                    </div>
                    <input
                      type="range"
                      min={30000}
                      max={300000}
                      step={5000}
                      value={housePrice}
                      onChange={(e) => setHousePrice(Number(e.target.value))}
                      className="w-full accent-[#0066ff]"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="font-bold text-slate-700 block mb-1.5">적용 LTV 담보 비율</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { rate: 70, label: '70% (생애최초·무주택 비규제)' },
                        { rate: 60, label: '60% (1주택 비규제지역)' },
                        { rate: 50, label: '50% (투기과열·강남3구/용산)' },
                      ].map((item) => (
                        <button
                          key={item.rate}
                          type="button"
                          onClick={() => setLtvRate(item.rate)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
                            ltvRate === item.rate
                              ? 'bg-[#0066ff] text-white border-[#0066ff] shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="block font-black text-sm">{item.rate}%</span>
                          <span className="text-[10px] opacity-80">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#edf4ff] to-blue-50/50 border border-[#0066ff]/30 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-600 block">LTV 기준 최대 대출 한도:</span>
                      <div className="text-2xl sm:text-3xl font-black text-[#0066ff] mt-0.5">
                        {(maxLoanLtv / 10000).toFixed(2)}억 원
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-0 sm:border-l sm:border-blue-200 sm:pl-4">
                      <span className="text-xs font-bold text-slate-600 block">매수 시 필요한 최소 순현금:</span>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                        약 {(minRequiredCashLtv / 10000).toFixed(2)}억 원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gap Calc */}
            {calcMode === 'GAP' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-1 font-bold">
                      <span className="text-slate-700">매매 가격</span>
                      <span className="text-sm font-black text-slate-900">{(gapBuyPrice / 10000).toFixed(1)}억 ({gapBuyPrice.toLocaleString()}만 원)</span>
                    </div>
                    <input
                      type="range"
                      min={30000}
                      max={250000}
                      step={2000}
                      value={gapBuyPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setGapBuyPrice(val);
                        if (gapJeonsePrice > val) setGapJeonsePrice(Math.round(val * 0.65));
                      }}
                      className="w-full accent-amber-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 font-bold">
                      <span className="text-slate-700">전세 보증금</span>
                      <span className="text-sm font-black text-amber-700">{(gapJeonsePrice / 10000).toFixed(1)}억 ({gapJeonsePrice.toLocaleString()}만 원)</span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={gapBuyPrice}
                      step={1000}
                      value={gapJeonsePrice}
                      onChange={(e) => setGapJeonsePrice(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-300 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                    <span>이 단지의 전세가율:</span>
                    <strong className="text-amber-800 font-black text-base">
                      {gapJeonseRatio}%
                    </strong>
                  </div>

                  <div className="pt-2 border-t border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-700">필요한 순수 갭투자금 (현금):</span>
                      <div className="text-2xl sm:text-3xl font-black text-amber-700">
                        {(pureGapCash / 10000).toFixed(2)}억 원
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-amber-200 text-xs">
                      <span className="text-[10px] text-slate-500 block">취득세 포함 총 필요 자본:</span>
                      <span className="font-black text-slate-900">
                        약 {(totalGapNeedCash / 10000).toFixed(2)}억 원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsCalcOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
