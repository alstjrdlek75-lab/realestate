import React from 'react';
import { RegionZone } from '../types';
import { MapPin, Check, Filter, RotateCcw, Sparkles } from 'lucide-react';

export interface CityOption {
  city: string;
  shortName: string;
  zone: RegionZone;
}

export const ALL_CITIES_CATALOG: CityOption[] = [
  // 경기 동북부
  { city: '남양주시', shortName: '남양주(다산/별내)', zone: 'GYEONGGI_EAST_NORTH' },
  { city: '구리시', shortName: '구리', zone: 'GYEONGGI_EAST_NORTH' },
  { city: '하남시', shortName: '하남(미사/감일)', zone: 'GYEONGGI_EAST_NORTH' },
  { city: '의정부시', shortName: '의정부', zone: 'GYEONGGI_EAST_NORTH' },
  { city: '양주시', shortName: '양주(옥정/덕정)', zone: 'GYEONGGI_EAST_NORTH' },

  // 경기 남부
  { city: '성남시', shortName: '성남(분당/판교)', zone: 'GYEONGGI_WEST_SOUTH' },
  { city: '용인시', shortName: '용인(수지/기흥)', zone: 'GYEONGGI_SOUTH' },
  { city: '수원시', shortName: '수원(광교/영통/화서)', zone: 'GYEONGGI_SOUTH' },
  { city: '화성시', shortName: '화성(동탄2)', zone: 'GYEONGGI_SOUTH' },
  { city: '평택시', shortName: '평택(고덕/지제)', zone: 'GYEONGGI_SOUTH' },
  { city: '경기 광주시/이천시', shortName: '경기광주/이천', zone: 'GYEONGGI_SOUTH' },

  // 경기 서남부
  { city: '과천시', shortName: '과천(지정타)', zone: 'GYEONGGI_WEST_SOUTH' },
  { city: '의왕시', shortName: '의왕(인덕원/백운)', zone: 'GYEONGGI_WEST_SOUTH' },
  { city: '안양시/군포시', shortName: '안양(평촌)/군포(산본)', zone: 'GYEONGGI_WEST_SOUTH' },
  { city: '광명시', shortName: '광명(철산/일직)', zone: 'GYEONGGI_WEST_SOUTH' },
  { city: '부천시', shortName: '부천(중동/상동)', zone: 'GYEONGGI_WEST_SOUTH' },
  { city: '시흥시', shortName: '시흥(배곧/장현)', zone: 'GYEONGGI_WEST_SOUTH' },
  { city: '안산시', shortName: '안산(고잔/그랑자이)', zone: 'GYEONGGI_WEST_SOUTH' },

  // 경기 서북부
  { city: '고양시', shortName: '고양(일산/삼송)', zone: 'GYEONGGI_NORTH_WEST' },
  { city: '파주시', shortName: '파주(운정신도시)', zone: 'GYEONGGI_NORTH_WEST' },
  { city: '김포시', shortName: '김포(한강신도시)', zone: 'GYEONGGI_NORTH_WEST' },

  // 서울
  { city: '서울시', shortName: '서울 핵심권(마용성·강동·동작)', zone: 'SEOUL' },
];

interface TargetRegionSelectorProps {
  selectedCities: string[];
  onChangeSelectedCities: (cities: string[]) => void;
}

export const TargetRegionSelector: React.FC<TargetRegionSelectorProps> = ({
  selectedCities,
  onChangeSelectedCities,
}) => {
  const isAllSelected = selectedCities.length === 0;

  const handleSelectPreset = (zone?: RegionZone) => {
    if (!zone) {
      // 전체 해제 (전체 보기)
      onChangeSelectedCities([]);
      return;
    }
    const matchingCities = ALL_CITIES_CATALOG.filter(c => c.zone === zone).map(c => c.city);
    onChangeSelectedCities(matchingCities);
  };

  const handleToggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      const next = selectedCities.filter(c => c !== city);
      onChangeSelectedCities(next);
    } else {
      onChangeSelectedCities([...selectedCities, city]);
    }
  };

  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#03c75a]/15 text-[#029f45] flex items-center justify-center font-bold">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900">내 관심 지역(한정) 타겟팅 필터</h4>
            <p className="text-[11px] text-slate-500">원하는 시·군을 선택하면 해당 지역 매물 및 지표만 한정하여 추천합니다</p>
          </div>
        </div>

        {selectedCities.length > 0 && (
          <button
            onClick={() => onChangeSelectedCities([])}
            className="flex items-center gap-1 text-xs text-[#0066ff] hover:underline font-bold self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>전체 지역 보기로 초기화 ({selectedCities.length}개 선택 중)</span>
          </button>
        )}
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-bold text-[11px] mr-1">권역별 원클릭 프리셋:</span>
        <button
          onClick={() => handleSelectPreset()}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            isAllSelected
              ? 'bg-[#03c75a] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          🌐 수도권 전체 보기
        </button>
        <button
          onClick={() => handleSelectPreset('GYEONGGI_EAST_NORTH')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#e8f8ee] text-slate-700 hover:text-[#029f45] font-bold border border-slate-200 transition"
        >
          🌿 경기 동북부 (남양주·구리·하남·의정부·양주)
        </button>
        <button
          onClick={() => handleSelectPreset('GYEONGGI_SOUTH')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#edf4ff] text-slate-700 hover:text-[#0066ff] font-bold border border-slate-200 transition"
        >
          🚀 경기 남부 (용인·수원·화성·성남·평택·광주)
        </button>
        <button
          onClick={() => handleSelectPreset('GYEONGGI_WEST_SOUTH')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 transition"
        >
          🏢 경기 서남부 (과천·의왕·안양·광명·부천·시흥·안산)
        </button>
        <button
          onClick={() => handleSelectPreset('GYEONGGI_NORTH_WEST')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-bold border border-slate-200 transition"
        >
          🌲 경기 서북부 (고양 일산·파주·김포)
        </button>
        <button
          onClick={() => handleSelectPreset('SEOUL')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-bold border border-slate-200 transition"
        >
          👑 서울 핵심권
        </button>
      </div>

      {/* Individual City Checkbox Grid */}
      <div className="pt-2 border-t border-slate-200/80">
        <span className="text-[11px] text-slate-500 font-bold block mb-2">
          개별 시·군 맞춤 체크 (복수 선택 가능):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
          {ALL_CITIES_CATALOG.map((cityOpt) => {
            const isChecked = selectedCities.includes(cityOpt.city);
            return (
              <button
                key={cityOpt.city}
                onClick={() => handleToggleCity(cityOpt.city)}
                className={`p-2 rounded-xl text-left border transition flex items-center justify-between gap-1 text-[11px] font-bold ${
                  isChecked
                    ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] shadow-xs ring-1 ring-[#03c75a]/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="truncate">{cityOpt.shortName}</span>
                {isChecked && <Check className="w-3.5 h-3.5 shrink-0 text-[#03c75a]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
