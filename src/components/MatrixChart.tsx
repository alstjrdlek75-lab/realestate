import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  LabelList
} from 'recharts';
import { DiagnosticResult, RegionZone } from '../types';
import { Sparkles, MapPin, Compass, Info, ChevronRight, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface MatrixChartProps {
  result: DiagnosticResult;
  selectedCities?: string[];
  onOpenScoreBreakdown?: (tab: 'living' | 'buying') => void;
}

interface BenchmarkPoint {
  id: string;
  name: string;
  shortLabel: string;
  living: number;
  buying: number;
  type: 'market' | 'user';
  regionName: string;
  zone: RegionZone | 'USER';
  city: string;
}

export const MatrixChart: React.FC<MatrixChartProps> = ({ 
  result, 
  selectedCities = [],
  onOpenScoreBreakdown 
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'GYEONGGI' | 'SEOUL'>('ALL');

  const rawBenchmarkData: BenchmarkPoint[] = [
    // 서울
    { id: 'mpy', name: '마포·성동 (마용성)', shortLabel: '마용성', living: 94, buying: 96, type: 'market', regionName: '핵심 상급지', zone: 'SEOUL', city: '서울시' },
    { id: 'gdk', name: '강동 고덕 대단지', shortLabel: '강동고덕', living: 95, buying: 90, type: 'market', regionName: '핵심 상급지', zone: 'SEOUL', city: '서울시' },
    { id: 'djk', name: '동작 흑석·노량진', shortLabel: '동작흑석', living: 87, buying: 97, type: 'market', regionName: '갭투자 유망', zone: 'SEOUL', city: '서울시' },
    
    // 경기 동북부
    { id: 'dsn', name: '남양주 다산신도시', shortLabel: '남양주 다산', living: 93, buying: 86, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_EAST_NORTH', city: '남양주시' },
    { id: 'bn', name: '남양주 별내신도시', shortLabel: '남양주 별내', living: 90, buying: 84, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_EAST_NORTH', city: '남양주시' },
    { id: 'gr', name: '구리시 (인창/갈매)', shortLabel: '구리', living: 89, buying: 88, type: 'market', regionName: '실속 징검다리', zone: 'GYEONGGI_EAST_NORTH', city: '구리시' },
    { id: 'ms', name: '하남 미사강변', shortLabel: '하남 미사', living: 95, buying: 90, type: 'market', regionName: '핵심 상급지', zone: 'GYEONGGI_EAST_NORTH', city: '하남시' },
    { id: 'ujb', name: '의정부 (GTX-C)', shortLabel: '의정부', living: 87, buying: 82, type: 'market', regionName: '실속 징검다리', zone: 'GYEONGGI_EAST_NORTH', city: '의정부시' },
    { id: 'yj', name: '양주 옥정신도시', shortLabel: '양주 옥정', living: 86, buying: 79, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_EAST_NORTH', city: '양주시' },

    // 경기 남부
    { id: 'bd', name: '성남 분당·판교', shortLabel: '분당·판교', living: 98, buying: 96, type: 'market', regionName: '핵심 상급지', zone: 'GYEONGGI_WEST_SOUTH', city: '성남시' },
    { id: 'sj', name: '용인 수지 (성복/풍덕천)', shortLabel: '용인 수지', living: 94, buying: 91, type: 'market', regionName: '핵심 상급지', zone: 'GYEONGGI_SOUTH', city: '용인시' },
    { id: 'gh', name: '용인 기흥 플랫폼시티', shortLabel: '용인 기흥', living: 89, buying: 89, type: 'market', regionName: '갭투자 유망', zone: 'GYEONGGI_SOUTH', city: '용인시' },
    { id: 'gg', name: '수원 광교신도시', shortLabel: '수원 광교', living: 97, buying: 93, type: 'market', regionName: '핵심 상급지', zone: 'GYEONGGI_SOUTH', city: '수원시' },
    { id: 'yt', name: '수원 영통·화서', shortLabel: '수원 영통/화서', living: 91, buying: 87, type: 'market', regionName: '실속 징검다리', zone: 'GYEONGGI_SOUTH', city: '수원시' },
    { id: 'dt', name: '화성 동탄2신도시', shortLabel: '화성 동탄', living: 94, buying: 89, type: 'market', regionName: '핵심 상급지', zone: 'GYEONGGI_SOUTH', city: '화성시' },
    { id: 'pt', name: '평택 고덕·지제역', shortLabel: '평택 고덕', living: 88, buying: 85, type: 'market', regionName: '실속 징검다리', zone: 'GYEONGGI_SOUTH', city: '평택시' },
    { id: 'gj', name: '경기광주·이천', shortLabel: '광주/이천', living: 86, buying: 81, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_SOUTH', city: '경기 광주시/이천시' },

    // 경기 서남부
    { id: 'gc', name: '과천 지식정보타운', shortLabel: '과천', living: 97, buying: 96, type: 'market', regionName: '핵심 상급지', zone: 'GYEONGGI_WEST_SOUTH', city: '과천시' },
    { id: 'uw', name: '의왕 인덕원·백운', shortLabel: '의왕 인덕원', living: 92, buying: 90, type: 'market', regionName: '핵심 상급지', zone: 'GYEONGGI_WEST_SOUTH', city: '의왕시' },
    { id: 'pc', name: '안양 평촌·군포 산본', shortLabel: '평촌/산본', living: 89, buying: 83, type: 'market', regionName: '실속 징검다리', zone: 'GYEONGGI_WEST_SOUTH', city: '안양시/군포시' },
    { id: 'gm', name: '광명 철산·일직', shortLabel: '광명', living: 86, buying: 88, type: 'market', regionName: '실속 징검다리', zone: 'GYEONGGI_WEST_SOUTH', city: '광명시' },
    { id: 'bc', name: '부천 중동·상동', shortLabel: '부천 중동', living: 89, buying: 84, type: 'market', regionName: '실속 징검다리', zone: 'GYEONGGI_WEST_SOUTH', city: '부천시' },
    { id: 'sh', name: '시흥 배곧·장현', shortLabel: '시흥 배곧', living: 88, buying: 83, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_WEST_SOUTH', city: '시흥시' },
    { id: 'as', name: '안산 고잔·그랑자이', shortLabel: '안산 고잔', living: 88, buying: 82, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_WEST_SOUTH', city: '안산시' },

    // 경기 서북부
    { id: 'is', name: '고양 일산 킨텍스·삼송', shortLabel: '고양 일산/삼송', living: 92, buying: 84, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_NORTH_WEST', city: '고양시' },
    { id: 'pj', name: '파주 운정신도시', shortLabel: '파주 운정', living: 90, buying: 85, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_NORTH_WEST', city: '파주시' },
    { id: 'gp', name: '김포 한강신도시', shortLabel: '김포 한강', living: 87, buying: 81, type: 'market', regionName: '가성비 실거주', zone: 'GYEONGGI_NORTH_WEST', city: '김포시' },

    // User Point
    { id: 'user', name: '★ 나의 진단 포지션', shortLabel: '★ 나 (진단 결과)', living: result.livingScore, buying: result.buyingScore, type: 'user', regionName: result.quadrantName, zone: 'USER', city: 'USER' },
  ];

  const benchmarkData = rawBenchmarkData.filter(pt => {
    if (pt.type === 'user') return true;

    // Filter by selected target cities if any
    if (selectedCities.length > 0) {
      const matchCity = selectedCities.some(c => pt.city.includes(c) || c.includes(pt.city));
      if (!matchCity) return false;
    }

    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'SEOUL') return pt.zone === 'SEOUL';
    if (activeFilter === 'GYEONGGI') return pt.zone !== 'SEOUL';
    return true;
  });

  // Find nearest regions to user dot
  const marketPointsOnly = benchmarkData.filter(pt => pt.type !== 'user');
  const closestRegions = marketPointsOnly.map(pt => {
    const dist = Math.sqrt(Math.pow(pt.living - result.livingScore, 2) + Math.pow(pt.buying - result.buyingScore, 2));
    return { ...pt, distance: Math.round(dist * 10) / 10 };
  }).sort((a, b) => a.distance - b.distance).slice(0, 3);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as BenchmarkPoint;
      const isUser = data.type === 'user';
      return (
        <div className={`p-4 rounded-2xl border shadow-xl backdrop-blur-md bg-white ${
          isUser 
            ? 'border-[#03c75a] ring-2 ring-[#03c75a]/30' 
            : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2 font-black text-sm text-slate-900">
            {isUser ? <Sparkles className="w-4 h-4 text-[#03c75a]" /> : <MapPin className="w-4 h-4 text-[#0066ff]" />}
            <span>{data.name}</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{data.regionName}</div>
          
          <div className="mt-3 text-xs space-y-1.5 border-t border-slate-100 pt-2.5 font-bold">
            <div className="text-[#029f45] flex justify-between gap-6">
              <span>🌿 살기 좋은 집 (Living):</span>
              <span>{data.living}점</span>
            </div>
            <div className="text-[#0066ff] flex justify-between gap-6">
              <span>🚀 사야 하는 집 (Buying):</span>
              <span>{data.buying}점</span>
            </div>
          </div>

          {isUser ? (
            <div 
              onClick={() => onOpenScoreBreakdown && onOpenScoreBreakdown('living')}
              className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-[#03c75a] font-black cursor-pointer hover:underline flex items-center justify-center gap-1"
            >
              <span>점수 산출 세부 근거 보기 →</span>
            </div>
          ) : (
            <div className="mt-2 text-[10px] text-slate-400">
              내 포지션과의 성향 거리: {Math.sqrt(Math.pow(data.living - result.livingScore, 2) + Math.pow(data.buying - result.buyingScore, 2)).toFixed(1)}점 차이
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="naver-card p-6 sm:p-8 bg-white relative shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#03c75a]" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Living vs Buying 2x2 매트릭스</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedCities.length > 0 
              ? `내 관심지역 [${selectedCities.join(', ')}] 기준 최적 지역 매핑`
              : '수도권 주요 권역과 나의 거주·투자 밸런스 비교'}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            전체 ({benchmarkData.length}개)
          </button>
          <button
            onClick={() => setActiveFilter('GYEONGGI')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeFilter === 'GYEONGGI' ? 'bg-white text-[#03c75a] font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            경기도 집중
          </button>
          <button
            onClick={() => setActiveFilter('SEOUL')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeFilter === 'SEOUL' ? 'bg-white text-[#0066ff] font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            서울권
          </button>
        </div>
      </div>

      {/* Super Clear "How to Read this Chart" Guide Box */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#e8f8ee]/60 via-slate-50 to-[#edf4ff]/60 border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900 mb-2">
          <HelpCircle className="w-4 h-4 text-[#03c75a]" />
          <span>📌 이 차트를 읽는 법 (3초 핵심 요약)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 font-medium">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="font-bold text-[#0066ff] block mb-0.5">1. 가로축 (Buying: 사야 할 집)</span>
            <span className="text-slate-600 text-[11px] leading-tight block">
              오른쪽으로 갈수록 <strong>강남 직결, 시세 상승력, 대단지 환금성</strong>이 높음
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="font-bold text-[#029f45] block mb-0.5">2. 세로축 (Living: 살기 좋은 집)</span>
            <span className="text-slate-600 text-[11px] leading-tight block">
              위로 갈수록 <strong>신축 커뮤니티, 출퇴근 쾌적성, 슬세권 상권</strong>이 우수함
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="font-bold text-[#029f45] flex items-center gap-1 mb-0.5">
              <span>3. 🟢 초록 점 = 나의 현재 위치</span>
            </span>
            <span className="text-slate-600 text-[11px] leading-tight block">
              내 점(🟢)과 <strong>가장 가까운 파란 점(🔵)들</strong>이 내게 딱 맞는 추천 지역입니다!
            </span>
          </div>
        </div>
      </div>

      {/* Quadrant Legend Grid */}
      <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
        <div className={`p-3 rounded-xl border ${
          result.quadrant === 'SMART_LIVING' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-1 ring-[#03c75a]/30' 
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span>2사분면: 가성비 쾌적 실거주지</span>
            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">High Living / Low Buying</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">남양주 다산/별내, 파주운정, 일산, 김포, 시흥배곧</div>
        </div>

        <div className={`p-3 rounded-xl border ${
          result.quadrant === 'SUPER_CORE' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-1 ring-[#03c75a]/30' 
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span>1사분면: 핵심 상급지 (Super Core)</span>
            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">High Living / High Buying</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">분당·판교, 과천, 광교, 용인 수지, 화성 동탄, 마용성</div>
        </div>

        <div className={`p-3 rounded-xl border ${
          result.quadrant === 'BALANCED_STARTER' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-1 ring-[#03c75a]/30' 
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span>3사분면: 실속 징검다리지</span>
            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">Mid Living / Mid Buying</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">구리, 수원 영통·화서, 평촌, 산본, 평택고덕, 부천중동</div>
        </div>

        <div className={`p-3 rounded-xl border ${
          result.quadrant === 'FUTURE_GROWTH' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-1 ring-[#03c75a]/30' 
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span>4사분면: 자산증식 갭투자지</span>
            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">Low Living / High Buying</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">동작 흑석/노량진, 용인 기흥 플랫폼시티, 성수동</div>
        </div>
      </div>

      {/* Recharts Scatter Matrix (With labels & proper margin) */}
      <div className="w-full h-80 sm:h-96 mt-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 25, right: 35, bottom: 25, left: 35 }}
          >
            <XAxis 
              type="number" 
              dataKey="buying" 
              name="자산 투자 가치" 
              domain={[70, 100]} 
              stroke="#94a3b8" 
              fontSize={12}
              tickCount={7}
              label={{ value: '자산 투자 가치 (Buying Power) →', position: 'insideBottom', offset: -15, fill: '#0066ff', fontSize: 12, fontWeight: 700 }}
            />
            <YAxis 
              type="number" 
              dataKey="living" 
              name="실거주 만족도" 
              domain={[70, 100]} 
              stroke="#94a3b8" 
              fontSize={12}
              tickCount={7}
              label={{ value: '↑ 실거주 만족도 (Living Satisfaction)', angle: -90, position: 'insideLeft', offset: -18, fill: '#029f45', fontSize: 12, fontWeight: 700 }}
            />
            <ZAxis range={[200, 450]} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Midline Reference Lines for 4 Quadrants */}
            <ReferenceLine x={85} stroke="#cbd5e1" strokeDasharray="3 3" />
            <ReferenceLine y={85} stroke="#cbd5e1" strokeDasharray="3 3" />

            <Scatter name="Regions" data={benchmarkData}>
              {benchmarkData.map((entry, index) => {
                const isUser = entry.type === 'user';
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isUser ? '#03c75a' : '#0066ff'}
                    stroke={isUser ? '#029f45' : '#004fc4'}
                    strokeWidth={isUser ? 4 : 1.5}
                  />
                );
              })}
              {/* Point Label List */}
              <LabelList 
                dataKey="shortLabel" 
                position="top" 
                offset={7} 
                fontSize={10} 
                fontWeight={700}
                fill="#334155" 
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 Closest Matching Regions to the User */}
      {closestRegions.length > 0 && (
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
            <span>내 진단 포지션(🟢 {result.livingScore}점/{result.buyingScore}점)과 가장 가까운 매칭 지역 Top 3:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            {closestRegions.map((region, idx) => (
              <div 
                key={region.id}
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-[#e8f8ee] text-[#029f45] flex items-center justify-center text-[10px] font-black">
                      {idx + 1}
                    </span>
                    <span>{region.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Living {region.living}점 / Buying {region.buying}점
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0066ff] bg-[#edf4ff] px-2 py-0.5 rounded-lg border border-[#0066ff]/20">
                  성향차 {region.distance}점
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Summary Bar with clickable breakdown link */}
      <div className="mt-4 p-4 rounded-2xl bg-[#e8f8ee]/40 border border-[#03c75a]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#03c75a] mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">최종 해석: </span>
            <span>
              당신은 <strong className="text-[#029f45]">[{result.quadrantName}]</strong>에 속해 있으며, 
              실거주 편의성(Living <strong className="text-slate-900">{result.livingScore}점</strong>)과 
              자산 가치(Buying <strong className="text-slate-900">{result.buyingScore}점</strong>)의 성향 밸런스가 
              위 차트의 <strong>남양주 다산, 별내, 구리, 용인 수지, 수원 영통</strong> 등의 포지션과 가장 잘 맞아떨어집니다.
            </span>
          </div>
        </div>

        {onOpenScoreBreakdown && (
          <button
            onClick={() => onOpenScoreBreakdown('living')}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#029f45] border border-slate-200 shadow-2xs font-black flex items-center gap-1 transition text-xs cursor-pointer"
          >
            <span>점수 산출 근거</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
