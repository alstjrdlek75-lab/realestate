import React, { useState } from 'react';
import { DiagnosticResult, FactorScoreDetail } from '../types';
import { X, Sparkles, Home, TrendingUp, CheckCircle2, Lightbulb, PieChart, ArrowRight } from 'lucide-react';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DiagnosticResult;
  initialTab?: 'living' | 'buying';
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  isOpen,
  onClose,
  result,
  initialTab = 'living'
}) => {
  const [activeTab, setActiveTab] = useState<'living' | 'buying'>(initialTab);

  if (!isOpen) return null;

  const isLiving = activeTab === 'living';
  const currentScore = isLiving ? result.livingScore : result.buyingScore;
  const currentGrade = isLiving ? result.livingGrade : result.buyingGrade;
  const currentSummary = isLiving ? result.livingAnalysisSummary : result.buyingAnalysisSummary;
  const currentFactors: FactorScoreDetail[] = isLiving ? result.livingFactors : result.buyingFactors;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-5 border-b border-slate-100 pr-10">
          <div className="flex items-center gap-2 text-xs font-black text-[#029f45] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI 정밀 점수 산출 근거 리포트</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            점수 산출 근거 및 가중치 세부 분석
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            설문 입력값과 가구 생애주기별 가중치가 반영되어 점수가 산출된 구체적인 이유입니다
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('living')}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition border ${
              isLiving
                ? 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a] shadow-sm ring-2 ring-[#03c75a]/20'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>실거주 만족도 (Living: {result.livingScore}점)</span>
          </button>

          <button
            onClick={() => setActiveTab('buying')}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition border ${
              !isLiving
                ? 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff] shadow-sm ring-2 ring-[#0066ff]/20'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>자산 투자 가치 (Buying: {result.buyingScore}점)</span>
          </button>
        </div>

        {/* Score Summary Banner */}
        <div className={`mt-6 p-5 rounded-2xl border ${
          isLiving ? 'bg-[#e8f8ee]/60 border-[#03c75a]/30' : 'bg-[#edf4ff]/60 border-[#0066ff]/30'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500">
                {isLiving ? '🌿 실거주 만족도 최종 진단' : '🚀 자산 투자 가치 최종 진단'}
              </span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {currentScore}점 <span className={`text-base ${isLiving ? 'text-[#029f45]' : 'text-[#0066ff]'}`}>({currentGrade}등급)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs text-slate-700">
                수도권 상위 {Math.max(3, 100 - currentScore + 5)}% 수준
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-700 mt-3 leading-relaxed font-medium pt-3 border-t border-slate-200/60">
            {currentSummary}
          </p>
        </div>

        {/* Factor by Factor Breakdown */}
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-slate-500" />
            <span>세부 평가 항목별 득점 및 가중치 반영 내역</span>
          </h3>

          <div className="space-y-3">
            {currentFactors.map((factor) => (
              <div 
                key={factor.id}
                className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{factor.label}</span>
                    <span className="text-[11px] font-medium bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                      입력값: {factor.rawInput}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-slate-500">가중치 {Math.round(factor.weight * 100)}%</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-black ${
                      isLiving 
                        ? 'bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/20' 
                        : 'bg-[#edf4ff] text-[#0066ff] border border-[#0066ff]/20'
                    }`}>
                      {factor.score}점 (기여점수: +{factor.contribution}점)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden my-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isLiving ? 'bg-[#03c75a]' : 'bg-[#0066ff]'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>

                {/* Rationale & Tip */}
                <div className="text-xs space-y-1.5 mt-2">
                  <div className="text-slate-700 font-medium leading-relaxed flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold shrink-0">판단 근거:</span>
                    <span>{factor.rationale}</span>
                  </div>

                  <div className={`text-[11px] font-bold flex items-start gap-1.5 pt-1.5 border-t border-slate-200/60 ${
                    isLiving ? 'text-[#029f45]' : 'text-[#0066ff]'
                  }`}>
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>추천 팁: {factor.recommendationTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
