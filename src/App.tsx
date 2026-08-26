import React, { useState, useMemo } from 'react';
import { DiagnosticInput, DiagnosticResult } from './types';
import { calculateRealEstateDiagnosis } from './utils/calculator';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DiagnosticForm } from './components/DiagnosticForm';
import { MatrixChart } from './components/MatrixChart';
import { RadarProfileChart } from './components/RadarProfileChart';
import { StrategyReport } from './components/StrategyReport';
import { RegionalGuide } from './components/RegionalGuide';
import { FinancialSimulator } from './components/FinancialSimulator';
import { ChecklistSection } from './components/ChecklistSection';
import { ScoreBreakdownModal } from './components/ScoreBreakdownModal';
import { RealEstateHistory } from './components/RealEstateHistory';
import { RealEstateFuture } from './components/RealEstateFuture';
import { NaverLandNews } from './components/NaverLandNews';
import { MyThoughts } from './components/MyThoughts';
import { Footer } from './components/Footer';
import { RefreshCw, Sparkles, Download, MapPin, ArrowRight, HelpCircle, ChevronRight, Filter, History, Building, Newspaper, Lightbulb } from 'lucide-react';

type ViewMode = 'HERO' | 'DIAGNOSTIC' | 'RESULT' | 'HISTORY' | 'FUTURE' | 'NEWS' | 'MY_THOUGHTS';

