import React, { useState, useMemo } from "react";
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
  Layers
} from "lucide-react";

export type NewsCategory = "ALL" | "REDEV" | "NEWTOWN" | "POLICY" | "TRANSIT" | "MARKET";

export interface NaverArticle {
  id: string;
  category: NewsCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  press: string;
  timeAgo: string;
  views: string;
  comments: number;
  imageUrl: string;
  naverNewsUrl: string;
  naverLandUrl: string;
  isHot?: boolean;
  isAiFeatured?: boolean;
  relatedTags: string[];
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
    id: "news-1",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "한남뉴타운 한남3구역 철거 본격화… ‘디에이치 한남’ 5,816세대 대한민국 최고 부촌 카운트다운",
    summary: "서울 용산구 한남3구역이 주민 이주를 마무리하고 본격 철거에 돌입했다. 현대건설이 시공하는 5,816세대 디에이치 한남은 2026년 일반분양을 목표로 속도를 낸다.",
    press: "한국경제",
    timeAgo: "15분 전",
    views: "1.8만",
    comments: 42,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=한남3구역+디에이치한남+착공",
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
    press: "매일경제",
    timeAgo: "42분 전",
    views: "2.4만",
    comments: 68,
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=성수전략정비구역+70층+서울숲",
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
    press: "헤럴드경제",
    timeAgo: "1시간 전",
    views: "1.2만",
    comments: 25,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=구리+수택동+재개발+현대건설+7007세대",
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
    press: "머니투데이",
    timeAgo: "2시간 전",
    views: "3.1만",
    comments: 89,
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=남양주왕숙+하남교산+본청약+분양가",
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
    press: "아시아경제",
    timeAgo: "3시간 전",
    views: "9,800",
    comments: 18,
    imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=구리토평2+공공주택지구+기본구상",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#구리토평2", "#장자호수공원", "#한강조망", "#신규택지"]
  },
  {
    id: "news-6",
    category: "REDEV",
    categoryLabel: "재개발·재건축",
    title: "노량진1구역 포스코 ‘오티에르 노량진’ 시공 계약 완료… 여의도 배후 3,000세대 대장주 닻 올려",
    summary: "노량진뉴타운의 33% 규모를 차지하는 노량진1구역(2,992세대)이 포스코이앤씨 하이엔드 브랜드 오티에르를 확정하고 관리처분인가 절차에 돌입했다. 여의도 금융가 직주근접 1순위로 꼽힌다.",
    press: "조선일보",
    timeAgo: "4시간 전",
    views: "1.5만",
    comments: 31,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=노량진1구역+오티에르+포스코",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#노량진뉴타운", "#오티에르", "#포스코이앤씨", "#여의도배후"]
  },
  {
    id: "news-7",
    category: "POLICY",
    categoryLabel: "정책·대출·세금",
    title: "스트레스 DSR 2단계 시행 후 수도권 대출 한도 5천만~1억 축소… 실수요자 자금 전략 재점검 필수",
    summary: "금융당국의 가계부채 관리 강화로 2단계 스트레스 DSR이 본격 시행되면서 수도권 주택담보대출 한도가 크게 줄어들었다. 전문가들은 LTV와 DSR 여력을 정밀 진단할 것을 권고한다.",
    press: "연합뉴스",
    timeAgo: "5시간 전",
    views: "4.2만",
    comments: 114,
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=스트레스DSR+주택담보대출+한도",
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
    press: "동아일보",
    timeAgo: "6시간 전",
    views: "2.1만",
    comments: 48,
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=GTX_B+GTX_C+착공+역세권",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#GTX_A", "#GTX_B", "#GTX_C", "#광역교통망"]
  },
  {
    id: "news-9",
    category: "MARKET",
    categoryLabel: "시세·시장동향",
    title: "서울 아파트 전세가율 상승세 지속… ‘갭투자 대신 똘똘한 1채 실거주 갈아타기’ 뚜렷",
    summary: "서울 및 수도권 핵심지 전세가격이 수개월 연속 상승하면서 매매가와 전세가 격차가 좁혀지고 있다. 다주택 규제 속에 1주택자의 상급지 갈아타기 거래 비중이 60%를 넘어섰다.",
    press: "서울경제",
    timeAgo: "7시간 전",
    views: "1.9만",
    comments: 37,
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop&q=80",
    naverNewsUrl: "https://search.naver.com/search.naver?where=news&query=서울아파트+전세가율+갈아타기",
    naverLandUrl: "https://fin.land.naver.com/news",
    relatedTags: ["#전세가율", "#갈아타기", "#상급지", "#시장동향"]
  }
];

export const NaverLandNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

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
              3기 신도시, 메가 재개발, DSR 대출 규제, 시세 동향까지 네이버 부동산과 연동된 최신 뉴스를 확인하세요.
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
              placeholder="뉴스 검색 (예: 한남뉴타운, 구리 수택, 디딤돌대출, 왕숙 본청약)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-[#03c75a] focus:bg-white transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
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
                <a
                  key={news.id}
                  href={news.naverNewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-black text-emerald-400 block mb-1">
                      {news.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-emerald-300 transition">
                      {news.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-700/60">
                    <span>{news.press}</span>
                    <span>{news.timeAgo}</span>
                  </div>
                </a>
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
                  className="naver-card p-5 bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all rounded-3xl flex flex-col justify-between group space-y-4"
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
                          e.preventDefault();
                          toggleBookmark(article.id);
                        }}
                        className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition ${
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
                    <a
                      href={article.naverNewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <h3 className="text-base font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-[#029f45] transition">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-medium">
                        {article.summary}
                      </p>
                    </a>
                  </div>

                  {/* Tags & Footer Meta */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {article.relatedTags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTagClick(tag)}
                          className="text-[10px] text-slate-500 hover:text-[#0066ff] font-medium transition cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Press, Time, Views, Actions */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-800">{article.press}</span>
                        <span>·</span>
                        <span>{article.timeAgo}</span>
                      </div>

                      <a
                        href={article.naverNewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#03c75a] hover:underline"
                      >
                        <span>원문 보기</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
