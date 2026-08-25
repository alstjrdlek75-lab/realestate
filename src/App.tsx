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
import { Footer } from './components/Footer';
import { RefreshCw, Sparkles, Download, MapPin, ArrowRight, HelpCircle, ChevronRight, Filter, History } from 'lucide-react';

type ViewMode = 'HERO' | 'DIAGNOSTIC' | 'RESULT' | 'HISTORY';

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
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900 flex flex-col justify-between selection:bg-[#03c75a] selection:text-white">
      {/* Top Navigation */}
      <Header
        onReset={handleResetToHero}
        onGoToDiagnostic={() => {
          setViewMode('DIAGNOSTIC');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToHistory={handleGoToHistory}
        onGoToRegionalExplorer={handleScrollToRegionalExplorer}
        currentView={viewMode}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* VIEW 1: HERO / HOME */}
        {viewMode === 'HERO' && (
          <div className="animate-fadeIn">
            <Hero onStart={handleStartDiagnostic} />
            
            {/* Quick Teaser to History Section */}
            <div className="max-w-5xl mx-auto px-4 pb-14">
              <div 
                onClick={handleGoToHistory}
                className="p-6 bg-white hover:bg-slate-50 rounded-3xl border border-slate-200 shadow-sm cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shrink-0 group-hover:scale-105 transition-transform">
                    <History className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      필독 칼럼
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                      📜 대한민국 부동산 50년 역사 & 집값 상승 원동력 총정리
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      강남 개발부터 1기 신도시, 판교, 2026 초양극화까지 — 집값이 오른 진짜 이유와 불변의 가치 공식
                    </p>
                  </div>
                </div>

                <button 
                  type="button"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shrink-0 self-start sm:self-auto flex items-center gap-1.5 group-hover:bg-[#03c75a] transition-colors"
                >
                  <span>역사 탭 읽어보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: HISTORY TAB */}
        {viewMode === 'HISTORY' && (
          <div className="animate-fadeIn">
            <RealEstateHistory onStartDiagnostic={handleStartDiagnostic} />
          </div>
        )}

        {/* VIEW 3: DIAGNOSTIC FORM */}
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

        {/* VIEW 4: DIAGNOSTIC RESULT REPORT */}
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
                      onClick={handleGoToHistory}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold border border-indigo-200 transition cursor-pointer"
                    >
                      <History className="w-4 h-4" />
                      <span>부동산 역사 & 가치 원동력 칼럼</span>
                    </button>
                  </div>
                </div>

                {/* Score Quick Glance Box (Clickable for Detailed Rationale) */}
                <div className="flex flex-col bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Living Score Box */}
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

                    {/* Buying Score Box */}
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

            {/* Regional Guide & Top Complex Matches (with Search, Zone Tabs, Target City Selection, and 1:1 Side-by-Side Compare) */}
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
