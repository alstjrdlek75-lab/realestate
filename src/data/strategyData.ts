import { RegionalRecommendation, StrategyDossier, StrategyKey, QuadrantType, ApartmentComplexDetail } from '../types';

export const STRATEGY_DOSSIERS: Record<StrategyKey, StrategyDossier> = {
  SEPARATION: {
    key: 'SEPARATION',
    title: '거주·투자 분리형 (Rent-and-Invest) 전략',
    subTitle: '자산 상승률은 강남·핵심지에서 취하고, 일상은 직주근접 전월세로 누린다',
    badge: '자산증식 극대화형',
    tagline: '몸테크 대신 자본의 레버리지를 최상급지에 선점하는 스마트 분리 전략',
    description: '현재 보유 예산으로 상급지 자가 실거주가 어려울 때, 자본금은 상급지(마용성·강동·동작 또는 경기 1황 분당/판교/과천) 전세 낀 갭투자로 묶어두고, 본인은 직장 근처 역세권 오피스텔이나 빌라/소형 아파트 전월세로 거주하는 선진형 자산 배분 전략입니다.',
    whyThisStrategy: [
      '자가 실거주 시 묶이는 높은 주거 비용(취득세, 이자, 주택담보대출 원리금)을 줄이고 자본 효율을 극대화합니다.',
      '수도권 상급지 아파트의 높은 장기 시세 상승률을 조기에 향유할 수 있습니다.',
      '출퇴근 시간 낭비 없이 직장 초근접지에서 쾌적한 라이프스타일을 유지할 수 있습니다.'
    ],
    executionRoadmap: [
      {
        step: 1,
        title: '핵심지 전세가율 55~65% 우량 단지 선별',
        description: '강남 접근성이 탁월하거나 재건축/리모델링 추진 중인 1,000세대 이상 대단지 전세 낀 매물 탐색',
        tip: '전세퇴거자금 대출 여력 및 임차인 만기 일정을 반드시 확인하세요.'
      },
      {
        step: 2,
        title: '보유 현금에 맞춘 갭투자 실행 & 등기 완료',
        description: '취득세 및 보유세(재산세·종부세) 시뮬레이션 후 최상위 입지에 소유권 확보',
        tip: '공동명의 여부와 향후 비과세 플랜(2년 보유/거주 요건)을 세무사와 사전 상담하세요.'
      },
      {
        step: 3,
        title: '직주근접 가성비 거주지 세팅 (전월세)',
        description: '직장 30분 이내 전세대출(버팀목/시중은행) 또는 반전세를 활용해 주거비 지출 통제',
        tip: '잉여 소득을 적립식 투자로 굴려 향후 자가 입주 시 인테리어/대출 상환 재원을 마련합니다.'
      },
      {
        step: 4,
        title: '자산 상승기 자가 입주 또는 상급지 갈아타기',
        description: '매수 단지의 시세 상승 후 전세보증금을 반환하고 실입주하거나 더 상위 급지로 점프',
        tip: '1주택 비과세 요건(상생임대인 제도 활용 등)을 맞춰 양도세 부담을 최소화하세요.'
      }
    ],
    pros: [
      '소전자본으로도 서울/수도권 핵심지 등기 권리를 선점 가능',
      '직장 출퇴근 30분 이내 삶의 질 및 워라밸 완벽 보존',
      '부동산 상승장에서 자산 소외감(FOMO) 완벽 방어'
    ],
    cons: [
      '내 집에 살지 못한다는 심리적 안정감 부재 (전세 이사 리스크)',
      '임차인 관리 및 전세 시세 하락 시 역전세 보증금 반환 리스크',
      '실거주 2년 비과세 요건 충족을 위한 추후 입주 계획 필요'
    ],
    targetBudgetBand: '보유 순현금 2억 ~ 6억 원',
    samplePortfolio: {
      livingSolution: '마포/여의도/강남 인근 역세권 준신축 오피스텔 또는 소형 아파트 전세 (전세자금대출 80% 활용)',
      buyingSolution: '성동구/동작구/강동구 또는 분당/수지 1,000세대 대단지 전세 낀 갭투자 (갭 3.5억~5억)',
      expectedOutcome: '5년 내 수도권 상위 15% 아파트 자산 가치 상승분 확보 후 30평대 자가 입주 실현'
    }
  },
  GOLDEN_INTERSECTION: {
    key: 'GOLDEN_INTERSECTION',
    title: '황금 교집합 실거주 (Golden Intersection) 전략',
    subTitle: '자산 가치 상승과 쾌적한 실거주 만족도를 한 집에서 동시에 잡는다',
    badge: '올인원 밸런스형',
    tagline: '직주근접 + 신축/대단지 인프라 + 확실한 환금성을 겸비한 똘똘한 1채 실거주',
    description: '충분한 예산과 소득 안정성을 바탕으로, 강남/여의도/광화문 핵심 업무지구 45분 이내 접근성과 대단지 커뮤니티, 상위 학군 및 쾌적한 상권을 모두 갖춘 우량 단지에 자가로 입주하는 가장 안정적인 정석 전략입니다.',
    whyThisStrategy: [
      '주거 안정성(이사 걱정 없음)과 인테리어 자유도, 자산 증식을 동시에 달성합니다.',
      '1주택 2년 실거주 비과세 혜택을 자연스럽게 충족하여 향후 세금 부담이 전혀 없습니다.',
      '신축 대단지의 커뮤니티(피트니스, 수영장, 골프연습장, 조식 서비스 등)로 가족의 삶의 질이 수직 상승합니다.'
    ],
    executionRoadmap: [
      {
        step: 1,
        title: '가계 소득 기반 DSR 40% 이내 주택담보대출 한도 확정',
        description: '시중은행 주담대(5년 고정혼합형) 최저 금리 상품 비교 및 생애최초/디딤돌 자격 검토',
        tip: '원리금 상환액이 월 가계 실수령액의 30~35%를 넘지 않도록 안전 버퍼를 두세요.'
      },
      {
        step: 2,
        title: '골든 삼각지(직주근접 + 대단지 + 브랜드) 타겟팅',
        description: '마용성, 동작, 강동, 하남 미사, 과천 또는 경기 남부 핵심(분당, 판교, 광교, 수지, 동탄) 84㎡ / 59㎡ 분석',
        tip: '역세권 도보 7분 이내, 초등학교를 품은 단지(초품아)를 최우선으로 검토합니다.'
      },
      {
        step: 3,
        title: '급매 및 로열동·로열층(RR) 협상 매수',
        description: '비수기/조정 국면을 활용해 시세 대비 3~5% 저렴한 로열동·호수 집중 공략',
        tip: '하자 점검 및 이전 소유자의 관리비 체납, 누수 이력을 꼼꼼히 확인하세요.'
      },
      {
        step: 4,
        title: '장기 보유 및 거주 비과세 세팅',
        description: '안정적인 실거주를 누리며 지역 내 인프라 완성(신설 지하철 개통 등) 호재를 온전히 수확',
        tip: '주기적인 LTV 재산정 및 금리 인하기 대환대출로 이자 비용을 절감하세요.'
      }
    ],
    pros: [
      '완벽한 주거 심리적 안정감과 가족 구성원의 높은 만족도',
      '양도소득세 1주택 비과세(최대 12억 원까지 전액 비과세) 가장 수월',
      '하락장에서도 탄탄한 실거주 수요로 하방 경직성 확보'
    ],
    cons: [
      '상대적으로 높은 초기 자본금과 고액 주담대 원리금 부담',
      '투자와 거주 조건을 모두 맞추다 보니 선택 가능한 단지 풀이 좁음',
      '자산 포트폴리오가 1채의 부동산에 집중되는 집중 위험(Concentration Risk)'
    ],
    targetBudgetBand: '보유 순현금 4억 ~ 10억 원 + 안정적인 근로/사업 소득',
    samplePortfolio: {
      livingSolution: '마포/동작 또는 광교/수지/미사/동탄 84㎡ 신축/준신축 아파트 자가 매수 및 실거주',
      buyingSolution: '신분당선/8호선/9호선/GTX 골든 라인 인근 1,500세대 브랜드 대단지',
      expectedOutcome: '월 원리금 상환을 통한 강제 저축 효과 + 10년 보유 시 지역 랜드마크급 가치 상승'
    }
  },
  STEPPING_STONE: {
    key: 'STEPPING_STONE',
    title: '스마트 징검다리 (Stepping Stone) 전략',
    subTitle: '현재 가용 예산 내 가성비 우량주를 1단계 매수 후 상급지로 점진적 스케일업',
    badge: '단계별 급지상향형',
    tagline: '무리한 영끌 대신 감당 가능한 수도권 핵심축에서 시작해 3~5년 주기로 급지를 올린다',
    description: '현재 자본금이 부족하더라도 무주택자로 머물지 않고, 8호선 연장(다산·별내·구리), GTX-A(동탄·파주운정·일산), 신분당선(수원 화서/호매실), 경강선(광주/이천), 1호선/GTX(평택 고덕/의정부/양주) 또는 1기 신도시(평촌/산본/중동) 역세권을 1단계 매수한 뒤, 비과세 차익을 실현하며 상급지로 순차 점프하는 성장형 전략입니다.',
    whyThisStrategy: [
      '무주택 유지로 인한 부동산 인플레이션 리스크를 원천 차단합니다.',
      '내 집 마련의 첫 관문을 넘어 주거 비용을 자산으로 환원시키는 선순환을 만듭니다.',
      '소득 증가와 대출 상환, 아파트 가격 상승이 결합되어 2단계 상급지 진입 체력을 기릅니다.'
    ],
    executionRoadmap: [
      {
        step: 1,
        title: '신생아특례/보금자리론/디딤돌 정책대출 풀활용',
        description: '연 2~3%대 저금리 정책 모기지가 가능한 6억~9억 이하 경기도 우량 아파트 타겟 발굴',
        tip: 'DSR 규제가 덜한 정책 모기지 상품 조건을 최우선으로 확인하세요.'
      },
      {
        step: 2,
        title: '신설 철도망 축 or 1기/2기 신도시 역세권 매수',
        description: '잠실/강남/광화문 30분대 연결 신축 택지 또는 학원가 인프라가 완성된 대단지 매수',
        tip: '구축일수록 지하주차장 연결 여부, 배관 교체 여부, 학원가 접근성을 체크합니다.'
      },
      {
        step: 3,
        title: '실거주 2년 이상 채우고 1주택 비과세 요건 달성',
        description: '깔끔한 턴키 인테리어로 실거주 만족도를 높이며 매월 원금을 성실히 상환',
        tip: '인테리어 영수증(자본적 지출)을 보관해 추후 양도세 필요경비로 인정받으세요.'
      },
      {
        step: 4,
        title: '상급지 준신축으로 2차 점프 (갈아타기)',
        description: '양도세 비과세 차익 + 3년간 모은 추가 저축액 + 확대된 소득 기반으로 준상급지 이동',
        tip: '갈아타기 시에는 일시적 1가구 2주택 비과세 혜택(3년 내 종전주택 매도)을 적극 활용하세요.'
      }
    ],
    pros: [
      '무리한 영끌 없이 감당 가능한 원리금으로 주거 안정 확보',
      '정책 대출(디딤돌, 특례)의 초저금리 레버리지 극대화',
      '자가 보유에 따른 부동산 감각 및 갈아타기 실전 경험 습득'
    ],
    cons: [
      '최상급지 대비 시세 상승률이나 상승 속도가 다소 더딜 수 있음',
      '구축 단지의 경우 주차 및 녹물 등 주거 편의성 타협 필요',
      '3~5년 주기 잦은 이사와 취득세/복비 등 거래 비용 누적'
    ],
    targetBudgetBand: '보유 순현금 1억 ~ 3.5억 원 + 정책대출 타겟',
    samplePortfolio: {
      livingSolution: '남양주 다산/별내 준신축 또는 평촌/산본/구리/파주운정 역세권 아파트 인테리어 후 실거주',
      buyingSolution: '8호선 잠실 직통 역세권 또는 GTX 역세권 / 1기 신도시 특별법 수혜 대단지',
      expectedOutcome: '3~4년 후 1.5억~2억 비과세 차익 + 원금 상환분 회수하여 서울 마포/성동/강동 또는 분당 2단계 진입'
    }
  }
};

