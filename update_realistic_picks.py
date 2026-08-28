import re

realistic_briefings_code = '''export const SUBSCRIPTION_BRIEFINGS: Record<string, SubscriptionBriefing> = {
  namyangju_wangsook: {
    gangnamCommute: "9호선 연장 강남 25분 / GTX-B 서울역 15분 / 8호선 별내선 환승",
    estimatedPrice: {
      size59: "약 3.8억 ~ 4.2억 원",
      size84: "약 5.2억 ~ 5.8억 원"
    },
    safetyMargin: "인근 다산신도시 대장(다산자이아이비플레이스 84㎡ 9.5억~10.5억) 대비 약 4억 원 안전마진 확보",
    localPriorityRule: "남양주시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "사전청약 최고 경쟁률을 기록한 왕숙2 및 왕숙1 복합환승역세권 84㎡ 집중 공략",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '왕숙2 A-1', 
        badge: '👑 1위 왕숙 전체 사전청약 81:1 압도적 대장', 
        title: '왕숙2 A-1 (다산 맞은편 더블역세권)', 
        highlights: [
          '사전청약 당시 84㎡ 81.2:1로 왕숙 1·2지구 통합 최고 경쟁률 기록',
          '9호선 연장 신설역 + 경의중앙선 신설역 더블역세권 도보 4분',
          '다산 지금지구 바로 맞은편으로 기존 인프라 즉시 공유'
        ], 
        price: '59㎡ 약 3.9억 / 84㎡ 약 5.4억', 
        transit: '9호선·경의중앙선 더블역세권 (강남 25분)', 
        recommendationReason: '왕숙신도시 전체에서 서울(강동·송파)과 가장 가깝고 다산 생활권을 누릴 수 있어 실수요자 청약 통장이 가장 많이 몰린 검증된 1위 대장입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '왕숙1 B-1', 
        badge: '🥈 2위 왕숙1 GTX-B·9호선 복합환승 대장', 
        title: '왕숙1 B-1 (왕숙 푸르지오 더 퍼스트 84㎡)', 
        highlights: [
          '대우건설 푸르지오 시공 민간참여 공공분양 569세대',
          'GTX-B 왕숙역(서울역 15분) 및 9호선 복합환승센터 도보 5분',
          '중심상업지역 바로 앞 슬세권 + 초·중학교 인접'
        ], 
        price: '전용 84㎡ 약 5.3억~5.6억', 
        transit: 'GTX-B · 9호선 복합환승역 도보 5분', 
        recommendationReason: '왕숙1지구의 중심축인 복합환승센터와 중심상권을 동시에 누리는 1군 브랜드(푸르지오) 선호도 1위 84㎡ 대단지입니다.' 
      },
      { 
        rank: 3, 
        blockCode: '왕숙1 A-19', 
        badge: '🥉 3위 중심상업 초근접 1,024세대 나눔형 대단지', 
        title: '왕숙1 A-19 (초저금리 나눔형 모기지)', 
        highlights: [
          '1,024세대 대규모 단지로 관리비 절감 및 커뮤니티 우수',
          '중심상업지구와 복합환승역 바로 동측 인접',
          '1%대 초저금리 장기 모기지 지원으로 초기 자본 부담 최소화'
        ], 
        price: '74㎡ 약 4.6억 / 84㎡ 약 5.3억', 
        transit: 'GTX-B/9호선 역세권 도보 이용', 
        recommendationReason: '중심상업지구 인접 입지와 대단지 프리미엄에 1%대 나눔형 정책 대출을 결합할 수 있어 3040 실수요자에게 실속과 자산가치를 모두 보장합니다.' 
      }
    ]
  },
  hanam_gyosan: {
    gangnamCommute: "3호선 송파하남선 송파 10분, 강남 20분대 / 서하남IC 강남 15분",
    estimatedPrice: {
      size59: "약 4.5억 ~ 5.0억 원",
      size84: "약 6.0억 ~ 6.8억 원"
    },
    safetyMargin: "송파구 오금·방이 및 감일 신축(84㎡ 12억~14.5억) 대비 약 6억~7억 원 로또 안전마진",
    localPriorityRule: "하남시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "송파구 경계 A-2 및 3호선 신설역 초역세권 B-1에 최고 가점 통장 집중",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '교산 A-2', 
        badge: '👑 1위 송파구 바로 옆 사전청약 최고 통장 집결지', 
        title: '하남교산 A-2 (교산 푸르지오 1,115세대)', 
        highlights: [
          '사전청약 당시 통장 납입인정금액 2,300만원 이상 최고 커트라인 기록',
          '송파구 오금동·방이동 경계 초인접으로 사실상 송파 생활권',
          '1,115세대 매머드급 대단지 + 초등학교를 품은 초품아'
        ], 
        price: '51㎡ 약 3.8억 / 59㎡ 약 4.5억', 
        transit: '송파 연계 버스 환승 / 서하남IC 3분', 
        recommendationReason: '행정구역만 하남일 뿐 송파구와 맞닿아 있어 교산 전체에서 서울 체감 거리가 가장 가깝고 사전청약에서 가장 높은 청약통장 당첨선을 기록한 검증된 1위 대장입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '교산 B-1', 
        badge: '🥈 2위 3호선 송파하남선 신설역 도보 3분 초역세권', 
        title: '하남교산 B-1 (송파하남선 직통 84㎡)', 
        highlights: [
          '3호선 송파하남선 신설역 도보 3분 초역세권 (수서·강남 20분대)',
          '중심상업지역 바로 앞 위치로 풍부한 생활 인프라',
          '선호도 가장 높은 국민평형 전용 84㎡ 위주 공급'
        ], 
        price: '전용 84㎡ 약 6.3억~6.7억', 
        transit: '지하철 3호선 신설역 도보 3분', 
        recommendationReason: '교산의 핵심 철도망인 3호선을 슬리퍼 신고 이용할 수 있는 유일무이한 초역세권 84㎡ 블록으로 입주 후 지역 시세를 이끌 대장주입니다.' 
      },
      { 
        rank: 3, 
        blockCode: '교산 B-2', 
        badge: '🥉 3위 덕풍천 수변공원 & 안심 학군 84㎡', 
        title: '하남교산 B-2 (수변 힐링 + 중심상권)', 
        highlights: [
          '덕풍천 수변공원 영구 조망과 쾌적한 친환경 주거 환경',
          '초·중학교 도보 2분 안심 통학권 형성',
          '3호선 신설역 도보 6분권의 평지 택지'
        ], 
        price: '전용 84㎡ 약 6.1억~6.5억', 
        transit: '지하철 3호선 신설역 도보 6분', 
        recommendationReason: '역세권 편리함과 수변공원의 쾌적성, 자녀 안심 통학을 모두 만족하여 3040 학부모 실수요자 선호도가 가장 높은 블록입니다.' 
      }
    ]
  },
  goyang_changreung: {
    gangnamCommute: "GTX-A(창릉역) 삼성역 10분, 서울역 8분 / 서부선 새절역 연계",
    estimatedPrice: {
      size59: "약 3.8억 ~ 4.2억 원",
      size84: "약 5.4억 ~ 5.9억 원"
    },
    safetyMargin: "삼송·원흥 준신축(삼송아이파크2차 84㎡ 8.8억~9.8억) 대비 약 3.5억 원 안전마진",
    localPriorityRule: "고양시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "GTX-A 창릉역 개통 수혜를 100% 흡수하는 S-5, S-6 나눔형 집중 공략",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '창릉 S-5', 
        badge: '👑 1위 GTX-A 창릉역 도보 4분 절대 대장', 
        title: '고양창릉 S-5 (GTX 삼성역 10분 718세대)', 
        highlights: [
          '사전청약 나눔형 최고 경쟁률(40:1) 및 최고 인기 기록',
          'GTX-A 창릉역(서울역 8분, 삼성역 10분) 도보 4분 초역세권',
          '중심상업지구 및 수변 복합문화거리 바로 앞 슬세권'
        ], 
        price: '74㎡ 약 4.7억 / 84㎡ 약 5.5억', 
        transit: 'GTX-A 창릉역 도보 4분', 
        recommendationReason: '창릉신도시의 알파이자 오메가인 GTX-A 창릉역을 도보로 이용할 수 있는 독보적 1위 블록으로 강남 출퇴근 혁명의 최대 수혜지입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '창릉 S-6', 
        badge: '🥈 2위 창릉천 수변 뷰 + GTX 역세권', 
        title: '고양창릉 S-6 (창릉천 영구조망 랜드마크)', 
        highlights: [
          '창릉천 호수공원 및 수변 조망권을 영구 확보한 특화 입지',
          'GTX-A 창릉역 도보 6분권으로 교통과 자연환경 겸비',
          '유치원 및 초·중학교 바로 옆 안심 통학'
        ], 
        price: '74㎡ 약 4.8억 / 84㎡ 약 5.6억', 
        transit: 'GTX-A 창릉역 도보 6분', 
        recommendationReason: '탁 트인 창릉천 조망과 GTX-A 역세권을 동시에 갖추어 창릉에서 가장 주거 쾌적성이 뛰어난 하이엔드 주거 단지입니다.' 
      },
      { 
        rank: 3, 
        blockCode: '창릉 A-4', 
        badge: '🥉 3위 서울 은평구 구파발 초접경 실속형', 
        title: '고양창릉 A-4 (서울 생활권 59㎡)', 
        highlights: [
          '서울 은평뉴타운(구파발)과 바로 맞닿아 있는 서울 최접경 입지',
          '지하철 3호선 삼송역 및 은평 롯데몰 생활권 공유',
          '59㎡ 실속 소형 평형 위주로 신혼부부·생애최초 특공 유리'
        ], 
        price: '전용 59㎡ 약 3.9억~4.1억', 
        transit: '3호선 삼송역 버스 5분 / 구파발역 연계', 
        recommendationReason: '서울 경계선에 바로 붙어 있어 서울 도심(종로·광화문) 출퇴근이 가장 수월하며 가성비가 가장 뛰어난 실속 단지입니다.' 
      }
    ]
  },
  bucheon_daejang: {
    gangnamCommute: "대장홍대선(홍대입구 20분, 상암 12분) / S-BRT 김포공항 환승",
    estimatedPrice: {
      size59: "약 3.6억 ~ 3.9억 원",
      size84: "약 4.9억 ~ 5.3억 원"
    },
    safetyMargin: "마곡지구 엠밸리(84㎡ 13.5억~15.5억) 배후 대체지, 인근 대비 약 2.5억 안전마진",
    localPriorityRule: "부천시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "대장홍대선 신설역 초역세권 A-7 및 SK R&D 배후 A-8 정조준",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '대장 A-7', 
        badge: '👑 1위 대장홍대선 신설역 도보 3분 초역세권', 
        title: '부천대장 A-7 (홍대 20분·상암 12분 직통)', 
        highlights: [
          '대장홍대선 시발역 도보 3분 초역세권 (2030년 개통 예정)',
          '공공분양 824세대 대단지 규모',
          '중심상업지역 및 문화복합시설 바로 앞'
        ], 
        price: '59㎡ 약 3.8억 / 84㎡ 약 5.1억', 
        transit: '대장홍대선 신설역 도보 3분', 
        recommendationReason: '서울 마포·홍대와 상암DMC를 10~20분대에 직결하는 대장홍대선의 최대 수혜 블록으로 대장지구의 시세를 리드할 1등 대장입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '대장 A-8', 
        badge: '🥈 2위 SK 1조원 R&D 캠퍼스 배후 & 초품아', 
        title: '부천대장 A-8 (SK 친환경 R&D 배후 단지)', 
        highlights: [
          'SK그룹 1조원 투자 \'SK그린테크노캠퍼스\' 고소득 연구원 직주근접',
          '단지 바로 옆 초등학교·유치원 위치한 초품아',
          '대장홍대선 신설역 도보 6분권'
        ], 
        price: '전용 84㎡ 약 5.0억~5.3억', 
        transit: '대장홍대선 신설역 도보 6분', 
        recommendationReason: 'SK 대기업 R&D 석·박사 고급 일자리 배후 수요와 안전한 초품아 환경을 모두 갖추어 자산 방어력과 전세 수요가 가장 탄탄합니다.' 
      },
      { 
        rank: 3, 
        blockCode: '대장 A-5', 
        badge: '🥉 3위 1%대 초저금리 신혼희망타운', 
        title: '부천대장 A-5 (신혼부부 가성비 특화)', 
        highlights: [
          '전용 55㎡ 특화 평면 및 육아·보육 커뮤니티 집중',
          '최장 30년 1.3% 고정금리 수익공유형 모기지 적용',
          '초기 자본 1억 원 내외로 서울 인접 신축 아파트 입주 가능'
        ], 
        price: '전용 55㎡ 약 3.7억', 
        transit: 'S-BRT 환승 정류장 인접', 
        recommendationReason: '자본금이 부족한 2030 신혼부부가 가장 적은 현금으로 수도권 신도시에 내 집 마련 사다리를 놓을 수 있는 최적의 가성비 단지입니다.' 
      }
    ]
  },
  incheon_gyeyang: {
    gangnamCommute: "S-BRT ➔ 김포공항역(5·9호선, 공항철도) 환승 / 마곡 10분",
    estimatedPrice: {
      size59: "약 3.6억 ~ 3.9억 원",
      size84: "약 4.8억 ~ 5.2억 원"
    },
    safetyMargin: "3기 신도시 중 최초 2026년 10월 입주! 확정 분양가 메리트",
    localPriorityRule: "인천광역시 1년 이상 거주(50%) ➔ 수도권 기타(50%)",
    recommendedTrack: "인천 거주자 우선 공급 50% 배정으로 인천 무주택자에게 당첨 확률 최상",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '계양 A-2', 
        badge: '👑 1위 3기 신도시 전체 1호 본청약 & 입주 랜드마크', 
        title: '인천계양 A-2 (공공분양 812세대)', 
        highlights: [
          '3기 신도시 최초로 2026년 10월 실입주하는 첫 번째 랜드마크',
          '확정 분양가 59㎡ 4.1억 / 84㎡ 5.3억 수준으로 안전마진 확보',
          'S-BRT 전용 정류장 및 중심상업지구 도보 4분'
        ], 
        price: '59㎡ 약 4.1억 / 84㎡ 약 5.3억', 
        transit: 'S-BRT 김포공항 8분 / 마곡 15분', 
        recommendationReason: '3기 신도시 중 가장 사업 속도가 빨라 입주 지연 리스크가 없고 마곡지구 직주근접 수요를 가장 먼저 흡수하는 계양의 대장입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '계양 B-2', 
        badge: '🥈 2위 중심상업 & 테크노밸리 배후 84㎡', 
        title: '인천계양 B-2 (계양 테크노밸리 중심)', 
        highlights: [
          '계양 도시첨단산업단지 및 IT·바이오 일자리 직주근접',
          '중심상업지구 바로 앞 84㎡ 중대형 랜드마크',
          '단지 앞 초등학교 및 공원 조성'
        ], 
        price: '전용 84㎡ 약 5.1억~5.4억', 
        transit: 'S-BRT 환승 및 경명대로 직결', 
        recommendationReason: '계양의 자족 일자리와 중심 상권을 완벽히 누리는 84㎡ 핵심 단지로 향후 지역 내 갈아타기 1순위 타깃입니다.' 
      },
      { 
        rank: 3, 
        blockCode: '계양 A-3', 
        badge: '🥉 3위 인천 1호선 박촌역 연계 신희타', 
        title: '인천계양 A-3 (박촌역 도보권 55㎡)', 
        highlights: [
          '기존 지하철역(인천 1호선 박촌역) 도보 이용 가능 입지',
          '2026년 조기 입주 가능한 신혼희망타운 359세대',
          '초등학교를 마주한 안심 교육 단지'
        ], 
        price: '전용 55㎡ 약 3.8억', 
        transit: '인천 1호선 박촌역 도보 8분', 
        recommendationReason: '신설 교통망 개통을 기다릴 필요 없이 기존 지하철 1호선을 바로 이용할 수 있는 안정성이 가장 돋보입니다.' 
      }
    ]
  },
  gwacheon_gwacheon: {
    gangnamCommute: "4호선·위례과천선(선바위역) 양재 10분, 강남 15분 / GTX-C 과천청사역",
    estimatedPrice: {
      size59: "약 6.2억 ~ 6.8억 원",
      size84: "약 8.5억 ~ 9.2억 원"
    },
    safetyMargin: "서초구 우면지구 및 과천 본도심(84㎡ 19억~23억) 대비 약 10억 원 이상 압도적 로또 안전마진",
    localPriorityRule: "과천시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "수도권 전체 청약 통장이 몰리는 로또 중의 로또, 특별공급 자격 총동원 필수",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '과천 A-1', 
        badge: '👑 1위 서초구 양재동 바로 옆 준강남 절대 대장', 
        title: '과천과천 A-1 (선바위 더블역세권 84㎡)', 
        highlights: [
          '지하철 4호선 + 위례과천선(위과선) 선바위역 더블역세권 도보 3분',
          '서초구 양재동 및 우면 R&D 캠퍼스까지 차량 5분, 강남역 15분',
          '양재천 수변공원 및 우면산 쾌적 자연환경'
        ], 
        price: '전용 84㎡ 약 8.8억~9.2억', 
        transit: '4호선/위과선 선바위역 도보 3분', 
        recommendationReason: '3기 신도시 전체에서 입지 가치 1위로, 서초구 바로 옆에 붙은 사실상 강남 생활권이자 당첨 즉시 10억 이상의 시세 차익이 보장되는 최고 로또입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '과천 B-1', 
        badge: '🥈 2위 경마공원역 수변 영구조망 하이엔드', 
        title: '과천과천 B-1 (양재천 리버뷰 랜드마크)', 
        highlights: [
          '4호선 경마공원역 도보 5분 역세권',
          '양재천을 남향으로 내려다보는 영구 수변 조망권 확보',
          '과천 복합문화 테마파크 및 상업지구 인접'
        ], 
        price: '전용 84㎡ 약 8.7억~9.0억', 
        transit: '지하철 4호선 경마공원역 도보 5분', 
        recommendationReason: '초역세권 교통망에 양재천 영구 뷰 프리미엄을 더해 과천과천지구 내에서 가장 고급스러운 주거 환경을 제공합니다.' 
      },
      { 
        rank: 3, 
        blockCode: '과천 A-2', 
        badge: '🥉 3위 3040 특공 최고 인기 59㎡', 
        title: '과천과천 A-2 (준강남 실속 59㎡)', 
        highlights: [
          '강남 10분대 진입 가능한 59㎡ 소형 알짜 분양',
          '신생아·신혼부부·생애최초 특별공급 물량 집중',
          '단지 내 유치원 및 초등학교 품은 안심 학군'
        ], 
        price: '전용 59㎡ 약 6.5억', 
        transit: '선바위역 도보 6분', 
        recommendationReason: '강남권 아파트 진입이 어려운 3040 직장인에게 인생 최대의 당첨 기회를 제공하는 실속형 최고 인기 단지입니다.' 
      }
    ]
  },
  guri_topyeong: {
    gangnamCommute: "8호선 연장(장자호수공원역) 잠실 15분, 강남 25분 / 강변북로·올림픽대로 직결",
    estimatedPrice: {
      size59: "약 5.0억 ~ 5.5억 원",
      size84: "약 7.2억 ~ 7.8억 원"
    },
    safetyMargin: "강동구 고덕그라시움 및 미사 한강변(84㎡ 13억~16억) 대비 약 5억~6억 원 안전마진 기대",
    localPriorityRule: "구리시 1년 이상 거주(30%) ➔ 경기도 6개월(20%) ➔ 수도권 기타(50%)",
    recommendedTrack: "한강 영구 남향 조망 1열 블록에 가점과 특별공급 통장을 집중할 것",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '토평2 B-1', 
        badge: '👑 1위 한강 영구 남향 조망 1열 절대 대장', 
        title: '구리토평2 B-1 (한강 리버프론트 랜드마크)', 
        highlights: [
          '한강을 남향으로 가리는 것 없이 영구 조망하는 1열 핵심 블록',
          '수변 테라스 특화 설계 및 콤팩트시티 스마트 인프라',
          '2만 가구 토평2 신도시 전체의 시세를 견인할 랜드마크'
        ], 
        price: '전용 84㎡ 약 7.5억~7.9억', 
        transit: '한강변 수변 트램 및 8호선 연계', 
        recommendationReason: '한강 조망권 하나만으로 향후 구리시 최고가 아파트로 등극할 것이 확실시되는 희소성 1위 대장입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '토평2 A-3', 
        badge: '🥈 2위 8호선 장자호수공원역 연계 & 완성된 학군', 
        title: '구리토평2 A-3 (잠실 15분 & 토평 학군 공유)', 
        highlights: [
          '8호선 장자호수공원역 연계로 잠실역 15분, 강남 25분 직통',
          '기존 토평지구의 완성된 명문 학원가 인프라 즉시 공유',
          '초·중·고 도보 통학 가능한 안심 교육 단지'
        ], 
        price: '전용 84㎡ 약 7.2억~7.5억', 
        transit: '8호선 장자호수공원역 버스 4분 / 도보권', 
        recommendationReason: '잠실 출퇴근 직주근접성과 구리 최고 학군인 토평 학원가를 함께 누릴 수 있어 실거주 선호도가 가장 높습니다.' 
      },
      { 
        rank: 3, 
        blockCode: '토평2 A-1', 
        badge: '🥉 3위 스마트 MICE 배후 59㎡ 실속형', 
        title: '구리토평2 A-1 (59㎡ 가성비 특화)', 
        highlights: [
          '스마트 MICE 복합업무단지 배후 주거지',
          '59㎡ 가성비 특화 설계로 신혼부부·생애최초 진입 유리',
          '초기 자본 부담을 낮춘 한강변 신도시 진입 사다리'
        ], 
        price: '전용 59㎡ 약 5.2억~5.5억', 
        transit: '스마트 트램 정류장 인접', 
        recommendationReason: '한강변 3기 신도시에 5억 초반대로 진입할 수 있는 최상의 소형 사다리 단지입니다.' 
      }
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
      { 
        rank: 1, 
        blockCode: '수택 1블록', 
        badge: '👑 1위 171m 스카이브릿지 49층 매머드 랜드마크', 
        title: '수택 재개발 1블록 (현대건설·포스코 49층)', 
        highlights: [
          '지상 49층 171m 스카이브릿지 특화 설계 적용',
          '8호선 구리역(잠실 15분) 및 GTX-B 도보 역세권',
          '7,007세대 초대형 단지의 시세를 견인할 1등 상징 블록'
        ], 
        price: '전용 84㎡ 약 11.8억', 
        transit: '8호선 구리역 도보 6분', 
        recommendationReason: '경기 동북부 최대 7천세대 대단지의 심장이자 잠실 15분 생활권의 상징 단지입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '수택 2블록', 
        badge: '🥈 2위 장자호수공원 더블역세권 & 호수 뷰', 
        title: '수택 재개발 2블록 (장자호수공원역 연계)', 
        highlights: [
          '8호선 장자호수공원역 도보 역세권',
          '장자못 수변공원 인접으로 쾌적한 산책 환경',
          '초등학교 품은 안심 교육 환경'
        ], 
        price: '전용 84㎡ 약 11.5억', 
        transit: '8호선 장자호수공원역 도보', 
        recommendationReason: '쾌적한 호수공원 환경과 잠실 15분 출퇴근을 동시에 충족하는 블록입니다.' 
      },
      { 
        rank: 3, 
        blockCode: '수택 3블록', 
        badge: '🥉 3위 8억대 실속 소형 59㎡', 
        title: '수택 재개발 3블록 (59㎡ 알짜)', 
        highlights: [
          '신혼부부 맞춤 59㎡ 실속 평형',
          '7,007세대 대단지 커뮤니티 및 조경 시설 100% 공유',
          '환금성이 뛰어난 역세권 소형'
        ], 
        price: '전용 59㎡ 약 8.8억', 
        transit: '8호선 구리역 연계', 
        recommendationReason: '7,007세대 매머드급 브랜드 타운의 프리미엄을 8억대로 누리는 실속 선택지입니다.' 
      }
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
      { 
        rank: 1, 
        blockCode: '한남 3구역', 
        badge: '👑 1위 단군 이래 최대 재개발 디에이치한남 5,816세대', 
        title: '한남3구역 (현대건설 하이엔드 5,816세대)', 
        highlights: [
          '현대건설 시공 대한민국 최대 단일 재개발 5,816세대',
          '가장 빠른 사업 속도로 2026년 일반분양 목표',
          '남산-한강 배산임수의 천혜 명당'
        ], 
        price: '전용 84㎡ 약 28억 (입주권)', 
        transit: '경의중앙 한남역·신분당선 동빙고', 
        recommendationReason: '압도적 스케일과 사업 속도로 한남뉴타운의 부촌 서열 1위를 확정지을 상징 단지입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '한남 4구역', 
        badge: '🥈 2위 남향 한강 영구조망 1위 & 평지 비율 최고', 
        title: '한남4구역 (한강 남향 조망 최강)', 
        highlights: [
          '한남뉴타운 중 평지 비율이 가장 높아 보행성 우수',
          '남향으로 한강을 내려다보는 영구 조망권 최상위',
          '조합원 지분율이 높아 사업성이 가장 우수'
        ], 
        price: '전용 84㎡ 약 27억 (입주권)', 
        transit: '경의중앙 서빙고역·신분당선', 
        recommendationReason: '남향 한강 조망권과 우수한 평지 지형으로 자산가들의 실거주 선호도가 가장 높습니다.' 
      },
      { 
        rank: 3, 
        blockCode: '한남 5구역', 
        badge: '🥉 3위 용산공원 & 한강 더블 영구조망 최상위 입지', 
        title: '한남5구역 (용산공원 인접 아크로 추진)', 
        highlights: [
          '한강변과 가장 길게 접해 있는 최상위 입지 평가',
          '용산민족공원과 한강을 동시에 조망하는 더블 뷰',
          '신분당선 동빙고역 초근접 수혜'
        ], 
        price: '전용 84㎡ 약 29억 (입주권)', 
        transit: '신분당선 동빙고역·경의중앙 서빙고역', 
        recommendationReason: '입지적 가치만으로는 한남뉴타운 전체 1위로 평가받는 용산공원·한강 동시 수혜지입니다.' 
      }
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
      { 
        rank: 1, 
        blockCode: '성수 1지구', 
        badge: '👑 1위 서울숲 직결 3,014세대 성수 절대 대장', 
        title: '성수 1지구 (서울숲·트리마제 연계 70층)', 
        highlights: [
          '서울숲과 보행교로 바로 직결되는 3,014세대 최대 규모',
          '한강 남향 영구 조망과 최고 70층 초고층 설계',
          '수인분당선 서울숲역 도보 5분 초역세권'
        ], 
        price: '전용 84㎡ 약 29억 (입주권)', 
        transit: '수인분당선 서울숲역 도보 5분', 
        recommendationReason: '서울숲과 한강을 완벽히 품은 성수동의 상징적인 3,000세대 초고층 랜드마크입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '성수 4지구', 
        badge: '🥈 2위 영동대교 건너 청담·압구정 3분 직결', 
        title: '성수 4지구 (강남 접근성 최상위)', 
        highlights: [
          '영동대교 바로 북단으로 청담동·압구정동 차량 3분 직통',
          '조합원 수가 적어 사업성이 성수 4개 지구 중 가장 우수',
          '최고 70층 한강 영구 조망'
        ], 
        price: '전용 84㎡ 약 27억 (입주권)', 
        transit: '2호선 성수역·뚝섬역', 
        recommendationReason: '강남 청담동과 가장 가까운 지리적 이점으로 강남 자산가들의 매수 선호도가 가장 높습니다.' 
      },
      { 
        rank: 3, 
        blockCode: '성수 2지구', 
        badge: '🥉 3위 10만㎡ 강변북로 지하화 상부 문화공원 직결', 
        title: '성수 2지구 (한강 문화공원 1열)', 
        highlights: [
          '강변북로 지하화 구간 상부 10만㎡ 한강 문화공원 직통 연결',
          '1,907세대 초고층 한강변 랜드마크',
          '지하철 2호선 성수역 카페거리 도보 생활권'
        ], 
        price: '전용 84㎡ 약 25억 (입주권)', 
        transit: '2호선 성수역 도보', 
        recommendationReason: '강변북로 지하화로 완성되는 거대한 한강 문화공원을 앞마당처럼 누리는 수변 단지입니다.' 
      }
    ]
  },
  noryangjin_newtown: {
    gangnamCommute: "1·9호선 노량진역(급행) 여의도 3분, 강남(신논현) 14분 / 7호선 장승배기역",
    estimatedPrice: {
      size59: "약 11억 ~ 12.5억 원",
      size84: "약 14.5억 ~ 16.5억 원"
    },
    safetyMargin: "흑석뉴타운 아크로리버하임(84㎡ 23억~26억) 대비 약 7억~9억 원 키 맞추기 기대",
    localPriorityRule: "서울시 거주자 100% 우선 공급",
    recommendedTrack: "1·9호선 노량진역 도보 3분 거리의 1구역, 3구역 일반분양 및 입주권 집중",
    topPickBlocks: [
      { 
        rank: 1, 
        blockCode: '노량진 1구역', 
        badge: '👑 1위 포스코 오티에르 2,992세대 노량진 전체 대장', 
        title: '노량진 1구역 (포스코 하이엔드 2,992세대)', 
        highlights: [
          '노량진 뉴타운 전체 9천 세대의 33%를 차지하는 3천 세대 매머드 대장',
          '포스코이앤씨 하이엔드 브랜드 \'오티에르\' 적용',
          '지하철 1·9호선 노량진역 도보 역세권'
        ], 
        price: '전용 84㎡ 약 16.5억 (입주권)', 
        transit: '1·9호선 노량진역 더블역세권', 
        recommendationReason: '노량진 9천 세대 뉴타운 전체의 시세를 견인할 3천 세대 매머드급 대장주입니다.' 
      },
      { 
        rank: 2, 
        blockCode: '노량진 3구역', 
        badge: '🥈 2위 노량진역 초역세권 여의도 3분 컷', 
        title: '노량진 3구역 (포스코 1,012세대)', 
        highlights: [
          '지하철 1·9호선 노량진역 도보 3분 초역세권',
          '여의도 금융가 1정거장 3분 출퇴근',
          '고층부 한강 조망권 확보'
        ], 
        price: '전용 84㎡ 약 15.5억 (입주권)', 
        transit: '1·9호선 노량진역 도보 3분', 
        recommendationReason: '지하철역과 가장 가까워 여의도 금융가 출퇴근 직장인 수요가 가장 풍부한 알짜 단지입니다.' 
      },
      { 
        rank: 3, 
        blockCode: '노량진 6구역', 
        badge: '🥉 3위 7호선 장승배기역 강남 직결 & 가장 빠른 속도', 
        title: '노량진 6구역 (GS·SK 1,499세대)', 
        highlights: [
          '7호선 장승배기역 도보 4분 (강남 15분 직결)',
          'GS건설·SK에코플랜트 컨소시엄 시공',
          '철거 완료 후 착공 단계로 사업 속도 최선두'
        ], 
        price: '전용 84㎡ 약 14.8억', 
        transit: '7호선 장승배기역 도보 4분', 
        recommendationReason: '7호선 강남 직통 교통과 가장 빠른 입주 속도로 리스크가 가장 적은 확실한 선택지입니다.' 
      }
    ]
  }
};'''

with open('src/components/RealEstateFuture.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the SUBSCRIPTION_BRIEFINGS block
pattern = re.compile(
    r"export const SUBSCRIPTION_BRIEFINGS: Record<string, SubscriptionBriefing> = \{[\s\S]*?\n\};\n",
    re.MULTILINE
)

if pattern.search(content):
    content = pattern.sub(realistic_briefings_code + '\n', content)
    print('Replaced SUBSCRIPTION_BRIEFINGS with realistic, hyper-detailed picks!')
else:
    print('Pattern for SUBSCRIPTION_BRIEFINGS not matched directly.')

with open('src/components/RealEstateFuture.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
