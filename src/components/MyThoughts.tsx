import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  Building2, 
  HelpCircle, 
  CheckCircle2, 
  Calendar, 
  Eye, 
  Heart, 
  Share2, 
  MessageSquare, 
  ChevronRight, 
  Filter, 
  Search,
  Layers,
  ShieldAlert,
  ArrowUpRight,
  Lightbulb,
  Bookmark
} from 'lucide-react';

interface ThoughtArticle {
  id: string;
  tag: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  readTime: string;
  views: string;
  likes: number;
  featured?: boolean;
  summary: string;
  contentParagraphs: string[];
  keyPoints: {
    num: number;
    title: string;
    description: string;
    quote: string;
  }[];
  tableData?: {
    headers: string[];
    rows: { category: string; col1: string; col2: string }[];
  };
  conclusion: string;
}

const THOUGHT_ARTICLES: ThoughtArticle[] = [
  {
    id: 'officetel-live-vs-buy',
    tag: '#오피스텔_매매주의',
    categoryLabel: '부동산 심층 칼럼',
    title: '살기는 편한데 사기는 꺼려지는 오피스텔, 왜 자산가치는 오르지 않을까?',
    subtitle: '“오피스텔은 사는(거주) 곳이지, 사는(매수) 것이 아니다”',
    publishedAt: '2026.08.26',
    readTime: '4분',
    views: '1.4만',
    likes: 382,
    featured: true,
    summary: '오피스텔은 역세권 입지, 빌트인 가전, 우수한 보안, 편리한 주차 환경 덕분에 1~2인 가구의 실거주 만족도가 매우 높은 주거 형태입니다. 그럼에도 불구하고 실수요자와 투자자 모두 "오피스텔은 전·월세로만 살고 매매는 하지 마라"고 조언하는 결정적 이유는 미래 자산가치 상승에 대한 기대가 아파트에 비해 압도적으로 낮기 때문입니다.',
    contentParagraphs: [
      '역세권에 자리 잡은 깔끔한 오피스텔은 빌라나 다세대 주택에 비해 보안이 철저하고 관리 시스템이 잘 갖춰져 있어 1~2인 가구에게 훌륭한 주거 선택지입니다. 하지만 매매 시장으로 눈을 돌리면 이야기가 완전히 달라집니다.',
      '“오피스텔은 사는(거주) 곳이지, 사는(매수) 것이 아니다”라는 부동산 시장의 격언처럼, 매매 수요는 아파트에 비해 현저히 낮습니다. 주거 편의성에도 불구하고 오피스텔의 미래 가치 상승이 제한적인 구조적 이유는 다음과 같습니다.'
    ],
    keyPoints: [
      {
        num: 1,
        title: '토지 지분(대지지분)의 절대적 부족',
        description: '부동산 가격 상승의 본질은 감가상각되는 ‘건물’이 아니라 영구적인 ‘땅(토지)’의 가치 상승에 있습니다. 오피스텔은 상업지역이나 준주거지역의 높은 용적률을 활용해 좁은 토지 위에 고층으로 빽빽하게 짓기 때문에, 세대당 배분되는 대지지분이 아파트에 비해 턱없이 적습니다. 건물이 노후화될수록 건물 가치는 0에 수렴하는데, 이를 방어해 줄 토지 지분이 작아 시간이 흐를수록 시세가 정체되거나 하락하기 쉽습니다.',
        quote: '건물은 낡아 감가상각되지만, 땅의 가치는 영원히 우상향합니다.'
      },
      {
        num: 2,
        title: '재건축·리모델링 등 출구 전략의 부재',
        description: '아파트는 지은 지 30년이 지나면 재건축이나 재개발에 대한 기대감으로 가격이 다시 반등하는 사이클을 가집니다. 반면 오피스텔은 건축법상 업무시설로 분류되어 용적률이 이미 최대치(600~1,000%)에 도달해 있는 경우가 대부분입니다. 상가와 오피스텔 소유주 간의 복잡한 이해관계, 낮은 사업성 때문에 노후화 이후 재건축을 추진하기가 현실적으로 불가능에 가깝습니다.',
        quote: '용적률이 이미 800%에 달한 오피스텔을 헐고 다시 지을 수 있는 사업성은 없습니다.'
      },
      {
        num: 3,
        title: '주택 수 산정과 세제 규제의 불리함',
        description: '오피스텔을 취득할 때는 주택 취득세율(1~3%)이 아닌 상가 취득세율(4.6%)을 적용받아 초기 진입 비용이 큽니다. 주거용으로 전입신고를 하여 사용하면 다주택자 판단 시 주택 수에 포함되어, 향후 아파트 청약이나 양도소득세 중과 등 세제 혜택에서 불리하게 작용합니다.',
        quote: '살 때는 4.6% 상가세율, 갖고 있을 땐 주택 수에 잡혀 청약 페널티를 받습니다.'
      },
      {
        num: 4,
        title: '수익형 부동산과 차익형 부동산의 태생적 한계',
        description: '아파트는 매매차익을 목표로 하는 차익형 자산입니다. 반면 오피스텔은 매월 안정적인 임대료를 목적으로 하는 수익형(월세 흐름) 자산입니다. 오피스텔의 매매가는 기대 임대수익률에 의해 가격 상한선이 결정되는 경향이 강해, 인근 지역 아파트 가격이 급등할 때도 오피스텔은 소외되는 현상이 반복됩니다.',
        quote: '월세 수익률 공식에 갇힌 자산은 결코 인플레이션을 뛰어넘는 시세 차익을 주지 못합니다.'
      }
    ],
    tableData: {
      headers: ['구분', '주거용 오피스텔', '일반 아파트'],
      rows: [
        { category: '주요 목적', col1: '월세 임대수익 (수익형 자산)', col2: '시세 차익 (차익형 자산)' },
        { category: '대지지분', col1: '매우 작음 (토지 지분 미미)', col2: '상대적으로 큼 (토지 지분 확보)' },
        { category: '노후 시 출구전략', col1: '재건축 사실상 불가 (용적률 포화)', col2: '재건축·리모델링으로 가치 반등' },
        { category: '취득세율', col1: '4.6% (지방교육세 포함 상가세율)', col2: '1.1% ~ 3.5% (1주택 실수요자 우대)' },
        { category: '환금성(유동성)', col1: '낮음 (거래량 적음, 하락기 매도 곤란)', col2: '높음 (시장 유동성 및 거래량 풍부)' }
      ]
    },
    conclusion: '결론적으로 오피스텔은 주거의 편의성과 현금 흐름을 확보하는 용도로는 유효하지만, 인플레이션을 방어하고 자산의 스노우볼 효과를 기대하는 \'내 집 마련\'의 관점에서는 치명적인 한계를 가집니다. 주거 만족도가 자산 가치의 상승과 반드시 비례하지 않는다는 점을 명확히 인지하고 접근해야 합니다. 실거주는 역세권 가성비 전·월세로 누리고, 소중한 종잣돈은 반드시 토지 지분이 살아 숨쉬는 아파트에 집중하십시오.'
  },
  {
    id: 'commute-vs-capital-gap',
    tag: '#거주와투자의분리',
    categoryLabel: '실전 전략 칼럼',
    title: '직장 앞 낡은 빌라 매수 vs 상급지 전세 낀 갭투자, 10년 뒤의 격차',
    subtitle: '감정적 주거 소비와 자본 투자를 섞는 순간 자산 증식은 멈춘다',
    publishedAt: '2026.08.20',
    readTime: '3분',
    views: '9.8천',
    likes: 215,
    summary: '많은 사회초년생과 신혼부부가 "출퇴근이 힘드니까 직장 근처에 작은 집이라도 사자"며 외곽 구축이나 빌라, 오피스텔을 매수합니다. 하지만 5년 뒤 자산 격차는 3배 이상 벌어집니다.',
    contentParagraphs: [
      '내가 당장 살기 편한 집(소비)과 남들이 웃돈을 주고서라도 사고 싶어 하는 집(투자)은 일치하기 어렵습니다.',
      '초기 자본이 부족할수록 ‘실거주’와 ‘자산 매수’를 분리해야 소중한 자본이 갇히지 않습니다.'
    ],
    keyPoints: [
      {
        num: 1,
        title: '환금성 없는 자산에 전 재산을 묶지 마라',
        description: '빌라나 나홀로 동은 살 때는 쉬워도 팔 때는 제값을 받기 어렵습니다. 하락장이 오면 매수자가 전멸합니다.',
        quote: '부동산의 제1원칙은 "내가 원할 때 제값에 팔고 나올 수 있는가"입니다.'
      },
      {
        num: 2,
        title: '똘똘한 상급지 1채의 힘',
        description: '서울 핵심지 및 경기 1급지 대단지 아파트는 하락장에서 하방 경직성을 보이고 상승장에서 시장을 주도합니다.',
        quote: '똘똘한 1채가 어설픈 외곽 3채를 압도합니다.'
      }
    ],
    conclusion: '가용 자본이 7억 원 안팎일 때는 무리해서 초고가 중심지에 진입하기보다, 8호선(다산/별내/구리)이나 신분당선 축의 실속 징검다리 아파트를 공략하는 것이 가장 현명합니다.'
  },
  {
    id: 'dsr-and-stress-test',
    tag: '#대출한도전략',
    categoryLabel: '금융 실전 칼럼',
    title: '총부채원리금상환비율(DSR) 강화 시대, 무리한 영끌 대출이 끝난 이유',
    subtitle: '연소득 8천만 원 기준 대출 가능액이 8,000만 원 줄어든 현실',
    publishedAt: '2026.08.15',
    readTime: '3분',
    views: '8.2천',
    likes: 194,
    summary: '기준금리가 내려가더라도 대출 규제 때문에 실제 빌릴 수 있는 총액은 오히려 줄어들고 있습니다. 지금 부동산 시장은 대출 레버리지가 아니라 현금 보유력과 상환 안전성이 지배합니다.',
    contentParagraphs: [
      '스트레스 대출 규제는 미래 금리 변동 위험을 가산금리로 선반영하여 무리한 대출을 원천 차단하는 제도입니다.',
      '월 상환 원리금이 가계 소득의 40%를 넘으면 어떤 금융 위기에도 버틸 수 없습니다.'
    ],
    keyPoints: [
      {
        num: 1,
        title: '금리가 내려가도 대출 한도는 더 조여진다',
        description: '가산금리 적용으로 동일 소득 대비 대출 가능액이 5천만~1억 원 축소되었습니다.',
        quote: '정책 금융(디딤돌, 신생아특례) 자격이 아니라면 자기자본 비중을 40% 이상 확보해야 안전합니다.'
      }
    ],
    conclusion: '대출을 무리하게 당기는 위험한 전략 대신, 매월 안정적으로 갚아나갈 수 있는 안전 예산(원리금 200만 원대)을 먼저 확정하십시오.'
  }
];

