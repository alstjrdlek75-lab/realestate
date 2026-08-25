import React, { useState } from 'react';
import { RegionalRecommendation } from '../types';
import { X, ArrowRightLeft, Train } from 'lucide-react';

interface RegionComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  regions: RegionalRecommendation[];
  initialRegionAId?: string;
  initialRegionBId?: string;
}

export const RegionComparisonModal: React.FC<RegionComparisonModalProps> = ({
  isOpen,
  onClose,
  regions,
  initialRegionAId,
  initialRegionBId,
}) => {
  const [regionAId, setRegionAId] = useState<string>(initialRegionAId || regions[0]?.id || '');
  const [regionBId, setRegionBId] = useState<string>(initialRegionBId || regions[1]?.id || '');

  if (!isOpen) return null;

  const regionA = regions.find(r => r.id === regionAId) || regions[0];
  const regionB = regions.find(r => r.id === regionBId) || regions[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-6 border-b border-slate-100 pr-10">
          <div className="flex items-center gap-2 text-xs font-black text-[#029f45] uppercase tracking-wider mb-1">
            <ArrowRightLeft className="w-4 h-4" />
            <span>수도권 권역 1:1 심층 비교 분석기</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            관심 지역 실시간 스펙 & 매수 지표 맞비교
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            두 지역의 실거주 점수, 자산 가치, 시세 및 출퇴근 소요시간을 나란히 비교해보세요
          </p>
        </div>

        {/* Region Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Region A Selector */}
          <div className="bg-[#e8f8ee]/40 p-4 rounded-2xl border border-[#03c75a]/30">
            <label className="text-xs font-bold text-[#029f45] block mb-2">비교 대상 A 선택</label>
            <select
              value={regionA.id}
              onChange={(e) => setRegionAId(e.target.value)}
              className="w-full bg-white text-slate-900 font-bold text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-2xs focus:outline-none focus:border-[#03c75a]"
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  [{r.city}] {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region B Selector */}
          <div className="bg-[#edf4ff]/40 p-4 rounded-2xl border border-[#0066ff]/30">
            <label className="text-xs font-bold text-[#0066ff] block mb-2">비교 대상 B 선택</label>
            <select
              value={regionB.id}
              onChange={(e) => setRegionBId(e.target.value)}
              className="w-full bg-white text-slate-900 font-bold text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-2xs focus:outline-none focus:border-[#0066ff]"
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  [{r.city}] {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Column A */}
          <div className="space-y-4">
            <div className="bg-[#e8f8ee] p-5 rounded-2xl border border-[#03c75a]/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#029f45]">{regionA.city}</span>
                <span className="text-xs font-black bg-white text-[#029f45] px-2.5 py-0.5 rounded-full border border-[#03c75a]/20 shadow-2xs">
                  매칭도 {regionA.matchScore}%
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">{regionA.name}</h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">{regionA.category}</p>
            </div>

            {/* Scores & Prices */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">실거주 만족도 (Living)</span>
                <span className="font-black text-[#029f45] text-sm">{regionA.livingScore}점</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">자산 투자 가치 (Buying)</span>
                <span className="font-black text-[#0066ff] text-sm">{regionA.buyingScore}점</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">평균 매매가 (84㎡)</span>
                <span className="font-bold text-slate-900">{regionA.avgPriceRange}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">전세 갭투자금</span>
                <span className="font-bold text-[#029f45]">{regionA.gapPriceRange}</span>
              </div>
            </div>

            {/* Commute Times */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <Train className="w-4 h-4 text-[#0066ff]" />
                <span>주요 업무지구 소요시간</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span className="text-slate-500">강남(GBD)</span>
                <span className="font-bold text-[#029f45]">{regionA.commuteTimeToGbd}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span className="text-slate-500">광화문/도심(CBD)</span>
                <span className="font-semibold text-slate-800">{regionA.commuteTimeToCbd}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span className="text-slate-500">여의도(YBD)</span>
                <span className="font-semibold text-slate-800">{regionA.commuteTimeToYbd}</span>
              </div>
            </div>

            {/* Landmark Complexes */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <span className="text-slate-500 block font-semibold mb-2">대표 랜드마크 단지</span>
              <div className="flex flex-wrap gap-1.5">
                {regionA.representativeComplexes.map(c => (
                  <span key={c} className="bg-white text-slate-800 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-200 shadow-2xs">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths & Caution */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
              <div>
                <span className="text-[#029f45] font-bold block mb-1">핵심 강점</span>
                <ul className="space-y-1 text-slate-700 font-medium">
                  {regionA.keyStrengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#03c75a]">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-amber-700 font-bold block mb-1">주의 및 리스크</span>
                <p className="text-slate-600 leading-relaxed font-medium">{regionA.cautionPoints}</p>
              </div>
            </div>
          </div>

          {/* Column B */}
          <div className="space-y-4">
            <div className="bg-[#edf4ff] p-5 rounded-2xl border border-[#0066ff]/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0066ff]">{regionB.city}</span>
                <span className="text-xs font-black bg-white text-[#0066ff] px-2.5 py-0.5 rounded-full border border-[#0066ff]/20 shadow-2xs">
                  매칭도 {regionB.matchScore}%
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">{regionB.name}</h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">{regionB.category}</p>
            </div>

            {/* Scores & Prices */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">실거주 만족도 (Living)</span>
                <span className="font-black text-[#029f45] text-sm">{regionB.livingScore}점</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">자산 투자 가치 (Buying)</span>
                <span className="font-black text-[#0066ff] text-sm">{regionB.buyingScore}점</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">평균 매매가 (84㎡)</span>
                <span className="font-bold text-slate-900">{regionB.avgPriceRange}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">전세 갭투자금</span>
                <span className="font-bold text-[#029f45]">{regionB.gapPriceRange}</span>
              </div>
            </div>

            {/* Commute Times */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <Train className="w-4 h-4 text-[#0066ff]" />
                <span>주요 업무지구 소요시간</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span className="text-slate-500">강남(GBD)</span>
                <span className="font-bold text-[#029f45]">{regionB.commuteTimeToGbd}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span className="text-slate-500">광화문/도심(CBD)</span>
                <span className="font-semibold text-slate-800">{regionB.commuteTimeToCbd}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span className="text-slate-500">여의도(YBD)</span>
                <span className="font-semibold text-slate-800">{regionB.commuteTimeToYbd}</span>
              </div>
            </div>

            {/* Landmark Complexes */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <span className="text-slate-500 block font-semibold mb-2">대표 랜드마크 단지</span>
              <div className="flex flex-wrap gap-1.5">
                {regionB.representativeComplexes.map(c => (
                  <span key={c} className="bg-white text-slate-800 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-200 shadow-2xs">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths & Caution */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
              <div>
                <span className="text-[#0066ff] font-bold block mb-1">핵심 강점</span>
                <ul className="space-y-1 text-slate-700 font-medium">
                  {regionB.keyStrengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#0066ff]">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-amber-700 font-bold block mb-1">주의 및 리스크</span>
                <p className="text-slate-600 leading-relaxed font-medium">{regionB.cautionPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
