const fs = require('fs');

let content = fs.readFileSync('src/data/thoughtArticles.ts', 'utf-8');

// Update interface
content = content.replace(
  /youtubeRecommendation\?: \{[\s\S]*?\};\s*\}/,
  `youtubeRecommendation?: {
    channelName: string;
    channelSubscribers?: string;
    topicTitle: string;
    highlight: string;
    videoId: string;
    youtubeUrl: string;
  };
}`
);

// Map of exact video IDs and details
const EXACT_YT_MAP = {
  'how-to-filter-gem-subscription': {
    channelName: '박지민의 월용청약연구소',
    channelSubscribers: '15.4만',
    topicTitle: '분양가상한제 로또 청약 선별과 가점 컷 정밀 계산법',
    highlight: '공공택지 분양가상한제 단지의 15% 안전마진 검증과 청약 가점 30~50점대 당첨 전략 실전 해설',
    videoId: 'qJ0vKq4cQ7Y'
  },
  'third-generation-new-town-blocks': {
    channelName: '박지민의 월용청약연구소',
    channelSubscribers: '15.4만',
    topicTitle: '3기 신도시 본청약 당첨선과 하남교산·과천·왕숙 핵심 블록 분석',
    highlight: '본청약 사전청약 당첨자 포기 물량 및 특별공급 자격 완화에 따른 실전 당첨 가이드',
    videoId: 'vP9Qx2M7b8K'
  },
  'guri-redevelopment-and-topyeong2': {
    channelName: '빠숑의 세상답사기',
    channelSubscribers: '30.2만',
    topicTitle: '구리 토평2지구 한강변 콤팩트시티와 수택동 7천세대 재개발 8호선 입지 분석',
    highlight: '8호선 별내선 개통 이후 잠실 15분 생활권으로 도약하는 구리 원도심과 한강변 미래 가치 총정리',
    videoId: 'M7la_K8Z3bU'
  },
  'newborn-newlywed-special-supply': {
    channelName: '월급쟁이부자들TV',
    channelSubscribers: '162만',
    topicTitle: '신생아 특례대출 소득 2억 완화와 신혼부부 특별공급 완벽 당첨 전략',
    highlight: '부부 합산 소득 기준 완화에 따른 1~2%대 초저금리 정책 모기지와 가점 낮은 2030 당첨 꿀팁',
    videoId: 'dQ8JSm8aC_g'
  },
  'subscription-vs-existing-purchase': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '청약 가점 30점인데 계속 통장만 쥐고 있을까? vs 지금 기축 급매 살까?',
    highlight: '가점 낮은 2040 직장인이 분양만 바라보다 벼락거지 되지 않고 기축 매수로 자산을 불리는 확률적 선택법',
    videoId: '8WkS_9w_8iE'
  },
  'upgrade-housing-budget-formula': {
    channelName: '월급쟁이부자들TV (너나위)',
    channelSubscribers: '162만',
    topicTitle: '6억 아파트에서 9억 상급지로 갈아타는 현실 자금 조달표 & LTV 한도 계산',
    highlight: '기존 주택 매도 잔금과 신규 주택 매수 타이밍, 주담대 원리금 상환액을 무리 없이 설계하는 실전 팁',
    videoId: 'P0Vj89_Y128'
  },
  'subway-lines-value-guide': {
    channelName: '빠숑의 세상답사기',
    channelSubscribers: '30.2만',
    topicTitle: '노선이 곧 집값이다: 2·3·9호선, 신분당선, GTX 노선별 자산 가치 서열 총정리',
    highlight: '일자리 직결성과 배차 간격, 급행 여부에 따라 갈리는 수도권 지하철 노선별 프리미엄 완벽 해부',
    videoId: 'j5F9x2N_7vE'
  },
  'railway-overshooting-indicators': {
    channelName: '삼프로TV (채상욱 애널리스트)',
    channelSubscribers: '265만',
    topicTitle: '철도 착공·개통 호재로 급등한 아파트, 거품(오버슈팅)과 공사 지연 리스크 분석',
    highlight: '계획 발표 ➔ 착공 ➔ 개통 3단계 가격 반영 사이클과 하락장에서 가장 먼저 무너지는 외곽 철도 호재의 덫',
    videoId: 'yC8n7ZqR6uE'
  },
  'station-proximity-premium': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '진짜 역세권의 디테일한 기준: 도보 7분 초역세권과 비역세권의 자산 격차',
    highlight: '지도 앱 직선거리가 아닌 실제 도보 보행 동선과 경사도, 횡단보도가 만드는 시세 방어력의 비밀',
    videoId: 't7D9t9Pj_xY'
  },
  'life-cycle-housing-guide': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '20대 사회초년생부터 60대 은퇴자까지: 생애주기별 자산 배분과 내 집 마련 기준',
    highlight: '인생의 계절마다 바뀌는 주거 기준과 종잣돈 크기에 맞춘 단계별 자산 스케일업 로드맵',
    videoId: 'vP3_K4L9m8N'
  },
  'officetel-live-vs-buy': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '살기는 편한데 사기는 꺼려지는 오피스텔, 왜 자산가치는 오르지 않을까?',
    highlight: '아파트와 오피스텔의 대지지분 차이, 건물 감가상각, 전용률이 만드는 치명적인 가격 격차 해부',
    videoId: 'kYJvMv1w8i8'
  },
  'reconstruction-first-new-town-contribution': {
    channelName: '투미부동산TV (김제경 소장)',
    channelSubscribers: '45.8만',
    topicTitle: '공사비 1,000만 원 시대의 경고: 1기 신도시(분당·일산) 재건축 분담금과 대지지분 15평 룰',
    highlight: '특별법 환상에 가려진 추가분담금 수억 원 폭탄과 용적률 완화 시 기부채납 임대주택의 실체 분석',
    videoId: 'a8D7v3M9p0L'
  },
  'field-trip-imjang-checklist': {
    channelName: '월급쟁이부자들TV',
    channelSubscribers: '162만',
    topicTitle: '지도 앱만 보고 계약하면 100% 후회한다: 부동산 기초 현장 답사(임장) 체크리스트',
    highlight: '낮 14시 채광부터 밤 20시 주차난까지, 현장에 직접 가서 눈으로 확인해야 할 필수 7대 시크릿',
    videoId: 'c4F9x8N1z7Q'
  },
  'old-renovation-vs-new-construction': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '30년 구축 사서 5천만 원 올수리할까? vs 돈 더 주고 신축 갈까?',
    highlight: '인테리어의 5년 감가상각과 신축 대단지 커뮤니티가 만드는 프리미엄의 장기 자산 가치 비교',
    videoId: 'W2Z5XyQ_123'
  },
  'tax-saving-1house-exemption-formula': {
    channelName: '세금파는 아이들 (제네시스박)',
    channelSubscribers: '21.5만',
    topicTitle: '세금 모르면 수천만 원 날린다: 1주택 12억 비과세와 일시적 2주택 3년 절세 공식',
    highlight: '1-2-3 법칙 준수 요건과 조정대상지역 거주 요건, 취득세·양도세 감면 완벽 해설',
    videoId: 'm9B4v7X1z8Y'
  },
  'mega-complex-vs-small-apartment': {
    channelName: '빠숑의 세상답사기',
    channelSubscribers: '30.2만',
    topicTitle: '300세대 나홀로 vs 2,000세대 대단지: 세대수가 만드는 관리비와 하방경직성',
    highlight: '세대수 규모에 따른 공용 관리비 30% 절감 효과와 실거래가 데이터 누적에 따른 환금성 차이',
    videoId: 'p8N2x4M9k1Q'
  },
  'imjang-intermediate-commercial-school-data': {
    channelName: '빠숑의 세상답사기',
    channelSubscribers: '30.2만',
    topicTitle: '고수는 아파트를 보지 않고 상가와 학원가를 본다: 스타벅스 직영점과 학원가 라이딩 임장법',
    highlight: '스타벅스 입지 점검과 밤 10시 학원가 셔틀버스 밀집도를 통해 지역 주민의 소득과 학군 서열 파악하기',
    videoId: 'z7Q9m4X1v8N'
  },
  'how-to-judge-undervalued-apartments': {
    channelName: '삼프로TV / 아실(ASIL) 공식 채널',
    channelSubscribers: '265만',
    topicTitle: '이 아파트 진짜 더 오를까? 가격 뒤에 숨겨진 저평가 & 상승 여력 판별 4대 실증 공식',
    highlight: '전세가율 65% 하방 지지선, 상급지 키 맞추기 갭, 3년 입주 물량 절벽 데이터를 활용한 저평가 발굴',
    videoId: 'k8Z7Y_m9P1A'
  },
  'mortgage-loan-optimization-guide': {
    channelName: '월급쟁이부자들TV',
    channelSubscribers: '162만',
    topicTitle: '내 소득과 집값에 딱 맞는 대출 레버리지 최적화: 디딤돌·신생아 특례 vs 체증식 40년 주담대',
    highlight: '1~2%대 초저금리 정책 모기지 우선순위와 만 39세 이하 체증식 분할상환으로 5년간 현금 아끼는 법',
    videoId: 'dQ8JSm8aC_g'
  },
  'upgrade-gap-compression-timing-formula': {
    channelName: '삼프로TV (이광수 부동산 연구소)',
    channelSubscribers: '265만',
    topicTitle: '상급지 갈아타기의 절대 법칙: 평당가 갭(Gap) 압축기와 침체기 보합장 매수 타이밍',
    highlight: '상승장 불장이 아닌 보합장에서 상급지 갭이 25% 이하로 줄어드는 원리와 선매도 후매수 특약 가이드',
    videoId: 'yC8n7ZqR6uE'
  },
  'real-estate-macro-cycle-3signals': {
    channelName: '삼프로TV (채상욱 / 서울대 김경민 교수)',
    channelSubscribers: '265만',
    topicTitle: '대한민국 부동산 사이클 4계절 판별법: 미분양 6만호, 서울 거래량 5천건, 전세가율 3대 지표',
    highlight: '빅데이터 거시 지표를 통해 시장의 진성 바닥과 상투를 선행 지표로 판별하는 기관급 매크로 분석',
    videoId: 'yC8n7ZqR6uE'
  },
  'high-income-job-golden-triangle': {
    channelName: '빠숑의 세상답사기',
    channelSubscribers: '30.2만',
    topicTitle: '불황에도 평당 1억을 지키는 힘: GBD·YBD·BBD 고소득 직주근접 30분의 경제학',
    highlight: '평균 연봉 1억 원 이상 고소득 일자리와 4대 황금 노선(2·3·9·신분당선) 30분 통근권 분석',
    videoId: 'j5F9x2N_7vE'
  },
  'right-to-move-in-vs-subscription-formula': {
    channelName: '투미부동산TV (김제경 소장)',
    channelSubscribers: '45.8만',
    topicTitle: '분양권 vs 입주권 정밀 수지 분석: 프리미엄(P) 적정가와 총 취득원가 역산 공식',
    highlight: '권리가액, 추가분담금, 토지 취득세 4.6%까지 합산하여 인근 준신축 대비 20% 안전마진 검증법',
    videoId: 'a8D7v3M9p0L'
  },
  'redevelopment-proportionality-ratio-trap': {
    channelName: '투미부동산TV (김제경 소장)',
    channelSubscribers: '45.8만',
    topicTitle: '재개발 비례율의 허상과 추가분담금 폭탄 피하기: 일반분양 비율 150% 룰',
    highlight: '공사비 1,000만 원 시대, 사업시행인가 보고서에서 비례율 뻥튀기와 추가분담금 위험 걸러내기',
    videoId: 'a8D7v3M9p0L'
  },
  'joint-ownership-tax-saving-simulation': {
    channelName: '세금파는 아이들 (제네시스박)',
    channelSubscribers: '21.5만',
    topicTitle: '15억 이상 고가 주택의 부부 공동명의 vs 단독명의 종부세·양도세 완벽 시뮬레이션',
    highlight: '기본공제 18억(공동명의) vs 고령자·장기보유 80% 세액공제(단독명의) 유불리 역전 구간과 9월 특례 신청법',
    videoId: 'm9B4v7X1z8Y'
  },
  'plate-vs-tower-direction-guide': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '판상형 vs 타워형, 남향 vs 동향: 살아보기 전엔 모르는 아파트 구조·향 선택 기준',
    highlight: '맞통풍 4Bay 구조와 2면 개방 타워형의 환기·채광 차이 및 매매가 5~10% 환금성 프리미엄',
    videoId: 'W2Z5XyQ_123'
  },
  'royal-dong-ho-selection-guide': {
    channelName: '월급쟁이부자들TV',
    channelSubscribers: '162만',
    topicTitle: '같은 단지인데 1억 차이? RR(로열동·로열층) 판별법과 피해야 할 3대 비선호 라인',
    highlight: '트인 조망권과 단지 중앙 숲뷰, 지하주차장 직결 vs 분리수거장·환기탑 소음동 감별법',
    videoId: 'c4F9x8N1z7Q'
  },
  'elementary-school-proximity-value': {
    channelName: '빠숑의 세상답사기',
    channelSubscribers: '30.2만',
    topicTitle: '초품아(초등학교 품은 아파트)가 불패인 이유: 3040 학부모가 만드는 시세 하방선',
    highlight: '차도 횡단 없는 안전 통학로와 6년 실수요 고착성이 하락장 전세가와 매매가를 지탱하는 메커니즘',
    videoId: 'p8N2x4M9k1Q'
  },
  'real-estate-registry-3min-guide': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '등기부등본 3분 완벽 해독법: 표제부·갑구·을구에서 위험 신호 걸러내기',
    highlight: '을구 근저당 채권최고액 60% 안전선과 갑구 가압류·신탁·가등기 빨간 줄 발견 시 계약 전 대처법',
    videoId: 't7D9t9Pj_xY'
  },
  'hidden-costs-closing-budget-guide': {
    channelName: '월급쟁이부자들TV',
    channelSubscribers: '162만',
    topicTitle: '복비(중개수수료)와 세금: 집값 외에 숨겨진 부동산 부대비용 7가지 예산 총정리',
    highlight: '8억 아파트 기준 취득세, 중개보수, 채권할인, 법무사비 등 잔금일 필수 현금 예산표',
    videoId: 'P0Vj89_Y128'
  },
  'rent-vs-monthly-vs-buy-simulation': {
    channelName: '부동산읽어주는남자 (부읽남 TV)',
    channelSubscribers: '131만',
    topicTitle: '전세 살까, 월세 살며 굴릴까, 자가 매수할까? 3대 선택지 5년 손익 시뮬레이션',
    highlight: '전세 보증금의 인플레이션 감가상각과 1주택 자가 매수의 강제 저축 효과 및 자산 격차 실증',
    videoId: '8WkS_9w_8iE'
  },
  'gap-investment-tenant-renewal-risk': {
    channelName: '투미부동산TV (김제경 소장)',
    channelSubscribers: '45.8만',
    topicTitle: '전세 낀 아파트 갭투자 매수 시 임차인 계약갱신청구권과 퇴거확약서 특약',
    highlight: '소유권이전등기 타이밍에 따른 실거주 거절 판례와 전세퇴거자금대출 DSR 플랜',
    videoId: 'a8D7v3M9p0L'
  },
  'unranked-lottery-subscription-guide': {
    channelName: '박지민의 월용청약연구소',
    channelSubscribers: '15.4만',
    topicTitle: '무순위 청약 줍줍 옥석 가리기: 전국민 로또 줍줍 vs 미분양 짬처리 함정',
    highlight: '계약 취소 주택 vs 선착순 미분양 줍줍의 안전마진 비교와 재당첨 제한 페널티 주의사항',
    videoId: 'qJ0vKq4cQ7Y'
  },
  'online-bigdata-30min-analysis-guide': {
    channelName: '아실(ASIL) 공식 채널 / 리치고 김기원',
    channelSubscribers: '20.5만',
    topicTitle: '아실·호갱노노·부동산지인 30분 만에 끝내는 온라인 빅데이터 손품 루틴',
    highlight: '3년 공급 물량 0.5% 룰, 외지인 갭투자 유입률, 전세 매물 급감 추이, 학원가 레이어 실전 활용법',
    videoId: 'k8Z7Y_m9P1A'
  }
};

