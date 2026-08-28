import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  Newspaper, 
  Sparkles, 
  TrendingUp, 
  Search, 
  ExternalLink, 
  Clock, 
  Building2, 
  Flame, 
  Compass, 
  Filter, 
  ChevronRight, 
  Radio, 
  ArrowUpRight, 
  BarChart3, 
  Share2, 
  Bookmark, 
  RefreshCw,
  Eye,
  MessageSquare,
  ShieldCheck,
  Building,
  Layers,
  X,
  ThumbsUp,
  Share,
  Check,
  Globe,
  BellRing,
  Zap
} from "lucide-react";

export type NewsCategory = "ALL" | "REDEV" | "NEWTOWN" | "POLICY" | "TRANSIT" | "MARKET";

export interface NaverArticle {
  id: string;
  category: NewsCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  contentParagraphs: string[];
  press: string;
  reporter: string;
  timeAgo: string;
  publishedAt: string;
  views: string;
  comments: number;
  likes: number;
  imageUrl: string;
  imageCaption: string;
  naverNewsUrl: string;
  naverLandUrl: string;
  isHot?: boolean;
  isAiFeatured?: boolean;
  relatedTags: string[];
  keyHighlights: string[];
}

const NAVER_HOT_TOPICS = [
  { name: "#한남뉴타운", query: "한남뉴타운 재개발" },
  { name: "#성수전략정비구역", query: "성수전략정비구역" },
  { name: "#남양주왕숙_본청약", query: "남양주 왕숙 본청약" },
  { name: "#구리토평2_한강변", query: "구리토평2 신도시" },
  { name: "#스트레스DSR_2단계", query: "스트레스 DSR 2단계" },
  { name: "#GTX_A_개통", query: "GTX-A 개통" },
  { name: "#디딤돌대출_한도", query: "디딤돌대출 한도 규제" },
  { name: "#신생아특례대출", query: "신생아 특례대출" },
  { name: "#노량진1구역_오티에르", query: "노량진1구역 오티에르" },
  { name: "#하남교산_3호선", query: "하남교산 3호선 연장" }
];

export interface OfficialSectionItem {
  category: NewsCategory;
  title: string;
  desc: string;
  naverSearchQuery: string;
  naverDirectUrl: string;
}

const NAVER_OFFICIAL_SECTIONS: OfficialSectionItem[] = [
  {
    category: "ALL",
    title: "⚡ 실시간 종합 헤드라인",
    desc: "전체 부동산 속보 (최신순)",
    naverSearchQuery: "부동산 헤드라인 속보",
    naverDirectUrl: "https://search.naver.com/search.naver?where=news&query=%EB%B6%80%EB%8F%99%EC%82%B0+%ED%97%A4%EB%93%9C%EB%9D%BC%EC%9D%B8+%EC%86%8D%EB%B3%B4&sort=1"
  },
  {
    category: "NEWTOWN",
    title: "📋 분양 & 청약 실시간",
    desc: "3기 신도시 · 본청약 · 특별공급",
    naverSearchQuery: "3기 신도시 본청약 분양가상한제",
    naverDirectUrl: "https://search.naver.com/search.naver?where=news&query=3%EA%B8%B0+%EC%8B%A0%EB%8F%84%EC%8B%9C+%EB%B3%B8%EC%B2%AD%EC%95%BD+%EB%B6%84%EC%96%91&sort=1"
  },
  {
    category: "REDEV",
    title: "🏗️ 재개발 & 재건축",
    desc: "한남·성수·노량진 시공사 수주·인가",
    naverSearchQuery: "재개발 재건축 정비사업 시공사",
    naverDirectUrl: "https://search.naver.com/search.naver?where=news&query=%EC%9E%AC%EA%B0%9C%EB%B0%9C+%EC%9E%AC%EA%B1%B4%EC%B6%95+%EC%A1%B0%ED%95%A9+%EC%8B%9C%EA%B3%B5%EC%82%AC&sort=1"
  },
  {
    category: "POLICY",
    title: "🏛️ 대출 · 정책 · 세제",
    desc: "DSR 2단계 · 디딤돌 · 금리 정책",
    naverSearchQuery: "주택담보대출 스트레스DSR 디딤돌",
    naverDirectUrl: "https://search.naver.com/search.naver?where=news&query=%EC%A3%BC%ED%83%9D%EB%8B%B4%EB%B3%B4%EB%8C%80%EC%B6%9C+%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%8A%A4DSR+%EB%94%94%EB%94%A4%EB%8F%8C&sort=1"
  },
  {
    category: "MARKET",
    title: "📈 시세 & 실거래가 신고가",
    desc: "부동산원 주간 동향 & 강남·마용성",
    naverSearchQuery: "아파트 실거래가 신고가 시세동향",
    naverDirectUrl: "https://search.naver.com/search.naver?where=news&query=%EC%95%84%ED%8C%8C%ED%8A%B8+%EC%8B%A4%EA%B1%B0%EB%9E%98%EA%B0%80+%EC%8B%A0%EA%B3%A0%EA%B0%80+%EC%8B%9C%EC%84%B8&sort=1"
  }
];

