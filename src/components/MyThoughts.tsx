import React, { useState, useMemo } from 'react';
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

import { THOUGHT_ARTICLES, ThoughtArticle } from '../data/thoughtArticles';

interface MyThoughtsProps {
  initialArticleId?: string;
}

export type DifficultyFilter = 'ALL' | '초급 입문' | '중급 실전' | '고급 심화';

export const MyThoughts: React.FC<MyThoughtsProps> = ({ initialArticleId }) => {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleId, setActiveArticleId] = useState<string>(
    initialArticleId || THOUGHT_ARTICLES[0]?.id || 'mortgage-loan-optimization-guide'
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Update active article when initialArticleId prop changes
  React.useEffect(() => {
    if (initialArticleId) {
      setActiveArticleId(initialArticleId);
      const article = THOUGHT_ARTICLES.find(a => a.id === initialArticleId);
      if (article && article.difficulty) {
        setSelectedLevel(article.difficulty);
      } else {
        setSelectedLevel('ALL');
      }
    }
  }, [initialArticleId]);

  const filteredArticles = useMemo(() => {
    return THOUGHT_ARTICLES.filter(art => {
      if (selectedLevel !== 'ALL' && art.difficulty !== selectedLevel) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) || 
          art.summary.toLowerCase().includes(q) || 
          art.tag.toLowerCase().includes(q) ||
          (art.difficulty && art.difficulty.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedLevel, searchQuery]);

  const handleSelectLevel = (level: DifficultyFilter) => {
    setSelectedLevel(level);
    const matched = THOUGHT_ARTICLES.filter(a => level === 'ALL' || a.difficulty === level);
    if (matched.length > 0 && !matched.some(m => m.id === activeArticleId)) {
      setActiveArticleId(matched[0].id);
    }
  };

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

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Clean & High-Contrast Header Banner (Naver Real Estate History Style) */}
      <div className="naver-card p-6 sm:p-10 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30 text-xs font-black mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-[#03c75a]" />
            <span>부동산 실전 칼럼 컬렉션</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            시장 유행에 흔들리지 않는, <br />
            <span className="text-[#03c75a]">부동산 실전 인사이트</span>와 옥석 가리기
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-medium">
            철도 호재 거품 판별부터 진짜 역세권의 디테일한 기준, 생애주기별 자산 배분과 청약·갈아타기 실전 공식까지 — <br className="hidden sm:inline" />
            빅데이터와 실증 사례를 분석하면 <strong>왜 사는(실거주) 집과 사야 하는(자산가치) 집이 달라야 하는지</strong> 그 해답이 보입니다.
          </p>
        </div>
      </div>

      {/* 🟢 Navigation Sub-Tabs: 초급 · 중급 · 고급 난이도별 탭 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-black">
        {/* Tab 1: 전체 */}
        <button
          onClick={() => handleSelectLevel('ALL')}
          className={`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs ${
            selectedLevel === 'ALL'
              ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-md'
              : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">📑</span>
            <span>전체 칼럼</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            selectedLevel === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {THOUGHT_ARTICLES.length}편
          </span>
        </button>

        {/* Tab 2: 초급 입문 */}
        <button
          onClick={() => handleSelectLevel('초급 입문')}
          className={`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs ${
            selectedLevel === '초급 입문'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-white text-slate-800 hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🟢</span>
            <span>초급 (기초·입문)</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            selectedLevel === '초급 입문' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
          }`}>
            {THOUGHT_ARTICLES.filter(a => a.difficulty === '초급 입문').length}편
          </span>
        </button>

        {/* Tab 3: 중급 실전 */}
        <button
          onClick={() => handleSelectLevel('중급 실전')}
          className={`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs ${
            selectedLevel === '중급 실전'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-800 hover:bg-blue-50/50 border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🔵</span>
            <span>중급 (실전·청약·대출)</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            selectedLevel === '중급 실전' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
          }`}>
            {THOUGHT_ARTICLES.filter(a => a.difficulty === '중급 실전').length}편
          </span>
        </button>

        {/* Tab 4: 고급 심화 */}
        <button
          onClick={() => handleSelectLevel('고급 심화')}
          className={`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs ${
            selectedLevel === '고급 심화'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-white text-slate-800 hover:bg-purple-50/50 border-slate-200 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🟣</span>
            <span>고급 (재건축·저평가)</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            selectedLevel === '고급 심화' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
          }`}>
            {THOUGHT_ARTICLES.filter(a => a.difficulty === '고급 심화').length}편
          </span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column: Article List & Search (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="칼럼 제목 및 키워드 검색..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs focus:outline-hidden focus:border-[#03c75a] focus:ring-2 focus:ring-[#03c75a]/20 font-medium shadow-2xs"
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
                  className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    isActive 
                      ? 'bg-white border-[#03c75a] shadow-md ring-1 ring-[#03c75a]' 
                      : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#03c75a]" />
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {art.difficulty && (
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                            art.difficulty === '초급 입문' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : art.difficulty === '중급 실전'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            {art.difficulty}
                          </span>
                        )}
                        {art.youtubeRecommendation && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center gap-1">
                            <span>▶ YouTube</span>
                          </span>
                        )}
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30">
                          {art.tag}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleToggleBookmark(art.id, e)}
                        className="text-slate-400 hover:text-[#03c75a] transition cursor-pointer"
                        title="북마크"
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
            <div className="space-y-4 border-b border-slate-100 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentArticle.difficulty && (
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                      currentArticle.difficulty === '초급 입문' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : currentArticle.difficulty === '중급 실전'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {currentArticle.difficulty}
                    </span>
                  )}
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30">
                    {currentArticle.categoryLabel}
                  </span>
                  <span className="text-[11px] font-black text-slate-500">
                    {currentArticle.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span>{currentArticle.publishedAt} 발행</span>
                  <span>•</span>
                  <span>조회 {currentArticle.views}</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug break-keep">
                {currentArticle.title}
              </h1>

              {currentArticle.subtitle && (
                <div className="text-xs sm:text-sm font-bold text-[#029f45] bg-[#f0faf4] p-3.5 rounded-2xl border border-[#03c75a]/25 flex items-start gap-2">
                  <span className="shrink-0 mt-0.5">💡</span>
                  <span>{currentArticle.subtitle}</span>
                </div>
              )}

              {/* ⚡ 10초 3줄 핵심 요약 (TL;DR) Card */}
              {currentArticle.tldr && currentArticle.tldr.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-xs sm:text-sm">
                    <span className="text-base">⚡</span>
                    <span>10초 3줄 핵심 요약 (TL;DR)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 font-medium">
                    {currentArticle.tldr.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold shrink-0 mt-0.5">✔</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 🎬 YouTube Video & Channel Masterclass Recommendation Widget (Top Prominent Placement) */}
              {currentArticle.youtubeRecommendation && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-50 via-slate-50 to-white border border-red-200 space-y-2.5 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FF0000] text-white flex items-center justify-center font-black shadow-xs shrink-0">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-red-600">
                          🎬 이 칼럼과 함께 보면 200% 도움 되는 추천 유튜브
                        </div>
                        <div className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                          <span>{currentArticle.youtubeRecommendation.channelName}</span>
                          {currentArticle.youtubeRecommendation.channelSubscribers && (
                            <span className="text-[11px] text-slate-500 font-medium">
                              (구독자 {currentArticle.youtubeRecommendation.channelSubscribers})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <a
                      href={currentArticle.youtubeRecommendation.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-black transition flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
                    >
                      <span>YouTube에서 영상 보기 ↗</span>
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="text-red-500">▶</span>
                      <span>추천 주제: {currentArticle.youtubeRecommendation.topicTitle}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-3.5">
                      {currentArticle.youtubeRecommendation.highlight}
                    </p>
                  </div>
                </div>
              )}

              {/* Author / Source Meta Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#03c75a] text-white flex items-center justify-center font-black text-[10px]">
                    N
                  </div>
                  <span className="font-bold text-slate-700">부동산 실전 리서치팀</span>
                </div>
                <span>소요시간 약 {currentArticle.readTime}</span>
              </div>
            </div>

            {/* Intro Lead Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {currentArticle.contentParagraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Core Structural Reasons / Key Points */}
            {currentArticle.keyPoints && currentArticle.keyPoints.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#03c75a]" />
                  <span>핵심 구조적 원인 심층 분석</span>
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {currentArticle.keyPoints.map(point => (
                    <div 
                      key={point.num}
                      className="p-5 sm:p-6 rounded-2xl bg-[#f8faf9] border border-slate-200/90 space-y-3 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#03c75a] text-white font-black text-xs flex items-center justify-center shadow-xs">
                          {point.num}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          {point.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pl-8 whitespace-pre-line">
                        {point.description}
                      </p>

                      {point.quote && (
                        <div className="ml-8 p-3.5 rounded-xl bg-white border-l-4 border-l-[#03c75a] border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
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
                  <span>핵심 비교 및 가이드 요약</span>
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-800 font-black">
                        {currentArticle.tableData.headers.map((h, i) => (
                          <th key={i} className={`p-3.5 whitespace-nowrap ${i === 1 ? 'text-[#0066ff]' : i === 2 ? 'text-[#029f45]' : ''}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700 bg-white">
                      {currentArticle.tableData.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#f8faf9] transition-colors">
                          <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 whitespace-nowrap">{row.category}</td>
                          <td className="p-3.5 text-slate-600">{row.col1}</td>
                          <td className="p-3.5 font-bold text-[#029f45]">{row.col2}</td>
                          {row.col3 && (
                            <td className="p-3.5 font-black text-indigo-600">{row.col3}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Final Conclusion Box (Naver Pay Clean Green Style) */}
            {currentArticle.conclusion && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#e8f8ee] border border-[#03c75a]/35 flex items-start gap-3.5 text-xs sm:text-sm text-slate-800 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-[#03c75a] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <strong className="text-slate-900 block font-black text-sm sm:text-base">
                    💡 필자의 최종 결론 및 자산 배분 조언
                  </strong>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {currentArticle.conclusion}
                  </p>
                </div>
              </div>
            )}

            {/* 🎬 YouTube Video & Channel Masterclass Recommendation Widget */}
            {currentArticle.youtubeRecommendation && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-red-50/70 via-slate-50 to-white border border-red-200/90 space-y-3.5 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FF0000] text-white flex items-center justify-center font-black shadow-xs shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-red-600 flex items-center gap-1.5">
                        <span>🎬 이 칼럼과 함께 보면 200% 도움 되는 추천 유튜브</span>
                      </div>
                      <div className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                        <span>{currentArticle.youtubeRecommendation.channelName}</span>
                        {currentArticle.youtubeRecommendation.channelSubscribers && (
                          <span className="text-xs text-slate-500 font-medium">
                            (구독자 {currentArticle.youtubeRecommendation.channelSubscribers})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <a
                    href={currentArticle.youtubeRecommendation.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                  >
                    <span>YouTube에서 영상 검색 ↗</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm space-y-1.5 shadow-2xs">
                  <div className="font-black text-slate-900 flex items-center gap-1.5">
                    <span className="text-red-500 font-bold">▶</span>
                    <span>추천 영상 주제: {currentArticle.youtubeRecommendation.topicTitle}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed pl-4">
                    {currentArticle.youtubeRecommendation.highlight}
                  </p>
                </div>
              </div>
            )}

            {/* Footer action bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <Eye className="w-4 h-4 text-slate-400" />
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
                  <Heart className={`w-3.5 h-3.5 ${likedIds.includes(currentArticle.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>좋아요 {currentArticle.likes + (likedIds.includes(currentArticle.id) ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert('칼럼 링크가 복사되었습니다.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
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