const DEFAULT_INPUTS: DiagnosticInput = {
  cash: 3.5, // 3.5억
  annualIncome: 9000, // 9천만
  existingDebt: 0.5,
  targetMonthlyPayment: 220,
  commuteTolerance: 2, // 45분
  newConstructionPref: 4,
  greenLivingPref: 3,
  commercialInfraPref: 4,
  gbdRailTransitPref: 5,
  schoolDistrictPref: 4,
  capitalAppreciationPref: 5,
  liquidityPref: 4,
  lifeStage: 'newlywed',
  targetCities: [] // Default: 전체 수도권
};

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('HERO');
  const [diagnosticInput, setDiagnosticInput] = useState<DiagnosticInput>(DEFAULT_INPUTS);
  const [selectedTargetCities, setSelectedTargetCities] = useState<string[]>([]);

  // Score Breakdown Modal state
  const [isScoreModalOpen, setIsScoreModalOpen] = useState<boolean>(false);
  const [scoreModalTab, setScoreModalTab] = useState<'living' | 'buying'>('living');

  // Compute diagnosis in real-time
  const diagnosticResult: DiagnosticResult = useMemo(() => {
    return calculateRealEstateDiagnosis(diagnosticInput);
  }, [diagnosticInput]);

  const handleStartDiagnostic = () => {
    setViewMode('DIAGNOSTIC');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToHistory = () => {
    setViewMode('HISTORY');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToFuture = () => {
    setViewMode('FUTURE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToNews = () => {
    setViewMode('NEWS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToThoughts = () => {
    setViewMode('MY_THOUGHTS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (values: DiagnosticInput) => {
    setDiagnosticInput(values);
    if (values.targetCities) {
      setSelectedTargetCities(values.targetCities);
    }
    setViewMode('RESULT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateInput = (updated: Partial<DiagnosticInput>) => {
    setDiagnosticInput(prev => ({ ...prev, ...updated }));
  };

  const handleResetToHero = () => {
    setViewMode('HERO');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToRegionalExplorer = () => {
    const el = document.getElementById('regional-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenScoreBreakdown = (tab: 'living' | 'buying') => {
    setScoreModalTab(tab);
    setIsScoreModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 flex flex-col justify-between selection:bg-[#03c75a] selection:text-white">
      {/* Top Navigation */}
      <Header
        onReset={handleResetToHero}
        onGoToDiagnostic={() => {
          setViewMode('DIAGNOSTIC');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToThoughts={handleGoToThoughts}
        onGoToHistory={handleGoToHistory}
        onGoToFuture={handleGoToFuture}
        onGoToNews={handleGoToNews}
        onGoToRegionalExplorer={handleScrollToRegionalExplorer}
        currentView={viewMode}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* VIEW 1: HERO / HOME */}
        {viewMode === 'HERO' && (
          <div className="animate-fadeIn">
            <Hero onStart={handleStartDiagnostic} />
            
            {/* Quick Teaser 4-Column Cards: My Thoughts & History & Future & Naver News */}
            <div className="max-w-6xl mx-auto px-4 pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: My Thoughts (New) */}
              <div 
                onClick={handleGoToThoughts}
                className="p-5 bg-white hover:bg-slate-50 rounded-3xl border border-slate-200 shadow-xs hover:shadow-sm cursor-pointer transition flex flex-col justify-between space-y-3 group ring-1 ring-emerald-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#029f45] bg-[#e8f8ee] px-2 py-0.5 rounded-full">
                      필독 칼럼
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">
                      💡 내 생각
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  "오피스텔은 왜 살기(Live)만 하고 사지(Buy) 말라는가?" 등 시장 본질을 꿰뚫는 실전 칼럼
                </p>

                <div className="pt-2 flex items-center text-xs font-bold text-[#029f45] group-hover:translate-x-1 transition-transform">
                  <span>칼럼 읽어보기 →</span>
                </div>
              </div>

              {/* Card 2: History */}
              <div 
                onClick={handleGoToHistory}
                className="p-5 bg-white hover:bg-slate-50 rounded-3xl border border-slate-200 shadow-xs hover:shadow-sm cursor-pointer transition flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      50년 변천사
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">
                      📜 부동산 역사
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  강남 개발부터 판교, 2026 초양극화까지 — 집값이 오른 진짜 이유와 불변의 가치 공식
                </p>

                <div className="pt-2 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>역사 탭 읽어보기 →</span>
                </div>
              </div>

              {/* Card 3: Future & 3rd New Towns & Redevelopments */}
              <div 
                onClick={handleGoToFuture}
                className="p-5 bg-white hover:bg-slate-50 rounded-3xl border border-slate-200 shadow-xs hover:shadow-sm cursor-pointer transition flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#029f45] bg-[#e8f8ee] px-2 py-0.5 rounded-full">
                      미래 핵심 전망
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">
                      🔮 미래지도
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  3기 신도시와 한남·성수·노량진·수택 메가 재개발 공식 정비계획도 & 실물 지도
                </p>

                <div className="pt-2 flex items-center text-xs font-bold text-[#029f45] group-hover:translate-x-1 transition-transform">
                  <span>미래지도 보기 →</span>
                </div>
              </div>

              {/* Card 4: Naver Land News Portal */}
              <div 
                onClick={handleGoToNews}
                className="p-5 bg-white hover:bg-slate-50 rounded-3xl border border-slate-200 shadow-xs hover:shadow-sm cursor-pointer transition flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#03c75a] flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#03c75a] bg-[#e8f8ee] px-2 py-0.5 rounded-full">
                      Npay 실시간
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">
                      📰 부동산 뉴스
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  AI 핵심 3줄 요약, 주간 시세 랭킹, 청약·재개발·DSR 규제 실시간 속보
                </p>

                <div className="pt-2 flex items-center text-xs font-bold text-[#03c75a] group-hover:translate-x-1 transition-transform">
                  <span>실시간 뉴스 보기 →</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MY THOUGHTS TAB */}
        {viewMode === 'MY_THOUGHTS' && (
          <div className="animate-fadeIn">
            <MyThoughts />
          </div>
        )}

        {/* VIEW 3: HISTORY TAB */}
        {viewMode === 'HISTORY' && (
          <div className="animate-fadeIn">
            <RealEstateHistory onStartDiagnostic={handleStartDiagnostic} />
          </div>
        )}

        {/* VIEW 4: FUTURE & 3RD NEW TOWNS TAB */}
        {viewMode === 'FUTURE' && (
          <div className="animate-fadeIn">
            <RealEstateFuture onStartDiagnostic={handleStartDiagnostic} />
          </div>
        )}

        {/* VIEW 5: NAVER LAND REAL ESTATE NEWS TAB */}
        {viewMode === 'NEWS' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <NaverLandNews />
          </div>
        )}

        {/* VIEW 5: DIAGNOSTIC FORM */}
        {viewMode === 'DIAGNOSTIC' && (
          <div className="animate-fadeIn">
            <DiagnosticForm
              initialValues={{
                ...diagnosticInput,
                targetCities: selectedTargetCities
              }}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}

        {/* VIEW 5: DIAGNOSTIC RESULT REPORT */}
        {viewMode === 'RESULT' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
            {/* Result Header Hero Banner */}
            <div className="naver-card p-6 sm:p-10 bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f8ee] border border-[#03c75a]/30 text-[#029f45] text-xs font-black">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>진단 완료: {diagnosticResult.quadrantName}</span>
                    </div>

                    {selectedTargetCities.length > 0 && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf4ff] border border-[#0066ff]/20 text-[#0066ff] text-xs font-bold">
                        <Filter className="w-3 h-3" />
                        <span>관심 지역 한정 ({selectedTargetCities.length}개 시·군)</span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    당신을 위한 최적 매수 전략: <br className="sm:hidden" />
                    <span className="text-[#029f45]">[{diagnosticResult.primaryStrategy.title}]</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl font-medium">
                    {diagnosticResult.quadrantSummary}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleScrollToRegionalExplorer}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 transition cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-[#03c75a]" />
                      <span>경기도 전역 26개 권역 & 서울 분석 바로보기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenScoreBreakdown('living')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e8f8ee] hover:bg-[#d8f3e2] text-[#029f45] text-xs sm:text-sm font-bold border border-[#03c75a]/30 transition cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>점수 산출 근거 보기</span>
                    </button>

                    <button
                      onClick={handleGoToFuture}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#edf4ff] hover:bg-[#ddeaff] text-[#0066ff] text-xs sm:text-sm font-bold border border-[#0066ff]/30 transition cursor-pointer"
                    >
                      <Building className="w-4 h-4" />
                      <span>3기 신도시 & 미래 분석</span>
                    </button>
                  </div>
                </div>

                {/* Score Quick Glance Box */}
                <div className="flex flex-col bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleOpenScoreBreakdown('living')}
                      className="text-center px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm cursor-pointer border border-transparent hover:border-slate-200 transition group"
                      title="클릭 시 실거주 점수 산출 근거 확인"
                    >
                      <div className="flex items-center justify-center gap-1 text-[11px] uppercase font-bold text-slate-500 group-hover:text-[#029f45]">
                        <span>실거주 (Living)</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#029f45]" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-[#029f45]">{diagnosticResult.livingScore}점</span>
                      <span className="text-[10px] font-black text-[#029f45] bg-[#e8f8ee] px-2.5 py-0.5 rounded-full block mt-1 border border-[#03c75a]/20">
                        {diagnosticResult.livingGrade}등급
                      </span>
                    </div>

                    <div className="w-[1px] h-14 bg-slate-200" />

                    <div 
                      onClick={() => handleOpenScoreBreakdown('buying')}
                      className="text-center px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm cursor-pointer border border-transparent hover:border-slate-200 transition group"
                      title="클릭 시 투자가치 점수 산출 근거 확인"
                    >
                      <div className="flex items-center justify-center gap-1 text-[11px] uppercase font-bold text-slate-500 group-hover:text-[#0066ff]">
                        <span>투자성 (Buying)</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#0066ff]" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-[#0066ff]">{diagnosticResult.buyingScore}점</span>
                      <span className="text-[10px] font-black text-[#0066ff] bg-[#edf4ff] px-2.5 py-0.5 rounded-full block mt-1 border border-[#0066ff]/20">
                        {diagnosticResult.buyingGrade}등급
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-center text-slate-400 font-medium mt-1">
                    👆 점수를 클릭하면 세부 판단 근거가 열립니다
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Charts: 2x2 Matrix & Radar Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <MatrixChart 
                  result={diagnosticResult} 
                  selectedCities={selectedTargetCities}
                  onOpenScoreBreakdown={handleOpenScoreBreakdown}
                />
              </div>
              <div className="lg:col-span-5">
                <RadarProfileChart result={diagnosticResult} />
              </div>
            </div>

            {/* Tailored Strategy Report & Roadmap */}
            <StrategyReport result={diagnosticResult} />

            {/* Financial Simulator */}
            <FinancialSimulator 
              input={diagnosticInput} 
              result={diagnosticResult} 
              onUpdateInput={handleUpdateInput} 
            />

            {/* Regional Guide & Top Complex Matches */}
            <RegionalGuide 
              result={diagnosticResult} 
              selectedCities={selectedTargetCities}
              onChangeSelectedCities={setSelectedTargetCities}
              onOpenScoreBreakdown={handleOpenScoreBreakdown}
            />

            {/* 3 Core Real Estate Principles Checklist */}
            <ChecklistSection />

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={() => {
                  setViewMode('DIAGNOSTIC');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 text-sm font-bold flex items-center justify-center gap-2 border border-slate-300 shadow-sm transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>진단 조건 수정 및 재진단</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-sm font-black flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>진단 리포트 PDF 저장 / 인쇄</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Score Breakdown Modal */}
      <ScoreBreakdownModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        result={diagnosticResult}
        initialTab={scoreModalTab}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
