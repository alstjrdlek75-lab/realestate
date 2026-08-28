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
  Check
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
  "#한남뉴타운",
  "#성수전략정비구역",
  "#남양주왕숙_본청약",
  "#구리토평2_한강변",
  "#스트레스DSR_2단계",
  "#GTX_A_개통",
  "#디딤돌대출_한도",
  "#신생아특례대출",
  "#노량진1구역_오티에르",
  "#하남교산_3호선"
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
    publishedAt: "2026.08.26 11:20",
    views: "3.5만",
    comments: 142,
    likes: 520,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    imageCaption: "서울 한강변 및 강남권 주요 대단지 아파트 스카이라인",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
    isHot: true,
    isAiFeatured: true,
    relatedTags: ["#서울아파트시세", "#스트레스DSR", "#강남서초신고가", "#한국부동산원", "#양극화"]
  },
  {
    id: "news-1",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "한남뉴타운 한남3구역 철거 본격화… ‘디에이치 한남’ 5,816세대 대한민국 최고 부촌 카운트다운",
    summary: "서울 용산구 한남3구역이 주민 이주를 마무리하고 본격 철거에 돌입했다. 현대건설이 시공하는 5,816세대 디에이치 한남은 2026년 일반분양을 목표로 속도를 낸다.",
    contentParagraphs: [
      "서울 용산구 한남3구역 재개발 사업이 주민 이주를 99% 이상 마치고 본격적인 지상 건축물 철거 작업에 돌입했다.",
      "한남3구역은 총 사업비 7조원, 공사비만 약 2조원에 달하는 단국 이래 최대 규모의 단일 재개발 정비사업이다. 지하 7층~지상 22층, 127개 동, 총 5,816가구(공공주택 876가구 포함) 규모의 매머드급 하이엔드 단지인 디에이치 한남(THE H HANNAM)으로 탈바꿈한다.",
      "시공사인 현대건설은 세계적인 건축설계 그룹인 MVRDV 및 칼리슨RTKL과 손잡고, 남산의 자연 지형과 한강 조망을 극대화한 독창적인 외관 특화와 호텔식 최고급 커뮤니티(인피니티 풀, 스카이 브릿지 라운지, 프라이빗 시네마 등)를 선보일 예정이다.",
      "부동산 전문가들은 한남3구역이 완공되면 인근 나인원 한남, 한남더힐과 함께 대한민국 부촌의 서열 1위 지형도를 완벽하게 굳힐 것으로 내다보고 있다. 일반분양은 2026년 예정이며, 입주는 2029년 하반기를 목표로 한다."
    ],
    keyHighlights: [
      "총 5,816세대 매머드급 하이엔드 랜드마크 디에이치 한남 (현대건설 시공)",
      "2025년 철거 완료 후 2026년 일반분양 목표",
      "남산-한강 배산임수 천혜 입지 및 용산국제업무지구 배후 주거지"
    ],
    press: "한국경제",
    reporter: "안혜원 기자",
    timeAgo: "15분 전",
    publishedAt: "2026.08.26 09:30",
    views: "1.8만",
    comments: 42,
    likes: 156,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    imageCaption: "서울 용산구 한남3구역 일대 전경 및 현대건설 디에이치 한남 조감도",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
    isHot: true,
    isAiFeatured: true,
    relatedTags: ["#한남뉴타운", "#디에이치한남", "#용산구", "#현대건설"]
  },
  {
    id: "news-2",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "‘최고 70층’ 날개 단 성수전략정비구역… 1~4지구 9,000세대 한강변 스카이라인 재편",
    summary: "서울시의 한강변 50층 층수 제한 폐지로 성수전략정비구역 1~4지구가 일제히 50~70층 초고층 정비계획 변경을 고시했다. 강변북로 지하화 상부 문화공원과 연계된다.",
    contentParagraphs: [
      "서울 성동구 성수동 한강변의 마지막 금싸라기 땅으로 꼽히는 성수전략정비구역(1~4지구)이 최고 50~70층 초고층 높이 계획을 확정하고 서울시 정비계획 변경 고시를 마쳤다.",
      "이번 계획에 따라 성수 1·2·3·4지구는 총 9,000여 세대의 초고층 수변 랜드마크로 재탄생한다. 특히 강변북로 지하화 상부에 약 10만㎡ 규모의 한강 수변 문화공원이 조성되어 서울숲과 한강을 보행교로 자유롭게 오갈 수 있게 된다.",
      "가장 규모가 큰 성수 1지구(3,014세대)는 서울숲과 맞닿아 트리마제와 함께 부촌 랜드마크를 형성하며, 성수 4지구(1,584세대)는 영동대교를 통해 청담·압구정동과 3분 거리로 직결된다.",
      "성수동 일대는 크래프톤, 무신사 등 첨단 IT·유니콘 기업들이 집결하는 IT밸리와 성수 전략정비구역 주거가 결합되어 한국의 브루클린이자 맨해튼으로 도약할 전망이다."
    ],
    keyHighlights: [
      "서울시 한강변 50~70층 초고층 랜드마크 스카이라인 확정",
      "강변북로 지하화 상부 한강 수변공원 조성 (서울숲 직결)",
      "성수 1·2·3·4지구 총 9,000세대 매머드급 한강 남향 조망권"
    ],
    press: "매일경제",
    reporter: "손동우 기자",
    timeAgo: "42분 전",
    publishedAt: "2026.08.26 09:05",
    views: "2.4만",
    comments: 68,
    likes: 210,
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80",
    imageCaption: "성수 전략정비구역 1~4지구 한강변 스카이라인 및 서울숲 일대 조감도",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
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
      "지하철 8호선 별내선 구리역과 장자호수공원역을 도보로 이용할 수 있어 잠실역까지 15분, 강남역까지 20분대에 도달할 수 있는 특급 교통망을 갖췄다.",
      "인근 수택E구역(3,022세대), 인창C구역(1,180세대)과 함께 총 1만 1,200세대의 미니 신도시급 신축 브랜드 타운이 완성되어 경기 동북부 최고의 주거타운으로 도약하게 된다."
    ],
    keyHighlights: [
      "현대건설·포스코이앤씨 2조 8,069억원 매머드급 수주",
      "지하 4층~지상 49층 27개 동 총 7,007세대 초대형 랜드마크",
      "8호선 구리역·장자호수공원역 잠실 15분 강남 생활권 직결"
    ],
    press: "헤럴드경제",
    reporter: "박로명 기자",
    timeAgo: "1시간 전",
    publishedAt: "2026.08.26 08:45",
    views: "1.2만",
    comments: 25,
    likes: 98,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    imageCaption: "구리 수택동 메가 재개발 현대건설·포스코 7,007세대 단지 투시도",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
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
      "LH에 따르면 남양주 왕숙 1지구 A-19블록(공공분양 1,012세대)과 A-24블록, 하남 교산 A-2블록의 본청약 접수가 순차적으로 진행된다. 전용 84㎡ 기준 추정 분양가는 5억 원대 초반에서 6억 원대 중반으로, 인근 다산·미사 신도시 시세 대비 70~80% 수준의 착한 분양가가 책정됐다.",
      "GTX-B 노선 왕숙역과 지하철 9호선 연장선 풍양역, 하남 교산의 3호선 연장선 송파하남선 등 황금 교통망 확충 계획이 구체화되면서 특별공급과 일반공급 모두 수십 대 일의 높은 경쟁률을 기록하고 있다.",
      "전문가들은 사전청약 당첨자들의 본청약 전환율이 80% 이상을 웃돌 것으로 전망하며, 자격 유지와 중도금 집단대출 자금 계획을 면밀히 세워야 한다고 조언했다."
    ],
    keyHighlights: [
      "남양주 왕숙 A-19, 하남 교산 A-2 등 핵심 공공분양 본청약 개시",
      "분양가상한제 적용으로 주변 시세 대비 70~80% 합리적 공급가",
      "GTX-B·9호선·3호선 연장 등 강남 직결 광역교통망 연계"
    ],
    press: "머니투데이",
    reporter: "이민하 기자",
    timeAgo: "2시간 전",
    publishedAt: "2026.08.26 07:45",
    views: "3.1만",
    comments: 89,
    likes: 312,
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    imageCaption: "3기 신도시 남양주 왕숙 및 하남 교산 조감도",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
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
      "서울 강남·송파와 한강 하나를 사이에 둔 지리적 이점에 더해, 8호선 별내선을 통해 잠실 15분, 강남 20분대 진입이 가능하여 3기 신도시 중 가장 높은 주거 선호도를 보이고 있다.",
      "국토부와 구리시는 2026년까지 지구지정 및 광역교통개선대책을 확정하고, 조기 보상과 착공을 추진할 방침이다."
    ],
    keyHighlights: [
      "한강변 292만㎡(88만평) 1만 8,500세대 매머드급 한강 신도시",
      "8호선 장자호수공원역 중심 잠실 15분 강남 직통",
      "스마트 MICE 및 첨단 자족 R&D 클러스터 조성"
    ],
    press: "아시아경제",
    reporter: "조강욱 기자",
    timeAgo: "3시간 전",
    publishedAt: "2026.08.26 06:40",
    views: "9,800",
    comments: 18,
    likes: 85,
    imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&auto=format&fit=crop&q=80",
    imageCaption: "구리토평2 공공주택지구 한강 리버프론트 기본구상 조감도",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#구리토평2", "#장자호수공원", "#한강조망", "#신규택지"]
  },
  {
    id: "news-6",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "노량진1구역 포스코 ‘오티에르 노량진’ 시공 계약 완료… 여의도 배후 3,000세대 대장주 닻 올려",
    summary: "노량진뉴타운의 33% 규모를 차지하는 노량진1구역(2,992세대)이 포스코이앤씨 하이엔드 브랜드 오티에르를 확정하고 관리처분인가 절차에 돌입했다. 여의도 금융가 직주근접 1순위로 꼽힌다.",
    contentParagraphs: [
      "서울 동작구 노량진뉴타운의 최대어인 노량진1구역 재개발 조합이 포스코이앤씨와 본계약을 체결하고 본격적인 사업시행 및 관리처분인가 절차에 돌입했다.",
      "노량진1구역은 총 2,992세대 규모로, 노량진뉴타운 8개 구역(총 9,098세대) 전체의 3분의 1을 차지하는 절대적인 대장주다. 포스코이앤씨의 최상위 하이엔드 브랜드인 오티에르(HAUTEURRE)가 적용된다.",
      "지하철 1·9호선 노량진역(급행)과 7호선 장승배기역을 모두 품은 트리플 역세권으로, 9호선 급행 이용 시 여의도역 3분, 신논현(강남)역 14분대에 닿는다.",
      "노량진 일대는 수협 유휴부지 MICE 복합개발과 노량진역사 입체화 사업이 함께 추진되고 있어, 여의도 금융권 고소득 전문직의 최고 선호 주거지로 떠오르고 있다."
    ],
    keyHighlights: [
      "노량진뉴타운 최대 2,992세대 대장주 오티에르 노량진",
      "1·9호선 노량진역(급행 여의도 3분) & 7호선 장승배기역 트리플 역세권",
      "포스코이앤씨 하이엔드 마감재 및 스카이 라운지 적용"
    ],
    press: "조선일보",
    reporter: "진중언 기자",
    timeAgo: "4시간 전",
    publishedAt: "2026.08.26 05:30",
    views: "1.5만",
    comments: 31,
    likes: 142,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    imageCaption: "노량진1구역 포스코 오티에르 노량진 랜드마크 조감도",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#노량진뉴타운", "#오티에르", "#포스코이앤씨", "#여의도배후"]
  },
  {
    id: "news-7",
    category: "POLICY",
    categoryLabel: "정책·대출·세금",
    title: "스트레스 DSR 2단계 시행 후 수도권 대출 한도 5천만~1억 축소… 실수요자 자금 전략 재점검 필수",
    summary: "금융당국의 가계부채 관리 강화로 2단계 스트레스 DSR이 본격 시행되면서 수도권 주택담보대출 한도가 크게 줄어들었다. 전문가들은 LTV와 DSR 여력을 정밀 진단할 것을 권고한다.",
    contentParagraphs: [
      "금융당국의 가계부채 억제 기조에 따라 2단계 스트레스 DSR(총부채원리금상환비율)이 은행권 주택담보대출과 신용대출에 전면 적용되고 있다.",
      "수도권의 경우 기본 스트레스 가산금리(0.75%p) 대신 상향된 1.20%p가 적용되어, 연소득 1억원인 차주의 주담대 한도가 기존 대비 약 6,000만~1억 1,000만원가량 대폭 줄어들었다.",
      "이에 따라 무리한 영끌 갭투자는 사실상 불가능해졌으며, 보유 현금 비중이 높고 소득 증빙이 탄탄한 실수요자 중심으로 시장이 재편되고 있다.",
      "전문가들은 대출 규제 환경에서는 사전에 본인의 DSR 40% 한도와 생애최초·신혼부부 디딤돌, 신생아특례 정책 모기지 가능 여부를 정확히 시뮬레이션해야 낭패를 피할 수 있다고 강조한다."
    ],
    keyHighlights: [
      "수도권 주담대 스트레스 가산금리 1.20%p 적용 (한도 5천~1억 축소)",
      "영끌 투자 억제 및 실수요자 현금 동원력 중심 시장 재편",
      "디딤돌·신생아특례 등 정책대출 적격 요건 사전 검토 필수"
    ],
    press: "연합뉴스",
    reporter: "이지헌 기자",
    timeAgo: "5시간 전",
    publishedAt: "2026.08.26 04:15",
    views: "4.2만",
    comments: 114,
    likes: 420,
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
    imageCaption: "시중은행 주택담보대출 상담 창구 및 스트레스 DSR 규제 안내",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
    isHot: true,
    relatedTags: ["#스트레스DSR", "#주택담보대출", "#금리", "#내집마련"]
  },
  {
    id: "news-8",
    category: "TRANSIT",
    categoryLabel: "교통·GTX 호재",
    title: "GTX-A 수서~동탄 운행 순항 속 GTX-B·C 착공 릴레이… 수도권 출퇴근 30분 혁명 가속화",
    summary: "GTX-A 노선 개통에 이어 인천 송도~여의도~남양주 왕숙을 잇는 GTX-B와 양주~청량리~삼성~과천을 잇는 GTX-C 노선이 착공에 들어가며 역세권 아파트 프리미엄이 재조명받고 있다.",
    contentParagraphs: [
      "수도권 광역급행철도(GTX) 사업이 순차적으로 본궤도에 오르며 수도권 전역의 30분 통근 시대가 가시화되고 있다.",
      "GTX-A 노선 수서~동탄 구간의 안정적 운행에 이어, 인천 송도~여의도~용산~서울역~청량리~남양주 마석을 잇는 GTX-B 노선과 양주 덕정~의정부~창동~청량리~삼성~양재~과천~수원을 잇는 GTX-C 노선이 전 구간 착공에 들어갔다.",
      "특히 남양주 왕숙(GTX-B), 고양 창릉(GTX-A), 과천(GTX-C) 등 3기 신도시 핵심 정차역 주변 아파트는 서울 도심과 강남권까지 15분대에 직결되는 교통 혁명의 최대 수혜지로 꼽힌다.",
      "국토교통부는 GTX 개통 시기에 맞춰 환승센터와 복합환승체계를 완성하여 출퇴근 교통난을 획기적으로 해소하겠다고 밝혔다."
    ],
    keyHighlights: [
      "GTX-A 수서~동탄 이어 GTX-B(마석·왕숙) & GTX-C(과천·삼성) 착공",
      "수도권 외곽에서 서울 도심·강남 15~20분대 주파",
      "3기 신도시 핵심 환승역세권 미래 가치 상승 견인"
    ],
    press: "동아일보",
    reporter: "이축복 기자",
    timeAgo: "6시간 전",
    publishedAt: "2026.08.26 03:20",
    views: "2.1만",
    comments: 48,
    likes: 188,
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80",
    imageCaption: "수도권 광역급행철도 GTX 열차 및 주요 역세권 환승망",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#GTX_A", "#GTX_B", "#GTX_C", "#광역교통망"]
  },
  {
    id: "news-9",
    category: "MARKET",
    categoryLabel: "시세·시장동향",
    title: "서울 아파트 전세가율 상승세 지속… ‘갭투자 대신 똘똘한 1채 실거주 갈아타기’ 뚜렷",
    summary: "서울 및 수도권 핵심지 전세가격이 수개월 연속 상승하면서 매매가와 전세가 격차가 좁혀지고 있다. 다주택 규제 속에 1주택자의 상급지 갈아타기 거래 비중이 60%를 넘어섰다.",
    contentParagraphs: [
      "서울 아파트 전세가격이 1년 넘게 연속 상승세를 이어가며 매매가 대비 전세가 비율(전세가율)이 평균 55%를 돌파했다.",
      "신축 아파트 공급 부족과 전세 사기 여파로 아파트 전세 선호 현상이 뚜렷해진 것이 원인으로 분석된다. 전세가격이 매매가격을 밀어 올리는 가운데, 비과세 혜택과 상급지 이동을 노린 1주택 갈아타기 수요가 전체 거래의 60% 이상을 차지하고 있다.",
      "특히 마포·용산·성동(마용성)과 강남 3구, 판교·분당 등 직주근접과 학군이 우수한 핵심 입지의 신축 준신축 단지로 자산이 집중되는 양극화가 심화되고 있다.",
      "시장 전문가들은 당분간 서울 신규 입주 물량이 급감하는 만큼, 실거주 만족도와 미래 가치를 모두 갖춘 매트릭스 상위 우수 단지를 선별하는 안목이 절실하다고 조언했다."
    ],
    keyHighlights: [
      "서울 아파트 전세가율 55% 돌파 및 신축 전세 수요 급증",
      "1주택자 상급지 갈아타기 비중 60% 상회",
      "직주근접·학군지 중심 초양극화 지속 전망"
    ],
    press: "서울경제",
    reporter: "한동훈 기자",
    timeAgo: "7시간 전",
    publishedAt: "2026.08.26 02:10",
    views: "1.9만",
    comments: 37,
    likes: 165,
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80",
    imageCaption: "서울 도심 주요 아파트 단지 전경 및 시세 동향",
    naverNewsUrl: "https://fin.land.naver.com/news",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#전세가율", "#갈아타기", "#상급지", "#시장동향"]
  }
];