export const MyThoughts: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleId, setActiveArticleId] = useState<string>('officetel-live-vs-buy');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const filteredArticles = THOUGHT_ARTICLES.filter(art => {
    if (selectedTag !== '전체' && art.tag !== selectedTag) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return art.title.toLowerCase().includes(q) || art.summary.toLowerCase().includes(q) || art.tag.toLowerCase().includes(q);
    }
    return true;
  });

  const currentArticle = THOUGHT_ARTICLES.find(a => a.id === activeArticleId) || THOUGHT_ARTICLES[0];

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const allTags = ['전체', '#오피스텔_매매주의', '#거주와투자의분리', '#대출한도전략'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-[#03c75a] border border-emerald-500/30 text-xs font-black">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>부동산 인사이트 & 실전 칼럼</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            읽어볼만한 생각들
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            시장 유행과 호가에 휩쓸리지 않고, <strong>부동산의 본질(대지지분, 출구전략, 세제, 현금흐름)</strong>을 꿰뚫어보는 실전 투자·거주 칼럼 모음집입니다.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Article List & Filter (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#03c75a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="칼럼 제목 및 키워드 검색..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#03c75a]/30 font-medium"
            />
          </div>

          {/* Article Cards List */}
          <div className="space-y-3">
            {filteredArticles.map(art => {
              const isActive = art.id === activeArticleId;
              const isBookmarked = bookmarkedIds.includes(art.id);
              const isLiked = likedIds.includes(art.id);

              return (
                <div
                  key={art.id}
                  onClick={() => setActiveArticleId(art.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive 
                      ? 'bg-white border-[#03c75a] ring-2 ring-[#03c75a]/30 shadow-md' 
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-[#029f45] border border-emerald-200">
                        {art.tag}
                      </span>
                      <button
                        onClick={(e) => handleToggleBookmark(art.id, e)}
                        className="text-slate-400 hover:text-[#03c75a] transition cursor-pointer"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#03c75a] text-[#03c75a]' : ''}`} />
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-t border-slate-100 pt-2.5">
                    <div className="flex items-center gap-3">
                      <span>{art.publishedAt}</span>
                      <span>읽는 시간 {art.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <button 
                        onClick={(e) => handleToggleLike(art.id, e)}
                        className="flex items-center gap-1 hover:text-rose-500 transition cursor-pointer"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{art.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Full In-Depth Article Reader (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            
            {/* Article Top Header */}
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#029f45] border border-emerald-200">
                  {currentArticle.categoryLabel}
                </span>
                <span className="text-[11px] font-black text-slate-500">
                  {currentArticle.tag}
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentArticle.publishedAt} 발행
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug break-keep">
                {currentArticle.title}
              </h1>

              {currentArticle.subtitle && (
                <p className="text-sm sm:text-base font-bold text-[#029f45] bg-[#e8f8ee] p-3 rounded-xl border border-[#03c75a]/20">
                  💡 {currentArticle.subtitle}
                </p>
              )}
            </div>

            {/* Intro Lead Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {currentArticle.contentParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* 4 Key Points / Core Structural Reasons */}
            {currentArticle.keyPoints && currentArticle.keyPoints.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>핵심 구조적 원인 심층 분석</span>
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {currentArticle.keyPoints.map(point => (
                    <div 
                      key={point.num}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                          {point.num}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          {point.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-8">
                        {point.description}
                      </p>

                      {point.quote && (
                        <div className="ml-8 p-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 italic">
                          "{point.quote}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparison Table Data if present */}
            {currentArticle.tableData && (
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#0066ff]" />
                  <span>주거용 오피스텔 vs 일반 아파트 핵심 비교</span>
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-black">
                        {currentArticle.tableData.headers.map((h, i) => (
                          <th key={i} className={`p-3.5 ${i === 2 ? 'text-[#029f45]' : ''}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {currentArticle.tableData.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">{row.category}</td>
                          <td className="p-3.5 text-slate-600">{row.col1}</td>
                          <td className="p-3.5 font-bold text-[#029f45]">{row.col2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Final Conclusion Box */}
            {currentArticle.conclusion && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#e8f8ee] border border-[#03c75a]/30 flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-[#03c75a] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-slate-900 block font-black text-sm sm:text-base">
                    💡 필자의 최종 결론 및 자산 배분 조언
                  </strong>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {currentArticle.conclusion}
                  </p>
                </div>
              </div>
            )}

            {/* Footer action bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <Eye className="w-4 h-4" />
                <span>조회수 {currentArticle.views}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleToggleLike(currentArticle.id, e)}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 transition cursor-pointer ${
                    likedIds.includes(currentArticle.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedIds.includes(currentArticle.id) ? 'fill-rose-500' : ''}`} />
                  <span>좋아요 {currentArticle.likes + (likedIds.includes(currentArticle.id) ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert('칼럼 링크가 복사되었습니다.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>공유하기</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
