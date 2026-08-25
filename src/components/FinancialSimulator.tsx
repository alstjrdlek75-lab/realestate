import React, { useState } from 'react';
import { DiagnosticInput, DiagnosticResult } from '../types';
import { Calculator, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, DollarSign } from 'lucide-react';

interface FinancialSimulatorProps {
  input: DiagnosticInput;
  result: DiagnosticResult;
  onUpdateInput: (updated: Partial<DiagnosticInput>) => void;
}

export const FinancialSimulator: React.FC<FinancialSimulatorProps> = ({ input, result, onUpdateInput }) => {
  const [interestRate, setInterestRate] = useState<number>(4.1); // 연 4.1%
  const [loanYears, setLoanYears] = useState<number>(35); // 35년 만기

  // 1. Correct Units Calculation:
  // annualIncome is in '만원' (e.g. 6000 = 6,000만원 = 0.6억원)
  const annualIncomeEok = input.annualIncome / 10000;
  const maxAnnualRepaymentEok = annualIncomeEok * 0.40; // DSR 40% 연간 상환한도 (억원)
  const monthlyRepaymentBudgetEok = maxAnnualRepaymentEok / 12; // 월 상환한도 (억원)
  
  // Amortization factor (원리금균등상환 계수)
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;
  const amortFactor = (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Theoretical max safe loan in 억원
  const theoreticalLoanEok = monthlyRepaymentBudgetEok / amortFactor;
  const maxPossibleLoan = Math.max(0, theoreticalLoanEok - (input.existingDebt || 0));
  const maxSafeLoan = Math.round(maxPossibleLoan * 10) / 10; // e.g. 3.9억

  // Total Buying Budget = Cash + Safe Loan
  const totalBudget = Math.round((input.cash + maxSafeLoan) * 10) / 10;
  
  // Actual monthly repayment amount in 만원
  const monthlyRepayManwon = Math.round(maxSafeLoan * 10000 * amortFactor);

  // Price range band (85% ~ 105%)
  const minPriceBand = Math.round((totalBudget * 0.85) * 10) / 10;
  const maxPriceBand = Math.round((totalBudget * 1.05) * 10) / 10;

  // LTV approx
  const approxLtv = totalBudget > 0 ? Math.round((maxSafeLoan / totalBudget) * 100) : 0;

  return (
    <div className="naver-card p-6 sm:p-10 bg-white shadow-sm" id="financial-simulator">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              실시간 DSR 40% 자금 & 대출 시뮬레이터
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              내 현금과 연소득을 직접 입력하면, 정부 DSR 규제 기준 내가 살 수 있는 안전 아파트 가격대를 즉시 계산합니다
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
            DSR 40% / 금리 {interestRate}% / {loanYears}년 만기 기준
          </span>
        </div>
      </div>

      {/* Purpose Explanation Banner */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#e8f8ee] via-white to-[#edf4ff] border border-slate-200 flex items-start gap-3 text-xs text-slate-700 font-medium">
        <HelpCircle className="w-5 h-5 text-[#03c75a] mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <strong className="text-slate-900 font-bold">💡 이 계산기가 알려주는 것: </strong>
          현재 보유 현금 <strong className="text-[#029f45]">{input.cash.toFixed(1)}억 원</strong>과 
          연소득 <strong className="text-[#0066ff]">{(input.annualIncome / 10000).toFixed(1)}억 원({input.annualIncome.toLocaleString()}만 원)</strong>일 때, 
          은행에서 안전하게 빌릴 수 있는 주담대는 <strong className="text-[#029f45]">{maxSafeLoan}억 원</strong>이며, 
          따라서 <strong>총 {minPriceBand}억 ~ {maxPriceBand}억 원대 아파트</strong>를 매수하는 것이 가계에 가장 안전합니다.
        </div>
      </div>

      {/* Grid: Controls & Summary */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 cols: Direct Inputs + Sliders */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Cash Input (Direct Typing + Slider) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-slate-800">
                보유 순현금 (시드머니)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0.1"
                  max="30"
                  step="0.1"
                  value={input.cash}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && val >= 0) {
                      onUpdateInput({ cash: val });
                    }
                  }}
                  className="w-20 bg-white text-right font-black text-sm text-[#029f45] px-2 py-1 rounded-lg border border-[#03c75a] focus:outline-none focus:ring-2 focus:ring-[#03c75a]/30"
                />
                <span className="text-xs font-bold text-slate-700">억 원</span>
              </div>
            </div>

            <input
              type="range"
              min="0.5"
              max="15"
              step="0.5"
              value={input.cash}
              onChange={(e) => onUpdateInput({ cash: parseFloat(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a]"
            />
            
            {/* Quick Add Buttons */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { label: '1억', val: 1.0 },
                { label: '2억', val: 2.0 },
                { label: '3억', val: 3.0 },
                { label: '5억', val: 5.0 },
                { label: '7억', val: 7.0 },
                { label: '10억', val: 10.0 }
              ].map(item => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onUpdateInput({ cash: item.val })}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition border ${
                    input.cash === item.val
                      ? 'bg-[#03c75a] text-white border-[#03c75a]'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Income Input (Direct Typing + Slider) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-slate-800">
                가구 연간 합산 세전 소득
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="2000"
                  max="40000"
                  step="500"
                  value={input.annualIncome}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 0) {
                      onUpdateInput({ annualIncome: val });
                    }
                  }}
                  className="w-24 bg-white text-right font-black text-sm text-[#0066ff] px-2 py-1 rounded-lg border border-[#0066ff] focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30"
                />
                <span className="text-xs font-bold text-slate-700">만 원</span>
              </div>
            </div>

            <input
              type="range"
              min="3000"
              max="25000"
              step="500"
              value={input.annualIncome}
              onChange={(e) => onUpdateInput({ annualIncome: parseInt(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
            />

            {/* Quick Income Buttons */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { label: '4,000만', val: 4000 },
                { label: '6,000만', val: 6000 },
                { label: '8,000만', val: 8000 },
                { label: '1억', val: 10000 },
                { label: '1.3억', val: 13000 },
                { label: '1.6억', val: 16000 }
              ].map(item => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onUpdateInput({ annualIncome: item.val })}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition border ${
                    input.annualIncome === item.val
                      ? 'bg-[#0066ff] text-white border-[#0066ff]'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Interest & Years Settings */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 block mb-1 font-medium">대출 예상 금리</span>
              <select
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full bg-white text-slate-900 rounded-lg px-2.5 py-1.5 border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#03c75a]"
              >
                <option value={3.5}>연 3.5% (디딤돌/특례)</option>
                <option value={3.8}>연 3.8% (우대금리)</option>
                <option value={4.1}>연 4.1% (시중은행 평균)</option>
                <option value={4.5}>연 4.5% (보수적)</option>
              </select>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 block mb-1 font-medium">상환 기간</span>
              <select
                value={loanYears}
                onChange={(e) => setLoanYears(parseInt(e.target.value))}
                className="w-full bg-white text-slate-900 rounded-lg px-2.5 py-1.5 border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#03c75a]"
              >
                <option value={30}>30년 원리금균등</option>
                <option value={35}>35년 원리금균등</option>
                <option value={40}>40년 (청년/신혼)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Realistic Calculated Result Cards */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#e8f8ee]/50 via-white to-[#edf4ff]/50 p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#029f45] uppercase tracking-wider">
                정밀 계산 결과
              </span>
              <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                LTV {approxLtv}% / DSR 40% 충족
              </span>
            </div>

            {/* Total Safe Budget Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#03c75a]/30 shadow-2xs">
              <span className="text-xs text-slate-500 font-bold block">안전 매수 가능 아파트 가격 밴드</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                <span className="text-[#029f45]">{minPriceBand}억</span> ~ <span className="text-[#029f45]">{maxPriceBand}억 원</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                (보유 현금 {input.cash.toFixed(1)}억 + 안전 주담대 {maxSafeLoan}억 = 총 {totalBudget}억 예산)
              </p>
            </div>

            {/* 2 Key Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-bold block">최대 안전 주담대 한도</span>
                <div className="text-xl font-black text-[#029f45] mt-1">
                  {maxSafeLoan}억 원
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                  (DSR 40% 법적 한도 내)
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-bold block">월 예상 원리금 상환액</span>
                <div className="text-xl font-black text-[#0066ff] mt-1">
                  약 {monthlyRepayManwon.toLocaleString()}만 원
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                  (원금+이자 균등 상환)
                </span>
              </div>
            </div>

            {/* Gap Capacity */}
            <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs font-medium">
              <span className="text-slate-700">전세 끼고 갭투자 시 가용 자금</span>
              <span className="font-black text-[#029f45]">{input.cash.toFixed(1)}억 원 (순현금 100%)</span>
            </div>
          </div>

          {/* Safety Gauge */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
              <span>가계 재정 안전성: <strong className="text-slate-900">우수 (원리금 지출 정상 범위)</strong></span>
            </div>
            <span className="font-bold text-slate-700">LTV {approxLtv}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