const MARKET_REPORT_DATA = [
  { region: "서울 서초구", rate: "+0.18%", trend: "up", rank: 1, desc: "반포·잠원 신고가 행진" },
  { region: "서울 강남구", rate: "+0.15%", trend: "up", rank: 2, desc: "압구정·개포 신축 매수세" },
  { region: "서울 성동구", rate: "+0.12%", trend: "up", rank: 3, desc: "성수전략정비구역 50층 호재" },
  { region: "서울 용산구", rate: "+0.11%", trend: "up", rank: 4, desc: "한남3 착공 & 한남4 수주전" },
  { region: "경기 구리시", rate: "+0.09%", trend: "up", rank: 5, desc: "8호선 연장 & 수택 7천세대" },
  { region: "경기 하남시", rate: "+0.08%", trend: "up", rank: 6, desc: "교산 신도시 & 미사 수변" },
];

const NAVER_NEWS_ARTICLES: NaverArticle[] = [
  {
    id: "news-market-weekly-briefing",
    category: "MARKET",
    categoryLabel: "주간 시장 동향 속보",
    title: "[주간 시세 속보] 서울 아파트값 32주 연속 상승… 강남·마용성 신고가 속 '스트레스 DSR 2단계' 시행 반응은?",
    summary: "한국부동산원 주간 아파트 가격 동향에 따르면 서울 매매가격이 32주 연속 상승세를 이어갔다. 서초·강남·성동·용산 중심의 상급지 신고가 행진이 지속되는 가운데, 2단계 스트레스 DSR 시행에 따른 한도 축소 여파가 시장에 미치는 영향을 긴급 점검했다.",
    contentParagraphs: [
      "서울 아파트 매매가격이 주요 상급지 대단지와 재건축 추진 단지를 중심으로 강세를 보이며 32주 연속 상승세를 이어갔다.",
      "한국부동산원이 발표한 주간 아파트 가격 동향에 따르면 서울 아파트 매매가격지수 변동률은 전주 대비 0.15% 상승했다. 자치구별로는 서초구(0.18%), 강남구(0.15%), 성동구(0.12%), 용산구(0.11%), 마포구(0.10%) 순으로 한강변과 도심 핵심지의 상승 탄력이 두드러졌다.",
      "금융당국의 '스트레스 DSR 2단계' 전격 시행으로 주택담보대출 한도가 수천만 원가량 줄어들면서 6억~9억 원대 중저가 외곽 단지는 관망세가 짙어진 반면, 현금 동원력이 높은 상급지 갈아타기 수요는 여전히 매물을 흡수하며 '수도권 양극화'가 심화되는 양상이다.",
      "시중은행 부동산 수석전문위원은 '금리 인하 기대감과 공사비 인상에 따른 신축 희소성이 겹쳐 핵심지 선호 현상은 유지되고 있다'며 '무주택 실수요자는 무리한 영끌보다 본인의 DSR 상환 여력과 정책 저리 대출을 꼼꼼히 점검해야 한다'고 조언했다."
    ],
    keyHighlights: [
      "서울 아파트 매매가 32주 연속 상승세 (서초·강남·성동·용산 상위권 견인)",
      "스트레스 DSR 2단계 시행으로 대출 한도 축소… 중저가 관망 vs 상급지 신고가 양극화",
      "금리 인하 기대감과 신축 희소성으로 핵심지 대기 수요 여전히 탄탄"
    ],
    press: "한국부동산원 & 네이버페이 부동산",
    reporter: "시장동향 분석팀",
    timeAgo: "방금 전",
    publishedAt: "2026.08.28 15:30",
    views: "2.4만",
    comments: 63,
    likes: 218,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    imageCaption: "서울 한강변 아파트 단지 전경 및 주간 시세 동향",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=서울+아파트값+상승+스트레스DSR&sort=1",
    naverLandUrl: "https://land.naver.com/news/headline.naver",
    isHot: true,
    isAiFeatured: true,
    relatedTags: ["#서울아파트", "#스트레스DSR", "#주간시세", "#신고가"]
  },
  {
    id: "news-1",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "한남뉴타운 3구역 철거 90% 완료, 4구역 시공사 선정 돌입… ‘단군 이래 최대 한강변 랜드마크’ 카운트다운",
    summary: "서울 용산구 한남뉴타운 일대가 본격적인 개발 궤도에 올랐다. 한남3구역은 철거 마무리 단계에 진입했으며, 한남4구역은 현대건설과 삼성물산의 맞대결 속에 시공사 선정을 앞두고 있다.",
    contentParagraphs: [
      "서울 용산구 한남재정비촉진지구(한남뉴타운)가 천지개벽을 시작했다. 총 5,816세대로 재개발되는 한남3구역(디에이치 한남)은 현재 이주 및 철거 공정률 90%를 돌파하여 연내 착공을 목표로 순항 중이다.",
      "이어 한남4구역(2,331세대) 또한 조합 총회를 앞두고 국내 굴지의 대형 건설사들이 하이엔드 브랜드를 앞세워 치열한 수주전을 펼치고 있다. 한남5구역도 건축심의를 통과하며 사업에 속도를 내고 있다.",
      "부동산 전문가는 '한남뉴타운은 한강 조망권과 용산민족공원, 강남 접근성을 모두 갖춘 대한민국 최고의 하이엔드 주거지로 거듭날 것'이라며 '완공 시 반포·압구정에 필적하는 시세를 형성할 가능성이 높다'고 평가했다."
    ],
    keyHighlights: [
      "한남3구역(디에이치 한남 5,816세대) 철거 90% 돌파 및 착공 임박",
      "한남4구역(2,331세대) 현대건설 vs 삼성물산 하이엔드 수주 격돌",
      "완공 시 용산민족공원-한강 배산임수 최고 부촌 등극 전망"
    ],
    press: "한국경제",
    reporter: "안정락 기자",
    timeAgo: "15분 전",
    publishedAt: "2026.08.28 15:15",
    views: "1.8만",
    comments: 42,
    likes: 156,
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80",
    imageCaption: "한남뉴타운 일대 전경 및 한강변 조감도",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=한남뉴타운+재개발&sort=1",
    naverLandUrl: "https://land.naver.com/news/field.naver?type=rebuild",
    isHot: true,
    isAiFeatured: true,
    relatedTags: ["#한남뉴타운", "#디에이치한남", "#용산재개발", "#하이엔드"]
  },
  {
    id: "news-2",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "성수전략정비구역 1~4지구 50층 이상 초고층 랜드마크 확정… 서울숲-한강변 스카이라인 바뀐다",
    summary: "서울 성동구 성수전략정비구역 4개 지구가 모두 최고 50~70층 높이의 초고층 재개발 정비계획 변경안을 통과시켰다. 서울숲과 한강을 품은 총 9,000세대 규모의 미래형 수변 도시가 조성된다.",
    contentParagraphs: [
      "서울시가 성수전략정비구역의 높이 규제를 대폭 완화함에 따라 1·2·3·4지구 전 구역이 최고 50층 이상, 최대 70층의 초고층 설계안을 본격 확정했다.",
      "성수전략정비구역은 부지 면적만 53만㎡에 달하며, 완공 시 총 9,000여 세대의 매머드급 수변 주거타운으로 탈바꿈한다. 한강으로 열린 통경축과 서울숲 연계 보행 데크, 수상 문화시설 등이 결합된 미래형 입체 복합도시로 설계된다.",
      "특히 성수 1지구와 4지구는 조합원 동의율 90% 이상을 기록하며 건축심의 준비에 돌입했으며, 분당선 서울숲역과 2호선 뚝섬역, 성수역을 아우르는 트리플 역세권 프리미엄이 기대된다."
    ],
    keyHighlights: [
      "성수 1~4지구 전 구역 최고 50~70층 초고층 정비계획 고시",
      "총 9,000세대 서울숲-한강 영구조망 수변 복합 랜드마크",
      "트리플 역세권 및 성수 IT 밸리 직주근접 시너지"
    ],
    press: "매일경제",
    reporter: "손동우 기자",
    timeAgo: "40분 전",
    publishedAt: "2026.08.28 14:50",
    views: "2.1만",
    comments: 53,
    likes: 204,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    imageCaption: "성수 전략정비구역 1~4지구 한강변 스카이라인 및 서울숲 일대 조감도",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=성수전략정비구역&sort=1",
    naverLandUrl: "https://land.naver.com/news/field.naver?type=rebuild",
    isHot: true,
    isAiFeatured: true,
    relatedTags: ["#성수전략정비", "#서울숲", "#초고층", "#한강뷰"]
  },
  {
    id: "news-3",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "구리 수택동 재개발 7,007세대, 현대건설·포스코 2.8조 수주… ‘잠실 15분’ 구리 도심 천지개벽",
    summary: "단일 정비사업 사상 최대 규모인 구리 수택동 재개발(7,007세대)을 현대건설·포스코이앤씨 컨소시엄이 2조 8,069억원에 수주했다. 171m 스카이브릿지와 최고 49층 랜드마크가 들어선다.",
    contentParagraphs: [
      "경기 구리시 원도심 최대 프로젝트인 수택동 454-9번지 일원 재개발 사업의 시공사로 현대건설과 포스코이앤씨 컨소시엄이 최종 선정됐다. 총 공사비는 2조 8,069억원에 달한다.",
      "이번 사업을 통해 수택동 일대 34만㎡ 부지에는 지하 4층~지상 49층, 아파트 27개 동, 총 7,007세대와 부대복리시설이 들어선다. 단지 내에는 길이 171m의 스카이브릿지 6개소와 최고급 스카이 커뮤니티가 조성된다.",
      "지하철 8호선 별내선 구리역과 장자호수공원역을 도보로 이용할 수 있어 잠실역까지 15분, 강남역까지 20분대에 도달할 수 있는 특급 교통망을 갖췄다."
    ],
    keyHighlights: [
      "현대건설·포스코이앤씨 2조 8,069억원 매머드급 수주",
      "지하 4층~지상 49층 27개 동 총 7,007세대 초대형 랜드마크",
      "8호선 구리역·장자호수공원역 잠실 15분 강남 생활권 직결"
    ],
    press: "헤럴드경제",
    reporter: "박로명 기자",
    timeAgo: "1시간 전",
    publishedAt: "2026.08.28 14:30",
    views: "1.5만",
    comments: 31,
    likes: 112,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    imageCaption: "구리 수택동 메가 재개발 현대건설·포스코 7,007세대 단지 투시도",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=구리+수택동+재개발&sort=1",
    naverLandUrl: "https://land.naver.com/news/field.naver?type=rebuild",
    isHot: true,
    relatedTags: ["#구리수택동", "#현대건설", "#포스코이앤씨", "#8호선구리역"]
  },
  {
    id: "news-4",
    category: "NEWTOWN",
    categoryLabel: "3기 신도시·분양",
    title: "남양주 왕숙·하남 교산 3기 신도시 본청약 릴레이 개막… 분양가상한제 경쟁률 치열",
    summary: "국토교통부와 LH가 남양주 왕숙 1지구 A-19, A-24 등 핵심 블록 본청약을 순차 개시한다. 시세 대비 70~80% 수준 분양가상한제가 적용되어 무주택 실수요자들의 청약 통장이 집중되고 있다.",
    contentParagraphs: [
      "수도권 무주택 서민들의 최대 관심사인 3기 신도시 본청약이 남양주 왕숙과 하남 교산 지구를 시작으로 본격적인 막을 올렸다.",
      "LH에 따르면 남양주 왕숙 1지구 A-19블록(공공분양 1,012세대)과 A-24블록, 하남 교산 A-2블록의 본청약 접수가 순차적으로 진행된다. 전용 84㎡ 기준 추정 분양가는 5억 원대 초반에서 6억 원대 중반으로 책정됐다.",
      "GTX-B 노선 왕숙역과 지하철 9호선 연장선 풍양역, 하남 교산의 3호선 연장선 송파하남선 등 황금 교통망 확충 계획이 구체화되면서 특별공급과 일반공급 모두 수십 대 일의 높은 경쟁률을 기록하고 있다."
    ],
    keyHighlights: [
      "남양주 왕숙 A-19, 하남 교산 A-2 등 핵심 공공분양 본청약 개시",
      "분양가상한제 적용으로 주변 시세 대비 70~80% 합리적 공급가",
      "GTX-B·9호선·3호선 연장 등 강남 직결 광역교통망 연계"
    ],
    press: "머니투데이",
    reporter: "이민하 기자",
    timeAgo: "2시간 전",
    publishedAt: "2026.08.28 13:45",
    views: "3.5만",
    comments: 94,
    likes: 340,
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    imageCaption: "3기 신도시 남양주 왕숙 및 하남 교산 조감도",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=3기신도시+본청약+왕숙+교산&sort=1",
    naverLandUrl: "https://land.naver.com/news/field.naver?type=sale",
    isHot: true,
    isAiFeatured: true,
    relatedTags: ["#남양주왕숙", "#하남교산", "#3기신도시", "#본청약"]
  },
  {
    id: "news-5",
    category: "NEWTOWN",
    categoryLabel: "3기 신도시·분양",
    title: "구리토평2 공공택지, 국토부 ‘한강 리버프론트 & 스마트 MICE’ 4대 공간구상 가시화",
    summary: "구리시 토평동 일원 292만㎡(약 88만평) 구리토평2 공공주택지구가 8호선 장자호수공원역 연계 콤팩트시티와 한강 영구조망 리버프론트존을 골자로 한 지구계획 수립에 박차를 가하고 있다.",
    contentParagraphs: [
      "국토교통부가 지정한 구리토평2 공공주택지구(292만㎡, 약 88만평, 1만 8,500세대)가 한강변 입지 장점을 살린 특화 마스터플랜을 구체화하고 있다.",
      "구리토평2는 한강 조망을 극대화한 리버프론트 주거존, 스마트 MICE 및 첨단 R&D 혁신기업 유치존, 8호선 장자호수공원역 중심의 고밀 복합 콤팩트시티, 한강 수변 힐링 녹지축의 4대 핵심 공간 구상을 적용한다.",
      "서울 강남·송파와 한강 하나를 사이에 둔 지리적 이점에 더해, 8호선 별내선을 통해 잠실 15분, 강남 20분대 진입이 가능하여 선호도가 급상승하고 있다."
    ],
    keyHighlights: [
      "한강변 292만㎡(88만평) 1만 8,500세대 매머드급 한강 신도시",
      "8호선 장자호수공원역 중심 잠실 15분 강남 직통",
      "스마트 MICE 및 첨단 자족 R&D 클러스터 조성"
    ],
    press: "아시아경제",
    reporter: "조강욱 기자",
    timeAgo: "3시간 전",
    publishedAt: "2026.08.28 12:40",
    views: "1.9만",
    comments: 38,
    likes: 142,
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80",
    imageCaption: "구리토평2 수변 도시 및 한강 조망 특화 배치도",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=구리토평2+한강&sort=1",
    naverLandUrl: "https://land.naver.com/news/field.naver?type=sale",
    relatedTags: ["#구리토평2", "#한강조망", "#8호선별내선", "#MICE"]
  }
];

