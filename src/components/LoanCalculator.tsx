import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Landmark, 
  Sparkles, 
  Info, 
  Clock, 
  Building2, 
  Percent,
  Sliders,
  Check,
  X,
  FileText
} from 'lucide-react';

export type LoanTabMode = 'POLICY_MORTGAGE' | 'REPAYMENT_COMPARISON' | 'STRESS_DSR' | 'TOTAL_PURCHASE_BUDGET';

interface LoanCalculatorProps {
  onGoToThoughts?: () => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onGoToThoughts }) => {
  const [activeTab, setActiveTab] = useState<LoanTabMode>('POLICY_MORTGAGE');

  // 1. POLICY MORTGAGE STATE
  const [housePricePolicy, setHousePricePolicy] = useState<number>(7.5);
  const [annualIncomePolicy, setAnnualIncomePolicy] = useState<number>(9500);
  const [isNewlywed, setIsNewlywed] = useState<boolean>(true);
  const [hasNewborn, setHasNewborn] = useState<boolean>(true);
  const [hasMultipleKids, setHasMultipleKids] = useState<boolean>(false);
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);

  // Policy Evaluation
  const policyEvaluation = useMemo(() => {
    const didimdolMaxPrice = (isNewlywed || hasMultipleKids) ? 6.0 : 5.0;
    const didimdolMaxIncome = isNewlywed ? 8500 : (hasMultipleKids ? 7000 : 6000);
    const isDidimdolEligible = housePricePolicy <= didimdolMaxPrice && annualIncomePolicy <= didimdolMaxIncome && isFirstHome;
    const didimdolMaxLoan = isNewlywed ? 4.0 : (hasMultipleKids ? 3.8 : 2.5);

    const newbornMaxPrice = 9.0;
    const newbornMaxIncome = 20000;
    const isNewbornEligible = hasNewborn && housePricePolicy <= newbornMaxPrice && annualIncomePolicy <= newbornMaxIncome && isFirstHome;
    const newbornMaxLoan = 5.0;

    const bogeumjariMaxPrice = 6.0;
    const bogeumjariMaxIncome = isNewlywed ? 8500 : (hasMultipleKids ? 10000 : 7000);
    const isBogeumjariEligible = housePricePolicy <= bogeumjariMaxPrice && annualIncomePolicy <= bogeumjariMaxIncome;
    const bogeumjariMaxLoan = 3.6;

    let bestChoice = '시중은행 주택담보대출 (40년 5년 주기형 추천)';
    let bestRate = '연 3.8% ~ 4.5%';
    let maxLoanAmount = 0;
    let badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';

    if (isNewbornEligible) {
      bestChoice = '👑 신생아 특례 디딤돌 대출 (압도적 최우선)';
      bestRate = '연 1.6% ~ 3.3% (체증식 상환 가능)';
      maxLoanAmount = Math.min(newbornMaxLoan, housePricePolicy * 0.8);
      badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (isDidimdolEligible) {
      bestChoice = '🥇 일반/신혼 디딤돌 대출 (최저 금리 1순위)';
      bestRate = '연 2.15% ~ 3.0% (체증식 상환 가능)';
      maxLoanAmount = Math.min(didimdolMaxLoan, housePricePolicy * 0.8);
      badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (isBogeumjariEligible) {
      bestChoice = '🥈 보금자리론 (DSR 미적용, DTI 60%)';
      bestRate = '연 3.65% ~ 3.95% (체증식 상환 가능)';
      maxLoanAmount = Math.min(bogeumjariMaxLoan, housePricePolicy * 0.7);
      badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
    } else {
      maxLoanAmount = Math.min(housePricePolicy * 0.7, 7.0);
    }

    return {
      isDidimdolEligible,
      didimdolMaxPrice,
      didimdolMaxIncome,
      didimdolMaxLoan,
      isNewbornEligible,
      isBogeumjariEligible,
      bestChoice,
      bestRate,
      maxLoanAmount: Math.round(maxLoanAmount * 10) / 10,
      badgeColor,
      neededCash: Math.max(0, Math.round((housePricePolicy - maxLoanAmount) * 10) / 10)
    };
  }, [housePricePolicy, annualIncomePolicy, isNewlywed, hasNewborn, hasMultipleKids, isFirstHome]);

  // 2. REPAYMENT METHOD COMPARISON STATE
  const [loanPrincipal, setLoanPrincipal] = useState<number>(4.0);
  const [interestRateRepay, setInterestRateRepay] = useState<number>(3.2);
  const [loanTermYears, setLoanTermYears] = useState<number>(40);

  const repaymentCalculation = useMemo(() => {
    const principalManwon = loanPrincipal * 10000;
    const r = interestRateRepay / 100 / 12;
    const n = loanTermYears * 12;

    const equalAmortMonth = Math.round(
      (principalManwon * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    );
    const equalAmortTotalInterest = Math.round(equalAmortMonth * n - principalManwon);

    const fixedPrincipalMonth = Math.round(principalManwon / n);
    const equalPrincipalMonth1 = Math.round(fixedPrincipalMonth + principalManwon * r);
    const equalPrincipalMonth60 = Math.round(
      fixedPrincipalMonth + (principalManwon - fixedPrincipalMonth * 59) * r
    );
    const equalPrincipalTotalInterest = Math.round(
      ((principalManwon * r + fixedPrincipalMonth * r) / 2) * n
    );

    const progressiveMonth1 = Math.round(principalManwon * r * 1.08); 
    const progressiveMonth60 = Math.round(progressiveMonth1 * 1.22);
    const progressiveMonth120 = Math.round(progressiveMonth1 * 1.48);
    const avgProgressive5Y = (progressiveMonth1 + progressiveMonth60) / 2;
    const savedCash5Years = Math.round((equalAmortMonth - avgProgressive5Y) * 60);

    return {
      equalAmortMonth,
      equalAmortTotalInterest,
      equalPrincipalMonth1,
      equalPrincipalMonth60,
      equalPrincipalTotalInterest,
      progressiveMonth1,
      progressiveMonth60,
      progressiveMonth120,
      savedCash5Years
    };
  }, [loanPrincipal, interestRateRepay, loanTermYears]);

  // 3. STRESS DSR 2.0 STATE
  const [stressIncome, setStressIncome] = useState<number>(8500);
  const [existingDebtAnnual, setExistingDebtAnnual] = useState<number>(0);
  const [baseMortgageRate, setBaseMortgageRate] = useState<number>(3.8);

  const stressDsrCalculation = useMemo(() => {
    const annualIncomeManwon = stressIncome;
    const maxAllowedAnnualRepayment = annualIncomeManwon * 0.40 - existingDebtAnnual;
    const monthlyRepayBudget = Math.max(0, maxAllowedAnnualRepayment / 12);
    const n = 40 * 12;

    const fixedRateEffective = baseMortgageRate + 0.36;
    const rFixed = fixedRateEffective / 100 / 12;
    const fixedAmortFactor = (rFixed * Math.pow(1 + rFixed, n)) / (Math.pow(1 + rFixed, n) - 1);
    const maxLoanFixedEok = Math.round((monthlyRepayBudget / fixedAmortFactor / 10000) * 10) / 10;

    const variableRateEffective = baseMortgageRate + 1.20;
    const rVar = variableRateEffective / 100 / 12;
    const varAmortFactor = (rVar * Math.pow(1 + rVar, n)) / (Math.pow(1 + rVar, n) - 1);
    const maxLoanVariableEok = Math.round((monthlyRepayBudget / varAmortFactor / 10000) * 10) / 10;

    const limitDifference = Math.max(0, Math.round((maxLoanFixedEok - maxLoanVariableEok) * 10) / 10);
    const limitDiffManwon = Math.round(limitDifference * 10000);

    return {
      maxAllowedAnnualRepayment,
      maxLoanFixedEok,
      maxLoanVariableEok,
      limitDifference,
      limitDiffManwon
    };
  }, [stressIncome, existingDebtAnnual, baseMortgageRate]);

  // 4. TOTAL BUDGET & TAX CALCULATOR
  const [targetHousePrice, setTargetHousePrice] = useState<number>(9.5);
  const [userOwnCash, setUserOwnCash] = useState<number>(4.0);
  const [prevHouseSaleNet, setPrevHouseSaleNet] = useState<number>(0);

  const totalBudgetCalculation = useMemo(() => {
    const priceManwon = targetHousePrice * 10000;
    
    let taxRate = 0.011;
    if (targetHousePrice <= 6.0) {
      taxRate = 0.011;
    } else if (targetHousePrice <= 9.0) {
      taxRate = ((targetHousePrice * (2 / 3) - 3) / 100) * 1.1;
    } else {
      taxRate = 0.035;
    }
    const acquisitionTaxManwon = Math.round(priceManwon * taxRate);
    const agentFeeRate = targetHousePrice <= 9.0 ? 0.0044 : 0.0055;
    const agentFeeManwon = Math.round(priceManwon * agentFeeRate);
    const movingEtcManwon = 600;

    const totalExtraCostManwon = acquisitionTaxManwon + agentFeeManwon + movingEtcManwon;
    const totalExtraCostEok = Math.round((totalExtraCostManwon / 10000) * 100) / 100;
    const totalNeededFundsEok = Math.round((targetHousePrice + totalExtraCostEok) * 100) / 100;
    const userTotalEquityEok = Math.round((userOwnCash + prevHouseSaleNet) * 100) / 100;
    const requiredLoanEok = Math.max(0, Math.round((totalNeededFundsEok - userTotalEquityEok) * 100) / 100);

    return {
      acquisitionTaxManwon,
      agentFeeManwon,
      movingEtcManwon,
      totalExtraCostEok,
      totalExtraCostManwon,
      totalNeededFundsEok,
      userTotalEquityEok,
      requiredLoanEok,
      taxPercent: (taxRate * 100).toFixed(2)
    };
  }, [targetHousePrice, userOwnCash, prevHouseSaleNet]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d2a1d] to-[#043d22] text-white shadow-xl relative overflow-hidden mb-8 border border-emerald-500/20">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>실시간 금융 & 레버리지 통합 시뮬레이터</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              스마트 대출 & 자금 레버리지 종합 계산기
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              1%대 정책 모기지 자격 판정부터 체증식 상환 절약액, 스트레스 DSR 한도 방어, 취득세 포함 갈아타기 예산까지 한곳에서 실시간 검증하세요.
            </p>
          </div>

          {onGoToThoughts && (
            <button
              onClick={onGoToThoughts}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-sm border border-white/10 transition cursor-pointer self-start md:self-auto shrink-0"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>관련 대출 칼럼 읽기</span>
            </button>
          )}
        </div>

        {/* 4 Navigation Sub-Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveTab('POLICY_MORTGAGE')}
            className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'POLICY_MORTGAGE'
                ? 'bg-[#03c75a] text-white shadow-lg font-black'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Landmark className="w-4 h-4 shrink-0" />
            <span>1. 정책 모기지 판별기</span>
          </button>

          <button
            onClick={() => setActiveTab('REPAYMENT_COMPARISON')}
            className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'REPAYMENT_COMPARISON'
                ? 'bg-[#03c75a] text-white shadow-lg font-black'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>2. 체증식 상환 비교</span>
          </button>

          <button
            onClick={() => setActiveTab('STRESS_DSR')}
            className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'STRESS_DSR'
                ? 'bg-[#03c75a] text-white shadow-lg font-black'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>3. 스트레스 DSR 한도</span>
          </button>

          <button
            onClick={() => setActiveTab('TOTAL_PURCHASE_BUDGET')}
            className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'TOTAL_PURCHASE_BUDGET'
                ? 'bg-[#03c75a] text-white shadow-lg font-black'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span>4. 취득세 & 총예산 계산</span>
          </button>
        </div>
      </div>

      {/* TAB 1 */}
      {activeTab === 'POLICY_MORTGAGE' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">내 상황 입력하기</h3>
                  <p className="text-xs text-slate-500">집값과 소득, 가구 특성을 선택하면 최적의 정책 대출을 판정합니다.</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">목표 아파트 가격</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1.0"
                      max="20.0"
                      step="0.1"
                      value={housePricePolicy}
                      onChange={(e) => setHousePricePolicy(parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 text-right text-sm font-black text-emerald-600 bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-500">억 원</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.1"
                  value={housePricePolicy}
                  onChange={(e) => setHousePricePolicy(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>2억</span>
                  <span>6억 (디딤돌/보금자리)</span>
                  <span>9억 (신생아 상한)</span>
                  <span>15억</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">부부 합산 연소득</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1000"
                      max="30000"
                      step="100"
                      value={annualIncomePolicy}
                      onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-right text-sm font-black text-blue-600 bg-slate-50 border border-slate-200 rounded-lg focus:outline-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-500">만 원</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="25000"
                  step="500"
                  value={annualIncomePolicy}
                  onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>3,000만</span>
                  <span>8,500만 (신혼 디딤돌)</span>
                  <span>1.3억</span>
                  <span>2억 (신생아 상한)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-700 block">가구 조건 선택 (중복 가능)</label>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHasNewborn(!hasNewborn)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      hasNewborn ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">👶 2년 내 출산 (신생아)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">임신·입양 포함</div>
                    </div>
                    {hasNewborn ? <CheckCircle2 className="w-4 h-4 text-rose-500" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsNewlywed(!isNewlywed)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      isNewlywed ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">💍 신혼부부</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">혼인 7년 이내</div>
                    </div>
                    {isNewlywed ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFirstHome(!isFirstHome)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      isFirstHome ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">🏠 생애최초 무주택</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">세대원 무주택</div>
                    </div>
                    {isFirstHome ? <CheckCircle2 className="w-4 h-4 text-blue-500" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasMultipleKids(!hasMultipleKids)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      hasMultipleKids ? 'bg-purple-50 border-purple-300 text-purple-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">👨‍👩‍👧‍👦 2자녀 이상 가구</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">미성년 2인 이상</div>
                    </div>
                    {hasMultipleKids ? <CheckCircle2 className="w-4 h-4 text-purple-500" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white shadow-md relative overflow-hidden border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10">
                    최적 추천 대출 상품
                  </span>
                  <span className="text-xs font-black text-emerald-400">
                    {policyEvaluation.bestRate}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {policyEvaluation.bestChoice}
                </h3>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-xs text-slate-400">정책 대출 최대 한도</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">
                      {policyEvaluation.maxLoanAmount}억 원
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">필요 최소 자기자본</div>
                    <div className="text-2xl font-black text-white mt-1">
                      {policyEvaluation.neededCash}억 원
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                  policyEvaluation.isNewbornEligible ? 'bg-rose-50/70 border-rose-300' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      policyEvaluation.isNewbornEligible ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      👑
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>신생아 특례 디딤돌</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-extrabold">최대 5억</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        집값 9억 이하 · 소득 2억 이하 · 금리 1.6~3.3%
                      </div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isNewbornEligible ? (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white text-xs font-black">신청 가능</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold">조건 미달</span>
                    )}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                  policyEvaluation.isDidimdolEligible ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      policyEvaluation.isDidimdolEligible ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      🥇
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>일반 · 신혼 디딤돌</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-extrabold">최대 4억</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        집값 ${policyEvaluation.didimdolMaxPrice}억 이하 · 소득 ${policyEvaluation.didimdolMaxIncome / 10000}억 이하 · 금리 2.15~3.0%
                      </div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isDidimdolEligible ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs font-black">신청 가능</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold">조건 미달</span>
                    )}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                  policyEvaluation.isBogeumjariEligible ? 'bg-blue-50/70 border-blue-300' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      policyEvaluation.isBogeumjariEligible ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      🥈
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>보금자리론 (DSR 미적용)</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-extrabold">최대 3.6억</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        집값 6억 이하 · DTI 60% · 금리 3.65~3.95%
                      </div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isBogeumjariEligible ? (
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500 text-white text-xs font-black">신청 가능</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold">조건 미달</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 */}
      {activeTab === 'REPAYMENT_COMPARISON' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">대출 원금</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.5"
                  max="15.0"
                  step="0.1"
                  value={loanPrincipal}
                  onChange={(e) => setLoanPrincipal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-right text-base font-black text-emerald-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-500"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">적용 금리</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={interestRateRepay}
                  onChange={(e) => setInterestRateRepay(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-right text-base font-black text-blue-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">연 %</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">대출 만기 기간</label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(parseInt(e.target.value))}
                className="w-full px-3 py-2.5 text-sm font-black text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-slate-500"
              >
                <option value={30}>30년 만기 (360개월)</option>
                <option value={35}>35년 만기 (420개월)</option>
                <option value={40}>40년 만기 (480개월, 2030 추천)</option>
                <option value={50}>50년 만기 (600개월)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/90 to-white border-2 border-emerald-500 shadow-md relative">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                  2030 직장인 치트키
                </span>
              </div>
              <div className="text-xs font-bold text-emerald-700 mb-1">한국주택금융공사 만 39세 이하</div>
              <h3 className="text-lg font-black text-slate-900">체증식 분할상환</h3>
              <p className="text-xs text-slate-500 mt-1">초기엔 이자만 내다 나중에 원금 증가</p>

              <div className="my-6 p-4 rounded-2xl bg-white border border-emerald-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">1회차 (첫 달) 상환액</span>
                  <span className="text-lg font-black text-emerald-600">
                    월 {repaymentCalculation.progressiveMonth1.toLocaleString()}만 원
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">5년 차 월 상환액</span>
                  <span className="font-bold text-slate-700">
                    월 {repaymentCalculation.progressiveMonth60.toLocaleString()}만 원
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">10년 차 월 상환액</span>
                  <span className="font-bold text-slate-700">
                    월 {repaymentCalculation.progressiveMonth120.toLocaleString()}만 원
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-100/60 text-xs text-emerald-900 font-medium">
                <strong>💡 5년간 아끼는 현금: </strong>
                5년 거주 후 갈아탈 때 원리금균등 대비 <strong className="font-bold text-emerald-700">총 {repaymentCalculation.savedCash5Years.toLocaleString()}만 원</strong>의 생활비·투자 유동성을 아낍니다.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 mb-1">가장 보편적인 상환</div>
              <h3 className="text-lg font-black text-slate-900">원리금 균등상환</h3>
              <p className="text-xs text-slate-500 mt-1">만기까지 매월 똑같은 금액 상환</p>

              <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">매월 고정 상환액</span>
                  <span className="text-lg font-black text-slate-900">
                    월 {repaymentCalculation.equalAmortMonth.toLocaleString()}만 원
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">총 발생 이자 합계</span>
                  <span className="font-bold text-slate-700">
                    {(repaymentCalculation.equalAmortTotalInterest / 10000).toFixed(2)}억 원
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>변동폭</span>
                  <span>0원 (전 기간 고정)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-700">
                <strong>특징: </strong>
                지출 계획을 일정하게 세우고 싶은 고정 소득자에게 적합합니다.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 mb-1">총이자 최소화</div>
              <h3 className="text-lg font-black text-slate-900">원금 균등상환</h3>
              <p className="text-xs text-slate-500 mt-1">원금은 고정, 이자가 점차 감소</p>

              <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">1회차 (첫 달) 상환액</span>
                  <span className="text-lg font-black text-rose-600">
                    월 {repaymentCalculation.equalPrincipalMonth1.toLocaleString()}만 원
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">5년 차 월 상환액</span>
                  <span className="font-bold text-slate-700">
                    월 {repaymentCalculation.equalPrincipalMonth60.toLocaleString()}만 원
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">총 발생 이자 합계</span>
                  <span className="font-bold text-emerald-600">
                    {(repaymentCalculation.equalPrincipalTotalInterest / 10000).toFixed(2)}억 원 (최저)
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-700">
                <strong>특징: </strong>
                초기 상환 부담이 가장 크지만, 평생 갚으며 총이자를 줄일 때 적합합니다.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 */}
      {activeTab === 'STRESS_DSR' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                소득 및 기준 금리 설정
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">본인/부부 연소득</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="2000"
                    max="30000"
                    step="500"
                    value={stressIncome}
                    onChange={(e) => setStressIncome(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">만 원</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">기존 대출 연간 원리금 상환액</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    step="50"
                    value={existingDebtAnnual}
                    onChange={(e) => setExistingDebtAnnual(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-bold text-rose-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">만 원/년</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">신용대출, 마이너스통장 이자 등</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">시중은행 주담대 기본 금리</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="2.5"
                    max="8.0"
                    step="0.1"
                    value={baseMortgageRate}
                    onChange={(e) => setBaseMortgageRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-blue-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">연 %</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-emerald-900 text-white shadow-md border border-emerald-700">
                <div className="text-xs text-emerald-300 font-bold mb-1">스트레스 DSR 2단계 한도 방어 결과</div>
                <div className="text-2xl sm:text-3xl font-black">
                  5년 주기형 선택 시 <span className="text-emerald-400">+{stressDsrCalculation.limitDifference}억 원 ({stressDsrCalculation.limitDiffManwon.toLocaleString()}만 원)</span> 한도 추가 확보!
                </div>
                <p className="text-xs text-emerald-200 mt-2">
                  변동금리는 스트레스 금리 1.2%가 100% 가산되어 한도가 대폭 깎이지만, 5년 주기형은 30%만 반영되어 소득 한도를 지켜냅니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-700">추천 (한도 극대화)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">가산금리 0.36%</span>
                  </div>
                  <h4 className="text-base font-black text-slate-900">5년 주기형 고정금리</h4>
                  <div className="text-2xl font-black text-emerald-600 mt-3">
                    최대 {stressDsrCalculation.maxLoanFixedEok}억 원
                  </div>
                  <p className="text-xs text-slate-500 mt-1">DSR 40% 한도 넉넉히 인출</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm opacity-80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-rose-600">한도 대폭 삭감</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">가산금리 1.20% (100%)</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">변동금리</h4>
                  <div className="text-2xl font-black text-slate-700 mt-3">
                    최대 {stressDsrCalculation.maxLoanVariableEok}억 원
                  </div>
                  <p className="text-xs text-slate-500 mt-1">스트레스 DSR로 한도 삭감</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4 */}
      {activeTab === 'TOTAL_PURCHASE_BUDGET' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                매수 목표 및 보유 자금 입력
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">목표 아파트 매매가</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1.0"
                    max="30.0"
                    step="0.1"
                    value={targetHousePrice}
                    onChange={(e) => setTargetHousePrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">현재 보유 순현금</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.1"
                    max="30.0"
                    step="0.1"
                    value={userOwnCash}
                    onChange={(e) => setUserOwnCash(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-emerald-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">기존 집 매도 순대금 (갈아타기 시)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.0"
                    max="30.0"
                    step="0.1"
                    value={prevHouseSaleNet}
                    onChange={(e) => setPrevHouseSaleNet(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-bold text-blue-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">기존 집 매도가 - 기존 대출 상환액</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>잔금일 필요 자금 & 부대비용 명세</span>
                <span className="text-xs text-rose-600 font-bold">부대비용 약 {totalBudgetCalculation.totalExtraCostEok}억 원</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">① 취득세 + 지방교육세 ({totalBudgetCalculation.taxPercent}%)</span>
                  <span className="font-black text-slate-900">{totalBudgetCalculation.acquisitionTaxManwon.toLocaleString()}만 원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">② 부동산 중개보수 (법정 요율)</span>
                  <span className="font-black text-slate-900">{totalBudgetCalculation.agentFeeManwon.toLocaleString()}만 원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">③ 이사 및 기본 도배/수리비 (추정)</span>
                  <span className="font-black text-slate-900">{totalBudgetCalculation.movingEtcManwon.toLocaleString()}만 원</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">총 소요 자금 (집값 + 부대비용)</span>
                  <span className="text-lg font-black text-white">{totalBudgetCalculation.totalNeededFundsEok}억 원</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">내 총 보유 자본 (현금 + 매도대금)</span>
                  <span className="text-base font-bold text-emerald-400">{totalBudgetCalculation.userTotalEquityEok}억 원</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-300">필요 대출 금액</span>
                  <span className="text-2xl font-black text-amber-400">
                    {totalBudgetCalculation.requiredLoanEok}억 원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