export const REGIONAL_RECOMMENDATIONS: RegionalRecommendation[] = [
  // ==========================================
  // 1. 하남시 (미사강변·감일·위례)
  // ==========================================
  {
    id: 'hanam-misa-gamil',
    name: '하남시 (미사강변·감일·위례)',
    subName: '미사역파라곤, 미사강변골든센트로, 미사강변루나리움, 감일포웰시티',
    city: '하남시',
    regionZone: 'GYEONGGI_EAST_NORTH',
    category: '5호선 미사역 + 3호선 연장(감일) + 스타필드 하남 + 한강',
    matchScore: 96,
    avgPriceRange: '9.0억 ~ 15.5억 원 (네이버 실거래 기준)',
    gapPriceRange: '전세가율 58~64% (갭 3.6억 ~ 5.8억)',
    livingScore: 95,
    buyingScore: 90,
    representativeComplexes: ['미사역파라곤', '미사강변골든센트로', '감일포웰시티푸르지오', '미사강변루나리움'],
    concreteComplexes: [
      {
        id: 'hn-1',
        name: '미사역파라곤',
        tierTag: '초역세권 대장주',
        units: 925,
        builtYear: 2021,
        stationDistance: '5호선 미사역 도보 1분 (지하철 직결)',
        walkMinutes: 1,
        price84: '12.8억 ~ 15.5억 원',
        gapPrice84: '5.2억 ~ 5.8억 원 (전세 7.5억~10.5억)',
        price59: '9.8억 ~ 10.5억 원',
        keyHighlight: '5호선 미사역 직결 슬세권 + 지하 대형 파라곤스퀘어 상권',
        recommendationTip: '출퇴근 시간이 절대적으로 중요하며 상권·편의시설을 엘리베이터로 누리고 싶은 맞벌이 추천',
        targetPersona: '광화문/강동/여의도 5호선 직주근접 맞벌이 부부',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%AF%B8%EC%82%AC%EC%97%AD%ED%8C%8C%EB%9D%BC%EA%B3%A4'
      },
      {
        id: 'hn-2',
        name: '미사강변골든센트로 (28단지)',
        tierTag: '초품아 학군형',
        units: 1541,
        builtYear: 2014,
        stationDistance: '5호선 미사역 도보 6분',
        walkMinutes: 6,
        price84: '10.2억 ~ 11.8억 원',
        gapPrice84: '4.0억 ~ 4.6억 원 (전세 6.2억~6.8억)',
        price59: '8.5억 ~ 9.0억 원',
        keyHighlight: '미사중앙초·미사중 안심 도보 통학 + 1,541세대 대단지 랜드마크',
        recommendationTip: '미사역 도보권과 자녀 초등학교 안심 통학을 동시에 잡는 3040 패밀리 실거주 최선호',
        targetPersona: '초등학생 자녀가 있는 3~4인 학령기 가구',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%AF%B8%EC%82%AC%EA%B0%95%EB%B3%80%EA%B3%A8%EB%93%A0%EC%84%BC%ED%8A%B8%EB%A1%9C'
      },
      {
        id: 'hn-3',
        name: '미사강변루나리움 (5단지)',
        tierTag: '가성비 실속형',
        units: 1164,
        builtYear: 2015,
        stationDistance: '5호선 미사역 도보 9~10분 (망월천 수변로)',
        walkMinutes: 9,
        price84: '9.0억 ~ 10.2억 원',
        gapPrice84: '3.4억 ~ 3.9억 원 (전세 5.7억~6.2억)',
        price59: '7.5억 ~ 8.2억 원',
        keyHighlight: '망월천 수변공원 바로 앞 + 대장주 대비 3~4억 저렴한 9억대 진입',
        recommendationTip: '10억 이하 예산으로 하남 미사의 쾌적한 인프라와 1,164세대 대단지 관리비를 누리는 실속형',
        targetPersona: '9억대 예산으로 쾌적한 주거환경을 원하는 실수요자',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%AF%B8%EC%82%AC%EA%B0%95%EB%B3%80%EB%A3%A8%EB%82%98%EB%A6%AC%EC%9B%80'
      }
    ],
    transitLines: ['5호선 미사역', '3호선 연장(예정)', '9호선 4단계 연장(예정)'],
    commuteTimeToGbd: '잠실 20분 / 강남 35분 (광역버스/지하철)',
    commuteTimeToCbd: '광화문 45분 (5호선 직결)',
    commuteTimeToYbd: '여의도 50분 (5호선 직통)',
    keyStrengths: ['망월천 수변공원과 한강공원의 압도적 쾌적성', '스타필드 하남, 코스트코 등 경기 동부 최고 상권', '강동구 고덕/명일과 맞닿은 준강남 인프라'],
    trafficPoints: '5호선 미사역 직결, 올림픽대로 선동IC로 잠실 15분 자차',
    schoolPoints: '미사강변초·중·고 균형 배치 및 미사역 중심상가 대형 학원가 밀집',
    cautionPoints: '강남 직결 지하철은 환승 필요 (9호선 연장 착공 단계 추적)',
    strategyFit: 'GOLDEN_INTERSECTION',
    quadrant: 'SUPER_CORE',
    tags: ['망월천수변공원', '스타필드하남', '잠실생활권', '신축대단지']
  },

  // ==========================================
  // 2. 남양주 별내신도시
  // ==========================================
  {
    id: 'namyangju-byeolnae',
    name: '남양주 별내신도시 (별내역·별내별가람)',
    subName: '별내자이더스타, 별내아이파크2차, 별내역유승한내들',
    city: '남양주시',
    regionZone: 'GYEONGGI_EAST_NORTH',
    category: '8호선 별내역 + 4호선 별내가람역 + 경춘선 트리플 교통망',
    matchScore: 92,
    avgPriceRange: '6.8억 ~ 10.2억 원 (84㎡ 네이버 실거래 기준)',
    gapPriceRange: '전세가율 62~68% (갭 2.2억 ~ 3.4억)',
    livingScore: 90,
    buyingScore: 84,
    representativeComplexes: ['별내자이더스타', '별내아이파크2차', '별내역유승한내들이노스타', '우미린더퍼스트'],
    concreteComplexes: [
      {
        id: 'bn-1',
        name: '별내자이더스타',
        tierTag: '초역세권 대장주',
        units: 740,
        builtYear: 2023,
        stationDistance: '8호선·경춘선 별내역 도보 3분 (초역세권)',
        walkMinutes: 3,
        price84: '8.5억 ~ 10.2억 원',
        gapPrice84: '3.0억 ~ 3.5억 원 (전세 5.3억~5.8억)',
        price59: '6.8억 ~ 7.5억 원',
        keyHighlight: '8호선 시종점역 도보 3분 + 이마트 별내점 슬세권 + 2023년 준공 신축',
        recommendationTip: '8호선 종점이라 아침 출근 시 100% 앉아서 잠실(27분)까지 이동 가능한 별내 최고 랜드마크',
        targetPersona: '잠실/강남 쾌적 출퇴근 직장인, 신축 브랜드 주상복합 선호자',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%B3%84%EB%82%B4%EC%9E%90%EC%9D%B4%EB%8D%94%EC%8A%A4%ED%83%80'
      },
      {
        id: 'bn-2',
        name: '별내아이파크2차',
        tierTag: '가성비 실속형',
        units: 1083,
        builtYear: 2015,
        stationDistance: '4호선 별내별가람역 도보 10분 (불암산 숲세권)',
        walkMinutes: 10,
        price84: '6.8억 ~ 7.6억 원',
        gapPrice84: '2.2억 ~ 2.6억 원 (전세 4.4억~4.8억)',
        price59: '5.8억 ~ 6.3억 원',
        keyHighlight: '불암산 자락 쾌적 숲세권 + 1,083세대 대단지 + 6~7억대 착한 가격',
        recommendationTip: '4호선으로 동대문/서울역 통근이 편리하며 7억 초반대로 30평대 대단지 매수 가능',
        targetPersona: '4호선 라인 직장인, 조용하고 쾌적한 숲세권 패밀리',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%B3%84%EB%82%B4%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC2%EC%B0%A8'
      }
    ],
    transitLines: ['8호선 별내역', '4호선 별내별가람역', '경춘선'],
    commuteTimeToGbd: '잠실 27분 / 강남역 42분 (8호선)',
    commuteTimeToCbd: '동대문/서울역 35분 (4호선)',
    commuteTimeToYbd: '여의도 55분',
    keyStrengths: ['8호선 종점역으로 잠실 20분대 쾌속', '불암산·수락산 청정 자연 및 용암천 카페거리', '이마트 별내점 및 복합쇼핑몰'],
    trafficPoints: '8호선 별내역(잠실 27분), 4호선 별내별가람역(노원 10분, 서울역 40분)',
    schoolPoints: '별가람중, 별내고 및 별내역 중심상업지 학원가 완비',
    cautionPoints: '북별내(4호선)와 남별내(8호선) 거리가 있어 직장 위치에 맞춘 단지 선별 필요',
    strategyFit: 'STEPPING_STONE',
    quadrant: 'SMART_LIVING',
    tags: ['트리플역세권', '불암산숲세권', '8호선시종점', '쾌적주거']
  },

  // ==========================================
  // 3. 남양주 다산신도시 (진건·지금)
  // ==========================================
  {
    id: 'namyangju-dasan',
    name: '남양주 다산신도시 (진건·지금)',
    subName: '다산자이아이비플레이스, 다산e편한세상자이, 다산센트럴에어시티',
    city: '남양주시',
    regionZone: 'GYEONGGI_EAST_NORTH',
    category: '8호선 다산역 잠실 25분 + 현대프리미엄아울렛 + 왕숙 배후',
    matchScore: 95,
    avgPriceRange: '7.2억 ~ 11.0억 원 (84㎡ 네이버 실거래 기준)',
    gapPriceRange: '전세가율 62~68% (갭 2.5억 ~ 3.8억)',
    livingScore: 93,
    buyingScore: 86,
    representativeComplexes: ['다산자이아이비플레이스', '다산e편한세상자이', '힐스테이트다산', '다산반도유보라메이플타운'],
    concreteComplexes: [
      {
        id: 'ds-1',
        name: '다산자이아이비플레이스',
        tierTag: '초역세권 대장주',
        units: 967,
        builtYear: 2021,
        stationDistance: '8호선 다산역 도보 1분 (지하 직통 연결)',
        walkMinutes: 1,
        price84: '9.5억 ~ 11.0억 원',
        gapPrice84: '3.6억 ~ 4.2억 원 (전세 5.8억~6.3억)',
        price59: '7.5억 ~ 8.2억 원',
        keyHighlight: '8호선 다산역 지하 직결 대장주, 잠실역 9정거장(25분 컷)',
        recommendationTip: '다산신도시 시세를 리딩하는 1등 단지. 비가 와도 우산 없이 지하철 탑승 가능',
        targetPersona: '잠실/강남 출퇴근 맞벌이 부부, 신축 하이엔드 선호자',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%8B%A4%EC%82%B0%EC%9E%90%EC%9D%B4%EC%95%84%EC%9D%B4%EB%B9%84%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4'
      },
      {
        id: 'ds-2',
        name: '다산e편한세상자이',
        tierTag: '초품아 학군형',
        units: 1685,
        builtYear: 2018,
        stationDistance: '8호선 다산역 도보 6분',
        walkMinutes: 6,
        price84: '8.0억 ~ 9.2억 원',
        gapPrice84: '2.8억 ~ 3.4억 원 (전세 5.0억~5.5억)',
        price59: '6.5억 ~ 7.2억 원',
        keyHighlight: '다산가람초 초품아 + 1,685세대 브랜드 매머드 대단지',
        recommendationTip: '초등학교 안전 통학과 1천 세대 이상 커뮤니티, 역세권을 모두 만족하는 표준 추천 단지',
        targetPersona: '초등 자녀를 둔 3040 실수요자, 8~9억대 예산 가구',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%8B%A4%EC%82%B0e%ED%8E%B8%ED%95%9C%EC%84%B8%EC%83%81%EC%9E%90%EC%9D%B4'
      },
      {
        id: 'ds-3',
        name: '다산반도유보라메이플타운',
        tierTag: '가성비 실속형',
        units: 1085,
        builtYear: 2018,
        stationDistance: '8호선 다산역 도보 11분 (중앙공원 인접)',
        walkMinutes: 11,
        price84: '7.2억 ~ 8.0억 원',
        gapPrice84: '2.3억 ~ 2.8억 원 (전세 4.6억~5.0억)',
        keyHighlight: '다산중앙공원 품은 숲세권 + 7억대 가성비 84㎡',
        recommendationTip: '다산역 도보 10분 거리지만 공원이 쾌적하고 7억 초중반대로 가격 메리트 우수',
        targetPersona: '정책대출(디딤돌/특례) 7억대 한도 내에서 30평대를 찾는 분',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EB%8B%A4%EC%82%B0%EB%B0%98%EB%8F%84%EC%9C%A0%EB%B3%B4%EB%9D%BC%EB%A9%94%EC%9D%B4%ED%84%80%ED%83%80%EC%9A%B4'
      }
    ],
    transitLines: ['8호선 다산역', '경의중앙선 도농역'],
    commuteTimeToGbd: '잠실 25분 / 강남역 40분 (8호선 직결)',
    commuteTimeToCbd: '광화문 45분 (도농역 경의중앙선)',
    commuteTimeToYbd: '여의도 55분',
    keyStrengths: ['8호선 개통으로 잠실/송파 출퇴근 20분대 완성', '현대프리미엄아울렛 스페이스원 슬세권', '신축 택지지구 특유의 깨끗한 평지 상권'],
    trafficPoints: '8호선 다산역으로 잠실역 9정거장(25분), 북부간선도로·수도권제1순환고속도로 인접',
    schoolPoints: '다산한강초, 다산가람초 등 신설 초품아 및 다산역 앞 신흥 대형 학원가 급성장',
    cautionPoints: '8호선 역세권 도보권 단지와 비역세권 단지 간 시세 및 환금성 격차 존재',
    strategyFit: 'STEPPING_STONE',
    quadrant: 'SMART_LIVING',
    tags: ['8호선잠실직결', '신축택지', '가성비실거주', '현대아울렛']
  },

  // ==========================================
  // 4. 구리시 (인창·수택·갈매)
  // ==========================================
  {
    id: 'guri-inchang-galmae',
    name: '구리시 (인창·수택·갈매)',
    subName: '구리역롯데캐슬시그니처, e편한세상인창어반포레, 갈매역아이파크',
    city: '구리시',
    regionZone: 'GYEONGGI_EAST_NORTH',
    category: '8호선 구리역 잠실 18분 컷 + 서울 광진/중랑 초밀착',
    matchScore: 94,
    avgPriceRange: '6.8억 ~ 11.5억 원 (84㎡ 네이버 실거래 기준)',
    gapPriceRange: '전세가율 60~65% (갭 2.5억 ~ 4.2억)',
    livingScore: 89,
    buyingScore: 88,
    representativeComplexes: ['구리역롯데캐슬시그니처', 'e편한세상인창어반포레', '갈매역아이파크'],
    concreteComplexes: [
      {
        id: 'gr-1',
        name: 'e편한세상인창어반포레',
        tierTag: '초역세권 대장주',
        units: 632,
        builtYear: 2020,
        stationDistance: '8호선·경의선 구리역 도보 3분',
        walkMinutes: 3,
        price84: '9.8억 ~ 11.2억 원',
        gapPrice84: '3.6억 ~ 4.2억 원 (전세 6.0억~6.6억)',
        price59: '7.8억 ~ 8.5억 원',
        keyHighlight: '8호선 잠실 18분 컷 + 롯데백화점 구리점 도보 5분',
        recommendationTip: '구리시 최고 입지. 잠실/강남 출퇴근 속도가 최우선인 분께 압도적 1순위',
        targetPersona: '잠실/강남 20분대 출퇴근 직장인',
        naverLandUrl: 'https://m.land.naver.com/search/result/e%ED%8E%B8%ED%95%9C%EC%84%B8%EC%83%81%EC%9D%B8%EC%B0%BD%EC%96%B4%EB%B0%98%ED%8F%AC%EB%A0%88'
      }
    ],
    transitLines: ['8호선 구리역', '경의중앙선 구리역', '경춘선 갈매역'],
    commuteTimeToGbd: '잠실 18분 / 강남역 35분 (8호선 직결)',
    commuteTimeToCbd: '종로/을지로 35분',
    commuteTimeToYbd: '여의도 45분',
    keyStrengths: ['수도권 동북부 중 잠실 최단 시간(18분) 도달', '롯데백화점 구리점 및 롯데마트 초슬세권', '재개발 뉴타운으로 주거환경 천지개벽'],
    trafficPoints: '8호선 환승 구리역(잠실 18분 컷), 강변북로/올림픽대로 즉시 진입',
    schoolPoints: '인창고, 장자못 인근 수택동 전통 명문 학원가 인접',
    cautionPoints: '구도심 재개발 구역과 미개발 빌라촌 혼재 구간 점검',
    strategyFit: 'STEPPING_STONE',
    quadrant: 'BALANCED_STARTER',
    tags: ['잠실18분컷', '롯데백화점', '구리뉴타운', '준서울']
  },

  // ==========================================
  // 5. 용인시 수지구 (성복·풍덕천·신봉)
  // ==========================================
  {
    id: 'yongin-suji',
    name: '용인시 수지구 (성복·풍덕천·신봉)',
    subName: '성복역롯데캐슬골드타운, 수지진산마을삼성5차, 신봉동센트레빌',
    city: '용인시',
    regionZone: 'GYEONGGI_SOUTH',
    category: '신분당선 강남 27분 + 수지구청 학원가 + 롯데몰 슬세권',
    matchScore: 97,
    avgPriceRange: '7.5억 ~ 13.5억 원 (84㎡ 네이버 실거래 기준)',
    gapPriceRange: '전세가율 62~68% (갭 2.8억 ~ 5.0억)',
    livingScore: 94,
    buyingScore: 91,
    representativeComplexes: ['성복역롯데캐슬골드타운', '수지e편한세상', '진산마을삼성5차'],
    concreteComplexes: [
      {
        id: 'sj-1',
        name: '성복역롯데캐슬골드타운',
        tierTag: '초역세권 대장주',
        units: 2356,
        builtYear: 2019,
        stationDistance: '신분당선 성복역 도보 1분 (지하 롯데몰 직통)',
        walkMinutes: 1,
        price84: '11.5억 ~ 13.0억 원',
        gapPrice84: '4.5억 ~ 5.2억 원 (전세 6.8억~7.5억)',
        price59: '8.8억 ~ 9.6억 원',
        keyHighlight: '2,356세대 랜드마크 + 신분당선 강남 27분 + 롯데몰 슬세권',
        recommendationTip: '수지 최고의 대장 아파트. 판교/강남 출퇴근과 대형 몰 인프라 종결 단지',
        targetPersona: '판교/강남 고소득 맞벌이, 복합쇼핑몰 라이프 선호 가구',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EC%84%B1%EB%B3%B5%EC%97%AD%EB%A1%AF%EB%8D%B0%EC%BA%90%EC%8A%AC%EA%B3%A8%EB%93%9C%ED%83%80%EC%9A%B4'
      }
    ],
    transitLines: ['신분당선(성복/수지구청/동천)', 'GTX-A 구성역 인접'],
    commuteTimeToGbd: '강남역 27분 / 판교역 12분 (신분당선 직결)',
    commuteTimeToCbd: '신사/논현 25분, 광화문 45분',
    commuteTimeToYbd: '신논현 9호선 환승 45분',
    keyStrengths: ['신분당선으로 판교 테크노밸리 12분, 강남 27분 직통', '경기 남부 최고 수준의 수지구청역 200개 학원가', '롯데몰 성복점 복합쇼핑몰 직통 연결'],
    trafficPoints: '신분당선 성복역·수지구청역·동천역, 용서고속도로',
    schoolPoints: '수지고(전국 최상위 일반고), 풍덕고, 이현중 및 수지구청 학원가',
    cautionPoints: '신봉동/상현동 등 비역세권 단지는 마을버스 환승 필요',
    strategyFit: 'GOLDEN_INTERSECTION',
    quadrant: 'SUPER_CORE',
    tags: ['신분당선강남27분', '수지구청학원가', '판교출퇴근', '롯데몰슬세권']
  },

  // ==========================================
  // 6. 수원시 영통구 (광교신도시)
  // ==========================================
  {
    id: 'suwon-gwanggyo',
    name: '수원시 영통구 (광교신도시)',
    subName: '광교중흥S-클래스, 힐스테이트광교, e편한세상광교',
    city: '수원시',
    regionZone: 'GYEONGGI_SOUTH',
    category: '신분당선 광교중앙역 + 광교호수공원 + 갤러리아 + 에듀타운',
    matchScore: 96,
    avgPriceRange: '12.5억 ~ 16.5억 원 (84㎡ 네이버 실거래 기준)',
    gapPriceRange: '전세가율 55~62% (갭 4.8억 ~ 7.0억)',
    livingScore: 97,
    buyingScore: 93,
    representativeComplexes: ['광교중흥S-클래스', '광교자연앤힐스테이트', '힐스테이트광교'],
    concreteComplexes: [
      {
        id: 'gg-1',
        name: '광교중흥S-클래스',
        tierTag: '초역세권 대장주',
        units: 2231,
        builtYear: 2019,
        stationDistance: '신분당선 광교중앙역 도보 7분 (호수공원 직결)',
        walkMinutes: 7,
        price84: '14.5억 ~ 16.5억 원',
        gapPrice84: '6.0억 ~ 7.0억 원 (전세 8.0억~8.8억)',
        keyHighlight: '광교호수공원 영구 파노라마 조망 + 갤러리아백화점 슬세권',
        recommendationTip: '경기 남부 최고의 하이엔드 랜드마크. 호수 뷰 프리미엄과 상권 최고봉',
        targetPersona: '자본력 6억 이상, 럭셔리 호수공원 라이프 지향 가구',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EA%B4%91%EA%B5%90%EC%A4%91%ED%9D%A5S%ED%81%B4%EB%9E%98%EC%8A%A4'
      },
      {
        id: 'gg-2',
        name: '광교자연앤힐스테이트',
        tierTag: '초역세권 대장주',
        units: 1764,
        builtYear: 2012,
        stationDistance: '신분당선 광교중앙역 도보 1분 (초역세권)',
        walkMinutes: 1,
        price84: '13.0억 ~ 14.2억 원',
        gapPrice84: '5.0억 ~ 5.8억 원 (전세 7.5억~8.2억)',
        keyHighlight: '신분당선 광교중앙역 1분 + 신풍초·다산중 에듀타운 학군',
        recommendationTip: '판교/강남 직결 신분당선 초역세권과 명문 에듀타운 학군을 완벽히 양립하는 1순위',
        targetPersona: '강남/판교 출퇴근 및 자녀 교육을 동시에 잡으려는 가구',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EA%B4%91%EA%B5%90%EC%9E%90%EC%97%B0%EC%95%A4%ED%9E%90%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%8A%B8'
      }
    ],
    transitLines: ['신분당선 광교중앙역/광교역'],
    commuteTimeToGbd: '강남역 35분 / 판교역 20분 (신분당선)',
    commuteTimeToCbd: '신사역 32분',
    commuteTimeToYbd: '신논현 환승 50분',
    keyStrengths: ['수도권 최고 수준의 광교호수공원 라이프', '경기도청/수원고등법원 행정타운 및 갤러리아백화점', '초중고 에듀타운 및 명문 학군'],
    trafficPoints: '신분당선 광교중앙역, 영동고속도로 동수원IC, 용서고속도로',
    schoolPoints: '광교고, 이의고, 다산중, 연무중 및 에듀타운 특화 학원가',
    cautionPoints: '수도권 상급지 가격대로 높은 초기 자본금(갭 5억 이상) 필요',
    strategyFit: 'GOLDEN_INTERSECTION',
    quadrant: 'SUPER_CORE',
    tags: ['경기남부대장', '광교호수공원', '신분당선', '에듀타운']
  },

  // ==========================================
  // 7. 성남시 (분당·판교 신도시)
  // ==========================================
  {
    id: 'seongnam-bundang-pangyo',
    name: '성남시 (분당·판교 신도시)',
    subName: '판교푸르지오그랑블, 분당파크뷰, 시범단지한양',
    city: '성남시',
    regionZone: 'GYEONGGI_WEST_SOUTH',
    category: '신분당선 강남 14분 + 판교 IT 테크노밸리 + 1기 신도시 1황',
    matchScore: 98,
    avgPriceRange: '13.5억 ~ 24.5억 원 (84㎡ 네이버 실거래 기준)',
    gapPriceRange: '전세가율 55~62% (갭 5.5억 ~ 9.0억)',
    livingScore: 98,
    buyingScore: 96,
    representativeComplexes: ['판교푸르지오그랑블', '분당파크뷰', '시범한양', '양지마을금호'],
    concreteComplexes: [
      {
        id: 'bd-1',
        name: '판교푸르지오그랑블',
        tierTag: '초역세권 대장주',
        units: 948,
        builtYear: 2011,
        stationDistance: '신분당선 판교역 도보 3분 + 현대백화점 직결',
        walkMinutes: 3,
        price84: '22.0억 ~ 24.5억 원',
        gapPrice84: '9.0억 ~ 11.0억 원 (전세 12.5억~13.5억)',
        keyHighlight: '경기 전체 1황 랜드마크 + 판교 IT 테크노밸리 도보권',
        recommendationTip: '예산이 충분하다면 설명이 필요 없는 수도권 최고의 주거 자산',
        targetPersona: 'IT 테크 임원/고소득 전문직, 최상위 자산가',
        naverLandUrl: 'https://m.land.naver.com/search/result/%ED%8C%90%EA%B5%90%ED%91%B8%EB%A5%B4%EC%A7%80%EC%98%A4%EA%B7%B8%EB%9E%91%EB%B8%94'
      },
      {
        id: 'bd-2',
        name: '시범한양 (서현동)',
        tierTag: '초품아 학군형',
        units: 2419,
        builtYear: 1991,
        stationDistance: '수인분당선 서현역 도보 5분',
        walkMinutes: 5,
        price84: '13.5억 ~ 15.5억 원',
        gapPrice84: '5.5억 ~ 6.5억 원 (전세 7.0억~8.0억)',
        keyHighlight: '분당 1기 신도시 재건축 선도지구 + 서현고 명문 학군',
        recommendationTip: '재건축 특별법 최우선 수혜 + 서현역 상권과 전국 1위 서현 학원가',
        targetPersona: '재건축 미래 가치와 자녀 명문 학군을 동시에 노리는 가구',
        naverLandUrl: 'https://m.land.naver.com/search/result/%EC%8B%9C%EB%B2%94%ED%95%9C%EC%96%91'
      }
    ],
    transitLines: ['신분당선(판교/정자/미금)', '수인분당선', 'GTX-A 성남역', '경강선'],
    commuteTimeToGbd: '강남역 14분 (신분당선)',
    commuteTimeToCbd: '신사 18분, 서울역 20분(GTX)',
    commuteTimeToYbd: '신논현 환승 35분',
    keyStrengths: ['국내 최고 일자리 판교 테크노밸리 직주근접', '현대백화점 판교점, 롯데백화점 분당점, 탄천 수변공원', '수내·정자 전국 최상위 학군 및 학원가'],
    trafficPoints: '신분당선(강남 14분), 수인분당선, GTX-A 성남역 트리플 교통',
    schoolPoints: '내정중, 수내중, 서현고, 분당대진고 등 전국 1티어 명문 학군',
    cautionPoints: '분당 재건축 선도지구 지정에 따른 가격 급등 및 이주 시기 점검',
    strategyFit: 'GOLDEN_INTERSECTION',
    quadrant: 'SUPER_CORE',
    tags: ['경기1황', '판교테크노밸리', '신분당선강남14분', '전국최강학군']
  }
];

