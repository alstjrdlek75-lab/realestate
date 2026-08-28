import re

briefings_code = '''
export interface TopPickBlock {
  rank: number;
  blockCode: string;
  badge: string;
  title: string;
  highlights: string[];
  price: string;
  transit: string;
  recommendationReason: string;
}

export interface SubscriptionBriefing {
  gangnamCommute: string;
  estimatedPrice: {
    size59: string;
    size84: string;
  };
  safetyMargin: string;
  localPriorityRule: string;
  recommendedTrack: string;
  topPickBlocks: TopPickBlock[];
}

export const SUBSCRIPTION_BRIEFINGS: Record<string, SubscriptionBriefing> = {
  namyangju_wangsook: {
    gangnamCommute: "9호선 연장 강남 25분 / GTX-B 서울역 15분",
    estimatedPrice: {
      size59: "약 3.8억 ~ 4.2억 원",
      size84: "약 5.2억 ~ 5.8억 원"
    },
    safetyMargin: "인근 다산신도시 대장(84㎡ 8.5억~9.5억) 대비 약 3.5억~4억 원 안전마진 확보",
    localPriorityRule: "남양주시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "2040 저가점자는 80% 물량이 배정되는 신생아·신혼부부·생애최초 특별공급 정조준",
    topPickBlocks: [
      { rank: 1, blockCode: '왕숙1 A-19', badge: '👑 1위 압도적 대장 블록', title: '왕숙1 A-19 (중심상업 대장)', highlights: ['GTX-B·9호선 복합환승역 도보 4분', '중심상업지구 바로 앞', '1,024세대 나눔형 대단지'], price: '84㎡ 약 5.3억', transit: 'GTX-B/9호선 더블역세권', recommendationReason: '왕숙신도시 전체에서 입지와 상권 접근성이 가장 뛰어난 1위 대장주' },
      { rank: 2, blockCode: '왕숙2 A-1', badge: '🥈 2위 9호선 역세권 대장', title: '왕숙2 A-1 (문화예술 특화)', highlights: ['9호선 연장 신설역 도보 5분', '경의중앙선 환승 용이', '712세대'], price: '59㎡ 약 3.9억 / 84㎡ 약 5.4억', transit: '9호선 신설역 도보 5분', recommendationReason: '강남 25분 직결 9호선 역세권으로 직주근접 실수요층 두터움' },
      { rank: 3, blockCode: '왕숙1 A-1', badge: '🥉 3위 실속 가성비 대장', title: '왕숙1 A-1 (대광건영 시공)', highlights: ['대광건영 시공 638세대', '59㎡ 소형 실속형', '2025년 본청약'], price: '59㎡ 약 3.8억~4.0억', transit: '북부 신설역 도보 6분', recommendationReason: '초기 자본금이 부족한 2030 신혼부부에게 가장 확실한 가성비 공략처' }
    ]
  },
  hanam_gyosan: {
    gangnamCommute: "3호선 송파하남선 송파 10분, 강남 20분대 / 서하남IC 강남 초근접",
    estimatedPrice: {
      size59: "약 4.5억 ~ 5.0억 원",
      size84: "약 6.0억 ~ 6.8억 원"
    },
    safetyMargin: "송파 오금·감일 신축(84㎡ 11억~14억) 대비 약 5억 원 이상 안전마진 (3기 신도시 최고 로또)",
    localPriorityRule: "하남시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "3호선 신설역 역세권 블록에 당해 거주 조건과 특공 자격을 총동원해야 함",
    topPickBlocks: [
      { rank: 1, blockCode: '교산 B-1', badge: '👑 1위 3호선 초역세권 대장', title: '하남교산 B-1 (송파하남선 직결)', highlights: ['3호선 신설역 도보 3분', '송파구 10분대 직통', '주상복합·상권 인접'], price: '84㎡ 약 6.2억~6.5억', transit: '3호선 신설역 도보 3분', recommendationReason: '송파·강남 접근성이 3기 신도시 중 압도적 1위인 최고 기대 블록' },
      { rank: 2, blockCode: '교산 A-2', badge: '🥈 2위 송파 초근접 대단지', title: '하남교산 A-2 (공공분양 1,115세대)', highlights: ['송파 오금동 경계 초인접', '1,115세대 매머드급 대단지', '초품아 안심 통학'], price: '59㎡ 약 4.5억 / 84㎡ 약 6.1억', transit: '3호선 연계 버스 환승', recommendationReason: '송파 생활권을 누릴 수 있는 대단지 초품아로 실수요 선호도 극상' },
      { rank: 3, blockCode: '교산 B-2', badge: '🥉 3위 중심상권 에듀 블록', title: '하남교산 B-2 (중심상업·학교 인접)', highlights: ['중심상업지구 도보 이용', '초·중학교 도보 3분', '쾌적한 평지 택지'], price: '84㎡ 약 6.1억', transit: '3호선 신설역 도보 6분', recommendationReason: '상권 편의성과 자녀 교육을 동시에 잡는 3040 학부모 안심 블록' }
    ]
  },
  goyang_changreung: {
    gangnamCommute: "GTX-A(창릉역) 삼성역 10분, 서울역 8분 / 6호선·서부선 새절역 연계",
    estimatedPrice: {
      size59: "약 3.8억 ~ 4.2억 원",
      size84: "약 5.4억 ~ 5.9억 원"
    },
    safetyMargin: "삼송·원흥 준신축(84㎡ 8.5억~10억) 대비 약 3억 원 안전마진",
    localPriorityRule: "고양시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "GTX-A 창릉역 개통 수혜를 온전히 받는 S-5, S-6 나눔형 집중 공략",
    topPickBlocks: [
      { rank: 1, blockCode: '창릉 S-5', badge: '👑 1위 GTX-A 초역세권 대장', title: '고양창릉 S-5 (GTX 창릉역 도보권)', highlights: ['GTX-A 창릉역 도보 5분', '삼성역 10분 주파', '718세대 나눔형'], price: '84㎡ 약 5.5억', transit: 'GTX-A 창릉역 도보 5분', recommendationReason: '강남 삼성역 10분 쾌속 도달이 가능한 창릉 최고의 교통 대장' },
      { rank: 2, blockCode: '창릉 S-6', badge: '🥈 2위 창릉천 수변 랜드마크', title: '고양창릉 S-6 (수변공원 뷰)', highlights: ['창릉천 영구 조망', 'GTX 역세권 도보 이용', '초·중학교 인접'], price: '84㎡ 약 5.6억', transit: 'GTX-A 창릉역 도보 7분', recommendationReason: '수변 쾌적성과 GTX 교통을 동시에 갖춘 창릉 최고급 주거 블록' },
      { rank: 3, blockCode: '창릉 A-4', badge: '🥉 3위 은평구 초인접 실속형', title: '고양창릉 A-4 (구파발 연계)', highlights: ['서울 은평구 구파발 초인접', '59㎡ 소형 실속 단지', '3호선 연계 용이'], price: '59㎡ 약 3.9억', transit: '3호선 삼송역·구파발 연계', recommendationReason: '서울 경계에 바로 붙어 있어 서울 도심 통근에 최적화된 실속 단지' }
    ]
  },
  bucheon_daejang: {
    gangnamCommute: "대장홍대선(홍대입구 20분, 상암DMC 12분) / S-BRT 김포공항 환승",
    estimatedPrice: {
      size59: "약 3.6억 ~ 3.9억 원",
      size84: "약 4.9억 ~ 5.3억 원"
    },
    safetyMargin: "마곡지구 엠밸리(84㎡ 13억~15억) 배후 대체지, 인근 대비 2억 원 안전마진",
    localPriorityRule: "부천시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "대장홍대선 신설역 초역세권 단지와 SK 그린테크노캠퍼스 직주근접 단지 타깃",
    topPickBlocks: [
      { rank: 1, blockCode: '대장 A-7', badge: '👑 1위 대장홍대선 역세권 대장', title: '부천대장 A-7 (홍대 20분 직통)', highlights: ['대장홍대선 신설역 도보 4분', '상암DMC 12분 컷', '공공분양 824세대'], price: '84㎡ 약 5.1억', transit: '대장홍대선 신설역 도보 4분', recommendationReason: '서울 마포·홍대 직결 대장홍대선의 최대 수혜를 누리는 1등 블록' },
      { rank: 2, blockCode: '대장 A-8', badge: '🥈 2위 SK R&D 배후 에듀 블록', title: '부천대장 A-8 (SK 그린캠퍼스 인접)', highlights: ['SK그룹 첨단 R&D 배후', '초등학교 바로 앞 초품아', '중심상업 인접'], price: '84㎡ 약 5.0억', transit: '신설역 도보 7분', recommendationReason: '고소득 R&D 일자리 배후와 안전한 통학 환경을 모두 갖춘 알짜 단지' },
      { rank: 3, blockCode: '대장 A-5', badge: '🥉 3위 신혼부부 가성비 특화', title: '부천대장 A-5 (신혼희망타운)', highlights: ['전용 55㎡ 특화', '1%대 장기 저리 대출', '보육 커뮤니티 특화'], price: '55㎡ 약 3.7억', transit: 'S-BRT 환승 연계', recommendationReason: '초기 자본 1억 원대로 진입 가능한 신혼부부 맞춤형 사다리 단지' }
    ]
  },
  incheon_gyeyang: {
    gangnamCommute: "S-BRT ➔ 김포공항역(5·9호선, 공항철도 급행) 환승 / 마곡 10분",
    estimatedPrice: {
      size59: "약 3.6억 ~ 3.9억 원",
      size84: "약 4.8억 ~ 5.2억 원"
    },
    safetyMargin: "3기 신도시 중 가장 빠른 2026년 입주, 확정 분양가 메리트",
    localPriorityRule: "인천광역시 1년 이상 거주(50%) ➔ 수도권 기타(50%)",
    recommendedTrack: "인천 거주자 우선 배정 비율 50%로 인천 시민에게 당첨 확률 최고",
    topPickBlocks: [
      { rank: 1, blockCode: '계양 A-2', badge: '👑 1위 3기 신도시 1호 입주 대장', title: '인천계양 A-2 (공공분양 812세대)', highlights: ['2026년 3기 신도시 최단기 입주', '812세대 대단지', '마곡 10분대 생활권'], price: '84㎡ 약 4.9억~5.1억', transit: 'S-BRT 환승역 도보권', recommendationReason: '3기 신도시 중 가장 빠르게 완공되어 실입주 가능한 첫 번째 랜드마크' },
      { rank: 2, blockCode: '계양 A-3', badge: '🥈 2위 신혼희망타운 랜드마크', title: '인천계양 A-3 (박촌역 연계)', highlights: ['인천 1호선 박촌역 인접', '초등학교 면한 안심 입지', '55㎡ 실속 평형'], price: '55㎡ 약 3.8억', transit: '인천 1호선 박촌역 도보', recommendationReason: '지하철역 접근성과 초등학교 통학이 가장 우수한 신희타 단지' },
      { rank: 3, blockCode: '계양 B-1', badge: '🥉 3위 첨단산단 자족형 대단지', title: '인천계양 B-1 (도시첨단산단 배후)', highlights: ['계양 테크노밸리 배후', '1,000세대급 랜드마크', '중심상권 인접'], price: '84㎡ 약 5.0억', transit: 'S-BRT 및 공항고속 연계', recommendationReason: 'IT·제조 자족 일자리 배후로 향후 전·월세 임대 수요 풍부' }
    ]
  },
  gwacheon_gwacheon: {
    gangnamCommute: "4호선·위례과천선(선바위역) 양재 10분, 강남 15분 / GTX-C 과천정부청사역",
    estimatedPrice: {
      size59: "약 6.2억 ~ 6.8억 원",
      size84: "약 8.5억 ~ 9.2억 원"
    },
    safetyMargin: "서초구 우면지구 및 과천 신축(84㎡ 18억~22억) 대비 9억~10억 원 이상 로또 마진",
    localPriorityRule: "과천시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "수도권 전체 청약 통장이 몰리는 로또 중의 로또, 특별공급 자격 총동원 필수",
    topPickBlocks: [
      { rank: 1, blockCode: '과천 A-1', badge: '👑 1위 준강남 선바위 초역세권 대장', title: '과천과천 A-1 (선바위 더블역세권)', highlights: ['4호선·위례과천선 선바위역 도보 3분', '서초구 양재동 10분 컷', '양재천 숲세권'], price: '84㎡ 약 8.9억', transit: '4호선/위례과천선 선바위역', recommendationReason: '서초구 바로 옆에 붙은 준강남 입지로 3기 신도시 최고의 자산가치 1위' },
      { rank: 2, blockCode: '과천 B-1', badge: '🥈 2위 경마공원역 수변 뷰', title: '과천과천 B-1 (양재천 영구조망)', highlights: ['4호선 경마공원역 도보 5분', '양재천 수변공원 조망', '우면산 쾌적 자연'], price: '84㎡ 약 8.8억', transit: '4호선 경마공원역 도보 5분', recommendationReason: '초역세권 교통과 양재천 수변 환경을 모두 누리는 하이엔드 주거지' },
      { rank: 3, blockCode: '과천 A-2', badge: '🥉 3위 2040 특공 최고 인기', title: '과천과천 A-2 (59㎡ 소형 알짜)', highlights: ['강남 10분대 진입', '신생아·신혼부부 특공 집중', '초등학교 인접'], price: '59㎡ 약 6.5억', transit: '선바위역 도보 7분', recommendationReason: '강남권 아파트 진입이 어려운 3040 직장인에게 인생 최대의 당첨 기회' }
    ]
  },
  guri_topyeong: {
    gangnamCommute: "8호선 연장(장자호수공원역) 잠실 15분, 강남 25분 / 강변북로·올림픽대로 직결",
    estimatedPrice: {
      size59: "약 5.0억 ~ 5.5억 원",
      size84: "약 7.2억 ~ 7.8억 원"
    },
    safetyMargin: "강동구 고덕·미사 한강변(84㎡ 13억~16억) 대비 약 5억~6억 원 안전마진 기대",
    localPriorityRule: "구리시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "한강 영구 조망권 1열 블록에 가점과 특별공급 통장을 집중할 것",
    topPickBlocks: [
      { rank: 1, blockCode: '토평2 B-1', badge: '👑 1위 한강 영구조망 1열 대장', title: '구리토평2 B-1 (한강 리버프론트)', highlights: ['한강 영구 남향 조망 1열', '수변 테라스 특화설계', '2만 가구 신도시 대장'], price: '84㎡ 약 7.5억~7.8억', transit: '한강변 콤팩트시티 트램 연계', recommendationReason: '한강 조망권 하나만으로 향후 구리시 최고가 랜드마크 아파트로 등극 유력' },
      { rank: 2, blockCode: '토평2 A-3', badge: '🥈 2위 8호선 장자호수공원역 연계', title: '구리토평2 A-3 (잠실 15분 역세권)', highlights: ['8호선 장자호수공원역 연계', '잠실역 15분 직통', '초·중·고 학군 타운'], price: '84㎡ 약 7.2억', transit: '8호선 장자호수공원역', recommendationReason: '잠실 출퇴근 직주근접성과 완성된 기존 토평 학군 인프라를 함께 누림' },
      { rank: 3, blockCode: '토평2 A-1', badge: '🥉 3위 스마트 MICE 배후 실속형', title: '구리토평2 A-1 (59㎡ 소형 알짜)', highlights: ['스마트 MICE 복합단지 배후', '59㎡ 가성비 특화', '신혼·생초 특공 유리'], price: '59㎡ 약 5.2억', transit: '스마트 트램 연계', recommendationReason: '한강변 신도시에 5억 초반대로 진입 가능한 최상의 소형 사다리 단지' }
    ]
  },
  guri_sutaek: {
    gangnamCommute: "8호선 구리역·장자호수공원역(잠실 15분) / GTX-B(구리역 개통 예정)",
    estimatedPrice: {
      size59: "약 8.5억 ~ 9.2억 원",
      size84: "약 11.5억 ~ 12.8억 원"
    },
    safetyMargin: "현대건설·포스코이앤씨 2.8조 수주, 7,007세대 지상 49층 스카이브릿지 하이엔드",
    localPriorityRule: "구리시 거주자 100% 우선 공급 (청약통장 가입 12개월 이상)",
    recommendedTrack: "일반분양 시 8호선 역세권 1·2블록 로얄동 추첨제 및 가점제 공략",
    topPickBlocks: [
      { rank: 1, blockCode: '수택 1블록', badge: '👑 1위 171m 스카이브릿지 대장', title: '수택 재개발 1블록 (현대건설·포스코 49층)', highlights: ['171m 스카이브릿지 랜드마크', '8호선 구리역 도보 역세권', '7,007세대 매머드급'], price: '84㎡ 약 11.8억', transit: '8호선 구리역 도보 6분', recommendationReason: '경기 동북부 최대 7천세대 대장주로 잠실 15분 생활권의 상징 단지' },
      { rank: 2, blockCode: '수택 2블록', badge: '🥈 2위 장자호수공원 더블역세권', title: '수택 재개발 2블록 (장자호수공원역 연계)', highlights: ['8호선 장자호수공원역 도보', '장자못 수변공원 인접', '초품아 안심 교육'], price: '84㎡ 약 11.5억', transit: '8호선 장자호수공원역 도보', recommendationReason: '쾌적한 호수공원 환경과 잠실 15분 출퇴근을 동시에 충족하는 블록' },
      { rank: 3, blockCode: '수택 3블록', badge: '🥉 3위 실속 소형 59㎡', title: '수택 재개발 3블록 (59㎡ 알짜)', highlights: ['신혼부부 맞춤 59㎡', '대단지 커뮤니티 공유', '환금성 우수'], price: '59㎡ 약 8.8억', transit: '8호선 구리역 연계', recommendationReason: '7,007세대 초대형 브랜드 타운의 프리미엄을 8억대로 누리는 실속 선택' }
    ]
  },
  hannam_newtown: {
    gangnamCommute: "신분당선 연장(동빙고역) 강남 5분 / 6호선 이태원역 / 한남대교 건너 압구정 3분",
    estimatedPrice: {
      size59: "약 17억 ~ 20억 원",
      size84: "약 26억 ~ 32억 원 (입주권 기준)"
    },
    safetyMargin: "나인원한남·한남더힐(평당 1.2억~1.5억) 대비 대한민국 부촌 1순위",
    localPriorityRule: "서울시 거주자 우선 공급 (청약통장 가입 2년 이상, 1순위)",
    recommendedTrack: "일반분양 물량이 극히 적으므로 조합원 입주권 매수 또는 추첨제 공략",
    topPickBlocks: [
      { rank: 1, blockCode: '한남 3구역', badge: '👑 1위 대한민국 최대 재개발 디에이치한남', title: '한남3구역 (디에이치 한남 5,816세대)', highlights: ['현대건설 시공 5,816세대', '2026년 일반분양 목표', '남산-한강 배산임수'], price: '84㎡ 약 28억 (입주권)', transit: '경의중앙 한남역·신분당선 동빙고', recommendationReason: '단군 이래 최대 재개발로 대한민국 부촌의 서열 1위를 확정지을 랜드마크' },
      { rank: 2, blockCode: '한남 4구역', badge: '🥈 2위 남향 한강 영구조망 1위', title: '한남4구역 (한강 남향 조망 최강)', highlights: ['지대 평지 비율 높음', '남향 한강 영구 조망', '조합원 지분율 우수'], price: '84㎡ 약 27억 (입주권)', transit: '경의중앙 서빙고역·신분당선', recommendationReason: '남향으로 한강을 내려다보는 조망권이 한남뉴타운 전체에서 가장 뛰어남' },
      { rank: 3, blockCode: '한남 2구역', badge: '🥉 3위 6호선 이태원역 초역세권', title: '한남2구역 (대우건설 써밋 1,537세대)', highlights: ['6호선 이태원역 초역세권', '호텔식 하이엔드 커뮤니티', '남산 조망 특화'], price: '84㎡ 약 25억 (입주권)', transit: '6호선 이태원역 도보 3분', recommendationReason: '지하철역 접근성이 가장 우수하며 최고급 호텔식 외관 특화 설계 적용' }
    ]
  },
  seongsu_strategic: {
    gangnamCommute: "영동대교·성수대교 건너 청담·압구정 3분 / 2호선 성수역 / 분당선 서울숲역",
    estimatedPrice: {
      size59: "약 16억 ~ 19억 원",
      size84: "약 25억 ~ 30억 원 (입주권 기준)"
    },
    safetyMargin: "아크로서울포레스트·트리마제(평당 1.3억~1.8억)와 나란히 서는 70층 초고층",
    localPriorityRule: "서울시 거주자 우선 공급",
    recommendedTrack: "초고층 정비계획 고시 완료에 따른 지분 쪼개기 주의 및 입주권 매수 전략",
    topPickBlocks: [
      { rank: 1, blockCode: '성수 1지구', badge: '👑 1위 서울숲 직결 3,014세대 대장', title: '성수 1지구 (서울숲·트리마제 연계 70층)', highlights: ['서울숲 도보 직결', '3,014세대 최대 규모', '한강 남향 영구 조망'], price: '84㎡ 약 29억 (입주권)', transit: '수인분당선 서울숲역 도보 5분', recommendationReason: '서울숲과 한강을 품은 성수동의 상징적인 3,000세대 초고층 랜드마크' },
      { rank: 2, blockCode: '성수 4지구', badge: '🥈 2위 영동대교 청담 3분 직결', title: '성수 4지구 (압구정·청담 맞은편)', highlights: ['영동대교 건너 청담동 3분', '최고 70층 한강뷰', '1,584세대'], price: '84㎡ 약 27억 (입주권)', transit: '2호선 성수역·뚝섬역', recommendationReason: '강남 압구정·청담동과 가장 가까운 지리적 이점으로 강남 자산가 집중 선호' },
      { rank: 3, blockCode: '성수 2지구', badge: '🥉 3위 강변북로 지하화 수변공원', title: '성수 2지구 (10만㎡ 한강 문화공원)', highlights: ['강변북로 상부 한강공원 직결', '1,907세대 초고층', '수변 보행로'], price: '84㎡ 약 25억 (입주권)', transit: '2호선 성수역 도보', recommendationReason: '강변북로 지하화로 완성되는 10만㎡ 한강 문화공원을 앞마당처럼 이용' }
    ]
  },
  noryangjin_newtown: {
    gangnamCommute: "1·9호선 노량진역(급행) 여의도 3분, 강남(신논현) 14분 / 7호선 장승배기역",
    estimatedPrice: {
      size59: "약 11억 ~ 12.5억 원",
      size84: "약 14.5억 ~ 16.5억 원"
    },
    safetyMargin: "흑석뉴타운 아크로리버하임(84㎡ 23억~26억) 대비 약 6억~8억 원 키 맞추기 기대",
    localPriorityRule: "서울시 거주자 100% 우선 공급",
    recommendedTrack: "1·9호선 노량진역 도보 3분 거리의 1구역, 3구역 일반분양 및 입주권 집중",
    topPickBlocks: [
      { rank: 1, blockCode: '노량진 1구역', badge: '👑 1위 포스코 오티에르 2,992세대 대장', title: '노량진 1구역 (포스코 오티에르 하이엔드)', highlights: ['총 2,992세대 최대 규모', '포스코 하이엔드 오티에르', '1·9호선 노량진역 도보'], price: '84㎡ 약 16.5억 (입주권)', transit: '1·9호선 노량진역 더블역세권', recommendationReason: '노량진 9천 세대 뉴타운 전체의 시세를 견인할 3천 세대 매머드급 대장주' },
      { rank: 2, blockCode: '노량진 3구역', badge: '🥈 2위 노량진역 초역세권 여의도 3분', title: '노량진 3구역 (포스코 1,012세대)', highlights: ['노량진역 도보 3분 초역세권', '여의도 1정거장 3분 컷', '한강 조망 가능동'], price: '84㎡ 약 15.5억 (입주권)', transit: '1·9호선 노량진역 도보 3분', recommendationReason: '지하철역과 가장 가까워 여의도 금융가 출퇴근 직장인 수요 1순위 단지' },
      { rank: 3, blockCode: '노량진 6구역', badge: '🥉 3위 GS·SK 1,499세대 빠른 속도', title: '노량진 6구역 (장승배기역 7호선)', highlights: ['7호선 장승배기역 도보 4분', 'GS건설·SK에코플랜트', '사업 속도 최선두'], price: '84㎡ 약 14.8억', transit: '7호선 장승배기역 도보 4분', recommendationReason: '7호선 강남 직결과 가장 빠른 착공·입주 속도로 불확실성이 적은 단지' }
    ]
  }
};
'''

with open('src/components/RealEstateFuture.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert briefings_code before export const RealEstateFuture
insert_marker = 'export const RealEstateFuture: React.FC<RealEstateFutureProps> = () => {'
if insert_marker in content:
    content = content.replace(insert_marker, briefings_code + '\n' + insert_marker)
    print('Inserted SUBSCRIPTION_BRIEFINGS dictionary successfully.')
else:
    print('Error: Could not find insert_marker')

with open('src/components/RealEstateFuture.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
