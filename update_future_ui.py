import re

with open('src/components/RealEstateFuture.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's inspect the block from activeTab === 'NEW_TOWNS'
pattern = re.compile(
    r"\{\/\* =+ \*\/\}\s*\{\/\* SUB-TAB 1: 신도시 & 메가 재개발 지도 & 블록별 공급 도감 \*\/\}\s*\{\/\* =+ \*\/\}\s*\{activeTab === 'NEW_TOWNS' && \(\s*<div className=\"space-y-6 animate-fadeIn\">[\s\S]*?\{\/\* =+ \*\/\}\s*\{\/\* 🗺️ MAP VIEW 1:",
    re.MULTILINE
)

new_town_ui_header = '''{/* ========================================================================= */}
      {/* SUB-TAB 1: 신도시 & 메가 재개발 지도 & 블록별 공급 도감 */}
      {/* ========================================================================= */}
      {activeTab === 'NEW_TOWNS' && (
        <div className="space-y-6 animate-fadeIn">

          {/* 1. Category Filter Switcher & Town Selector Bar (Top Priority) */}
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              {/* Category Segment Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-black">
                <button
                  onClick={() => handleCategoryChange('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    selectedZoneCategory === 'ALL'
                      ? 'bg-white text-slate-900 shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>✨ 전체 통합 ({NEW_TOWNS_DATA.length})</span>
                </button>
                <button
                  onClick={() => handleCategoryChange('NEW_TOWN')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    selectedZoneCategory === 'NEW_TOWN'
                      ? 'bg-[#03c75a] text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🏙️ 3기 신도시 & 신규택지 ({NEW_TOWNS_DATA.filter(t => t.category === 'NEW_TOWN').length})</span>
                </button>
                <button
                  onClick={() => handleCategoryChange('REDEVELOPMENT')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    selectedZoneCategory === 'REDEVELOPMENT'
                      ? 'bg-indigo-600 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🏗️ 서울·수도권 메가 재개발 ({NEW_TOWNS_DATA.filter(t => t.category === 'REDEVELOPMENT').length})</span>
                </button>
              </div>

              {/* Map Mode Switcher (토지이용계획도 vs 광역 노선망) */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold shrink-0 self-end md:self-auto">
                <button
                  onClick={() => setMapViewType('DISTRICT_BLOCKS')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                    mapViewType === 'DISTRICT_BLOCKS' ? 'bg-white text-[#029f45] shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>공식 토지이용계획도</span>
                </button>

                <button
                  onClick={() => setMapViewType('METRO')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                    mapViewType === 'METRO' ? 'bg-white text-[#0066ff] shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>수도권 광역 노선망</span>
                </button>
              </div>
            </div>

            {/* Quick Town / Project Pill Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {displayedTowns.map((town) => {
                const isSelected = selectedTownId === town.id;
                return (
                  <button
                    key={town.id}
                    onClick={() => handleSelectTown(town.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? town.category === 'REDEVELOPMENT' 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-105'
                          : 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm scale-105'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{town.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : town.category === 'REDEVELOPMENT' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'bg-emerald-50 text-[#029f45]'
                    }`}>
                      {town.category === 'REDEVELOPMENT' ? '재개발' : '신도시'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sleek Town Summary & Key Links Header Card */}
          <div className="naver-card p-6 sm:p-7 bg-white border border-slate-200 shadow-sm rounded-3xl space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                    selectedTown.category === 'REDEVELOPMENT'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30'
                  }`}>
                    {selectedTown.categoryLabel}
                  </span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${selectedTown.statusTagColor}`}>
                    {selectedTown.statusTag}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  <span className={selectedTown.category === 'REDEVELOPMENT' ? 'text-indigo-600' : 'text-[#03c75a]'}>
                    {selectedTown.name}
                  </span>
                  <span className="text-slate-500 font-bold text-base sm:text-xl ml-2">
                    ({selectedTown.units} · 계획인구 {selectedTown.plannedPopulation})
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                  📍 {selectedTown.location} · 🏗️ {selectedTown.areaSize}
                </p>
              </div>

              {/* Direct Official Links */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold shrink-0">
                <a 
                  href={selectedTown.lhOfficialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#e8f8ee] hover:bg-[#03c75a] text-[#029f45] hover:text-white transition shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>공식 현황관 ↗</span>
                </a>
                <a 
                  href="https://www.xn--3-3u6ey6lv7rsa.kr/kor/CMS/AreanoticeMgr/list.do?mCode=MN123" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#edf4ff] hover:bg-[#0066ff] text-[#0066ff] hover:text-white transition shadow-2xs"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>청약일정 알리미 ↗</span>
                </a>
                <a 
                  href={selectedTown.namuWikiUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0066ff]" />
                  <span>나무위키 백과 ↗</span>
                </a>
              </div>
            </div>

            {/* ⚡ 10초 실전 청약 팩트 브리핑 (New!) */}
            {SUBSCRIPTION_BRIEFINGS[selectedTown.id] && (
              <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
                  <span className="text-base">⚡</span>
                  <span>{selectedTown.shortName} 10초 실전 청약 팩트 브리핑</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                    <span className="text-slate-400 font-bold block text-[11px]">🚇 핵심 교통망</span>
                    <span className="font-bold text-slate-900 block leading-snug">
                      {SUBSCRIPTION_BRIEFINGS[selectedTown.id].gangnamCommute}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                    <span className="text-slate-400 font-bold block text-[11px]">💰 예상 분양가</span>
                    <span className="font-bold text-[#029f45] block">
                      59㎡ {SUBSCRIPTION_BRIEFINGS[selectedTown.id].estimatedPrice.size59} <br />
                      84㎡ {SUBSCRIPTION_BRIEFINGS[selectedTown.id].estimatedPrice.size84}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                    <span className="text-slate-400 font-bold block text-[11px]">🛡️ 안전마진</span>
                    <span className="font-bold text-slate-800 block leading-snug">
                      {SUBSCRIPTION_BRIEFINGS[selectedTown.id].safetyMargin}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                    <span className="text-slate-400 font-bold block text-[11px]">🎯 당해 거주 배정 룰</span>
                    <span className="font-bold text-blue-700 block leading-snug">
                      {SUBSCRIPTION_BRIEFINGS[selectedTown.id].localPriorityRule}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-white/70 p-2.5 rounded-lg border border-emerald-100 font-medium">
                  💡 <strong className="text-emerald-800 font-bold">실전 청약 추천 트랙:</strong> {SUBSCRIPTION_BRIEFINGS[selectedTown.id].recommendedTrack}
                </div>
              </div>
            )}
          </div>

          {/* 3. ⭐ 무조건 노려야 할 '청약 1순위 추천 대장 블록 TOP 3' (신규!) */}
          {SUBSCRIPTION_BRIEFINGS[selectedTown.id]?.topPickBlocks && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {selectedTown.shortName} 무조건 노려야 할 '청약 1순위 추천 대장 블록 TOP 3'
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  카드를 클릭하면 도면 핀과 세부 스펙으로 즉시 이동합니다
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUBSCRIPTION_BRIEFINGS[selectedTown.id].topPickBlocks.map((pick) => {
                  const isSelected = selectedBlockCode === pick.blockCode;
                  return (
                    <div
                      key={pick.blockCode}
                      onClick={() => {
                        setSelectedBlockCode(pick.blockCode);
                        setMapViewType('DISTRICT_BLOCKS');
                      }}
                      className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-3.5 relative overflow-hidden group ${
                        isSelected
                          ? 'bg-white border-[#03c75a] ring-2 ring-[#03c75a] shadow-md'
                          : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#03c75a]" />
                      )}

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                            pick.rank === 1 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : pick.rank === 2 
                              ? 'bg-blue-50 text-blue-700 border-blue-200' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {pick.badge}
                          </span>
                          <span className="text-xs font-black text-[#0066ff]">
                            {pick.price}
                          </span>
                        </div>

                        <h4 className="text-base font-black text-slate-900 group-hover:text-[#0066ff] transition">
                          {pick.title}
                        </h4>

                        <div className="space-y-1 text-xs text-slate-600 font-medium">
                          {pick.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="text-[#03c75a] font-bold">✔</span>
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <div className="text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 leading-relaxed font-medium">
                          📌 <strong>추천 이유:</strong> {pick.recommendationReason}
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-1">
                          <span>{pick.transit}</span>
                          <span className="text-[#03c75a] flex items-center gap-0.5 group-hover:underline">
                            <span>도면 위치 확인 📍</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* 🗺️ MAP VIEW 1:'''

# Replace using regex
if pattern.search(content):
    content = pattern.sub(new_town_ui_header, content)
    print('Successfully replaced NewTown UI header with sleek 10s briefing and TOP 3 cards!')
else:
    print('Error: Pattern not found!')

with open('src/components/RealEstateFuture.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