export const THREE_CORE_METRICS_CRITERIA = [
  {
    id: 'transit',
    name: '1. 강남(GBD) & 주요 업무지구 직결 철도망',
    desc: '2호선, 3호선, 7호선, 8호선(잠실), 9호선(급행), 신분당선, GTX-A 등 황금 노선 역세권',
    importance: '★★★★★ (환금성 및 시세 방어율 1순위 지표)',
    checkDetails: [
      '환승 없이 강남역/신논현/잠실역 35분 이내 도달 가능한가? (8호선 다산/별내 25분, 신분당선 수지/광교 25~35분, GTX 동탄/운정 20분)',
      '단지 입구에서 지하철역 개찰구까지 실제 도보 시간이 10분 이내인가?',
      '향후 개통 예정 노선의 사업 진행 단계(착공/실시계획인가)가 확실한가?'
    ]
  },
  {
    id: 'scale',
    name: '2. 1,000세대 이상 대단지 & 1군 브랜드',
    desc: '관리비 절감, 커뮤니티 시설(피트니스, 수영장, 골프), 급매물 소화력 보장',
    importance: '★★★★☆ (하락장 방어력 및 실거주 만족도 지표)',
    checkDetails: [
      '전체 단지 세대수가 1,000세대 이상인가? (최소 700세대 이상)',
      '단지 내 조경 및 지하주차장-엘리베이터 다이렉트 연결이 되어 있는가?',
      '인근 중개업소에 항상 매수/임대 대기 수요가 유지되는 랜드마크 단지인가?'
    ]
  },
  {
    id: 'school_commercial',
    name: '3. 초품아(초등학교 품은 아파트) & 대형 상권',
    desc: '학령기 자녀 가구의 필수 매수 조건 및 슬세권(스타필드, 롯데몰, 현대아울렛) 완비',
    importance: '★★★★☆ (매수 타겟층의 연속성 확보 지표)',
    checkDetails: [
      '아이들이 차도를 건너지 않고 통학 가능한 초등학교(초품아)가 있는가?',
      '차량 10분 이내 대형쇼핑몰(스타필드, 롯데몰, 현대아울렛) 및 대학병원이 있는가?',
      '도보권 내 유해시설이 없고 안전한 가족 중심 주거환경이 조성되어 있는가?'
    ]
  }
];
