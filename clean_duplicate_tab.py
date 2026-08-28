import re

with open('src/components/RealEstateFuture.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update FutureTab type
content = content.replace(
    "type FutureTab = 'NEW_TOWNS' | 'DISTRICT_MEMORIZE' | 'FUTURE_NEWS' | 'GLOSSARY';",
    "type FutureTab = 'NEW_TOWNS' | 'DISTRICT_MEMORIZE' | 'GLOSSARY';"
)

# 2. Update sub-tabs buttons array
old_tabs_array = """      {/* Main 4 Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs sm:text-sm">
        {[
          { id: 'NEW_TOWNS', label: '1. 신도시 & 메가 재개발 도면 및 전수 도감', icon: '🗺️' },
          { id: 'DISTRICT_MEMORIZE', label: '2. 서울 25개 구 & 경기 31개 시·군 암기 도감', icon: '🧠' },
          { id: 'FUTURE_NEWS', label: '3. 미래 주목 변수 & 실시간 네이버 뉴스', icon: '📡' },
          { id: 'GLOSSARY', label: '4. 필수 부동산·대출 용어 & 실시간 계산기', icon: '📚' },
        ].map((tab) => ("""

new_tabs_array = """      {/* Main 3 Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs sm:text-sm">
        {[
          { id: 'NEW_TOWNS', label: '1. 신도시 & 메가 재개발 도면 및 전수 도감', icon: '🗺️' },
          { id: 'DISTRICT_MEMORIZE', label: '2. 서울 25개 구 & 경기 31개 시·군 암기 도감', icon: '🧠' },
          { id: 'GLOSSARY', label: '3. 필수 부동산 용어 · 4대 미래 변수 & 실시간 계산기', icon: '📚' },
        ].map((tab) => ("""

if old_tabs_array in content:
    content = content.replace(old_tabs_array, new_tabs_array)
    print('Replaced sub-tabs buttons array successfully.')
else:
    print('Warning: old_tabs_array not matched directly, checking regex...')

# 3. Remove NaverLandNews duplicate and integrate 4 future variables into GLOSSARY
# Find activeTab === 'FUTURE_NEWS' section
pattern_future_news = re.compile(
    r"\{\/\* =+ \*\/\}\s*\{\/\* SUB-TAB 3: 미래 주목 변수 & 실시간 뉴스 \*\/\}\s*\{\/\* =+ \*\/\}\s*\{activeTab === 'FUTURE_NEWS' && \([\s\S]*?\)\}\s*",
    re.MULTILINE
)

# Extract the 4 megatrends part from FUTURE_NEWS to put into GLOSSARY if needed
megatrends_section = """
          {/* Top Section: 4 Future Megatrends */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm rounded-3xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-6 h-6 text-[#03c75a] animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  앞으로 우리가 반드시 주목해야 할 4대 미래 핵심 변수
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                2026~2030년 수도권 부동산 시장의 승패를 가를 메가트렌드와 투자 체크포인트
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Point 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#029f45] bg-[#e8f8ee] px-2.5 py-1 rounded-md border border-[#03c75a]/20">
                    미래 변수 ①
                  </span>
                  <span className="text-xs text-slate-400 font-bold">인구 감소 vs 가구 분화</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  '초양극화'의 고착화 — 모두가 오르는 장은 끝났다
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  전국 총인구는 줄어들지만, <strong>수도권 1~2인 가구 및 고소득 3040 가구는 2040년까지 지속 증가</strong>합니다. 
                  지방 및 외곽 비역세권 나홀로 단지는 인구 소멸 위험에 노출되는 반면, <strong>강남 직결 황금노선 역세권과 학군지 대단지</strong>는 자산 쏠림 현상이 극대화되어 시세 격차가 2배 이상 벌어집니다.
                </p>
              </div>

              {/* Point 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#0066ff] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    미래 변수 ②
                  </span>
                  <span className="text-xs text-slate-400 font-bold">공사비 급등 & 공급 절벽</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  신축 희소성 폭발 — '오늘의 분양가가 가장 싸다'
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  원자재 가격과 인건비 상승으로 서울 평균 분양가가 3.3㎡(평)당 4,500만 원을 돌파했습니다. 
                  인허가 및 착공 물량이 급감하여 2026~2028년 수도권 입주 물량 절벽이 현실화됨에 따라, <strong>입지가 검증된 3기 신도시 분양가상한제 단지와 서울 핵심 재개발 신축</strong>의 희소 가치는 더욱 치솟습니다.
                </p>
              </div>

              {/* Point 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                    미래 변수 ③
                  </span>
                  <span className="text-xs text-slate-400 font-bold">스트레스 DSR 2·3단계</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  대출 한도 축소 — '내 돈(현금)' 비중이 높은 자산가 장세
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  2024년 하반기부터 스트레스 DSR 2단계가 본격 도입되고 향후 3단계로 확대되면서 연소득 대비 대출 가능 금액이 5,000만~1억 원 이상 삭감되었습니다. 영끌 투자가 불가능해지면서 <strong>현금 동원력이 충분한 무주택 실수요자</strong> 중심의 똘똘한 한 채 갈아타기가 핵심 트렌드로 자리잡았습니다.
                </p>
              </div>

              {/* Point 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    미래 변수 ④
                  </span>
                  <span className="text-xs text-slate-400 font-bold">수도권 교통망 빅뱅</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  GTX 개통 & 지하철 연장선 — 서울 20분 생활권 재편
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  GTX-A 개통을 필두로 GTX-B, GTX-C 및 지하철 3·8·9호선 연장선이 순차 개통됩니다. 
                  과거 '거리상 멀었던' 수도권 외곽이 <strong>강남역·서울역 15~20분대 직결 생활권</strong>으로 탈바꿈하면서 3기 신도시 핵심 역세권 블록의 가치가 서울 중하위권 구축을 역전하는 현상이 발생합니다.
                </p>
              </div>
            </div>
          </div>
"""

# Delete FUTURE_NEWS block
content = pattern_future_news.sub("", content)

# Put megatrends_section inside GLOSSARY
glossary_marker = "{activeTab === 'GLOSSARY' && (\n        <div className=\"space-y-6 animate-fadeIn\">"
if glossary_marker in content:
    content = content.replace(glossary_marker, glossary_marker + megatrends_section)
    print('Inserted 4 Megatrends into GLOSSARY successfully.')
else:
    print('Warning: glossary_marker not found directly')

# Also remove NaverLandNews import from RealEstateFuture.tsx if it is no longer used there
content = content.replace("import { NaverLandNews } from './NaverLandNews';\n", "")

with open('src/components/RealEstateFuture.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Cleaned up RealEstateFuture.tsx successfully.')
