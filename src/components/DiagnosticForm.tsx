import React, { useState } from 'react';
import { DiagnosticInput, LifeStage } from '../types';
import { TargetRegionSelector } from './TargetRegionSelector';
import { 
  DollarSign, 
  Home, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  Clock, 
  Train, 
  GraduationCap, 
  Building,
  Trees
} from 'lucide-react';

interface DiagnosticFormProps {
  initialValues?: DiagnosticInput;
  onSubmit: (values: DiagnosticInput) => void;
}

const DEFAULT_INPUTS: DiagnosticInput = {
  cash: 3.5, // 3.5억원
  annualIncome: 9000, // 9,000만원
  existingDebt: 0.5, // 0.5억원
  targetMonthlyPayment: 220, // 220만원
  commuteTolerance: 2, // 30~45분
  newConstructionPref: 4, // 4점
  greenLivingPref: 3, // 3점
  commercialInfraPref: 4, // 4점
  gbdRailTransitPref: 5, // 5점
  schoolDistrictPref: 4, // 4점
  capitalAppreciationPref: 5, // 5점
  liquidityPref: 4, // 4점
  lifeStage: 'newlywed',
  targetCities: []
};

export const DiagnosticForm: React.FC<DiagnosticFormProps> = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState<DiagnosticInput>(initialValues || DEFAULT_INPUTS);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const totalSteps = 4;

  const handlePresetApply = (stage: LifeStage) => {
    if (stage === 'starter') {
      setFormData({
        ...formData,
        cash: 1.8,
        annualIncome: 6000,
        existingDebt: 0.2,
        targetMonthlyPayment: 130,
        commuteTolerance: 1,
        newConstructionPref: 3,
        greenLivingPref: 2,
        commercialInfraPref: 5,
        gbdRailTransitPref: 5,
        schoolDistrictPref: 2,
        capitalAppreciationPref: 5,
        liquidityPref: 4,
        lifeStage: 'starter'
      });
    } else if (stage === 'newlywed') {
      setFormData({
        ...formData,
        cash: 4.0,
        annualIncome: 11000,
        existingDebt: 0.5,
        targetMonthlyPayment: 250,
        commuteTolerance: 2,
        newConstructionPref: 5,
        greenLivingPref: 3,
        commercialInfraPref: 4,
        gbdRailTransitPref: 5,
        schoolDistrictPref: 3,
        capitalAppreciationPref: 4,
        liquidityPref: 5,
        lifeStage: 'newlywed'
      });
    } else if (stage === 'child_raising') {
      setFormData({
        ...formData,
        cash: 6.5,
        annualIncome: 14000,
        existingDebt: 1.0,
        targetMonthlyPayment: 320,
        commuteTolerance: 3,
        newConstructionPref: 4,
        greenLivingPref: 4,
        commercialInfraPref: 4,
        gbdRailTransitPref: 4,
        schoolDistrictPref: 5,
        capitalAppreciationPref: 4,
        liquidityPref: 5,
        lifeStage: 'child_raising'
      });
    } else if (stage === 'retiree') {
      setFormData({
        ...formData,
        cash: 7.0,
        annualIncome: 5000,
        existingDebt: 0,
        targetMonthlyPayment: 80,
        commuteTolerance: 4,
        newConstructionPref: 4,
        greenLivingPref: 5,
        commercialInfraPref: 4,
        gbdRailTransitPref: 3,
        schoolDistrictPref: 1,
        capitalAppreciationPref: 2,
        liquidityPref: 3,
        lifeStage: 'retiree'
      });
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header & Quick Presets */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f8ee] border border-[#03c75a]/30 text-[#029f45] text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>간편 진단 인터페이스</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          맞춤형 부동산 성향 정밀 진단
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          숫자를 직접 입력하거나 슬라이더를 조절하여 나의 자금력과 선호도를 입력하세요
        </p>

        {/* Quick Presets Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500 font-medium mr-1">빠른 추천 프리셋:</span>
          <button
            type="button"
            onClick={() => handlePresetApply('starter')}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition cursor-pointer"
          >
            🌱 사회초년생
          </button>
          <button
            type="button"
            onClick={() => handlePresetApply('newlywed')}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition cursor-pointer"
          >
            💍 신혼부부
          </button>
          <button
            type="button"
            onClick={() => handlePresetApply('child_raising')}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition cursor-pointer"
          >
            🎒 학령기 가구
          </button>
          <button
            type="button"
            onClick={() => handlePresetApply('retiree')}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition cursor-pointer"
          >
            ☕ 은퇴 준비
          </button>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span className={currentStep >= 1 ? 'text-[#03c75a]' : ''}>1. 재정 및 예산</span>
          <span className={currentStep >= 2 ? 'text-[#03c75a]' : ''}>2. 실거주(Living)</span>
          <span className={currentStep >= 3 ? 'text-[#03c75a]' : ''}>3. 투자성(Buying)</span>
          <span className={currentStep >= 4 ? 'text-[#03c75a]' : ''}>4. 생애주기 & 관심지역</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#03c75a] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Form Card */}
      <div className="naver-card p-6 sm:p-10 shadow-lg relative bg-white">
        {/* Step 1: 재정 및 예산 */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 1. 재정 역량 및 가용 예산</h3>
                <p className="text-xs text-slate-500">숫자를 직접 입력하거나 슬라이더를 움직여 현실적인 DSR 40% 대출 한도를 계산합니다</p>
              </div>
            </div>

            {/* Cash Input (Direct Typing + Slider) */}
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800">
                  보유 순현금 (시드머니)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={formData.cash}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        setFormData({ ...formData, cash: val });
                      }
                    }}
                    className="w-20 bg-white text-right font-black text-sm text-[#029f45] px-2.5 py-1 rounded-lg border border-[#03c75a] focus:outline-none focus:ring-2 focus:ring-[#03c75a]/30"
                  />
                  <span className="text-sm font-bold text-slate-700">억 원</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={formData.cash}
                onChange={(e) => setFormData({ ...formData, cash: parseFloat(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>0원</span>
                <span>5억</span>
                <span>10억</span>
                <span>15억</span>
                <span>20억+</span>
              </div>
            </div>

            {/* Annual Income (Direct Typing + Slider) */}
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800">
                  가구 연간 합산 세전 소득
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="50000"
                    step="500"
                    value={formData.annualIncome}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        setFormData({ ...formData, annualIncome: val });
                      }
                    }}
                    className="w-24 bg-white text-right font-black text-sm text-[#0066ff] px-2.5 py-1 rounded-lg border border-[#0066ff] focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30"
                  />
                  <span className="text-sm font-bold text-slate-700">만 원</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={formData.annualIncome}
                onChange={(e) => setFormData({ ...formData, annualIncome: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>0원</span>
                <span>5,000만</span>
                <span>1억</span>
                <span>1.5억</span>
                <span>2억+</span>
              </div>
            </div>

            {/* Existing Debt (Direct Typing + Slider) */}
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800">
                  기존 보유 대출 잔액 (신용/마이너스 등)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.existingDebt}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        setFormData({ ...formData, existingDebt: val });
                      }
                    }}
                    className="w-20 bg-white text-right font-bold text-sm text-slate-700 px-2.5 py-1 rounded-lg border border-slate-300 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-700">억 원</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={formData.existingDebt}
                onChange={(e) => setFormData({ ...formData, existingDebt: parseFloat(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>0원</span>
                <span>1억</span>
                <span>2억</span>
                <span>3억</span>
                <span>4억</span>
                <span>5억+</span>
              </div>
            </div>

            {/* Monthly Payment Tolerance */}
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800">
                  희망 월 원리금(이자+원금) 상환 한도
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    step="10"
                    value={formData.targetMonthlyPayment}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        setFormData({ ...formData, targetMonthlyPayment: val });
                      }
                    }}
                    className="w-20 bg-white text-right font-black text-sm text-teal-700 px-2.5 py-1 rounded-lg border border-teal-400 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-700">만 원</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={formData.targetMonthlyPayment}
                onChange={(e) => setFormData({ ...formData, targetMonthlyPayment: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>0원</span>
                <span>100만</span>
                <span>200만</span>
                <span>300만</span>
                <span>400만</span>
                <span>500만+</span>
              </div>
            </div>

            {/* Quick Helper Banner */}
            <div className="p-4 rounded-2xl bg-white border border-[#03c75a]/30 shadow-2xs flex items-start gap-3 text-xs text-slate-600">
              <Info className="w-4 h-4 text-[#03c75a] mt-0.5 shrink-0" />
              <span>
                연소득 <strong className="text-slate-900">{(formData.annualIncome / 10000).toFixed(1)}억 원({formData.annualIncome.toLocaleString()}만 원)</strong> 기준, 
                DSR 40% 적용 시 예상 최대 안전 대출 한도는 약 <strong className="text-[#029f45]">{Math.max(0, ((formData.annualIncome / 10000 * 0.4 / 12 / 0.00448) - formData.existingDebt)).toFixed(1)}억 원</strong>이며, 
                보유 현금 {formData.cash.toFixed(1)}억 원과 합산한 총 매수 예산은 <strong className="text-[#0066ff]">{(formData.cash + Math.max(0, ((formData.annualIncome / 10000 * 0.4 / 12 / 0.00448) - formData.existingDebt))).toFixed(1)}억 원</strong> 수준입니다.
              </span>
            </div>
          </div>
        )}

        {/* Step 2: 실거주 편의 (Living) */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 2. 실거주 만족도 (Living Factor)</h3>
                <p className="text-xs text-slate-500">나와 가족의 일상 쾌적성과 라이프스타일 우선순위를 평가합니다</p>
              </div>
            </div>

            {/* Commute Tolerance */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#03c75a]" />
                <span>주요 직장 편도 출퇴근 허용 시간</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: 1, label: '30분 이내 (최우선)', desc: '워라밸 필수' },
                  { value: 2, label: '45분 내외', desc: '서울/경기 주요권' },
                  { value: 3, label: '60분 내외', desc: '수도권 광역철도' },
                  { value: 4, label: '75분 이상 감수', desc: '넓은 신도시 선호' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, commuteTolerance: item.value })}
                    className={`p-3.5 rounded-2xl text-left border transition cursor-pointer ${
                      formData.commuteTolerance === item.value
                        ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] shadow-sm font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* New Construction & Community */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#03c75a]" />
                  <span>신축 / 대단지 하이엔드 커뮤니티 선호도</span>
                </label>
                <span className="text-sm font-black text-[#029f45] bg-[#e8f8ee] px-3 py-0.5 rounded-lg border border-[#03c75a]/30">
                  {formData.newConstructionPref}점 / 5점
                </span>
              </div>
              <p className="text-xs text-slate-500">피트니스, 수영장, 조식 서비스, 지하주차장 다이렉트 연결 등</p>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={formData.newConstructionPref}
                onChange={(e) => setFormData({ ...formData, newConstructionPref: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1점 (구축 무관)</span>
                <span>3점 (보통)</span>
                <span>5점 (신축 필수)</span>
              </div>
            </div>

            {/* Green Living / Nature */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Trees className="w-4 h-4 text-[#03c75a]" />
                  <span>자연환경 / 공원 / 조용한 쾌적성 선호도</span>
                </label>
                <span className="text-sm font-black text-[#029f45] bg-[#e8f8ee] px-3 py-0.5 rounded-lg border border-[#03c75a]/30">
                  {formData.greenLivingPref}점 / 5점
                </span>
              </div>
              <p className="text-xs text-slate-500">대형 호수공원, 숲세권, 하천 산책로, 소음 없는 주거 전용지역</p>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={formData.greenLivingPref}
                onChange={(e) => setFormData({ ...formData, greenLivingPref: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1점 (도심 선호)</span>
                <span>3점 (보통)</span>
                <span>5점 (쾌적성 필수)</span>
              </div>
            </div>

            {/* Commercial Infra */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span>슬세권 상권 / 대형쇼핑몰 / 병원 접근성</span>
                </label>
                <span className="text-sm font-black text-[#029f45] bg-[#e8f8ee] px-3 py-0.5 rounded-lg border border-[#03c75a]/30">
                  {formData.commercialInfraPref}점 / 5점
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={formData.commercialInfraPref}
                onChange={(e) => setFormData({ ...formData, commercialInfraPref: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1점 (낮음)</span>
                <span>3점 (보통)</span>
                <span>5점 (매우 중요)</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 자산 투자 가치 (Buying) */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#edf4ff] text-[#0066ff] flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 3. 자산 투자 가치 (Buying Power)</h3>
                <p className="text-xs text-slate-500">미래 시세 상승률, 상급지 진입 가능성, 환금성 목표를 설정합니다</p>
              </div>
            </div>

            {/* GBD Rail Transit */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Train className="w-4 h-4 text-[#0066ff]" />
                  <span>강남(GBD)·주요 도심 직결 철도망 가치</span>
                </label>
                <span className="text-sm font-black text-[#0066ff] bg-[#edf4ff] px-3 py-0.5 rounded-lg border border-[#0066ff]/30">
                  {formData.gbdRailTransitPref}점 / 5점
                </span>
              </div>
              <p className="text-xs text-slate-500">2, 3, 7, 8(잠실), 9호선(급행), 신분당선, GTX-A/C 등 황금 노선</p>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={formData.gbdRailTransitPref}
                onChange={(e) => setFormData({ ...formData, gbdRailTransitPref: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1점 (상관없음)</span>
                <span>3점 (보통)</span>
                <span>5점 (필수 가치)</span>
              </div>
            </div>

            {/* School District */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#0066ff]" />
                  <span>상위 명문 학군 / 대형 학원가 인접성</span>
                </label>
                <span className="text-sm font-black text-[#0066ff] bg-[#edf4ff] px-3 py-0.5 rounded-lg border border-[#0066ff]/30">
                  {formData.schoolDistrictPref}점 / 5점
                </span>
              </div>
              <p className="text-xs text-slate-500">평촌·수지·분당·영통·일산·대치급 대형 학원가 및 명문 중고교</p>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={formData.schoolDistrictPref}
                onChange={(e) => setFormData({ ...formData, schoolDistrictPref: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1점 (필요 없음)</span>
                <span>3점 (보통)</span>
                <span>5점 (최우선)</span>
              </div>
            </div>

            {/* Capital Appreciation / Redevelopment */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span>장기 시세 상승 & 재개발·재건축 가치 비중</span>
                </label>
                <span className="text-sm font-black text-[#0066ff] bg-[#edf4ff] px-3 py-0.5 rounded-lg border border-[#0066ff]/30">
                  {formData.capitalAppreciationPref}점 / 5점
                </span>
              </div>
              <p className="text-xs text-slate-500">인플레이션 방어를 넘어 자산 급지 상향을 최우선 목표로 둘지 여부</p>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={formData.capitalAppreciationPref}
                onChange={(e) => setFormData({ ...formData, capitalAppreciationPref: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1점 (방어 위주)</span>
                <span>3점 (평균 수준)</span>
                <span>5점 (고수익 공격형)</span>
              </div>
            </div>

            {/* Liquidity / 1,000+ units */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span>환금성 및 1,000세대 이상 대단지 집착도</span>
                </label>
                <span className="text-sm font-black text-[#0066ff] bg-[#edf4ff] px-3 py-0.5 rounded-lg border border-[#0066ff]/30">
                  {formData.liquidityPref}점 / 5점
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={formData.liquidityPref}
                onChange={(e) => setFormData({ ...formData, liquidityPref: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1점 (낮음)</span>
                <span>3점 (보통)</span>
                <span>5점 (대단지 필수)</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 생애주기 및 관심 지역 한정 */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Step 4. 생애주기 & 관심 지역(한정) 설정</h3>
                <p className="text-xs text-slate-500">생애주기와 원하는 경기도/서울 지역을 선택해 진단 범위를 맞춤 설정합니다</p>
              </div>
            </div>

            {/* Life Stages */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-3">
                현재 가구 생애주기 선택:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    id: 'starter' as LifeStage,
                    title: '사회초년생 / 1인 가구',
                    desc: '시드머니 형성기, 직주근접 및 갭투자 선호',
                    icon: '🌱'
                  },
                  {
                    id: 'newlywed' as LifeStage,
                    title: '신혼부부 / 무자녀 가구',
                    desc: '특공/신생아특례 활용, 준신축 실거주',
                    icon: '💍'
                  },
                  {
                    id: 'child_raising' as LifeStage,
                    title: '학령기 자녀 가구',
                    desc: '초품아, 중고교 명문 학군지 최우선',
                    icon: '🎒'
                  },
                  {
                    id: 'mover_upgrade' as LifeStage,
                    title: '1주택 갈아타기',
                    desc: '비과세 차익을 활용한 상급지 이동',
                    icon: '🚀'
                  },
                  {
                    id: 'retiree' as LifeStage,
                    title: '은퇴 준비 / 다운사이징',
                    desc: '병원 인접, 자연친화 쾌적 실거주',
                    icon: '☕'
                  }
                ].map((stage) => (
                  <div
                    key={stage.id}
                    onClick={() => setFormData({ ...formData, lifeStage: stage.id })}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      formData.lifeStage === stage.id
                        ? 'bg-[#e8f8ee] border-[#03c75a] text-slate-900 shadow-sm ring-2 ring-[#03c75a]/30'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{stage.icon}</span>
                      {formData.lifeStage === stage.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
                      )}
                    </div>
                    <h4 className="text-sm font-bold mt-2 text-slate-900">{stage.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{stage.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Region Scope Selector */}
            <div className="pt-4 border-t border-slate-100">
              <TargetRegionSelector
                selectedCities={formData.targetCities || []}
                onChangeSelectedCities={(cities) => setFormData({ ...formData, targetCities: cities })}
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전 단계</span>
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-sm font-black shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <span>{currentStep === totalSteps ? '진단 결과 및 전략 확인하기' : '다음 단계로'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