export const NaverLandNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  
  // Selected Article for Interactive Modal Viewer
  const [selectedArticle, setSelectedArticle] = useState<NaverArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);

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

  // Filtered Articles
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

  // Featured AI News (Top 3)
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
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleTagClick = (tag: string) => {
    const clean = tag.replace("#", "");
    setSearchTerm(clean);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Npay Naver Real Estate News Header Banner */}
      <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#03c75a] text-white text-xs font-black tracking-wider">
                Npay
              </span>
              <span className="text-xs font-black text-[#029f45] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>실시간 네이버 부동산 뉴스 포털</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>부동산 주요 뉴스 & 동향 브리핑</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium">
              기사를 클릭하면 <strong>[뉴스 전문 상세 리더]</strong>가 즉시 열리며, 원문 보기를 통해 네이버페이 부동산 포털로 이동할 수 있습니다.
            </p>
          </div>

          {/* External Link to Naver Land News */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://fin.land.naver.com/news"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs"
            >
              <Building2 className="w-4 h-4" />
              <span>네이버페이 부동산 뉴스 포털 원문 ↗</span>
            </a>
          </div>
        </div>

        {/* Search Bar & Hot Keywords Bar */}
        <div className="pt-4 space-y-3">
          <div className="relative max-w-2xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="뉴스 검색 (예: 한남뉴타운, 성수, 구리 수택, 디딤돌대출, 왕숙 본청약)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-[#03c75a] focus:bg-white transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                지우기
              </button>
            )}
          </div>

          {/* Rolling Hot Keyword Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-500 font-black shrink-0 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>핫토픽:</span>
            </span>
            {NAVER_HOT_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleTagClick(topic)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-[#029f45] text-slate-700 font-bold transition shrink-0 cursor-pointer text-[11px]"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. AI News Briefing Spotlight & Market Report Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: 🤖 AI 뉴스 3줄 핵심 브리핑 */}
        <div className="lg:col-span-8 space-y-4">
          <div className="naver-card p-5 sm:p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white border border-emerald-800/40 rounded-3xl shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#03c75a] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                    <span>AI가 분석한 오늘의 핵심 부동산 브리핑</span>
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-bold">2026년 8월 4주차 실시간 요약</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                실시간 업데이트
              </span>
            </div>

            {/* AI Summary Bullets */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  1
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  <strong>한강변 메가 재개발 급물살:</strong> 한남3구역 철거 착공 및 성수전략정비구역 50~70층 층수 완화 정비계획 고시로 한강변 하이엔드 희소성 집중 부각.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  2
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  <strong>3기 신도시 본청약 릴레이:</strong> 남양주 왕숙·하남 교산 공공분양 본청약이 본격화되며 분양가상한제 무주택 실수요자 통장 쏠림 현상 심화.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center shrink-0 text-xs mt-0.5">
                  3
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  <strong>대출 규제 속 1주택 실거주 집중:</strong> 스트레스 DSR 2단계 시행으로 갭투자 대신 상급지 1주택 갈아타기 실거주 매수세가 시장 주도.
                </p>
              </div>
            </div>

            {/* Featured 3 Cards Carousel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {aiFeaturedNews.map((news) => (
                <div
                  key={news.id}
                  onClick={() => setSelectedArticle(news)}
                  className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-emerald-500/50 transition flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-black text-emerald-400 block mb-1">
                      {news.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-emerald-300 transition">
                      {news.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-700/60">
                    <span className="font-bold text-slate-300">{news.press}</span>
                    <span className="text-emerald-400 font-bold group-hover:underline">기사 읽기 →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: 📊 아파트 시세 & 주간 상승률 동향 보고서 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="naver-card p-5 bg-white border border-slate-200 shadow-sm rounded-3xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#0066ff]" />
                <h3 className="text-sm font-black text-slate-900">
                  주간 아파트 시세 상승 TOP
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500">한국부동산원 기준</span>
            </div>

            <div className="space-y-2">
              {MARKET_REPORT_DATA.map((item) => (
                <div 
                  key={item.rank}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center font-black text-[11px] ${
                      item.rank <= 3 ? "bg-rose-50 text-rose-600" : "bg-slate-200 text-slate-700"
                    }`}>
                      {item.rank}
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 block">{item.region}</span>
                      <span className="text-[10px] text-slate-500">{item.desc}</span>
                    </div>
                  </div>
                  <span className="font-black text-rose-600 text-xs">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://fin.land.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066ff] text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
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
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer border ${
              selectedCategory === tab.id
                ? "bg-[#03c75a] text-white border-[#03c75a] shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedCategory === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. News Articles Card List (Naver Land News Exact Match Layout) */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
            <p className="font-bold text-base">검색된 뉴스가 없습니다.</p>
            <p className="text-xs">다른 검색어나 카테고리를 선택해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="naver-card p-5 bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#03c75a]/50 transition-all rounded-3xl flex flex-col justify-between group space-y-4 cursor-pointer"
                >
                  {/* Top Thumbnail & Category */}
                  <div className="space-y-3">
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black">
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
                        className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition cursor-pointer ${
                          isBookmarked 
                            ? "bg-[#03c75a] text-white" 
                            : "bg-black/40 text-white/80 hover:text-white"
                        }`}
                        title="북마크"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-[#029f45] transition">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-medium">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  {/* Tags & Footer Meta */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {article.relatedTags.map((tag, idx) => (
                        <span
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagClick(tag);
                          }}
                          className="text-[10px] text-slate-500 hover:text-[#0066ff] font-medium transition cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Press, Time, Views, Actions */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-800">{article.press}</span>
                        <span>·</span>
                        <span>{article.timeAgo}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#03c75a] group-hover:underline">
                        <span>기사 읽기</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. Interactive Full News Reader Modal (네이버 뉴스 전문 리더 모달 - createPortal) */}
      {/* ========================================================================= */}
      {selectedArticle && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999 }}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[88vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-scaleUp my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Navigation Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#03c75a] text-white text-[11px] font-black">
                  Npay 뉴스 리더
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedArticle.categoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareArticle(selectedArticle)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                  title="기사 링크 복사"
                >
                  {copiedId === selectedArticle.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className={`p-2 rounded-full transition cursor-pointer ${
                    bookmarkedIds.includes(selectedArticle.id) 
                      ? "text-[#03c75a] bg-emerald-50" 
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                  title="북마크"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                  title="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Content (Scrollable) */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
              {/* Press & Date Header */}
              <div className="space-y-3 border-b border-slate-100 pb-5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="font-black text-slate-800">{selectedArticle.press}</span>
                    <span>{selectedArticle.reporter}</span>
                    <span>·</span>
                    <span>{selectedArticle.publishedAt}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{selectedArticle.views}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{selectedArticle.comments}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Key AI 3 Highlights Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#029f45]">
                  <Sparkles className="w-4 h-4" />
                  <span>AI 핵심 요약 (3 Key Points)</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 font-medium">
                  {selectedArticle.keyHighlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#03c75a] font-bold shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Photo & Caption */}
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden bg-slate-100 max-h-[380px]">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-slate-500 text-center font-medium">
                  ▲ {selectedArticle.imageCaption}
                </p>
              </div>

              {/* Full Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-800 font-normal">
                {selectedArticle.contentParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {selectedArticle.relatedTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-3.5 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                onClick={() => toggleLike(selectedArticle.id)}
                className={`px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  likedArticles.includes(selectedArticle.id)
                    ? "bg-rose-50 border-rose-300 text-rose-600 font-black"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>좋아요 {selectedArticle.likes + (likedArticles.includes(selectedArticle.id) ? 1 : 0)}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={selectedArticle.naverLandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-1.5 shadow-xs text-center"
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>네이버 부동산 원문 이동 ↗</span>
                </a>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-black transition cursor-pointer shrink-0"
                >
                  닫기
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
