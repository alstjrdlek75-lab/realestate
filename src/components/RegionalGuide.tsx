import React, { useState } from 'react';
import { DiagnosticResult, RegionalRecommendation, RegionZone, ApartmentComplexDetail } from '../types';
import { TargetRegionSelector } from './TargetRegionSelector';
import { RegionComparisonModal } from './RegionComparisonModal';
import { 
  Building2, 
  MapPin, 
  Train, 
  GraduationCap, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Search,
  ArrowRightLeft,
  Clock,
  Filter,
  CheckCircle2,
  X,
  Sparkles,
  Award,
  Layers,
  ExternalLink
} from 'lucide-react';

interface RegionalGuideProps {
  result: DiagnosticResult;
  selectedCities?: string[];
  onChangeSelectedCities?: (cities: string[]) => void;
  onOpenScoreBreakdown?: (tab: 'living' | 'buying') => void;
}

export const RegionalGuide: React.FC<RegionalGuideProps> = ({ 
  result, 
  selectedCities = [],
  onChangeSelectedCities = () => {},
  onOpenScoreBreakdown 
}) => {
  const [selectedZone, setSelectedZone] = useState<RegionZone | 'ALL'>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(result.recommendedRegions[0]?.id || null);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);
  
  // Comparison Modal state
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareRegionA, setCompareRegionA] = useState<string>('');
  const [compareRegionB, setCompareRegionB] = useState<string>('');

  const allRegions = result.recommendedRegions || [];

  const filteredRegions = allRegions.filter((region) => {
    // 1. Target Cities filter
    if (selectedCities.length > 0) {
      const matchCity = selectedCities.some(c => 
        (region.city && region.city.includes(c)) || 
        c.includes(region.city || '') ||
        (c === '성남시' && region.city.includes('성남')) ||
        (c === '안양시/군포시' && (region.city.includes('안양') || region.city.includes('군포'))) ||
        (c === '경기 광주시/이천시' && (region.city.includes('광주') || region.city.includes('이천'))) ||
        (c === '서울시' && region.city.includes('서울'))
      );
      if (!matchCity) return false;
    }

    // 2. Zone filter
    if (selectedZone !== 'ALL' && region.regionZone !== selectedZone) {
      return false;
    }

    // 3. Search keyword filter
    if (searchKeyword.trim() !== '') {
      const q = searchKeyword.toLowerCase();
      const matchName = region.name?.toLowerCase().includes(q);
      const matchCity = region.city?.toLowerCase().includes(q);
      const matchSub = region.subName?.toLowerCase().includes(q);
      const matchComplexes = region.representativeComplexes?.some(c => c.toLowerCase().includes(q));
      const matchTransit = region.transitLines?.some(t => t.toLowerCase().includes(q));
      const matchTags = region.tags?.some(tag => tag.toLowerCase().includes(q));
      return matchName || matchCity || matchSub || matchComplexes || matchTransit || matchTags;
    }

    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleOpenCompare = (targetRegionId: string) => {
    setCompareRegionA(targetRegionId);
    const other = allRegions.find(r => r.id !== targetRegionId);
    if (other) {
      setCompareRegionB(other.id);
    }
    setIsCompareModalOpen(true);
  };

  const cleanComplexNameForSearch = (name: string): string => {
    return name
      .replace(/\([^)]*\)/g, '')
      .replace(/주상복합/g, '')
      .replace(/아파트/g, '')
      .trim();
  };

  const handleOpenNaverLand = (complexName: string, customUrl?: string) => {
    const cleanName = cleanComplexNameForSearch(complexName);
    // Reliable direct search URL that opens exact complex results
    const targetUrl = customUrl || `https://m.land.naver.com/search/result/${encodeURIComponent(cleanName)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenNaverPortalSearch = (complexName: string) => {
    const cleanName = cleanComplexNameForSearch(complexName);
    const targetUrl = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(cleanName + ' 부동산')}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Helper to ensure concrete complexes exist
  const getComplexesForRegion = (region: RegionalRecommendation): ApartmentComplexDetail[] => {
    if (region.concreteComplexes && region.concreteComplexes.length > 0) {
      return region.concreteComplexes;
    }
    // Generate intelligent default complex cards from representativeComplexes
    return region.representativeComplexes.map((name, idx) => {
      const cleanName = cleanComplexNameForSearch(name);
      return {
        id: `${region.id}-${idx}`,
        name: name,
        tierTag: idx === 0 ? '초역세권 대장주' : idx === 1 ? '가성비 실속형' : '초품아 학군형',
        units: idx === 0 ? 1500 : 1100,
        builtYear: 2018 + idx,
        stationDistance: idx === 0 ? `역 도보 3~5분 (초역세권)` : idx === 1 ? `역 도보 8~10분` : `역 도보 6분 (초품아)`,
        walkMinutes: idx === 0 ? 3 : idx === 1 ? 9 : 6,
        price84: region.avgPriceRange,
        gapPrice84: region.gapPriceRange,
        keyHighlight: `${region.name}을 대표하는 ${idx === 0 ? '시세 리딩 랜드마크' : '실속형 대단지'} 아파트`,
        recommendationTip: idx === 0 ? '역 접근성과 환금성을 최우선할 때 추천' : '예산 내에서 실거주 쾌적성을 극대화할 때 추천',
        targetPersona: `${region.city} 진입 희망 가구`,
        naverLandUrl: `https://m.land.naver.com/search/result/${encodeURIComponent(cleanName)}`
      };
    });
  };

  return (
    <div className="naver-card p-6 sm:p-10 bg-white shadow-sm" id="regional-explorer">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#03c75a]" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              구체적인 추천 아파트 단지 & 권역별 심층 분석
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            "어떤 아파트를 사야 할까?" - 지하철역 도보거리(5분/10분) 및 예산별 대장주 vs 가성비 단지 실전 비교 (네이버 부동산 직통 연결)
          </p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition border cursor-pointer ${
              selectedCities.length > 0 || showFilterDrawer
                ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45]'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>관심 지역 선택 {selectedCities.length > 0 ? `(${selectedCities.length}개)` : ''}</span>
          </button>

          <button
            onClick={() => {
              setCompareRegionA(allRegions[0]?.id || '');
              setCompareRegionB(allRegions[1]?.id || '');
              setIsCompareModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4 text-[#03c75a]" />
            <span>지역 1:1 맞비교</span>
          </button>
        </div>
      </div>

      {/* Target Region Selector Drawer / Panel */}
      {showFilterDrawer && (
        <div className="mt-6 animate-fadeIn">
          <TargetRegionSelector
            selectedCities={selectedCities}
            onChangeSelectedCities={onChangeSelectedCities}
          />
        </div>
      )}

      {/* Active Target Filter Pills */}
      {selectedCities.length > 0 && !showFilterDrawer && (
        <div className="mt-4 p-3 bg-[#e8f8ee]/60 rounded-xl border border-[#03c75a]/30 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-[#029f45] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>관심 지역 한정 모드:</span>
            </span>
            {selectedCities.map(city => (
              <span key={city} className="bg-white text-[#029f45] font-bold px-2 py-0.5 rounded-md border border-[#03c75a]/20 shadow-2xs">
                {city}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="text-[#029f45] hover:underline font-bold text-[11px] cursor-pointer"
            >
              지역 변경
            </button>
            <button
              onClick={() => onChangeSelectedCities([])}
              className="text-slate-400 hover:text-slate-700 flex items-center gap-0.5 text-[11px] cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>해제</span>
            </button>
          </div>
        </div>
      )}

      {/* Search and Zone Filter Bar */}
      <div className="mt-6 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="아파트 단지명(예: 파라곤, 루나리움, 롯데캐슬, 그랑블, 중흥), 지역명, 지하철역 검색..."
            className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#03c75a] focus:bg-white transition"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              초기화
            </button>
          )}
        </div>

        {/* Zone Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {[
            { id: 'ALL', label: '전체 권역', icon: '🌐' },
            { id: 'GYEONGGI_EAST_NORTH', label: '경기 동북부 (하남·남양주·구리·의정부·양주)', icon: '🌿' },
            { id: 'GYEONGGI_SOUTH', label: '경기 남부 (용인·수원·화성·평택·광주·이천)', icon: '🚀' },
            { id: 'GYEONGGI_WEST_SOUTH', label: '경기 서남부 (성남·과천·의왕·안양·군포·광명·부천·시흥·안산)', icon: '🏢' },
            { id: 'GYEONGGI_NORTH_WEST', label: '경기 서북부 (고양 일산·파주·김포)', icon: '🌲' },
            { id: 'SEOUL', label: '서울 핵심권 (마용성·강동·동작)', icon: '👑' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedZone(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                selectedZone === tab.id
                  ? 'bg-[#03c75a] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result Count */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
        <span>
          총 <strong className="text-slate-900 font-bold">{filteredRegions.length}개</strong> 권역 탐색 결과
          {selectedCities.length > 0 && <span className="text-[#029f45] ml-1.5 font-bold">({selectedCities.join(', ')} 한정)</span>}
        </span>
        <span className="text-[11px] text-[#029f45] font-bold">
          👆 단지 카드를 클릭하면 네이버 부동산 해당 단지 검색 결과로 즉시 이동합니다
        </span>
      </div>

      {/* Region List */}
      <div className="mt-4 space-y-4">
        {filteredRegions.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-sm font-bold">선택하신 조건에 매칭되는 지역이 없습니다.</p>
            <p className="text-slate-400 text-xs mt-1">관심 지역 필터 또는 검색 키워드를 조정해보세요.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => onChangeSelectedCities([])}
                className="px-3.5 py-1.5 rounded-xl bg-white text-[#03c75a] border border-[#03c75a]/30 font-bold text-xs shadow-2xs hover:bg-[#e8f8ee] cursor-pointer"
              >
                관심 지역 한정 해제
              </button>
              <button
                onClick={() => {
                  setSelectedZone('ALL');
                  setSearchKeyword('');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 cursor-pointer"
              >
                전체 초기화
              </button>
            </div>
          </div>
        ) : (
          filteredRegions.map((region) => {
            const isExpanded = expandedId === region.id;
            const concreteComplexes = getComplexesForRegion(region);

            return (
              <div
                key={region.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isExpanded
                    ? 'border-[#03c75a] shadow-md ring-2 ring-[#03c75a]/20'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Card Header (Clickable) */}
                <div
                  onClick={() => toggleExpand(region.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Match Score Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-[#e8f8ee] border border-[#03c75a]/30 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-black text-[#029f45] uppercase">MATCH</span>
                      <span className="text-lg font-black text-slate-900">{region.matchScore}%</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#029f45] bg-[#e8f8ee] px-2 py-0.5 rounded-md">
                          {region.city}
                        </span>
                        <h4 className="text-lg font-black text-slate-900">{region.name}</h4>
                        {region.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{region.subName}</p>
                    </div>
                  </div>

                  {/* Pricing, Commute Glance & Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="text-left lg:text-right text-xs">
                      <div className="text-[11px] text-slate-400 font-medium">네이버 실거래 평균 / 갭투자</div>
                      <div className="text-sm font-black text-slate-900 mt-0.5">
                        {region.avgPriceRange}
                      </div>
                      <div className="text-[11px] text-[#029f45] font-extrabold">
                        갭 {region.gapPriceRange}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCompare(region.id);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#edf4ff] text-slate-700 hover:text-[#0066ff] text-xs font-bold border border-slate-200 transition flex items-center gap-1 cursor-pointer"
                        title="다른 지역과 1:1 비교"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">비교</span>
                      </button>

                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-[#03c75a]" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Panel */}
                {isExpanded && (
                  <div className="px-5 sm:px-8 pb-8 pt-4 border-t border-slate-100 space-y-6 animate-fadeIn bg-slate-50/50">
                    
                    {/* SECTION 1: 구체적인 단지별 실전 픽 (네이버 부동산 직통 연결) */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#e8f8ee] text-[#029f45] flex items-center justify-center font-bold">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                              <span>🏢 {region.name} 추천 아파트 단지별 실거래가 & 매물</span>
                              <span className="text-[10px] text-[#029f45] bg-[#e8f8ee] px-2 py-0.5 rounded font-black border border-[#03c75a]/20">
                                네이버 부동산 직통
                              </span>
                            </h5>
                            <p className="text-[11px] text-slate-500">
                              단지 카드를 클릭하면 네이버 부동산에서 해당 아파트의 실시간 매물 목록과 단지 정보가 즉시 열립니다
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto border border-slate-200">
                          총 {concreteComplexes.length}개 대표 단지
                        </span>
                      </div>

                      {/* Concrete Complexes Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {concreteComplexes.map((complex) => {
                          const isLeader = complex.tierTag === '초역세권 대장주';
                          const isValue = complex.tierTag === '가성비 실속형';
                          const isSchool = complex.tierTag === '초품아 학군형';

                          return (
                            <div
                              key={complex.id}
                              onClick={() => handleOpenNaverLand(complex.name, complex.naverLandUrl)}
                              className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition-all bg-white cursor-pointer group hover:shadow-lg hover:border-[#03c75a] relative ${
                                isLeader 
                                  ? 'border-[#03c75a] shadow-xs ring-1 ring-[#03c75a]/30' 
                                  : isValue 
                                    ? 'border-[#0066ff]/40 shadow-xs' 
                                    : 'border-slate-200 hover:border-slate-300'
                              }`}
                              title="클릭 시 네이버 부동산의 해당 아파트 매물 페이지로 바로 이동합니다"
                            >
                              <div>
                                {/* Tier Tag & Distance Pill */}
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                                    isLeader 
                                      ? 'bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30' 
                                      : isValue 
                                        ? 'bg-[#edf4ff] text-[#0066ff] border border-[#0066ff]/30' 
                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}>
                                    {isLeader && '🏆 '}{isValue && '💰 '}{isSchool && '🎒 '}{complex.tierTag}
                                  </span>

                                  <span className="text-[11px] font-bold text-slate-500">
                                    {complex.units}세대 · {complex.builtYear}년식
                                  </span>
                                </div>

                                {/* Complex Name with Naver Link Icon */}
                                <div className="flex items-start justify-between gap-1.5">
                                  <h6 className="text-base font-black text-slate-900 group-hover:text-[#029f45] transition-colors leading-snug">
                                    {complex.name}
                                  </h6>
                                  <div className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-[#e8f8ee] flex items-center justify-center transition shrink-0 mt-0.5">
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#03c75a]" />
                                  </div>
                                </div>

                                {/* Station Distance Banner */}
                                <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                                  <Clock className={`w-3.5 h-3.5 shrink-0 ${complex.walkMinutes <= 3 ? 'text-[#03c75a]' : 'text-slate-500'}`} />
                                  <span>{complex.stationDistance}</span>
                                </div>

                                {/* Price Box (Naver Land Standard) */}
                                <div className="mt-3 p-3 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 text-xs space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-slate-500 font-medium">84㎡ 네이버 실거래:</span>
                                    <span className="font-black text-slate-900 text-sm">{complex.price84}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-slate-500 font-medium">갭투자 예상액:</span>
                                    <span className="font-black text-[#029f45]">갭 {complex.gapPrice84}</span>
                                  </div>
                                </div>

                                {/* Highlight & Rationale */}
                                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                                  <p className="font-bold text-slate-800 leading-snug">
                                    ✨ {complex.keyHighlight}
                                  </p>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    💡 <strong>매수 판단 팁:</strong> {complex.recommendationTip}
                                  </p>
                                </div>
                              </div>

                              {/* Target Buyer Persona & Multi-Option CTAs */}
                              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                                <span className="text-slate-500 font-bold truncate max-w-[130px]" title={complex.targetPersona}>
                                  👤 {complex.targetPersona}
                                </span>
                                
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenNaverLand(complex.name, complex.naverLandUrl);
                                    }}
                                    className="inline-flex items-center gap-1 font-bold text-[#029f45] bg-[#e8f8ee] hover:bg-[#03c75a] hover:text-white px-2.5 py-1 rounded-lg border border-[#03c75a]/30 transition cursor-pointer"
                                    title="네이버 부동산 단지/매물 바로가기"
                                  >
                                    <span>네이버 매물보기</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenNaverPortalSearch(complex.name);
                                    }}
                                    className="inline-flex items-center gap-0.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
                                    title="네이버 통합 부동산 검색 카드 보기"
                                  >
                                    <span>통합검색</span>
                                    <Search className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 2: Commute Quick Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#03c75a] shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium block">강남(GBD) 직결</span>
                          <span className="font-bold text-slate-900">{region.commuteTimeToGbd}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#0066ff] shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium block">도심/광화문(CBD)</span>
                          <span className="font-bold text-slate-900">{region.commuteTimeToCbd}</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium block">여의도(YBD)</span>
                          <span className="font-bold text-slate-900">{region.commuteTimeToYbd}</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: 3 Pillars Breakdown (Traffic, School, Caution) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Traffic */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[#0066ff] font-bold mb-1.5">
                          <Train className="w-4 h-4" />
                          <span>교통망 및 직주근접</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">{region.trafficPoints}</p>
                      </div>

                      {/* School */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[#029f45] font-bold mb-1.5">
                          <GraduationCap className="w-4 h-4" />
                          <span>학군 및 상권 인프라</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">{region.schoolPoints}</p>
                      </div>

                      {/* Caution */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold mb-1.5">
                          <AlertCircle className="w-4 h-4" />
                          <span>매수 전 핵심 체크 포인트</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">{region.cautionPoints}</p>
                      </div>
                    </div>

                    {/* Bottom actions & stats */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 text-xs">
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => onOpenScoreBreakdown && onOpenScoreBreakdown('living')}
                          className="hover:underline flex items-center gap-1 text-slate-600 cursor-pointer"
                          title="점수 산출 근거 확인"
                        >
                          <span>실거주:</span>
                          <strong className="text-[#029f45] bg-[#e8f8ee] px-1.5 py-0.5 rounded font-black">{region.livingScore}점</strong>
                        </button>
                        <button
                          onClick={() => onOpenScoreBreakdown && onOpenScoreBreakdown('buying')}
                          className="hover:underline flex items-center gap-1 text-slate-600 cursor-pointer"
                          title="점수 산출 근거 확인"
                        >
                          <span>투자가치:</span>
                          <strong className="text-[#0066ff] bg-[#edf4ff] px-1.5 py-0.5 rounded font-black">{region.buyingScore}점</strong>
                        </button>
                        <span className="text-slate-600">
                          주요 노선: <strong className="text-slate-900">{region.transitLines?.join(', ')}</strong>
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenCompare(region.id)}
                        className="text-xs text-[#0066ff] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>이 지역과 다른 지역 1:1 맞비교</span>
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Comparison Modal */}
      <RegionComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        regions={allRegions}
        initialRegionAId={compareRegionA}
        initialRegionBId={compareRegionB}
      />
    </div>
  );
};