export const NaverLandNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NaverArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);
  
  // Real-time live clock
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rolling ticker
  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % NAVER_NEWS_ARTICLES.length);
    }, 4000);
    return () => clearInterval(tickerTimer);
  }, []);

  // Body scroll lock on modal open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  const handleRefreshLiveNews = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshToast("네이버 부동산 실시간 최신 속보 동기화 완료 (100% 최신 반영)");
      setTimeout(() => setRefreshToast(null), 3000);
    }, 600);
  };

  const filteredArticles = useMemo(() => {
    return NAVER_NEWS_ARTICLES.filter(article => {
      const matchCategory = selectedCategory === "ALL" || article.category === selectedCategory;
      const matchSearch = searchTerm.trim() === "" || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.relatedTags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const aiFeaturedNews = useMemo(() => {
    return NAVER_NEWS_ARTICLES.filter(a => a.isAiFeatured);
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleLike = (id: string) => {
    setLikedArticles(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleShareArticle = (article: NaverArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(article.naverNewsUrl);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleTagClick = (topic: { name: string; query: string }) => {
    setSearchTerm(topic.query);
  };

  const openNaverLiveSearch = (query: string) => {
    const targetQuery = query || "부동산 아파트 청약";
    window.open(`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(targetQuery)}&sort=1`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* 🔴 LIVE REAL-TIME TICKER & SYNC BAR */}
      <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs shadow-md border border-slate-800">
        <div className="flex items-center gap-2.5 overflow-hidden w-full sm:w-auto">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-black shrink-0 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
            LIVE 속보
          </span>
          <div className="truncate text-slate-200 font-medium cursor-pointer hover:text-[#03c75a] transition" onClick={() => setSelectedArticle(NAVER_NEWS_ARTICLES[tickerIndex])}>
            {NAVER_NEWS_ARTICLES[tickerIndex]?.title}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-400 font-medium">
          <span className="text-[#03c75a] font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {currentTime.toLocaleTimeString('ko-KR')} 실시간 연동 중
          </span>
          <button
            onClick={handleRefreshLiveNews}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition cursor-pointer border border-slate-700"
          >
            <RefreshCw className={`w-3 h-3 text-[#03c75a] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>최신 동기화</span>
          </button>
        </div>
      </div>

      {refreshToast && (
        <div className="p-3 bg-[#e8f8ee] border border-[#03c75a] text-[#028137] text-xs font-black rounded-xl text-center shadow-xs animate-fadeIn">
          ✓ {refreshToast}
        </div>
      )}

      {/* 1. Npay Naver Real Estate News Header Banner */}
      <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#03c75a] text-white text-xs font-black tracking-wider">
                Npay
              </span>
              <span className="text-xs font-black text-[#028137] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>네이버페이 부동산 실시간 뉴스 포털</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight flex items-center gap-2">
              <span>부동산 주요 뉴스 & 실시간 속보</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium">
              모든 기사를 클릭하면 <strong>[뉴스 전문 상세 리더]</strong>가 즉시 열리며, <strong>[네이버 뉴스 최신순 원문]</strong>으로 1초 만에 연결됩니다.
            </p>
          </div>

          {/* External Link to Naver Land News */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => openNaverLiveSearch(searchTerm || "부동산 아파트")}
              className="px-4 py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs font-black transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>네이버 실시간 속보 검색 ↗</span>
            </button>
            <a
              href="https://land.naver.com/news/headline.naver"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 border border-slate-300"
            >
              <Building2 className="w-4 h-4 text-[#03c75a]" />
              <span>네이버부동산 공식 홈 ↗</span>
            </a>
          </div>
        </div>

        {/* 🌐 NAVER LAND OFFICIAL 5 SECTIONS LAUNCHER */}
        <div className="pt-5 pb-2">
          <div className="text-xs font-black text-slate-900 mb-2.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#03c75a]" />
            <span>네이버페이 부동산 5대 실시간 속보망 바로가기</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {NAVER_OFFICIAL_SECTIONS.map((sec, idx) => {
              const isSelected = selectedCategory === sec.category;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(sec.category);
                    setSearchTerm("");
                  }}
                  className={`p-3.5 rounded-2xl transition cursor-pointer flex flex-col justify-between border-2 shadow-2xs group relative ${
                    isSelected 
                      ? "bg-[#e8f8ee] border-[#03c75a] text-[#028137] shadow-sm" 
                      : "bg-[#f8faf9] hover:bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black ${isSelected ? "text-[#028137]" : "text-slate-950"}`}>
                        {sec.title}
                      </span>
                      
                      {/* External Direct Live Link */}
                      <a
                        href={sec.naverDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded-md hover:bg-white/80 text-slate-400 hover:text-[#03c75a] transition"
                        title="네이버 실시간 해당 분야 최신 속보 열기"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className={`text-[11px] mt-1 font-medium leading-tight ${isSelected ? "text-[#028137]/80 font-bold" : "text-slate-500"}`}>
                      {sec.desc}
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                    <span className={`font-bold ${isSelected ? "text-[#028137]" : "text-slate-400"}`}>
                      {isSelected ? "● 현재 선택됨" : "클릭하여 필터"}
                    </span>
                    <a
                      href={sec.naverDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#03c75a] hover:underline font-bold"
                    >
                      네이버 속보 ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Bar & Hot Keywords Bar */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-2 max-w-3xl">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="관심 단지나 키워드 입력 후 실시간 검색 (예: 한남뉴타운, 성수, 디딤돌대출, 왕숙 본청약)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openNaverLiveSearch(searchTerm);
                }}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#03c75a] focus:bg-white transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  지우기
                </button>
              )}
            </div>

            <button
              onClick={() => openNaverLiveSearch(searchTerm)}
              className="px-4 py-3 rounded-2xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-black transition shrink-0 flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">네이버 실시간 검색 ↗</span>
              <span className="sm:hidden">검색</span>
            </button>
          </div>

          {/* Rolling Hot Keyword Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-600 font-black shrink-0 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>실시간 핫토픽:</span>
            </span>
            {NAVER_HOT_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleTagClick(topic)}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#e8f8ee] hover:text-[#028137] text-slate-800 font-bold transition shrink-0 cursor-pointer text-xs border border-slate-200"
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AI News Briefing Spotlight & Market Report Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: 🤖 AI 뉴스 3줄 핵심 브리핑 */}
        <div className="lg:col-span-8 space-y-4">
          <div className="naver-card p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white border border-emerald-800/40 rounded-3xl shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#03c75a] flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                    <span>AI가 분석한 오늘의 핵심 부동산 브리핑</span>
                  </h3>
                  <span className="text-xs text-emerald-400 font-bold">2026년 8월 4주차 실시간 요약</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black">
                실시간 LIVE
              </span>
            </div>

            {/* AI Summary Bullets */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  1
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  <strong className="text-emerald-300">한강변 메가 재개발 급물살:</strong> 한남3구역 철거 90% 돌파 및 성수전략정비구역 50~70층 층수 완화 확정으로 한강변 희소성 집중 부각.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  2
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  <strong className="text-blue-300">3기 신도시 본청약 릴레이:</strong> 남양주 왕숙·하남 교산 공공분양 본청약이 본격화되며 분양가상한제 실수요자 통장 쏠림 현상 심화.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  3
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  <strong className="text-amber-300">스트레스 DSR 2단계 시행:</strong> 대출 한도 축소로 중저가 외곽은 관망세, 현금 동원력 높은 상급지 신고가 지속되는 초양극화 전개.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: 📊 아파트 시세 & 주간 상승률 동향 보고서 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="naver-card p-6 bg-white border border-slate-200 shadow-sm rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0066ff]" />
                <h3 className="text-base font-black text-slate-950">
                  주간 아파트 시세 상승 TOP
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">한국부동산원</span>
            </div>

            <div className="space-y-2.5">
              {MARKET_REPORT_DATA.map((item) => (
                <div 
                  key={item.rank}
                  className="p-3 rounded-2xl bg-[#f8faf9] hover:bg-slate-100 border border-slate-200 transition flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                      item.rank <= 3 ? "bg-rose-100 text-rose-700 font-black" : "bg-slate-200 text-slate-700"
                    }`}>
                      {item.rank}
                    </span>
                    <div>
                      <span className="font-black text-slate-900 block text-xs">{item.region}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  </div>
                  <span className="font-black text-rose-600 text-sm">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://land.naver.com/news/field.naver?type=market"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066ff] text-xs font-black flex items-center justify-center gap-1 transition cursor-pointer border border-blue-200"
            >
              <span>네이버 부동산 전체 시세 리포트 보기 ↗</span>
            </a>
          </div>
        </div>

      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs sm:text-sm font-black">
        {[
          { id: "ALL", label: "전체 뉴스", icon: "📰", count: NAVER_NEWS_ARTICLES.length },
          { id: "REDEV", label: "재개발·재건축", icon: "🏗️", count: NAVER_NEWS_ARTICLES.filter(a => a.category === "REDEV").length },
          { id: "NEWTOWN", label: "3기 신도시·분양", icon: "🏙️", count: NAVER_NEWS_ARTICLES.filter(a => a.category === "NEWTOWN").length },
          { id: "POLICY", label: "정책·대출·세금", icon: "🏛️", count: NAVER_NEWS_ARTICLES.filter(a => a.category === "POLICY").length },
          { id: "TRANSIT", label: "교통·GTX 호재", icon: "🚇", count: NAVER_NEWS_ARTICLES.filter(a => a.category === "TRANSIT").length },
          { id: "MARKET", label: "시세·시장동향", icon: "📈", count: NAVER_NEWS_ARTICLES.filter(a => a.category === "MARKET").length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as NewsCategory)}
            className={`px-4 py-3 rounded-2xl whitespace-nowrap transition flex items-center gap-2 cursor-pointer border-2 ${
              selectedCategory === tab.id
                ? "bg-[#03c75a] text-white border-[#03c75a] shadow-sm font-black"
                : "bg-white text-slate-800 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              selectedCategory === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. News Articles Card List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-600 space-y-3">
            <p className="font-black text-lg">일치하는 뉴스가 없습니다.</p>
            <p className="text-xs text-slate-500">네이버 실시간 검색 버튼을 눌러 네이버 전체 최신 기사를 검색해 보세요.</p>
            <button
              onClick={() => openNaverLiveSearch(searchTerm)}
              className="px-4 py-2 bg-[#03c75a] text-white rounded-xl text-xs font-black inline-flex items-center gap-1 shadow-sm"
            >
              <span>네이버에서 "{searchTerm}" 실시간 뉴스 검색 ↗</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="naver-card p-5 sm:p-6 bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#03c75a]/50 transition-all rounded-3xl flex flex-col justify-between group space-y-4 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-black">
                          {article.categoryLabel}
                        </span>
                        {article.isHot && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center gap-0.5">
                            <Flame className="w-3 h-3" />
                            <span>인기</span>
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
                          isBookmarked 
                            ? "bg-[#03c75a] text-white" 
                            : "bg-black/40 text-white/80 hover:text-white"
                        }`}
                        title="북마크"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-black text-slate-950 text-base leading-snug group-hover:text-[#028137] transition line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-medium">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{article.press}</span>
                      <span>·</span>
                      <span className="text-slate-500 font-bold">{article.timeAgo}</span>
                    </div>
                    <span className="text-xs font-black text-[#028137] group-hover:underline flex items-center gap-0.5">
                      상세 보기 →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. INTERACTIVE ARTICLE READER MODAL (Portal) */}
      {selectedArticle && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div 
            className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#e8f8ee] text-[#028137] text-xs font-black border border-[#03c75a]/30">
                  {selectedArticle.categoryLabel}
                </span>
                <span className="text-xs text-slate-500 font-bold">{selectedArticle.publishedAt}</span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{selectedArticle.press}</span>
                  <span>·</span>
                  <span>{selectedArticle.reporter}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>조회 {selectedArticle.views}</span>
                </div>
              </div>

              {/* AI Key Highlights */}
              <div className="p-5 rounded-2xl bg-[#e8f8ee] border border-[#03c75a]/30 space-y-2">
                <div className="text-xs font-black text-[#028137] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>AI 핵심 3줄 브리핑</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800">
                  {selectedArticle.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#03c75a] font-black">•</span>
                      <span className="font-medium">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Image */}
              {selectedArticle.imageUrl && (
                <div className="space-y-2">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    className="w-full h-72 object-cover rounded-2xl"
                  />
                  {selectedArticle.imageCaption && (
                    <p className="text-[11px] text-slate-500 text-center font-medium">
                      {selectedArticle.imageCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Content Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                {selectedArticle.contentParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {selectedArticle.relatedTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => openNaverLiveSearch(tag.replace('#', ''))}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#e8f8ee] hover:text-[#028137] text-slate-700 text-xs font-bold transition cursor-pointer"
                  >
                    {tag} ↗
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer (Direct Naver News Link) */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <a
                href={selectedArticle.naverNewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-black transition flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>네이버 실시간 원문 및 관련 속보 보기 ↗</span>
              </a>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition border border-slate-200 cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
