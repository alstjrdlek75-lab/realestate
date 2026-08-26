export type LifeStage = 
  | 'starter'        // 사회초년생 / 1인가구
  | 'newlywed'       // 신혼부부 / 무자녀
  | 'child_raising'  // 학령기 자녀 가구
  | 'mover_upgrade'  // 1주택 상급지 갈아타기
  | 'retiree';       // 은퇴 준비 / 다운사이징

export interface DiagnosticInput {
  // Step 1: 재정 역량
  cash: number;                  // 보유 순현금 (단위: 억원)
  annualIncome: number;          // 가구 연소득 (단위: 만원)
  existingDebt: number;          // 기존 대출 (단위: 억원)
  targetMonthlyPayment: number;  // 월 원리금 감당 가능액 (단위: 만원)

  // Step 2: 실거주 편의 (Living)
  commuteTolerance: number;      // 1: 30분 이내 필수, 3: 45분 내외, 5: 60분 이상 감수 가능
  newConstructionPref: number;   // 1~5점 (신축, 대단지, 커뮤니티 센터 선호)
  greenLivingPref: number;       // 1~5점 (공원, 숲세권, 쾌적성, 조용한 주거지)
  commercialInfraPref: number;   // 1~5점 (백화점, 대형병원, 슬세권 상권)

  // Step 3: 자산 투자 가치 (Buying)
  gbdRailTransitPref: number;    // 1~5점 (강남/여의도/광화문 직결 노선: 2, 3, 7, 9호선, 신분당선, GTX)
  schoolDistrictPref: number;    // 1~5점 (명문 학군, 대치/목동/평촌급 학원가 인접성)
  capitalAppreciationPref: number; // 1~5점 (시세차익, 재건축/재개발, 호재 가중치)
  liquidityPref: number;         // 1~5점 (1,000세대 이상 대단지, 급매 환금성)

  // Step 4: 생애주기 및 관심 지역 한정
  lifeStage: LifeStage;
  targetCities?: string[];       // 사용자가 선택한 관심 시/군/구 (선택 시 해당 지역만 한정 추천)
}

export type QuadrantType = 'SUPER_CORE' | 'SMART_LIVING' | 'FUTURE_GROWTH' | 'BALANCED_STARTER';

export type StrategyKey = 'SEPARATION' | 'GOLDEN_INTERSECTION' | 'STEPPING_STONE';

export type RegionZone = 
  | 'SEOUL'                // 서울 핵심권
  | 'GYEONGGI_EAST_NORTH'  // 경기 동북부 (남양주, 구리, 하남, 의정부, 양주)
  | 'GYEONGGI_SOUTH'       // 경기 남부 (용인, 수원, 화성, 평택, 경기광주, 이천, 안성)
  | 'GYEONGGI_WEST_SOUTH'  // 경기 서남부 (성남 분당/판교, 안양 평촌, 과천, 의왕, 군포, 광명, 부천, 시흥, 안산)
  | 'GYEONGGI_NORTH_WEST'; // 경기 서북부 (고양 일산/삼송, 김포, 파주)

export interface ApartmentComplexDetail {
  id: string;
  name: string;
  tierTag: '초역세권 대장주' | '가성비 실속형' | '초품아 학군형' | '미래호재 성장형' | string;
  units: number;                 // 세대수 e.g. 1164
  builtYear: number;             // 준공년도 e.g. 2021
  stationDistance: string;       // e.g. "5호선 미사역 도보 2분"
  walkMinutes: number;           // 도보 분
  price84: string;               // 84㎡ 네이버 실거래가 기준 (e.g. "12.8억 ~ 14.2억")
  gapPrice84: string;            // 84㎡ 갭투자액 (e.g. "5.0억 ~ 5.8억")
  price59?: string;              // 59㎡ 가격 (선택)
  keyHighlight: string;          // 한 줄 핵심 매력
  recommendationTip: string;     // 구체적 매수 판단 팁
  targetPersona: string;         // 이런 분께 추천
  naverLandUrl?: string;         // 네이버 부동산 직접 연결 URL
}

export interface RegionalRecommendation {
  id: string;
  name: string;
  subName: string;
  city: string;            // e.g. '남양주시', '구리시', '용인시', '수원시', '화성시', '성남시', '평택시', '파주시' 등
  regionZone: RegionZone;
  category: string;
  matchScore: number;
  avgPriceRange: string;
  gapPriceRange: string;
  livingScore: number;
  buyingScore: number;
  representativeComplexes: string[];
  concreteComplexes?: ApartmentComplexDetail[]; // 구체적인 단지별 실전 분석 리스트
  transitLines: string[];
  commuteTimeToGbd: string; // 강남 소요시간
  commuteTimeToCbd: string; // 광화문/도심 소요시간
  commuteTimeToYbd: string; // 여의도 소요시간
  keyStrengths: string[];
  trafficPoints: string;
  schoolPoints: string;
  cautionPoints: string;
  strategyFit: StrategyKey;
  quadrant: QuadrantType;
  tags: string[];
}

export interface StrategyDossier {
  key: StrategyKey;
  title: string;
  subTitle: string;
  badge: string;
  tagline: string;
  description: string;
  whyThisStrategy: string[];
  executionRoadmap: {
    step: number;
    title: string;
    description: string;
    tip: string;
  }[];
  pros: string[];
  cons: string[];
  targetBudgetBand: string;
  samplePortfolio: {
    livingSolution: string;
    buyingSolution: string;
    expectedOutcome: string;
  };
}

export interface FactorScoreDetail {
  id: string;
  label: string;
  rawInput: string;
  score: number;        // 0 ~ 100
  weight: number;       // e.g. 0.35 (35%)
  contribution: number; // weighted points e.g. 32.5
  rationale: string;
  recommendationTip: string;
}

export interface DiagnosticResult {
  livingScore: number;
  buyingScore: number;
  livingGrade: 'S' | 'A' | 'B' | 'C';
  buyingGrade: 'S' | 'A' | 'B' | 'C';
  livingAnalysisSummary: string;
  buyingAnalysisSummary: string;
  livingFactors: FactorScoreDetail[];
  buyingFactors: FactorScoreDetail[];
  quadrant: QuadrantType;
  quadrantName: string;
  quadrantSummary: string;
  primaryStrategy: StrategyDossier;
  secondaryStrategy?: StrategyDossier;
  radarScores: {
    subject: string;
    value: number;
    fullMark: number;
  }[];
  financialMetrics: {
    totalBudget: number;         // 총 가용 매수 예산 (현금 + 안전대출)
    maxSafeLoan: number;         // DSR 40% 기준 안전 대출액
    monthlyRepaymentEst: number; // 월 예상 원리금 상환액
    gapInvestmentCapacity: number; // 갭투자 가용 자금 (현금 기반)
    priceBandFormatted: string;  // 추천 매수 가능 매매가 밴드
  };
  recommendedRegions: RegionalRecommendation[];
  threeCoreChecklist: {
    railTransitCheck: {
      status: 'pass' | 'warning' | 'critical';
      title: string;
      reason: string;
    };
    scaleAndBrandCheck: {
      status: 'pass' | 'warning' | 'critical';
      title: string;
      reason: string;
    };
    schoolAndCommercialCheck: {
      status: 'pass' | 'warning' | 'critical';
      title: string;
      reason: string;
    };
  };
}
