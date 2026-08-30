const fs = require('fs');

let content = fs.readFileSync('src/components/MyThoughts.tsx', 'utf-8');

// Replace the top YouTube card block
const topYtCardOld = `{/* 🎬 YouTube Video & Channel Masterclass Recommendation Widget (Top Prominent Placement) */}
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
              )}`;

const topYtCardNew = `{/* 🎬 YouTube Video & Channel Masterclass Recommendation Widget (Top Prominent Placement) */}
              {currentArticle.youtubeRecommendation && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-50 via-slate-50 to-white border border-red-200 space-y-3 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FF0000] text-white flex items-center justify-center font-black shadow-xs shrink-0">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPlayingVideoId(playingVideoId === currentArticle.id ? null : currentArticle.id)}
                        className={\`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer \${
                          playingVideoId === currentArticle.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }\`}
                      >
                        <span>{playingVideoId === currentArticle.id ? '✕ 영상 닫기' : '▶ 인앱 영상 재생'}</span>
                      </button>

                      <a
                        href={currentArticle.youtubeRecommendation.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-black transition flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
                      >
                        <span>YouTube 앱 열기 ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Inline YouTube Player if open */}
                  {playingVideoId === currentArticle.id && (
                    <div className="rounded-2xl overflow-hidden aspect-video w-full bg-black shadow-lg border border-slate-300 animate-fadeIn">
                      <iframe
                        className="w-full h-full"
                        src={\`https://www.youtube-nocookie.com/embed/\${currentArticle.youtubeRecommendation.videoId}?autoplay=1\`}
                        title={currentArticle.youtubeRecommendation.topicTitle}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="text-red-500">▶</span>
                      <span>추천 영상: {currentArticle.youtubeRecommendation.topicTitle}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-3.5">
                      {currentArticle.youtubeRecommendation.highlight}
                    </p>
                  </div>
                </div>
              )}`;

content = content.replace(topYtCardOld, topYtCardNew);

// Remove duplicate bottom YT card or update it similarly
const bottomYtCardPattern = /\{\/\* 🎬 YouTube Video & Channel Masterclass Recommendation Widget \*\/\}[\s\S]*?\{\/\* Footer action bar \*\/\}/;
content = content.replace(bottomYtCardPattern, '{/* Footer action bar */}');

fs.writeFileSync('src/components/MyThoughts.tsx', content, 'utf-8');
console.log('Successfully updated MyThoughts.tsx with in-app YouTube player and exact video links!');
