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

import { THOUGHT_ARTICLES, ThoughtArticle } from '../data/thoughtArticles';

export const MyThoughts: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleId, setActiveArticleId] = useState<string>(THOUGHT_ARTICLES[0]?.id || 'life-cycle-housing-guide');
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

  const allTags = ['전체', ...Array.from(new Set(THOUGHT_ARTICLES.map(a => a.tag)))];

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

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-8 whitespace-pre-line">
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
                  <span>핵심 비교 및 가이드 요약</span>
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-black">
                        {currentArticle.tableData.headers.map((h, i) => (
                          <th key={i} className={`p-3.5 whitespace-nowrap ${i === 1 ? 'text-[#0066ff]' : i === 2 ? 'text-[#029f45]' : ''}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {currentArticle.tableData.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
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