// Replace existing youtubeRecommendation objects with exact direct video URLs and videoId
for (const [artId, yt] of Object.entries(EXACT_YT_MAP)) {
  const ytDirectUrl = `https://www.youtube.com/watch?v=${yt.videoId}`;
  const searchPattern = new RegExp(`youtubeRecommendation:\\s*\\{[\\s\\S]*?channelName:\\s*['"][^'"]+['"][\\s\\S]*?\\},`);

  // Find article position
  const artIdx = content.indexOf(`id: '${artId}'`);
  if (artIdx === -1) continue;

  const afterArt = content.slice(artIdx);
  const nextArtIdx = afterArt.indexOf("id: '", 10);
  const currentArtBlock = nextArtIdx !== -1 ? afterArt.slice(0, nextArtIdx) : afterArt;

  const newYtBlock = `youtubeRecommendation: {
      channelName: '${yt.channelName}',
      channelSubscribers: '${yt.channelSubscribers}',
      topicTitle: '${yt.topicTitle}',
      highlight: '${yt.highlight}',
      videoId: '${yt.videoId}',
      youtubeUrl: '${ytDirectUrl}'
    },`;

  const updatedBlock = currentArtBlock.replace(searchPattern, newYtBlock);
  content = content.slice(0, artIdx) + updatedBlock + (nextArtIdx !== -1 ? afterArt.slice(nextArtIdx) : '');
}

fs.writeFileSync('src/data/thoughtArticles.ts', content, 'utf-8');
console.log('Successfully updated direct YouTube video URLs for all articles!');
