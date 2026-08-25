import { DiagnosticInput, DiagnosticResult, QuadrantType, StrategyKey, FactorScoreDetail } from '../types';
import { STRATEGY_DOSSIERS, REGIONAL_RECOMMENDATIONS } from '../data/strategyData';

export function calculateRealEstateDiagnosis(input: DiagnosticInput): DiagnosticResult {
  // 1. Calculate Living Score Factors (0 - 100)
  const commuteScore = Math.max(20, 100 - (input.commuteTolerance - 1) * 20);
  const newConstructionScore = input.newConstructionPref * 20;
  const greenLivingScore = input.greenLivingPref * 20;
  const commercialScore = input.commercialInfraPref * 20;

  // LifeStage weights
  let livingWeightCommute = 0.35;
  let livingWeightNew = 0.25;
  let livingWeightGreen = 0.20;
  let livingWeightCommercial = 0.20;

  if (input.lifeStage === 'starter') {
    livingWeightCommute = 0.45;
    livingWeightCommercial = 0.30;
    livingWeightGreen = 0.10;
    livingWeightNew = 0.15;
  } else if (input.lifeStage === 'child_raising') {
    livingWeightGreen = 0.25;
    livingWeightNew = 0.35;
    livingWeightCommute = 0.20;
    livingWeightCommercial = 0.20;
  } else if (input.lifeStage === 'retiree') {
    livingWeightGreen = 0.40;
    livingWeightCommercial = 0.25;
    livingWeightNew = 0.20;
    livingWeightCommute = 0.15;
  }

  const rawLivingScore = 
    commuteScore * livingWeightCommute +
    newConstructionScore * livingWeightNew +
    greenLivingScore * livingWeightGreen +
    commercialScore * livingWeightCommercial;

  const livingScore = Math.min(100, Math.max(10, Math.round(rawLivingScore)));

  // Detailed Living Factors
  const commuteTimeLabels = ['30분 이내 필수', '45분 내외', '60분 내외', '75분 이상 감수'];
  const livingFactors: FactorScoreDetail[] = [
    {
      id: 'commute',
      label: '직주근접 & 출퇴근 시간',
      rawInput: commuteTimeLabels[input.commuteTolerance - 1] || '45분 내외',
      score: commuteScore,
      weight: livingWeightCommute,
      contribution: Math.round(commuteScore * livingWeightCommute * 10) / 10,
      rationale: input.commuteTolerance <= 2 
        ? '출퇴근 45분 이내를 엄격하게 선호하여 지하철 환승 최소화 권역(서울 도심/마용성, 8호선 다산/구리, 신분당선 수지/분당)이 높게 평가되었습니다.'
        : '출퇴근 시간을 60분 이상 유연하게 감수하는 편이므로 더 넓은 평수와 쾌적한 신도시 대단지 선택 폭이 넓습니다.',
      recommendationTip: '출퇴근 스트레스와 주거 비용 간의 최적 교환 비율을 유지하세요.'
    },
    {
      id: 'new_construction',
      label: '신축 & 하이엔드 커뮤니티',
      rawInput: `${input.newConstructionPref}점 / 5점`,
      score: newConstructionScore,
      weight: livingWeightNew,
      contribution: Math.round(newConstructionScore * livingWeightNew * 10) / 10,
      rationale: input.newConstructionPref >= 4 
        ? '피트니스, 조식, 지하주차장 직결 등 신축 대단지 커뮤니티 선호도가 매우 높아 준신축/신축 중심 권역이 배정되었습니다.'
        : '구축 아파트에 대한 거부감이 낮아 1기 신도시(평촌/산본) 리모델링/인테리어 턴키 전략이 유리합니다.',
      recommendationTip: '구축 매수 시에는 지하주차장 엘리베이터 연결 여부를 필수 체크하세요.'
    },
    {
      id: 'green_living',
      label: '자연환경 & 숲세권·호수공원',
      rawInput: `${input.greenLivingPref}점 / 5점`,
      score: greenLivingScore,
      weight: livingWeightGreen,
      contribution: Math.round(greenLivingScore * livingWeightGreen * 10) / 10,
      rationale: input.greenLivingPref >= 4 
        ? '호수공원 및 수변공원 산책로, 소음 없는 청정 주거 선호가 강해 광교, 다산, 미사, 동탄호수공원 권역에 최적화되었습니다.'
        : '도심 밀집 인프라를 더 중시하여 역세권 상업지 인접 단지가 적합합니다.',
      recommendationTip: '단지 인근 도보 10분 내 대형 근린공원 유무를 현장 임장으로 확인하세요.'
    },
    {
      id: 'commercial',
      label: '슬세권 상권 & 대형병원·문화',
      rawInput: `${input.commercialInfraPref}점 / 5점`,
      score: commercialScore,
      weight: livingWeightCommercial,
      contribution: Math.round(commercialScore * livingWeightCommercial * 10) / 10,
      rationale: input.commercialInfraPref >= 4 
        ? '스타필드, 롯데몰, 현대아울렛, 대학병원 등 슬세권 복합상권 접근성이 핵심 판단 요인으로 작용했습니다.'
        : '기본 생활 편의시설만 갖춰지면 충분한 실속형 거주 성향입니다.',
      recommendationTip: '야간/주말 상권 이용 동선과 소음 차단 여부를 함께 점검하세요.'
    }
  ];

  const livingAnalysisSummary = `가구 생애주기(${input.lifeStage === 'newlywed' ? '신혼부부' : input.lifeStage === 'starter' ? '사회초년생' : input.lifeStage === 'child_raising' ? '학령기 자녀 가구' : '자가 매수'}) 특성과 직주근접(${commuteScore}점), 신축 커뮤니티(${newConstructionScore}점), 자연환경(${greenLivingScore}점)에 대한 종합 가중치 평가 결과, 실거주 만족도 ${livingScore}점(상위 ${100 - livingScore + 5}%)으로 진단되었습니다.`;

  // 2. Calculate Buying Score Factors (0 - 100)
  const gbdScore = input.gbdRailTransitPref * 20;
  const schoolScore = input.schoolDistrictPref * 20;
  const growthScore = input.capitalAppreciationPref * 20;
  const liquidityScore = input.liquidityPref * 20;

  let buyingWeightGbd = 0.30;
  let buyingWeightGrowth = 0.35;
  let buyingWeightSchool = 0.20;
  let buyingWeightLiquidity = 0.15;

  if (input.lifeStage === 'child_raising') {
    buyingWeightSchool = 0.40;
    buyingWeightGbd = 0.25;
    buyingWeightGrowth = 0.20;
    buyingWeightLiquidity = 0.15;
  } else if (input.lifeStage === 'starter' || input.lifeStage === 'mover_upgrade') {
    buyingWeightGrowth = 0.40;
    buyingWeightGbd = 0.30;
    buyingWeightLiquidity = 0.20;
    buyingWeightSchool = 0.10;
  }

  const rawBuyingScore = 
    gbdScore * buyingWeightGbd +
    schoolScore * buyingWeightSchool +
    growthScore * buyingWeightGrowth +
    liquidityScore * buyingWeightLiquidity;

  const buyingScore = Math.min(100, Math.max(10, Math.round(rawBuyingScore)));

  // Detailed Buying Factors
  const buyingFactors: FactorScoreDetail[] = [
    {
      id: 'gbd_transit',
      label: '강남(GBD) 직결 철도망',
      rawInput: `${input.gbdRailTransitPref}점 / 5점`,
      score: gbdScore,
      weight: buyingWeightGbd,
      contribution: Math.round(gbdScore * buyingWeightGbd * 10) / 10,
      rationale: input.gbdRailTransitPref >= 4 
        ? '환승 없는 황금 노선(2/3/7/8/9/신분당/GTX) 가치를 최우선하여 하락장 방어력 및 시세 회복 탄력성이 극대화되었습니다.'
        : '비핵심 노선도 감수할 수 있으나 급매 환금성 방어를 위해 최소 1회 환승 한도를 지키는 것이 권장됩니다.',
      recommendationTip: '강남역/신논현/잠실 35분 도달 권역은 수도권 부동산 자산의 불패 안전벨트입니다.'
    },
    {
      id: 'capital_growth',
      label: '시세 차익 & 미래 가치 잠재력',
      rawInput: `${input.capitalAppreciationPref}점 / 5점`,
      score: growthScore,
      weight: buyingWeightGrowth,
      contribution: Math.round(growthScore * buyingWeightGrowth * 10) / 10,
      rationale: input.capitalAppreciationPref >= 4 
        ? '단순 주거 안정에 머물지 않고 자산 급지 상향(마용성, 분당, 8호선/신분당선 축)을 위한 성장 잠재력 가중치가 35~40%로 높게 반영되었습니다.'
        : '공격적 차익보다 감당 가능한 원리금과 안정성을 우선하는 포지션입니다.',
      recommendationTip: '자산 상승기에는 전세가율 60% 내외의 대단지가 갭투자 레버리지 효율이 가장 높습니다.'
    },
    {
      id: 'school_district',
      label: '상위 학군 & 대형 학원가 인프라',
      rawInput: `${input.schoolDistrictPref}점 / 5점`,
      score: schoolScore,
      weight: buyingWeightSchool,
      contribution: Math.round(schoolScore * buyingWeightSchool * 10) / 10,
      rationale: input.schoolDistrictPref >= 4 
        ? '대치·목동·평촌·수지구청·분당급 대형 학원가 인접성을 중시하여 학령기 실수요가 탄탄한 하방 경직성 단지가 추천되었습니다.'
        : '학군 프리미엄 비용을 직주근접이나 신축 인프라에 재배분하여 실속을 챙길 수 있습니다.',
      recommendationTip: '학원가 200개 이상 밀집 지역은 비수기에도 전세 매물이 마르지 않는 특징이 있습니다.'
    },
    {
      id: 'liquidity_scale',
      label: '환금성 & 1,000세대 대단지',
      rawInput: `${input.liquidityPref}점 / 5점`,
      score: liquidityScore,
      weight: buyingWeightLiquidity,
      contribution: Math.round(liquidityScore * buyingWeightLiquidity * 10) / 10,
      rationale: input.liquidityPref >= 4 
        ? '매도 시 즉시 현금화 가능한 1,000세대 이상 대단지와 브랜드 아파트 선호가 높아 거래량 최상위권 단지 위주로 점수가 산정되었습니다.'
        : '소단지 매수 시에는 인근 랜드마크 대단지의 시세 추종 여부를 반드시 확인해야 합니다.',
      recommendationTip: '1,000세대 이상 단지는 세대당 공용관리비가 20~30% 절감되는 실질 혜택이 있습니다.'
    }
  ];

  const buyingAnalysisSummary = `강남 직결 황금노선(${gbdScore}점), 시세상승 목표(${growthScore}점), 학군(${schoolScore}점), 1,000세대 환금성(${liquidityScore}점)을 가중 합산하여 투자가치 지수 ${buyingScore}점(상위 ${100 - buyingScore + 5}%)으로 도출되었습니다.`;

  // 3. Financial Metrics Calculation (DSR 40%, 4.1% interest rate, 35-year maturity)
  // annualIncome is in '만원' (e.g. 6000 = 6,000만원 = 0.6억원)
  const annualIncomeInEok = input.annualIncome / 10000; 
  const maxAnnualDebtServiceEok = annualIncomeInEok * 0.40; // 0.6 * 0.4 = 0.24억
  
  // 35-year amortizing factor @ 4.1%
  const monthlyRate = 0.041 / 12;
  const totalMonths = 35 * 12;
  const amortFactor = (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const theoreticalMaxLoan = Math.max(0, (maxAnnualDebtServiceEok / 12 / amortFactor) - (input.existingDebt || 0));
  const roundedMaxSafeLoan = Math.round(theoreticalMaxLoan * 10) / 10;

  const totalBudget = Math.round((input.cash + roundedMaxSafeLoan) * 10) / 10;
  const monthlyRepaymentEst = Math.round(roundedMaxSafeLoan * 10000 * amortFactor);
  const gapInvestmentCapacity = input.cash;

  const priceBandMin = Math.max(3.0, Math.round((totalBudget * 0.85) * 10) / 10);
  const priceBandMax = Math.round((totalBudget * 1.05) * 10) / 10;
  const priceBandFormatted = `${priceBandMin}억 ~ ${priceBandMax}억 원`;

  // 4. Determine Quadrant
  let quadrant: QuadrantType;
  let quadrantName: string;
  let quadrantSummary: string;

  if (livingScore >= 60 && buyingScore >= 60) {
    quadrant = 'SUPER_CORE';
    quadrantName = '핵심 상급지 (Super Core)';
    quadrantSummary = '실거주 만족도와 미래 자산 가치를 모두 최고 수준으로 추구하는 황금 포지션입니다.';
  } else if (livingScore >= 60 && buyingScore < 60) {
    quadrant = 'SMART_LIVING';
    quadrantName = '가성비 쾌적 실거주지 (Smart Living)';
    quadrantSummary = '자산 시세차익보다는 삶의 쾌적함, 가족 중심 주거 환경, 일상의 여유를 최우선하는 포지션입니다.';
  } else if (livingScore < 60 && buyingScore >= 60) {
    quadrant = 'FUTURE_GROWTH';
    quadrantName = '자산 증식형 갭투자지 (Future Growth)';
    quadrantSummary = '현재의 실거주 안락함보다 자산의 폭발적 성장과 미래 상급지 선점을 우선하는 레버리지 포지션입니다.';
  } else {
    quadrant = 'BALANCED_STARTER';
    quadrantName = '실속 징검다리지 (Balanced Starter)';
    quadrantSummary = '예산 내에서 무리하지 않고 주거 안정성과 점진적 자산 증식을 도모하는 스마트 1단계 포지션입니다.';
  }

  // 5. Determine Primary Strategy
  let primaryStrategyKey: StrategyKey;

  if (buyingScore >= 65 && input.cash < 4.0 && totalBudget < 9.0) {
    primaryStrategyKey = 'SEPARATION';
  } else if (totalBudget >= 9.0 && (livingScore >= 55 || buyingScore >= 55)) {
    primaryStrategyKey = 'GOLDEN_INTERSECTION';
  } else if (quadrant === 'FUTURE_GROWTH') {
    primaryStrategyKey = 'SEPARATION';
  } else if (quadrant === 'SUPER_CORE') {
    if (totalBudget >= 11.0 || input.cash >= 4.5) {
      primaryStrategyKey = 'GOLDEN_INTERSECTION';
    } else {
      primaryStrategyKey = 'SEPARATION';
    }
  } else {
    primaryStrategyKey = 'STEPPING_STONE';
  }

  const primaryStrategy = STRATEGY_DOSSIERS[primaryStrategyKey];
  const secondaryStrategyKey = primaryStrategyKey === 'GOLDEN_INTERSECTION' 
    ? (input.cash < 5 ? 'SEPARATION' : 'STEPPING_STONE') 
    : (primaryStrategyKey === 'SEPARATION' ? 'GOLDEN_INTERSECTION' : 'SEPARATION');
  const secondaryStrategy = STRATEGY_DOSSIERS[secondaryStrategyKey];

  // 6. Match Recommended Regions
  const recommendedRegions = REGIONAL_RECOMMENDATIONS.map((region) => {
    let match = 70;
    if (region.quadrant === quadrant) match += 15;
    if (region.strategyFit === primaryStrategyKey) match += 10;
    const livingDiff = Math.abs(region.livingScore - livingScore);
    const buyingDiff = Math.abs(region.buyingScore - buyingScore);
    match -= (livingDiff * 0.15 + buyingDiff * 0.15);

    return {
      ...region,
      matchScore: Math.min(99, Math.max(65, Math.round(match)))
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // 7. Calculate Grades
  const getGrade = (score: number): 'S' | 'A' | 'B' | 'C' => {
    if (score >= 85) return 'S';
    if (score >= 70) return 'A';
    if (score >= 50) return 'B';
    return 'C';
  };

  // 8. 3-Core Checklist Diagnostics
  const transitPass = input.gbdRailTransitPref >= 3.5;
  const scalePass = input.liquidityPref >= 3.5 || input.newConstructionPref >= 3.5;
  const schoolPass = input.schoolDistrictPref >= 3.5 || input.commercialInfraPref >= 3.5;

  return {
    livingScore,
    buyingScore,
    livingGrade: getGrade(livingScore),
    buyingGrade: getGrade(buyingScore),
    livingAnalysisSummary,
    buyingAnalysisSummary,
    livingFactors,
    buyingFactors,
    quadrant,
    quadrantName,
    quadrantSummary,
    primaryStrategy,
    secondaryStrategy,
    radarScores: [
      { subject: '직주근접', value: commuteScore, fullMark: 100 },
      { subject: '신축/커뮤니티', value: newConstructionScore, fullMark: 100 },
      { subject: '강남철도망', value: gbdScore, fullMark: 100 },
      { subject: '학군/상권', value: Math.round((schoolScore + commercialScore) / 2), fullMark: 100 },
      { subject: '시세상승잠재력', value: growthScore, fullMark: 100 },
      { subject: '환금성/대단지', value: liquidityScore, fullMark: 100 },
    ],
    financialMetrics: {
      totalBudget,
      maxSafeLoan: roundedMaxSafeLoan,
      monthlyRepaymentEst,
      gapInvestmentCapacity,
      priceBandFormatted
    },
    recommendedRegions,
    threeCoreChecklist: {
      railTransitCheck: {
        status: transitPass ? 'pass' : 'warning',
        title: '강남(GBD) 직결 철도망',
        reason: transitPass 
          ? '선호도 충족: 환승 없는 핵심선(2/3/7/8/9/신분당/GTX) 35분 도달 권역 우선 배정'
          : '검토 필요: 비핵심선은 상승장 후행 및 하락장 환금성 리스크가 있으므로 최소 1회 환승 한도 유지 권장'
      },
      scaleAndBrandCheck: {
        status: scalePass ? 'pass' : 'warning',
        title: '1,000세대 이상 대단지 & 브랜드',
        reason: scalePass
          ? '선호도 충족: 대단지 관리비 절감 및 매매 호가 방어력이 우수한 단지 추천'
          : '주의: 500세대 미만 소단지는 거래량이 적어 급매 처분 시 감가가 클 수 있습니다.'
      },
      schoolAndCommercialCheck: {
        status: schoolPass ? 'pass' : 'pass',
        title: '초품아 학군 & 슬세권 상권',
        reason: '학령기 및 실거주 수요가 탄탄하여 전세가율 하방 지지력이 강력합니다.'
      }
    }
  };
}
