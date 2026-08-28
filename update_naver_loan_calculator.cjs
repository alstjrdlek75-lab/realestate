const fs = require('fs');

const naverLoanCode = `import React, { useState, useMemo } from 'react';
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
  FileText,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export type LoanTabMode = 'POLICY_MORTGAGE' | 'REPAYMENT_COMPARISON' | 'STRESS_DSR' | 'TOTAL_PURCHASE_BUDGET';

interface LoanCalculatorProps {
  onGoToThoughts?: () => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onGoToThoughts }) => {
  const [activeTab, setActiveTab] = useState<LoanTabMode>('POLICY_MORTGAGE');

  // ==========================================
  // 1. POLICY MORTGAGE STATE
  // ==========================================
  const [housePricePolicy, setHousePricePolicy] = useState<number>(7.5); // 7.5억
  const [annualIncomePolicy, setAnnualIncomePolicy] = useState<number>(9500); // 9,500만원
  const [isNewlywed, setIsNewlywed] = useState<boolean>(true); // 신혼부부 (혼인 7년 내)
  const [hasNewborn, setHasNewborn] = useState<boolean>(true); // 2년 내 출산/신생아
  const [hasMultipleKids, setHasMultipleKids] = useState<boolean>(false); // 2자녀 이상
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true); // 생애최초 무주택

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

    let bestChoice = '시중은행 주택담보대출 (5년 주기형 추천)';
    let bestRate = '연 3.8% ~ 4.5%';
    let maxLoanAmount = 0;
    let badgeText = '시중은행';

    if (isNewbornEligible) {
      bestChoice = '신생아 특례 디딤돌 대출';
      bestRate = '연 1.6% ~ 3.3%';
      maxLoanAmount = Math.min(newbornMaxLoan, housePricePolicy * 0.8);
      badgeText = '정부지원 최우선';
    } else if (isDidimdolEligible) {
      bestChoice = isNewlywed ? '신혼부부 전용 디딤돌 대출' : '일반 디딤돌 대출';
      bestRate = '연 2.15% ~ 3.0%';
      maxLoanAmount = Math.min(didimdolMaxLoan, housePricePolicy * 0.8);
      badgeText = '1순위 최저금리';
    } else if (isBogeumjariEligible) {
      bestChoice = '한국주택금융공사 보금자리론';
      bestRate = '연 3.65% ~ 3.95%';
      maxLoanAmount = Math.min(bogeumjariMaxLoan, housePricePolicy * 0.7);
      badgeText = 'DSR 미적용';
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
      badgeText,
      maxLoanAmount: Math.round(maxLoanAmount * 10) / 10,
      neededCash: Math.max(0, Math.round((housePricePolicy - maxLoanAmount) * 10) / 10)
    };
  }, [housePricePolicy, annualIncomePolicy, isNewlywed, hasNewborn, hasMultipleKids, isFirstHome]);

  // ==========================================
  // 2. REPAYMENT METHOD COMPARISON STATE
  // ==========================================
  const [loanPrincipal, setLoanPrincipal] = useState<number>(4.0); // 4억
  const [interestRateRepay, setInterestRateRepay] = useState<number>(3.2); // 연 3.2%
  const [loanTermYears, setLoanTermYears] = useState<number>(40); // 40년

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

  // ==========================================
  // 3. STRESS DSR 2.0 STATE
  // ==========================================
  const [stressIncome, setStressIncome] = useState<number>(8500); // 8,500만원
  const [existingDebtAnnual, setExistingDebtAnnual] = useState<number>(0); // 만원
  const [baseMortgageRate, setBaseMortgageRate] = useState<number>(3.8); // 3.8%

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

  // ==========================================
  // 4. TOTAL BUDGET & TAX CALCULATOR
  // ==========================================
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fadeIn font-sans">
      
      {/* 🟢 Naver Land Style Header Bar */}
      <div className="naver-card bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#03c75a] text-white flex items-center justify-center font-black shadow-md shadow-[#03c75a]/20 shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30">
                  NAVER LAND 금융 시뮬레이터
                </span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">2026 정부 대출 규제 최신 반영</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
                대출 & 자금 레버리지 맞춤 계산기
              </h1>
            </div>
          </div>

          {onGoToThoughts && (
            <button
              onClick={onGoToThoughts}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer self-start md:self-auto shrink-0 border border-slate-200"
            >
              <FileText className="w-3.5 h-3.5 text-[#03c75a]" />
              <span>대출 최적화 칼럼 보기</span>
            </button>
          )}
        </div>

        {/* 🟢 Naver Pill Tab Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6">
          <button
            onClick={() => setActiveTab('POLICY_MORTGAGE')}
            className={\`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border \${
              activeTab === 'POLICY_MORTGAGE'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm font-black'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }\`}
          >
            <Landmark className="w-4 h-4 shrink-0" />
            <span>1. 정책 모기지 판별</span>
          </button>

          <button
            onClick={() => setActiveTab('REPAYMENT_COMPARISON')}
            className={\`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border \${
              activeTab === 'REPAYMENT_COMPARISON'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm font-black'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }\`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>2. 체증식 상환 비교</span>
          </button>

          <button
            onClick={() => setActiveTab('STRESS_DSR')}
            className={\`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border \${
              activeTab === 'STRESS_DSR'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm font-black'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }\`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>3. 스트레스 DSR 한도</span>
          </button>

          <button
            onClick={() => setActiveTab('TOTAL_PURCHASE_BUDGET')}
            className={\`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border \${
              activeTab === 'TOTAL_PURCHASE_BUDGET'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm font-black'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }\`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span>4. 취득세 & 총예산</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🟢 TAB 1: POLICY MORTGAGE QUALIFIER */}
      {/* ========================================================================= */}
      {activeTab === 'POLICY_MORTGAGE' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-black text-slate-900">내 주택 & 소득 조건 설정</span>
                <span className="text-xs text-slate-400 font-medium">직접 입력 및 슬라이더 조절</span>
              </div>

              {/* House Price */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">목표 아파트 매매가</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1.0"
                      max="20.0"
                      step="0.1"
                      value={housePricePolicy}
                      onChange={(e) => setHousePricePolicy(parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 text-right text-sm font-black text-[#029f45] bg-[#f8faf9] border border-slate-200 rounded-lg focus:border-[#03c75a] focus:ring-1 focus:ring-[#03c75a] focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-600">억 원</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.1"
                  value={housePricePolicy}
                  onChange={(e) => setHousePricePolicy(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>2억</span>
                  <span className="text-slate-600 font-bold">6억 (디딤돌 상한)</span>
                  <span className="text-[#029f45] font-bold">9억 (신생아 상한)</span>
                  <span>15억</span>
                </div>
              </div>

              {/* Annual Income */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">부부 합산 연소득</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1000"
                      max="30000"
                      step="100"
                      value={annualIncomePolicy}
                      onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-right text-sm font-black text-[#0066ff] bg-[#f8faf9] border border-slate-200 rounded-lg focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-600">만 원</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="25000"
                  step="500"
                  value={annualIncomePolicy}
                  onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>3,000만</span>
                  <span className="text-slate-600 font-bold">8,500만 (신혼)</span>
                  <span className="text-[#0066ff] font-bold">2억 (신생아 상한)</span>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-700 block mb-2">가구 우대 조건 (클릭하여 선택)</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHasNewborn(!hasNewborn)}
                    className={\`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between \${
                      hasNewborn ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }\`}
                  >
                    <div>
                      <div className="text-xs">👶 2년 내 출산 (신생아)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">임신·입양 포함</div>
                    </div>
                    {hasNewborn ? <CheckCircle2 className="w-4 h-4 text-[#03c75a]" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsNewlywed(!isNewlywed)}
                    className={\`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between \${
                      isNewlywed ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }\`}
                  >
                    <div>
                      <div className="text-xs">💍 신혼부부</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">혼인신고 7년 이내</div>
                    </div>
                    {isNewlywed ? <CheckCircle2 className="w-4 h-4 text-[#03c75a]" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFirstHome(!isFirstHome)}
                    className={\`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between \${
                      isFirstHome ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }\`}
                  >
                    <div>
                      <div className="text-xs">🏠 생애최초 무주택</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">세대원 전원 무소유</div>
                    </div>
                    {isFirstHome ? <CheckCircle2 className="w-4 h-4 text-[#03c75a]" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasMultipleKids(!hasMultipleKids)}
                    className={\`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between \${
                      hasMultipleKids ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }\`}
                  >
                    <div>
                      <div className="text-xs">👨‍👩‍👧‍👦 2자녀 이상 다자녀</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">미성년 자녀 2인 이상</div>
                    </div>
                    {hasMultipleKids ? <CheckCircle2 className="w-4 h-4 text-[#03c75a]" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Diagnosis Card (Naver Style) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Best Result Box */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#03c75a] shadow-sm relative">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30">
                    {policyEvaluation.badgeText}
                  </span>
                  <span className="text-xs font-black text-[#03c75a]">
                    예상 최저 금리 {policyEvaluation.bestRate}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {policyEvaluation.bestChoice}
                </h3>

                <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">최대 대출 가능 금액</div>
                    <div className="text-2xl sm:text-3xl font-black text-[#029f45] mt-0.5">
                      {policyEvaluation.maxLoanAmount}억 원
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">필요 최소 자기자본</div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                      {policyEvaluation.neededCash}억 원
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Major Policy Detailed List */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                {/* Newborn */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={\`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs \${
                      policyEvaluation.isNewbornEligible ? 'bg-[#e8f8ee] text-[#029f45]' : 'bg-slate-100 text-slate-400'
                    }\`}>
                      1
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">신생아 특례 디딤돌 대출</div>
                      <div className="text-[11px] text-slate-400">집값 9억 이하 · 소득 2억 이하 · 한도 5억 (1.6~3.3%)</div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isNewbornEligible ? (
                      <span className="px-2 py-1 rounded-md bg-[#e8f8ee] text-[#029f45] font-black border border-[#03c75a]/30">적격 대상</span>
                    ) : (
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-400 font-medium">조건 미달</span>
                    )}
                  </div>
                </div>

                {/* Didimdol */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={\`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs \${
                      policyEvaluation.isDidimdolEligible ? 'bg-[#e8f8ee] text-[#029f45]' : 'bg-slate-100 text-slate-400'
                    }\`}>
                      2
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">일반 / 신혼부부 디딤돌 대출</div>
                      <div className="text-[11px] text-slate-400">집값 {policyEvaluation.didimdolMaxPrice}억 이하 · 소득 {policyEvaluation.didimdolMaxIncome / 10000}억 이하 · 한도 {policyEvaluation.didimdolMaxLoan}억 (2.15~3.0%)</div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isDidimdolEligible ? (
                      <span className="px-2 py-1 rounded-md bg-[#e8f8ee] text-[#029f45] font-black border border-[#03c75a]/30">적격 대상</span>
                    ) : (
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-400 font-medium">조건 미달</span>
                    )}
                  </div>
                </div>

                {/* Bogeumjari */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={\`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs \${
                      policyEvaluation.isBogeumjariEligible ? 'bg-[#e8f8ee] text-[#029f45]' : 'bg-slate-100 text-slate-400'
                    }\`}>
                      3
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">한국주택금융공사 보금자리론</div>
                      <div className="text-[11px] text-slate-400">집값 6억 이하 · DSR 미적용(DTI 60%) · 한도 3.6억 (3.65~3.95%)</div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isBogeumjariEligible ? (
                      <span className="px-2 py-1 rounded-md bg-[#e8f8ee] text-[#029f45] font-black border border-[#03c75a]/30">적격 대상</span>
                    ) : (
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-400 font-medium">조건 미달</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🟢 TAB 2: REPAYMENT METHOD COMPARISON */}
      {/* ========================================================================= */}
      {activeTab === 'REPAYMENT_COMPARISON' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">대출 원금</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.5"
                  max="15.0"
                  step="0.1"
                  value={loanPrincipal}
                  onChange={(e) => setLoanPrincipal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-right text-base font-black text-[#029f45] bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#03c75a] focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">적용 금리</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={interestRateRepay}
                  onChange={(e) => setInterestRateRepay(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-right text-base font-black text-[#0066ff] bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#0066ff] focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">연 %</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">대출 만기 기간</label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm font-bold text-slate-800 bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#03c75a] focus:outline-none"
              >
                <option value={30}>30년 만기 (360개월)</option>
                <option value={35}>35년 만기 (420개월)</option>
                <option value={40}>40년 만기 (480개월, 추천)</option>
                <option value={50}>50년 만기 (600개월)</option>
              </select>
            </div>
          </div>

          {/* 3 Methods Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Progressive */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#03c75a] shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30">
                    2030 직장인 추천
                  </span>
                  <span className="text-[11px] text-slate-400">만 39세 이하</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">체증식 분할상환</h3>
                <p className="text-xs text-slate-500 mt-0.5">초기엔 이자만, 나중에 원금 상환</p>

                <div className="my-5 p-4 rounded-2xl bg-[#f8faf9] border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">1회차(첫 달) 월 상환액</span>
                    <span className="text-base font-black text-[#029f45]">
                      월 {repaymentCalculation.progressiveMonth1.toLocaleString()}만 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>5년 차 월 상환액</span>
                    <span className="font-bold">월 {repaymentCalculation.progressiveMonth60.toLocaleString()}만 원</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>10년 차 월 상환액</span>
                    <span className="font-bold">월 {repaymentCalculation.progressiveMonth120.toLocaleString()}만 원</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#e8f8ee] text-xs text-[#028137] font-medium leading-relaxed">
                <strong>💡 5년간 세이브 현금: </strong>
                원리금균등 대비 <strong className="font-black text-[#029f45]">총 {repaymentCalculation.savedCash5Years.toLocaleString()}만 원</strong>의 생활비·투자 유동성을 아낍니다.
              </div>
            </div>

            {/* Equal Amortization */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 inline-block mb-2">
                  표준 상환
                </div>
                <h3 className="text-lg font-black text-slate-900">원리금 균등상환</h3>
                <p className="text-xs text-slate-500 mt-0.5">만기까지 매월 동일한 금액 상환</p>

                <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">매월 고정 상환액</span>
                    <span className="text-base font-black text-slate-900">
                      월 {repaymentCalculation.equalAmortMonth.toLocaleString()}만 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>총 발생 이자</span>
                    <span className="font-bold">{(repaymentCalculation.equalAmortTotalInterest / 10000).toFixed(2)}억 원</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>금액 변동</span>
                    <span>0원 (전 기간 고정)</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-600 font-medium">
                매달 지출 금액을 일정하게 계획하고 싶은 안정 소득 가구에 적합합니다.
              </div>
            </div>

            {/* Equal Principal */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 inline-block mb-2">
                  총이자 절감
                </div>
                <h3 className="text-lg font-black text-slate-900">원금 균등상환</h3>
                <p className="text-xs text-slate-500 mt-0.5">원금은 고정, 이자가 점차 감소</p>

                <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">1회차(첫 달) 월 상환액</span>
                    <span className="text-base font-black text-slate-900">
                      월 {repaymentCalculation.equalPrincipalMonth1.toLocaleString()}만 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>5년 차 월 상환액</span>
                    <span className="font-bold">월 {repaymentCalculation.equalPrincipalMonth60.toLocaleString()}만 원</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>총 발생 이자</span>
                    <span className="font-bold text-[#029f45]">{(repaymentCalculation.equalPrincipalTotalInterest / 10000).toFixed(2)}억 원 (최저)</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-600 font-medium">
                초기 상환 부담이 가장 크지만 평생 살며 총이자를 줄일 때 유리합니다.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🟢 TAB 3: STRESS DSR 2.0 CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'STRESS_DSR' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">
                연소득 및 기존 대출 입력
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">본인/부부 연소득</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="2000"
                    max="30000"
                    step="500"
                    value={stressIncome}
                    onChange={(e) => setStressIncome(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-slate-900 bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#03c75a] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">만 원</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">기존 대출 연간 원리금 상환액</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    step="50"
                    value={existingDebtAnnual}
                    onChange={(e) => setExistingDebtAnnual(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-bold text-rose-600 bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-rose-500 focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">만 원/년</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">신용대출, 마이너스통장 이자 등</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">시중은행 주담대 기본 금리</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="2.5"
                    max="8.0"
                    step="0.1"
                    value={baseMortgageRate}
                    onChange={(e) => setBaseMortgageRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-[#0066ff] bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#0066ff] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">연 %</span>
                </div>
              </div>
            </div>

            {/* Right Result */}
            <div className="lg:col-span-7 space-y-4">
              {/* Highlight Banner */}
              <div className="p-6 rounded-3xl bg-[#e8f8ee] border border-[#03c75a]/40 shadow-sm">
                <div className="text-xs text-[#028137] font-bold mb-1">💡 스트레스 DSR 2단계 한도 방어 결과</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">
                  5년 주기형 선택 시 <span className="text-[#029f45]">+{stressDsrCalculation.limitDifference}억 원 ({stressDsrCalculation.limitDiffManwon.toLocaleString()}만 원)</span> 한도 추가 확보!
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  변동금리는 스트레스 금리 1.2%가 100% 가산되어 한도가 깎이지만, 5년 주기형(혼합형)은 가산율이 30%만 반영되어 대출 한도를 지켜냅니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 5-Year Fixed */}
                <div className="p-5 rounded-2xl bg-white border-2 border-[#03c75a] shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-[#029f45]">추천 (한도 극대화)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#e8f8ee] text-[#028137] font-bold">가산금리 0.36%</span>
                  </div>
                  <h4 className="text-base font-black text-slate-900">5년 주기형 고정금리</h4>
                  <div className="text-2xl font-black text-[#029f45] mt-2">
                    최대 {stressDsrCalculation.maxLoanFixedEok}억 원
                  </div>
                  <p className="text-xs text-slate-500 mt-1">DSR 40% 한도 넉넉히 인출</p>
                </div>

                {/* Variable */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm opacity-75">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-rose-600">한도 대폭 삭감</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">가산금리 1.20%</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">변동금리</h4>
                  <div className="text-2xl font-black text-slate-700 mt-2">
                    최대 {stressDsrCalculation.maxLoanVariableEok}억 원
                  </div>
                  <p className="text-xs text-slate-500 mt-1">스트레스 DSR로 한도 축소</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🟢 TAB 4: TOTAL PURCHASE & ACQUISITION TAX CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'TOTAL_PURCHASE_BUDGET' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100">
                매수 목표 및 보유 자금 입력
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">목표 아파트 매매가</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1.0"
                    max="30.0"
                    step="0.1"
                    value={targetHousePrice}
                    onChange={(e) => setTargetHousePrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-slate-900 bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#03c75a] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">현재 보유 순현금</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.1"
                    max="30.0"
                    step="0.1"
                    value={userOwnCash}
                    onChange={(e) => setUserOwnCash(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-black text-[#029f45] bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#03c75a] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">기존 집 매도 순대금 (갈아타기 시)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.0"
                    max="30.0"
                    step="0.1"
                    value={prevHouseSaleNet}
                    onChange={(e) => setPrevHouseSaleNet(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-right text-base font-bold text-[#0066ff] bg-[#f8faf9] border border-slate-200 rounded-xl focus:border-[#0066ff] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">억 원</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">기존 집 매도가 - 기존 대출 상환액</p>
              </div>
            </div>

            {/* Right Breakdown */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-black text-slate-900">잔금일 필요 자금 & 부대비용 명세</span>
                <span className="text-xs text-rose-600 font-bold">부대비용 약 {totalBudgetCalculation.totalExtraCostEok}억 원</span>
              </div>

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

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">총 소요 자금 (집값 + 부대비용)</span>
                  <span className="text-base font-black text-slate-900">{totalBudgetCalculation.totalNeededFundsEok}억 원</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">내 총 보유 자본 (현금 + 매도대금)</span>
                  <span className="text-base font-bold text-[#029f45]">{totalBudgetCalculation.userTotalEquityEok}억 원</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">필요 대출 금액</span>
                  <span className="text-2xl font-black text-[#03c75a]">
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
`;

fs.writeFileSync('src/components/LoanCalculator.tsx', naverLoanCode, 'utf-8');
console.log('Successfully updated LoanCalculator with Naver Land design!');
