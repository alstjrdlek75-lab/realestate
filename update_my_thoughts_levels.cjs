const fs = require('fs');

let content = fs.readFileSync('src/components/MyThoughts.tsx', 'utf-8');

// Replace state and tab logic
const oldStateBlock = `export const MyThoughts: React.FC<MyThoughtsProps> = ({ initialArticleId }) => {
  const [selectedTag, setSelectedTag] = useState<string>('전체');
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
      if (article) {
        // Clear search or reset tag if needed
        setSelectedTag('전체');
      }
    }
  }, [initialArticleId]);

  const filteredArticles = THOUGHT_ARTICLES.filter(art => {
    if (selectedTag !== '전체' && art.tag !== selectedTag) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return art.title.toLowerCase().includes(q) || art.summary.toLowerCase().includes(q) || art.tag.toLowerCase().includes(q);
    }
    return true;
  });`;

const newStateBlock = `export type DifficultyFilter = 'ALL' | '초급 입문' | '중급 실전' | '고급 심화';

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
  };`;

content = content.replace(oldStateBlock, newStateBlock);

// Replace the sub-tabs rendering block
const oldTabsRenderBlock = `{/* Navigation Sub-Tabs (Clean Naver Tab Style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={\`px-4 py-3 rounded-2xl whitespace-nowrap font-black transition flex items-center gap-1.5 cursor-pointer border \${
              selectedTag === tag
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
            }\`}
          >
            <span>{tag === '전체' ? '📑 전체 칼럼' : tag}</span>
          </button>
        ))}
      </div>`;

const newTabsRenderBlock = `{/* 🟢 Navigation Sub-Tabs: 초급 · 중급 · 고급 난이도별 탭 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-black">
        {/* Tab 1: 전체 */}
        <button
          onClick={() => handleSelectLevel('ALL')}
          className={\`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs \${
            selectedLevel === 'ALL'
              ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-md'
              : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200'
          }\`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">📑</span>
            <span>전체 칼럼</span>
          </div>
          <span className={\`text-xs px-2 py-0.5 rounded-full font-bold \${
            selectedLevel === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }\`}>
            {THOUGHT_ARTICLES.length}편
          </span>
        </button>

        {/* Tab 2: 초급 입문 */}
        <button
          onClick={() => handleSelectLevel('초급 입문')}
          className={\`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs \${
            selectedLevel === '초급 입문'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-white text-slate-800 hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-300'
          }\`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🟢</span>
            <span>초급 (기초·입문)</span>
          </div>
          <span className={\`text-xs px-2 py-0.5 rounded-full font-bold \${
            selectedLevel === '초급 입문' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
          }\`}>
            {THOUGHT_ARTICLES.filter(a => a.difficulty === '초급 입문').length}편
          </span>
        </button>

        {/* Tab 3: 중급 실전 */}
        <button
          onClick={() => handleSelectLevel('중급 실전')}
          className={\`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs \${
            selectedLevel === '중급 실전'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-800 hover:bg-blue-50/50 border-slate-200 hover:border-blue-300'
          }\`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🔵</span>
            <span>중급 (실전·청약·대출)</span>
          </div>
          <span className={\`text-xs px-2 py-0.5 rounded-full font-bold \${
            selectedLevel === '중급 실전' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
          }\`}>
            {THOUGHT_ARTICLES.filter(a => a.difficulty === '중급 실전').length}편
          </span>
        </button>

        {/* Tab 4: 고급 심화 */}
        <button
          onClick={() => handleSelectLevel('고급 심화')}
          className={\`p-3.5 rounded-2xl transition flex items-center justify-between border-2 cursor-pointer shadow-2xs \${
            selectedLevel === '고급 심화'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-white text-slate-800 hover:bg-purple-50/50 border-slate-200 hover:border-purple-300'
          }\`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🟣</span>
            <span>고급 (재건축·저평가)</span>
          </div>
          <span className={\`text-xs px-2 py-0.5 rounded-full font-bold \${
            selectedLevel === '고급 심화' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
          }\`}>
            {THOUGHT_ARTICLES.filter(a => a.difficulty === '고급 심화').length}편
          </span>
        </button>
      </div>`;

content = content.replace(oldTabsRenderBlock, newTabsRenderBlock);

// Remove unused allTags if any
content = content.replace("const allTags = ['전체', ...Array.from(new Set(THOUGHT_ARTICLES.map(a => a.tag)))];", "");

fs.writeFileSync('src/components/MyThoughts.tsx', content, 'utf-8');
console.log('Successfully updated MyThoughts.tsx with Beginner, Intermediate, Advanced level tabs!');
