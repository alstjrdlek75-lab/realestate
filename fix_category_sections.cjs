const fs = require('fs');

let content = fs.readFileSync('src/components/NaverLandNews.tsx', 'utf-8');

// Update NAVER_OFFICIAL_SECTIONS with category mapping and unique naver live search URLs
const oldSectionsBlock = `const NAVER_OFFICIAL_SECTIONS = [
  {
    title: "⚡ 실시간 헤드라인 속보",
    desc: "네이버페이 부동산 전체 속보 (최신순)",
    url: "https://land.naver.com/news/headline.naver",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "📋 분양 & 청약 실시간",
    desc: "3기 신도시 · 공공분양 경쟁률 속보",
    url: "https://land.naver.com/news/field.naver?type=sale",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "🏗️ 재개발 & 재건축",
    desc: "한남·성수·노량진 시공사 수주·인가",
    url: "https://land.naver.com/news/field.naver?type=rebuild",
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "🏛️ 대출 · 정책 · 세제",
    desc: "DSR 2단계 · 디딤돌 · 금리 정책 속보",
    url: "https://land.naver.com/news/field.naver?type=policy",
    color: "from-purple-500 to-violet-600"
  },
  {
    title: "📈 시세 & 실거래가 신고가",
    desc: "주간 부동산원 지수 & 강남·마용성 동향",
    url: "https://land.naver.com/news/field.naver?type=market",
    color: "from-rose-500 to-pink-600"
  }
];`;

const newSectionsBlock = `export interface OfficialSectionItem {
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
];`;

content = content.replace(oldSectionsBlock, newSectionsBlock);

// Replace the render of the 5 sections so clicking filters the page AND provides direct distinct link
const oldRenderBlock = `<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {NAVER_OFFICIAL_SECTIONS.map((sec, idx) => (
              <a
                key={idx}
                href={sec.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#f8faf9] hover:bg-[#e8f8ee] border border-slate-200 hover:border-[#03c75a] transition group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-black text-slate-900 group-hover:text-[#028137] flex items-center justify-between">
                    <span>{sec.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#03c75a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                    {sec.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>`;

const newRenderBlock = `<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {NAVER_OFFICIAL_SECTIONS.map((sec, idx) => {
              const isSelected = selectedCategory === sec.category;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(sec.category);
                    setSearchTerm("");
                  }}
                  className={\`p-3.5 rounded-2xl transition cursor-pointer flex flex-col justify-between border-2 shadow-2xs group relative \${
                    isSelected 
                      ? "bg-[#e8f8ee] border-[#03c75a] text-[#028137] shadow-sm" 
                      : "bg-[#f8faf9] hover:bg-slate-100 border-slate-200 text-slate-800"
                  }\`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={\`text-xs font-black \${isSelected ? "text-[#028137]" : "text-slate-950"}\`}>
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
                    <div className={\`text-[11px] mt-1 font-medium leading-tight \${isSelected ? "text-[#028137]/80 font-bold" : "text-slate-500"}\`}>
                      {sec.desc}
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                    <span className={\`font-bold \${isSelected ? "text-[#028137]" : "text-slate-400"}\`}>
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
          </div>`;

content = content.replace(oldRenderBlock, newRenderBlock);

fs.writeFileSync('src/components/NaverLandNews.tsx', content, 'utf-8');
console.log('Successfully fixed 5 category buttons with dedicated URLs and in-app instant filter!');
