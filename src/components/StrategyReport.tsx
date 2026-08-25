import React, { useState } from 'react';
import { DiagnosticResult, StrategyDossier } from '../types';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Lightbulb, 
  TrendingUp, 
  Briefcase
} from 'lucide-react';

interface StrategyReportProps {
  result: DiagnosticResult;
}

export const StrategyReport: React.FC<StrategyReportProps> = ({ result }) => {
  const [activeStrategy, setActiveStrategy] = useState<StrategyDossier>(result.primaryStrategy);

  return (
    <div className="space-y-6">
      {/* Strategy Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#03c75a]" />
          <span className="text-sm font-black text-slate-900">추천 전략 포트폴리오</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveStrategy(result.primaryStrategy)}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
              activeStrategy.key === result.primaryStrategy.key
                ? 'bg-[#03c75a] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>1순위 최적 전략 ({result.primaryStrategy.badge})</span>
          </button>

          {result.secondaryStrategy && (
            <button
              onClick={() => setActiveStrategy(result.secondaryStrategy!)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                activeStrategy.key === result.secondaryStrategy.key
                  ? 'bg-[#0066ff] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>2순위 대안 전략</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Strategy Card */}
      <div className="naver-card p-6 sm:p-10 bg-white shadow-sm relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30 text-xs font-black mb-2.5">
              <Award className="w-4 h-4" />
              <span>{activeStrategy.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {activeStrategy.title}
            </h2>
            <p className="text-sm sm:text-base text-[#029f45] font-bold mt-1">
              "{activeStrategy.subTitle}"
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right">
            <span className="text-xs text-slate-500 font-medium block">적정 권장 가용 자본</span>
            <span className="text-base font-black text-slate-900 mt-1 block">
              {activeStrategy.targetBudgetBand}
            </span>
          </div>
        </div>

        {/* Description & Core Rationales */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#03c75a]" />
                <span>전략 개요 및 설계 철학</span>
              </h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {activeStrategy.description}
              </p>
            </div>

            {/* Why This Strategy */}
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#03c75a]" />
                <span>왜 이 전략이 당신에게 가장 유리한가?</span>
              </h3>
              <ul className="mt-3 space-y-2.5">
                {activeStrategy.whyThisStrategy.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-[#e8f8ee] text-[#029f45] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample Portfolio Box */}
          <div className="bg-gradient-to-b from-[#edf4ff]/50 to-white p-6 rounded-2xl border border-[#0066ff]/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#0066ff] uppercase tracking-wider mb-4">
                <Briefcase className="w-4 h-4" />
                <span>예시 실행 포트폴리오</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-500 block text-[11px] font-medium">실거주 솔루션 (Living)</span>
                  <span className="font-bold text-slate-800 mt-1 block">
                    {activeStrategy.samplePortfolio.livingSolution}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-500 block text-[11px] font-medium">매수·투자 솔루션 (Buying)</span>
                  <span className="font-bold text-[#0066ff] mt-1 block">
                    {activeStrategy.samplePortfolio.buyingSolution}
                  </span>
                </div>

                <div className="bg-[#e8f8ee] p-3.5 rounded-xl border border-[#03c75a]/30">
                  <span className="text-[#029f45] block text-[11px] font-black">5년 후 기대 효과</span>
                  <span className="font-bold text-slate-800 mt-1 block">
                    {activeStrategy.samplePortfolio.expectedOutcome}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 text-center font-medium">
              개인 소득 및 자본금에 따라 유연하게 튜닝 가능합니다
            </div>
          </div>
        </div>

        {/* 4-Step Execution Roadmap */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#0066ff]" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">4단계 실전 실행 로드맵</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeStrategy.executionRoadmap.map((stepItem) => (
              <div 
                key={stepItem.step}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-[#03c75a]/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-xl bg-[#03c75a] text-white font-black text-xs flex items-center justify-center shadow-sm">
                      {stepItem.step}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">STEP {stepItem.step}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{stepItem.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{stepItem.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-[#029f45] flex items-start gap-1.5 font-medium">
                  <span className="font-bold shrink-0">💡 TIP:</span>
                  <span>{stepItem.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pros */}
          <div className="bg-[#e8f8ee]/60 border border-[#03c75a]/30 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-[#029f45] flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>전략의 핵심 장점 (Pros)</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              {activeStrategy.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#03c75a] font-black">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons & Risk */}
          <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>주의 및 리스크 관리 요인 (Risk Factors)</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              {activeStrategy.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-black">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
