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
  FileText,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export type LoanTabMode = 'POLICY_MORTGAGE' | 'REPAYMENT_COMPARISON' | 'STRESS_DSR' | 'TOTAL_PURCHASE_BUDGET';

interface LoanCalculatorProps {
  onGoToThoughts?: (articleId?: string) => void;
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
    const newbornMaxIncome = 20000; // 맞벌이 소득 2억원까지 완화
    const isNewbornEligible = hasNewborn && housePricePolicy <= newbornMaxPrice && annualIncomePolicy <= newbornMaxIncome && isFirstHome;
    const newbornMaxLoan = 5.0;

    const bogeumjariMaxPrice = 6.0;
    const bogeumjariMaxIncome = isNewlywed ? 8500 : (hasMultipleKids ? 10000 : 7000);
    const isBogeumjariEligible = housePricePolicy <= bogeumjariMaxPrice && annualIncomePolicy <= bogeumjariMaxIncome;
    const bogeumjariMaxLoan = 3.6;

    let bestChoice = '시중은행 주택담보대출 (5년 주기형 추천)';
    let bestRate = '연 3.8% ~ 4.5%';
    let maxLoanAmount = 0;
    let badgeText = '시중은행 대출';

    if (isNewbornEligible) {
      bestChoice = '👑 신생아 특례 디딤돌 대출';
      bestRate = '연 1.6% ~ 3.3%';
      maxLoanAmount = Math.min(newbornMaxLoan, housePricePolicy * 0.8);
      badgeText = '정부지원 1순위 최우선';
    } else if (isDidimdolEligible) {
      bestChoice = isNewlywed ? '🥇 신혼부부 전용 디딤돌 대출' : '🥇 일반 디딤돌 대출';
      bestRate = '연 2.15% ~ 3.0%';
      maxLoanAmount = Math.min(didimdolMaxLoan, housePricePolicy * 0.8);
      badgeText = '초저금리 1순위';
    } else if (isBogeumjariEligible) {
      bestChoice = '🥈 한국주택금융공사 보금자리론';
      bestRate = '연 3.65% ~ 3.95%';
      maxLoanAmount = Math.min(bogeumjariMaxLoan, housePricePolicy * 0.7);
      badgeText = 'DSR 미적용 (DTI 60%)';
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
      
      {/* 🟢 Naver Land Style Header Bar (Enhanced Typography) */}
      <div className="naver-card bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#03c75a] text-white flex items-center justify-center font-black shadow-md shadow-[#03c75a]/25 shrink-0">
              <Calculator className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#e8f8ee] text-[#028137] border border-[#03c75a]/30">
                  NAVER LAND 금융 시뮬레이터
                </span>
                <span className="text-xs text-slate-500 font-bold hidden sm:inline">2026 정부 대출 규제 최신 반영</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 tracking-tight">
                대출 & 자금 레버리지 맞춤 계산기
              </h1>
            </div>
          </div>

          {onGoToThoughts && (
            <button
              onClick={() => onGoToThoughts('mortgage-loan-optimization-guide')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-black transition cursor-pointer self-start md:self-auto shrink-0 border border-slate-300 shadow-2xs"
            >
              <FileText className="w-4 h-4 text-[#029f45]" />
              <span>대출 최적화 칼럼 보기</span>
            </button>
          )}
        </div>

        {/* 🟢 High-Contrast Segmented Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-6">
          <button
            onClick={() => setActiveTab('POLICY_MORTGAGE')}
            className={`px-4 py-3.5 rounded-2xl text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer border-2 ${
              activeTab === 'POLICY_MORTGAGE'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Landmark className="w-4 h-4 shrink-0" />
            <span>1. 정책 모기지 판별</span>
          </button>

          <button
            onClick={() => setActiveTab('REPAYMENT_COMPARISON')}
            className={`px-4 py-3.5 rounded-2xl text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer border-2 ${
              activeTab === 'REPAYMENT_COMPARISON'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>2. 체증식 상환 비교</span>
          </button>

          <button
            onClick={() => setActiveTab('STRESS_DSR')}
            className={`px-4 py-3.5 rounded-2xl text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer border-2 ${
              activeTab === 'STRESS_DSR'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>3. 스트레스 DSR 한도</span>
          </button>

          <button
            onClick={() => setActiveTab('TOTAL_PURCHASE_BUDGET')}
            className={`px-4 py-3.5 rounded-2xl text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer border-2 ${
              activeTab === 'TOTAL_PURCHASE_BUDGET'
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
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
            
            {/* Left Inputs (Larger fonts, bold high-contrast text) */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-base font-black text-slate-950">내 주택 & 소득 조건 설정</span>
                <span className="text-xs text-slate-500 font-bold">직접 입력 및 슬라이더</span>
              </div>

              {/* House Price */}
              <div className="bg-[#f8faf9] p-4.5 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-sm font-black text-slate-900">목표 아파트 매매가</label>
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-300 shadow-2xs">
                    <input
                      type="number"
                      min="1.0"
                      max="20.0"
                      step="0.1"
                      value={housePricePolicy}
                      onChange={(e) => setHousePricePolicy(parseFloat(e.target.value) || 0)}
                      className="w-20 text-right text-lg font-black text-[#028137] bg-transparent focus:outline-none"
                    />
                    <span className="text-sm font-black text-slate-800">억 원</span>
                  </div>
                </div>
                <div className="relative pt-1 pb-6">
                  <input
                    type="range"
                    min="2.0"
                    max="15.0"
                    step="0.1"
                    value={housePricePolicy}
                    onChange={(e) => setHousePricePolicy(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a] relative z-10"
                  />
                  {/* Absolute Positioned Precise Alignment Markers */}
                  <div className="absolute left-0 right-0 top-6 h-8 text-xs font-bold pointer-events-none">
                    {/* 2억 (0%) */}
                    <div 
                      onClick={() => setHousePricePolicy(2.0)}
                      className="absolute left-0 text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 mb-0.5" />
                      <span>2억</span>
                    </div>

                    {/* 6억 ((6-2)/(15-2) = 30.77%) */}
                    <div 
                      onClick={() => setHousePricePolicy(6.0)}
                      style={{ left: '30.77%' }}
                      className="absolute -translate-x-1/2 text-center text-slate-700 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-500 mx-auto mb-0.5" />
                      <span className="whitespace-nowrap">6억 <span className="text-[10px] text-slate-500 font-semibold">(디딤돌)</span></span>
                    </div>

                    {/* 9억 ((9-2)/(15-2) = 53.85%) -> EXACTLY ALIGNED WITH THUMB AT 9.0 */}
                    <div 
                      onClick={() => setHousePricePolicy(9.0)}
                      style={{ left: '53.85%' }}
                      className="absolute -translate-x-1/2 text-center text-[#028137] font-black cursor-pointer pointer-events-auto hover:scale-105 transition-transform"
                    >
                      <div className="w-1 h-2 bg-[#03c75a] mx-auto mb-0.5 rounded-full" />
                      <span className="whitespace-nowrap bg-[#e8f8ee] px-1.5 py-0.5 rounded border border-[#03c75a]/30 shadow-2xs">
                        9억 <span className="text-[10px] font-bold">(신생아 상한)</span>
                      </span>
                    </div>

                    {/* 15억 (100%) */}
                    <div 
                      onClick={() => setHousePricePolicy(15.0)}
                      className="absolute right-0 text-right text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 ml-auto mb-0.5" />
                      <span>15억</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Annual Income */}
              <div className="bg-[#f8faf9] p-4.5 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-sm font-black text-slate-900">부부 합산 연소득</label>
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-300 shadow-2xs">
                    <input
                      type="number"
                      min="1000"
                      max="30000"
                      step="100"
                      value={annualIncomePolicy}
                      onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value) || 0)}
                      className="w-28 text-right text-lg font-black text-[#0055d4] bg-transparent focus:outline-none"
                    />
                    <span className="text-sm font-black text-slate-800">만 원</span>
                  </div>
                </div>
                <div className="relative pt-1 pb-6">
                  <input
                    type="range"
                    min="3000"
                    max="25000"
                    step="500"
                    value={annualIncomePolicy}
                    onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff] relative z-10"
                  />
                  {/* Absolute Positioned Precise Alignment Markers */}
                  <div className="absolute left-0 right-0 top-6 h-8 text-xs font-bold pointer-events-none">
                    {/* 3,000만 (0%) */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(3000)}
                      className="absolute left-0 text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 mb-0.5" />
                      <span>3,000만</span>
                    </div>

                    {/* 8,500만 ((8500-3000)/(25000-3000) = 5500/22000 = 25.00%) -> EXACTLY ALIGNED WITH THUMB AT 8,500 */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(8500)}
                      style={{ left: '25.00%' }}
                      className="absolute -translate-x-1/2 text-center text-slate-700 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-500 mx-auto mb-0.5" />
                      <span className="whitespace-nowrap">8,500만 <span className="text-[10px] text-slate-500 font-semibold">(신혼)</span></span>
                    </div>

                    {/* 2억 ((20000-3000)/(25000-3000) = 17000/22000 = 77.27%) -> EXACTLY ALIGNED WITH THUMB AT 2억 */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(20000)}
                      style={{ left: '77.27%' }}
                      className="absolute -translate-x-1/2 text-center text-[#0055d4] font-black cursor-pointer pointer-events-auto hover:scale-105 transition-transform"
                    >
                      <div className="w-1 h-2 bg-[#0066ff] mx-auto mb-0.5 rounded-full" />
                      <span className="whitespace-nowrap bg-[#edf4ff] px-1.5 py-0.5 rounded border border-[#0066ff]/30 shadow-2xs">
                        2억 <span className="text-[10px] font-bold">(신생아 상한)</span>
                      </span>
                    </div>

                    {/* 2.5억 (100%) */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(25000)}
                      className="absolute right-0 text-right text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 ml-auto mb-0.5" />
                      <span>2.5억</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkboxes (Bigger, High-Contrast) */}
              <div className="space-y-2.5 pt-1">
                <label className="text-sm font-black text-slate-900 block">가구 우대 조건 (클릭하여 선택)</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHasNewborn(!hasNewborn)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex items-center justify-between shadow-2xs ${
                      hasNewborn ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137]' : 'bg-[#f8faf9] border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-black">👶 2년 내 출산 (신생아)</div>
                      <div className="text-xs text-slate-600 font-semibold mt-0.5">임신·입양 포함</div>
                    </div>
                    {hasNewborn ? <CheckCircle2 className="w-5 h-5 text-[#03c75a] shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsNewlywed(!isNewlywed)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex items-center justify-between shadow-2xs ${
                      isNewlywed ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137]' : 'bg-[#f8faf9] border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-black">💍 신혼부부</div>
                      <div className="text-xs text-slate-600 font-semibold mt-0.5">혼인신고 7년 이내</div>
                    </div>
                    {isNewlywed ? <CheckCircle2 className="w-5 h-5 text-[#03c75a] shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFirstHome(!isFirstHome)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex items-center justify-between shadow-2xs ${
                      isFirstHome ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137]' : 'bg-[#f8faf9] border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-black">🏠 생애최초 무주택</div>
                      <div className="text-xs text-slate-600 font-semibold mt-0.5">세대원 전원 무소유</div>
                    </div>
                    {isFirstHome ? <CheckCircle2 className="w-5 h-5 text-[#03c75a] shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasMultipleKids(!hasMultipleKids)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex items-center justify-between shadow-2xs ${
                      hasMultipleKids ? 'bg-[#e8f8ee] border-[#03c75a] text-[#028137]' : 'bg-[#f8faf9] border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-black">👨‍👩‍👧‍👦 2자녀 이상 다자녀</div>
                      <div className="text-xs text-slate-600 font-semibold mt-0.5">미성년 자녀 2인 이상</div>
                    </div>
                    {hasMultipleKids ? <CheckCircle2 className="w-5 h-5 text-[#03c75a] shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Diagnosis Card (Bold, Clear, High-Contrast) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Best Result Box */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#03c75a] shadow-md relative">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#e8f8ee] text-[#028137] border border-[#03c75a]/40">
                    {policyEvaluation.badgeText}
                  </span>
                  <span className="text-sm font-black text-[#029f45]">
                    예상 최저 금리 {policyEvaluation.bestRate}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
                  {policyEvaluation.bestChoice}
                </h3>

                <div className="grid grid-cols-2 gap-5 mt-6 pt-6 border-t border-slate-200">
                  <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                    <div className="text-xs font-bold text-slate-600">최대 대출 가능 금액</div>
                    <div className="text-3xl sm:text-4xl font-black text-[#028137] mt-1 tracking-tight">
                      {policyEvaluation.maxLoanAmount}억 원
                    </div>
                  </div>
                  <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                    <div className="text-xs font-bold text-slate-600">필요 최소 자기자본</div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-950 mt-1 tracking-tight">
                      {policyEvaluation.neededCash}억 원
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Major Policy Detailed List (Larger, Darker text) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-200">
                {/* Newborn */}
                <div className="p-4.5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                      policyEvaluation.isNewbornEligible ? 'bg-[#e8f8ee] text-[#028137] border border-[#03c75a]/30' : 'bg-slate-100 text-slate-500'
                    }`}>
                      1
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-950">신생아 특례 디딤돌 대출</div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">집값 9억 이하 · 소득 2억 이하 · 한도 5억 (금리 1.6~3.3%)</div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isNewbornEligible ? (
                      <span className="px-3 py-1.5 rounded-lg bg-[#e8f8ee] text-[#028137] text-xs font-black border border-[#03c75a]/40 shadow-2xs">적격 대상</span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">조건 미달</span>
                    )}
                  </div>
                </div>

                {/* Didimdol */}
                <div className="p-4.5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                      policyEvaluation.isDidimdolEligible ? 'bg-[#e8f8ee] text-[#028137] border border-[#03c75a]/30' : 'bg-slate-100 text-slate-500'
                    }`}>
                      2
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-950">일반 / 신혼부부 디딤돌 대출</div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">집값 {policyEvaluation.didimdolMaxPrice}억 이하 · 소득 {policyEvaluation.didimdolMaxIncome / 10000}억 이하 · 한도 {policyEvaluation.didimdolMaxLoan}억 (2.15~3.0%)</div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isDidimdolEligible ? (
                      <span className="px-3 py-1.5 rounded-lg bg-[#e8f8ee] text-[#028137] text-xs font-black border border-[#03c75a]/40 shadow-2xs">적격 대상</span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">조건 미달</span>
                    )}
                  </div>
                </div>

                {/* Bogeumjari */}
                <div className="p-4.5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                      policyEvaluation.isBogeumjariEligible ? 'bg-[#e8f8ee] text-[#028137] border border-[#03c75a]/30' : 'bg-slate-100 text-slate-500'
                    }`}>
                      3
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-950">한국주택금융공사 보금자리론</div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">집값 6억 이하 · DSR 미적용(DTI 60%) · 한도 3.6억 (3.65~3.95%)</div>
                    </div>
                  </div>
                  <div>
                    {policyEvaluation.isBogeumjariEligible ? (
                      <span className="px-3 py-1.5 rounded-lg bg-[#e8f8ee] text-[#028137] text-xs font-black border border-[#03c75a]/40 shadow-2xs">적격 대상</span>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">조건 미달</span>
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
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
              <label className="text-sm font-black text-slate-900 block mb-1.5">대출 원금</label>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                <input
                  type="number"
                  min="0.5"
                  max="15.0"
                  step="0.1"
                  value={loanPrincipal}
                  onChange={(e) => setLoanPrincipal(parseFloat(e.target.value) || 0)}
                  className="w-full text-right text-lg font-black text-[#028137] bg-transparent focus:outline-none"
                />
                <span className="text-sm font-black text-slate-800 shrink-0">억 원</span>
              </div>
            </div>

            <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
              <label className="text-sm font-black text-slate-900 block mb-1.5">적용 금리</label>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                <input
                  type="number"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={interestRateRepay}
                  onChange={(e) => setInterestRateRepay(parseFloat(e.target.value) || 0)}
                  className="w-full text-right text-lg font-black text-[#0055d4] bg-transparent focus:outline-none"
                />
                <span className="text-sm font-black text-slate-800 shrink-0">연 %</span>
              </div>
            </div>

            <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
              <label className="text-sm font-black text-slate-900 block mb-1.5">대출 만기 기간</label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(parseInt(e.target.value))}
                className="w-full px-3 py-2.5 text-base font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value={30}>30년 만기 (360개월)</option>
                <option value={35}>35년 만기 (420개월)</option>
                <option value={40}>40년 만기 (480개월, 2030 추천)</option>
                <option value={50}>50년 만기 (600개월)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Progressive */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#03c75a] shadow-md relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#e8f8ee] text-[#028137] border border-[#03c75a]/30">
                    2030 직장인 치트키
                  </span>
                  <span className="text-xs text-slate-500 font-bold">만 39세 이하</span>
                </div>
                <h3 className="text-xl font-black text-slate-950">체증식 분할상환</h3>
                <p className="text-xs text-slate-600 font-medium mt-1">초기엔 이자만 내다 점진적 원금 상환</p>

                <div className="my-5 p-4.5 rounded-2xl bg-[#f8faf9] border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-600">1회차 (첫 달) 월 상환액</span>
                    <span className="text-lg sm:text-xl font-black text-[#028137]">
                      월 {repaymentCalculation.progressiveMonth1.toLocaleString()}만 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>5년 차 월 상환액</span>
                    <span className="text-sm font-black">월 {repaymentCalculation.progressiveMonth60.toLocaleString()}만 원</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>10년 차 월 상환액</span>
                    <span className="text-sm font-black">월 {repaymentCalculation.progressiveMonth120.toLocaleString()}만 원</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#e8f8ee] text-xs text-[#028137] font-bold leading-relaxed border border-[#03c75a]/30">
                <strong>💡 5년간 세이브 현금: </strong>
                원리금균등 대비 <strong className="font-black text-[#028137] text-sm">총 {repaymentCalculation.savedCash5Years.toLocaleString()}만 원</strong>의 생활비·투자 유동성을 아낍니다.
              </div>
            </div>

            {/* Equal Amortization */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 inline-block mb-2">
                  표준 상환
                </div>
                <h3 className="text-xl font-black text-slate-950">원리금 균등상환</h3>
                <p className="text-xs text-slate-600 font-medium mt-1">만기까지 매월 똑같은 금액 상환</p>

                <div className="my-5 p-4.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-600">매월 고정 상환액</span>
                    <span className="text-lg sm:text-xl font-black text-slate-950">
                      월 {repaymentCalculation.equalAmortMonth.toLocaleString()}만 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>총 발생 이자</span>
                    <span className="text-sm font-black">{(repaymentCalculation.equalAmortTotalInterest / 10000).toFixed(2)}억 원</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>금액 변동</span>
                    <span>0원 (전 기간 고정)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-700 font-semibold border border-slate-200">
                매달 지출을 일정하게 계획하고 싶은 안정 소득 가구에 적합합니다.
              </div>
            </div>

            {/* Equal Principal */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 inline-block mb-2">
                  총이자 최소화
                </div>
                <h3 className="text-xl font-black text-slate-950">원금 균등상환</h3>
                <p className="text-xs text-slate-600 font-medium mt-1">원금은 고정, 이자가 점차 감소</p>

                <div className="my-5 p-4.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-600">1회차 (첫 달) 상환액</span>
                    <span className="text-lg sm:text-xl font-black text-slate-950">
                      월 {repaymentCalculation.equalPrincipalMonth1.toLocaleString()}만 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>5년 차 월 상환액</span>
                    <span className="text-sm font-black">월 {repaymentCalculation.equalPrincipalMonth60.toLocaleString()}만 원</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>총 발생 이자</span>
                    <span className="text-sm font-black text-[#028137]">{(repaymentCalculation.equalPrincipalTotalInterest / 10000).toFixed(2)}억 원 (최저)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-700 font-semibold border border-slate-200">
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
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="text-base font-black text-slate-950 pb-3 border-b border-slate-200">
                연소득 및 기존 대출 입력
              </div>

              <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                <label className="text-sm font-black text-slate-900 block mb-1.5">본인/부부 연소득</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <input
                    type="number"
                    min="2000"
                    max="30000"
                    step="500"
                    value={stressIncome}
                    onChange={(e) => setStressIncome(parseInt(e.target.value) || 0)}
                    className="w-full text-right text-lg font-black text-slate-950 bg-transparent focus:outline-none"
                  />
                  <span className="text-sm font-black text-slate-800 shrink-0">만 원</span>
                </div>
              </div>

              <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                <label className="text-sm font-black text-slate-900 block mb-1.5">기존 대출 연간 원리금 상환액</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    step="50"
                    value={existingDebtAnnual}
                    onChange={(e) => setExistingDebtAnnual(parseInt(e.target.value) || 0)}
                    className="w-full text-right text-lg font-black text-rose-600 bg-transparent focus:outline-none"
                  />
                  <span className="text-sm font-black text-slate-800 shrink-0">만 원/년</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-1.5">신용대출, 마이너스통장 이자 등</p>
              </div>

              <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                <label className="text-sm font-black text-slate-900 block mb-1.5">시중은행 주담대 기본 금리</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <input
                    type="number"
                    min="2.5"
                    max="8.0"
                    step="0.1"
                    value={baseMortgageRate}
                    onChange={(e) => setBaseMortgageRate(parseFloat(e.target.value) || 0)}
                    className="w-full text-right text-lg font-black text-[#0055d4] bg-transparent focus:outline-none"
                  />
                  <span className="text-sm font-black text-slate-800 shrink-0">연 %</span>
                </div>
              </div>
            </div>

            {/* Right Result */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 sm:p-7 rounded-3xl bg-[#e8f8ee] border-2 border-[#03c75a] shadow-md">
                <div className="text-xs font-black text-[#028137] mb-1">💡 스트레스 DSR 2단계 한도 방어 결과</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  5년 주기형 선택 시 <span className="text-[#028137]">+{stressDsrCalculation.limitDifference}억 원 ({stressDsrCalculation.limitDiffManwon.toLocaleString()}만 원)</span> 한도 추가 확보!
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-2.5 leading-relaxed">
                  변동금리는 스트레스 금리 1.2%가 100% 가산되어 한도가 깎이지만, 5년 주기형(혼합형)은 가산율이 30%만 반영되어 대출 한도를 지켜냅니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white border-2 border-[#03c75a] shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-[#028137]">추천 (한도 극대화)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#e8f8ee] text-[#028137] font-black">가산 0.36%</span>
                  </div>
                  <h4 className="text-base font-black text-slate-950">5년 주기형 고정금리</h4>
                  <div className="text-3xl font-black text-[#028137] mt-2">
                    최대 {stressDsrCalculation.maxLoanFixedEok}억 원
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-1">DSR 40% 한도 넉넉히 인출</p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm opacity-85">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-rose-600">한도 대폭 삭감</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-black">가산 1.20%</span>
                  </div>
                  <h4 className="text-base font-black text-slate-950">변동금리</h4>
                  <div className="text-3xl font-black text-slate-700 mt-2">
                    최대 {stressDsrCalculation.maxLoanVariableEok}억 원
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-1">스트레스 DSR로 한도 축소</p>
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
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="text-base font-black text-slate-950 pb-3 border-b border-slate-200">
                매수 목표 및 보유 자금 입력
              </div>

              <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                <label className="text-sm font-black text-slate-900 block mb-1.5">목표 아파트 매매가</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <input
                    type="number"
                    min="1.0"
                    max="30.0"
                    step="0.1"
                    value={targetHousePrice}
                    onChange={(e) => setTargetHousePrice(parseFloat(e.target.value) || 0)}
                    className="w-full text-right text-lg font-black text-slate-950 bg-transparent focus:outline-none"
                  />
                  <span className="text-sm font-black text-slate-800 shrink-0">억 원</span>
                </div>
              </div>

              <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                <label className="text-sm font-black text-slate-900 block mb-1.5">현재 보유 순현금</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <input
                    type="number"
                    min="0.1"
                    max="30.0"
                    step="0.1"
                    value={userOwnCash}
                    onChange={(e) => setUserOwnCash(parseFloat(e.target.value) || 0)}
                    className="w-full text-right text-lg font-black text-[#028137] bg-transparent focus:outline-none"
                  />
                  <span className="text-sm font-black text-slate-800 shrink-0">억 원</span>
                </div>
              </div>

              <div className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                <label className="text-sm font-black text-slate-900 block mb-1.5">기존 집 매도 순대금 (갈아타기 시)</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                  <input
                    type="number"
                    min="0.0"
                    max="30.0"
                    step="0.1"
                    value={prevHouseSaleNet}
                    onChange={(e) => setPrevHouseSaleNet(parseFloat(e.target.value) || 0)}
                    className="w-full text-right text-lg font-black text-[#0055d4] bg-transparent focus:outline-none"
                  />
                  <span className="text-sm font-black text-slate-800 shrink-0">억 원</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-1.5">기존 집 매도가 - 기존 대출 상환액</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-base font-black text-slate-950">잔금일 필요 자금 & 부대비용 명세</span>
                <span className="text-xs text-rose-600 font-black">부대비용 약 {totalBudgetCalculation.totalExtraCostEok}억 원</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-700 font-bold">① 취득세 + 지방교육세 ({totalBudgetCalculation.taxPercent}%)</span>
                  <span className="font-black text-slate-950">{totalBudgetCalculation.acquisitionTaxManwon.toLocaleString()}만 원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-700 font-bold">② 부동산 중개보수 (법정 요율)</span>
                  <span className="font-black text-slate-950">{totalBudgetCalculation.agentFeeManwon.toLocaleString()}만 원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-700 font-bold">③ 이사 및 기본 도배/수리비 (추정)</span>
                  <span className="font-black text-slate-950">{totalBudgetCalculation.movingEtcManwon.toLocaleString()}만 원</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-600 font-bold">총 소요 자금 (집값 + 부대비용)</span>
                  <span className="text-lg font-black text-slate-950">{totalBudgetCalculation.totalNeededFundsEok}억 원</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-600 font-bold">내 총 보유 자본 (현금 + 매도대금)</span>
                  <span className="text-base font-black text-[#028137]">{totalBudgetCalculation.userTotalEquityEok}억 원</span>
                </div>
                <div className="pt-3 border-t border-slate-300 flex justify-between items-center">
                  <span className="text-sm font-black text-slate-900">필요 대출 금액</span>
                  <span className="text-3xl font-black text-[#03c75a]">
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
