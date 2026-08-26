import React, { useState, useMemo } from 'react';
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
import { Sparkles, MapPin, Compass, Info, ChevronRight, HelpCircle, CheckCircle2, Wallet, AlertCircle } from 'lucide-react';

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
  entryPrice: number;    // 평균 매매 진입가 (단위: 억원)
  priceLabel: string;    // 예: "7.5억~8.2억"
  type: 'market' | 'user';
  regionName: string;
  zone: RegionZone | 'USER';
  city: string;
  description: string;
}

export const MatrixChart: React.FC<MatrixChartProps> = ({ 
  result, 
  selectedCities = [],
  onOpenScoreBreakdown 
}) => {
  const [activeZoneFilter, setActiveZoneFilter] = useState<'ALL' | 'GYEONGGI' | 'SEOUL'>('ALL');
  const [budgetOnlyMode, setBudgetOnlyMode] = useState<boolean>(true);

  // User calculated max budget (e.g. 7.0억)
  const userBudget = result.financialMetrics?.totalBudget || 7.0;

  // 4대 사분면에 균형있게 분산 배치된 수도권 핵심 28개 벤치마크 권역
  const rawBenchmarkData: BenchmarkPoint[] = useMemo(() => [
    // ==========================================
    // 1사분면 (Super Core: High Living >= 50, High Buying >= 50)
    // ==========================================
    { 
      id: 'bd', 
      name: '성남 분당·판교', 
      shortLabel: '분당·판교', 
      living: 90, 
      buying: 94, 
      entryPrice: 17.5, 
      priceLabel: '16.0억~19.5억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '성남시',
      description: '신분당선·IT 판교테크노밸리·최상위 학군'
    },
    { 
      id: 'gc', 
      name: '과천 지식정보타운', 
      shortLabel: '과천', 
      living: 88, 
      buying: 92, 
      entryPrice: 16.5, 
      priceLabel: '15.0억~18.0억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '과천시',
      description: '강남 인접·준강남급 주거 쾌적성'
    },
    { 
      id: 'mpy', 
      name: '마포·성동 (마용성)', 
      shortLabel: '마용성', 
      living: 84, 
      buying: 96, 
      entryPrice: 18.5, 
      priceLabel: '16.5억~20.0억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'SEOUL', 
      city: '서울시',
      description: 'CBD/YBD 직주근접 한강변 핵심 상급지'
    },
    { 
      id: 'gdk', 
      name: '강동 고덕 대단지', 
      shortLabel: '강동고덕', 
      living: 86, 
      buying: 82, 
      entryPrice: 14.5, 
      priceLabel: '13.0억~15.5억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'SEOUL', 
      city: '서울시',
      description: '9호선 연장·명일 학군·고덕 신축 대단지 숲세권'
    },
    { 
      id: 'gg', 
      name: '수원 광교신도시', 
      shortLabel: '수원 광교', 
      living: 92, 
      buying: 84, 
      entryPrice: 13.0, 
      priceLabel: '12.0억~14.5억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_SOUTH', 
      city: '수원시',
      description: '호수공원·신분당선·갤러리아·경기의 중심'
    },
    { 
      id: 'ms', 
      name: '하남 미사강변', 
      shortLabel: '하남 미사', 
      living: 88, 
      buying: 80, 
      entryPrice: 11.5, 
      priceLabel: '10.5억~12.5억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_EAST_NORTH', 
      city: '하남시',
      description: '5호선·한강 수변공원·스타필드'
    },
    { 
      id: 'sj', 
      name: '용인 수지 (신분당선)', 
      shortLabel: '용인 수지', 
      living: 80, 
      buying: 76, 
      entryPrice: 9.5, 
      priceLabel: '8.5억~10.5억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_SOUTH', 
      city: '용인시',
      description: '신분당선 강남 20분대·수지구청 명문 학원가'
    },
    { 
      id: 'dt', 
      name: '화성 동탄2신도시', 
      shortLabel: '화성 동탄', 
      living: 85, 
      buying: 74, 
      entryPrice: 8.5, 
      priceLabel: '7.8억~9.5억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_SOUTH', 
      city: '화성시',
      description: 'GTX-A 수서 20분·동탄호수공원·삼성전자 배후'
    },
    { 
      id: 'uw', 
      name: '의왕 인덕원·백운', 
      shortLabel: '의왕 인덕원', 
      living: 78, 
      buying: 72, 
      entryPrice: 8.2, 
      priceLabel: '7.5억~9.0억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '의왕시',
      description: 'GTX-C·인동선·월판선 쿼드러플 환승 호재'
    },
    { 
      id: 'pc', 
      name: '안양 평촌·군포 산본', 
      shortLabel: '평촌/산본', 
      living: 74, 
      buying: 68, 
      entryPrice: 8.5, 
      priceLabel: '7.8억~9.2억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '안양시/군포시',
      description: '평촌 학원가·1기 신도시 재건축 선도지구'
    },
    { 
      id: 'gm', 
      name: '광명 철산·일직', 
      shortLabel: '광명', 
      living: 72, 
      buying: 78, 
      entryPrice: 8.8, 
      priceLabel: '8.0억~9.8억',
      type: 'market', 
      regionName: '1사분면: 핵심 상급지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '광명시',
      description: '7호선 가산/강남 직결·광명뉴타운 대단지'
    },

    // ==========================================
    // 2사분면 (Smart Living: High Living >= 50, Low/Mid Buying < 50)
    // ==========================================
    { 
      id: 'dsn', 
      name: '남양주 다산신도시', 
      shortLabel: '남양주 다산', 
      living: 86, 
      buying: 46, 
      entryPrice: 7.5, 
      priceLabel: '6.8억~8.2억',
      type: 'market', 
      regionName: '2사분면: 가성비 쾌적 실거주지', 
      zone: 'GYEONGGI_EAST_NORTH', 
      city: '남양주시',
      description: '8호선 연장 잠실 20분대·신축 대단지 쾌적 인프라'
    },
    { 
      id: 'bn', 
      name: '남양주 별내신도시', 
      shortLabel: '남양주 별내', 
      living: 82, 
      buying: 42, 
      entryPrice: 6.5, 
      priceLabel: '5.8억~7.2억',
      type: 'market', 
      regionName: '2사분면: 가성비 쾌적 실거주지', 
      zone: 'GYEONGGI_EAST_NORTH', 
      city: '남양주시',
      description: '4호선·8호선 더블역세권·불암산 청정 숲세권'
    },
    { 
      id: 'is', 
      name: '고양 일산 킨텍스·삼송', 
      shortLabel: '고양 일산/삼송', 
      living: 84, 
      buying: 44, 
      entryPrice: 7.2, 
      priceLabel: '6.2억~8.0억',
      type: 'market', 
      regionName: '2사분면: 가성비 쾌적 실거주지', 
      zone: 'GYEONGGI_NORTH_WEST', 
      city: '고양시',
      description: 'GTX-A 서울역 15분·스타필드·호수공원'
    },
    { 
      id: 'pj', 
      name: '파주 운정신도시', 
      shortLabel: '파주 운정', 
      living: 86, 
      buying: 36, 
      entryPrice: 5.5, 
      priceLabel: '4.8억~6.2억',
      type: 'market', 
      regionName: '2사분면: 가성비 쾌적 실거주지', 
      zone: 'GYEONGGI_NORTH_WEST', 
      city: '파주시',
      description: 'GTX-A 기점·운정호수공원·가성비 최고 신축'
    },
    { 
      id: 'gp', 
      name: '김포 한강신도시', 
      shortLabel: '김포 한강', 
      living: 76, 
      buying: 34, 
      entryPrice: 4.8, 
      priceLabel: '4.2억~5.5억',
      type: 'market', 
      regionName: '2사분면: 가성비 쾌적 실거주지', 
      zone: 'GYEONGGI_NORTH_WEST', 
      city: '김포시',
      description: '골드라인·라베니체 수변상권·쾌적 신도시'
    },
    { 
      id: 'sh', 
      name: '시흥 배곧·장현', 
      shortLabel: '시흥 배곧', 
      living: 74, 
      buying: 32, 
      entryPrice: 4.6, 
      priceLabel: '4.0억~5.2억',
      type: 'market', 
      regionName: '2사분면: 가성비 쾌적 실거주지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '시흥시',
      description: '배곧 생명공원·신세계 프리미엄 아울렛·서해선'
    },
    { 
      id: 'yj', 
      name: '양주 옥정신도시', 
      shortLabel: '양주 옥정', 
      living: 78, 
      buying: 24, 
      entryPrice: 4.0, 
      priceLabel: '3.5억~4.6억',
      type: 'market', 
      regionName: '2사분면: 가성비 쾌적 실거주지', 
      zone: 'GYEONGGI_EAST_NORTH', 
      city: '양주시',
      description: '7호선 연장 예정·넓은 평수 가성비 극대화'
    },

    // ==========================================
    // 3사분면 (Balanced Starter: Low/Mid Living < 50, Low/Mid Buying < 50)
    // ==========================================
    { 
      id: 'gr', 
      name: '구리시 (인창/수택)', 
      shortLabel: '구리', 
      living: 48, 
      buying: 46, 
      entryPrice: 6.5, 
      priceLabel: '5.8억~7.2억',
      type: 'market', 
      regionName: '3사분면: 실속 징검다리지', 
      zone: 'GYEONGGI_EAST_NORTH', 
      city: '구리시',
      description: '8호선 개통·서울 바로 옆 징검다리 1순위'
    },
    { 
      id: 'yt', 
      name: '수원 영통·화서', 
      shortLabel: '수원 영통/화서', 
      living: 46, 
      buying: 48, 
      entryPrice: 6.8, 
      priceLabel: '6.0억~7.5억',
      type: 'market', 
      regionName: '3사분면: 실속 징검다리지', 
      zone: 'GYEONGGI_SOUTH', 
      city: '수원시',
      description: '스타필드 화서·수인분당선·영통 학원가'
    },
    { 
      id: 'bc', 
      name: '부천 중동·상동', 
      shortLabel: '부천 중동', 
      living: 44, 
      buying: 42, 
      entryPrice: 6.0, 
      priceLabel: '5.2억~6.8억',
      type: 'market', 
      regionName: '3사분면: 실속 징검다리지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '부천시',
      description: '7호선 강남 직결·백화점 상권·1기 신도시'
    },
    { 
      id: 'pt', 
      name: '평택 고덕·지제', 
      shortLabel: '평택 고덕', 
      living: 42, 
      buying: 44, 
      entryPrice: 5.0, 
      priceLabel: '4.5억~5.8억',
      type: 'market', 
      regionName: '3사분면: 실속 징검다리지', 
      zone: 'GYEONGGI_SOUTH', 
      city: '평택시',
      description: '삼성전자 평택캠퍼스·SRT/KTX 지제역 복합환승'
    },
    { 
      id: 'as', 
      name: '안산 고잔·그랑자이', 
      shortLabel: '안산 고잔', 
      living: 38, 
      buying: 36, 
      entryPrice: 4.5, 
      priceLabel: '3.8억~5.0억',
      type: 'market', 
      regionName: '3사분면: 실속 징검다리지', 
      zone: 'GYEONGGI_WEST_SOUTH', 
      city: '안산시',
      description: '신안산선 개통 예정·고잔신도시 완성형 상권'
    },
    { 
      id: 'ujb', 
      name: '의정부 (GTX-C)', 
      shortLabel: '의정부', 
      living: 36, 
      buying: 38, 
      entryPrice: 4.3, 
      priceLabel: '3.6억~4.8억',
      type: 'market', 
      regionName: '3사분면: 실속 징검다리지', 
      zone: 'GYEONGGI_EAST_NORTH', 
      city: '의정부시',
      description: 'GTX-C 삼성역 16분·의정부역 신세계백화점'
    },
    { 
      id: 'gj', 
      name: '경기광주·이천', 
      shortLabel: '광주/이천', 
      living: 32, 
      buying: 28, 
      entryPrice: 3.8, 
      priceLabel: '3.2억~4.4억',
      type: 'market', 
      regionName: '3사분면: 실속 징검다리지', 
      zone: 'GYEONGGI_SOUTH', 
      city: '경기 광주시/이천시',
      description: '경강선 판교 직결·가성비 자가 진입'
    },

    // ==========================================
    // 4사분면 (Future Growth: Low/Mid Living < 50, High Buying >= 50)
    // ==========================================
    { 
      id: 'djk', 
      name: '동작 흑석·노량진', 
      shortLabel: '동작 흑석/노량진', 
      living: 44, 
      buying: 90, 
      entryPrice: 15.5, 
      priceLabel: '14.0억~17.0억',
      type: 'market', 
      regionName: '4사분면: 자산증식 갭투자·재개발지', 
      zone: 'SEOUL', 
      city: '서울시',
      description: '9호선 급행·여의도/강남 황금 입지·노량진뉴타운'
    },
    { 
      id: 'hnm', 
      name: '용산 한남뉴타운', 
      shortLabel: '한남뉴타운', 
      living: 36, 
      buying: 98, 
      entryPrice: 22.0, 
      priceLabel: '20.0억~26.0억',
      type: 'market', 
      regionName: '4사분면: 자산증식 갭투자·재개발지', 
      zone: 'SEOUL', 
      city: '서울시',
      description: '한강변 대한민국 최고 부촌 디에이치 한남'
    },
    { 
      id: 'ss', 
      name: '성수 전략정비구역', 
      shortLabel: '성수 전략정비', 
      living: 38, 
      buying: 96, 
      entryPrice: 21.0, 
      priceLabel: '19.0억~24.0억',
      type: 'market', 
      regionName: '4사분면: 자산증식 갭투자·재개발지', 
      zone: 'SEOUL', 
      city: '서울시',
      description: '50~70층 한강변 초고층 랜드마크 재개발'
    },
    { 
      id: 'gh', 
      name: '용인 기흥 플랫폼시티', 
      shortLabel: '용인 기흥', 
      living: 42, 
      buying: 68, 
      entryPrice: 7.2, 
      priceLabel: '6.5억~8.0억',
      type: 'market', 
      regionName: '4사분면: 자산증식 갭투자·재개발지', 
      zone: 'GYEONGGI_SOUTH', 
      city: '용인시',
      description: 'GTX-A 구성역·경기용인 플랫폼시티 첨단 복합개발'
    },
    { 
      id: 'sk', 
      name: '노원 상계·중계 재건축', 
      shortLabel: '노원 상계', 
      living: 40, 
      buying: 62, 
      entryPrice: 5.8, 
      priceLabel: '5.0억~6.5억',
      type: 'market', 
      regionName: '4사분면: 자산증식 갭투자·재개발지', 
      zone: 'SEOUL', 
      city: '서울시',
      description: '동북선 경전철·중계동 은행사거리 학원가·재건축'
    },

    // ==========================================
    // ★ User Position Point
    // ==========================================
    { 
      id: 'user', 
      name: '★ 나의 진단 포지션', 
      shortLabel: '★ 나 (진단 결과)', 
      living: result.livingScore, 
      buying: result.buyingScore, 
      entryPrice: userBudget, 
      priceLabel: `내 가용 예산 ${userBudget.toFixed(1)}억 원`,
      type: 'user', 
      regionName: result.quadrantName, 
      zone: 'USER', 
      city: 'USER',
      description: `Living ${result.livingScore}점 / Buying ${result.buyingScore}점 (총 예산 ${userBudget.toFixed(1)}억 원)`
    }
  ], [result.livingScore, result.buyingScore, result.quadrantName, userBudget]);

  // Filter benchmark points according to budget and zone
  const benchmarkData = useMemo(() => {
    return rawBenchmarkData.filter(pt => {
      if (pt.type === 'user') return true;

      // 1. Budget filtering (예산 모드 활성화 시: 내 총예산의 1.15배 이내 권역만)
      if (budgetOnlyMode) {
        if (pt.entryPrice > userBudget * 1.15) return false;
      }

      // 2. City filter (관심 시/군/구 선택 시)
      if (selectedCities.length > 0) {
        const matchCity = selectedCities.some(c => pt.city.includes(c) || c.includes(pt.city));
        if (!matchCity) return false;
      }

      // 3. Zone filter (전체 / 경기 / 서울)
      if (activeZoneFilter === 'SEOUL') return pt.zone === 'SEOUL';
      if (activeZoneFilter === 'GYEONGGI') return pt.zone !== 'SEOUL';

      return true;
    });
  }, [rawBenchmarkData, budgetOnlyMode, userBudget, selectedCities, activeZoneFilter]);

  // Find nearest actionable regions that strictly fit the user's budget!
  const closestRegions = useMemo(() => {
    const marketPoints = rawBenchmarkData.filter(pt => pt.type !== 'user');
    
    // Always prioritize regions within user's budget (entryPrice <= userBudget * 1.25)
    const affordablePoints = marketPoints.filter(pt => pt.entryPrice <= userBudget * 1.25);
    const candidatePoints = affordablePoints.length >= 3 ? affordablePoints : marketPoints;

    return candidatePoints.map(pt => {
      const dist = Math.sqrt(Math.pow(pt.living - result.livingScore, 2) + Math.pow(pt.buying - result.buyingScore, 2));
      const isAffordable = pt.entryPrice <= userBudget * 1.15;
      return { 
        ...pt, 
        distance: Math.round(dist * 10) / 10,
        isAffordable
      };
    }).sort((a, b) => a.distance - b.distance).slice(0, 3);
  }, [rawBenchmarkData, result.livingScore, result.buyingScore, userBudget]);

  const affordableCount = useMemo(() => {
    return rawBenchmarkData.filter(pt => pt.type !== 'user' && pt.entryPrice <= userBudget * 1.15).length;
  }, [rawBenchmarkData, userBudget]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as BenchmarkPoint;
      const isUser = data.type === 'user';
      const isAffordable = data.entryPrice <= userBudget * 1.15;

      return (
        <div className={`p-4 rounded-2xl border shadow-xl backdrop-blur-md bg-white min-w-[260px] ${
          isUser 
            ? 'border-[#03c75a] ring-2 ring-[#03c75a]/30' 
            : isAffordable 
            ? 'border-blue-400 ring-2 ring-blue-400/20' 
            : 'border-slate-300'
        }`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-black text-sm text-slate-900">
              {isUser ? <Sparkles className="w-4 h-4 text-[#03c75a]" /> : <MapPin className="w-4 h-4 text-[#0066ff]" />}
              <span>{data.name}</span>
            </div>
            {!isUser && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                isAffordable 
                  ? 'bg-emerald-50 text-[#029f45] border border-emerald-200' 
                  : 'bg-rose-50 text-rose-600 border border-rose-200'
              }`}>
                {isAffordable ? '💰 예산 사정권' : `⚠️ 예산 초과 (${data.entryPrice}억)`}
              </span>
            )}
          </div>
          
          <div className="text-xs text-slate-500 mt-1 font-medium">{data.description}</div>
          
          <div className="mt-3 text-xs space-y-1.5 border-t border-slate-100 pt-2.5 font-bold">
            <div className="text-slate-800 flex justify-between gap-6">
              <span>💵 평균 매매 진입가:</span>
              <span className={isAffordable ? 'text-[#029f45] font-black' : 'text-rose-600 font-black'}>
                {data.priceLabel}
              </span>
            </div>
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
    <div className="naver-card p-5 sm:p-8 bg-white relative shadow-sm space-y-5">
      
      {/* 1. Header & Dynamic Budget Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#03c75a]" />
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Living vs Buying 2x2 매트릭스 진단
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            내 가용 예산(<strong className="text-slate-900">{userBudget.toFixed(1)}억 원</strong>)과 거주·투자 밸런스에 최적화된 현실적인 권역을 추천합니다.
          </p>
        </div>

        {/* Filter Toolbar: Budget Mode & Region Zone */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Budget Filter Switcher */}
          <button
            onClick={() => setBudgetOnlyMode(!budgetOnlyMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer border ${
              budgetOnlyMode
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>
              {budgetOnlyMode 
                ? `💰 내 예산 사정권만 (~${userBudget.toFixed(1)}억: ${affordableCount}곳)` 
                : '전체 권역 보기 (예산 초과 포함)'}
            </span>
          </button>

          {/* Region Zone Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
            <button
              onClick={() => setActiveZoneFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeZoneFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setActiveZoneFilter('GYEONGGI')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeZoneFilter === 'GYEONGGI' ? 'bg-white text-[#03c75a] font-black shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              경기도
            </button>
            <button
              onClick={() => setActiveZoneFilter('SEOUL')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeZoneFilter === 'SEOUL' ? 'bg-white text-[#0066ff] font-black shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              서울권
            </button>
          </div>
        </div>
      </div>

      {/* 2. Budget Notice Banner */}
      <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
        budgetOnlyMode 
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
          : 'bg-amber-50/70 border-amber-200 text-amber-900'
      }`}>
        {budgetOnlyMode ? (
          <CheckCircle2 className="w-4 h-4 text-[#029f45] shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        )}
        <div className="space-y-0.5">
          <strong className="font-black block text-sm">
            {budgetOnlyMode 
              ? `🎯 현재 고객님의 총 매수 가용 예산 약 ${userBudget.toFixed(1)}억 원(보유현금+안전대출)에 꼭 맞는 진입 가능 권역만 표시 중입니다.`
              : `⚠️ 전체 모드: 고객님의 예산(${userBudget.toFixed(1)}억)을 크게 초과하는 15억~20억대 핵심 상급지(마용성, 분당·판교, 과천 등)까지 모두 표시됩니다.`
            }
          </strong>
          <p className="text-[11px] opacity-90">
            {budgetOnlyMode 
              ? '비현실적인 고가 상급지를 배제하고, 실제로 지금 매수 검토가 가능한 가성비·알짜 권역을 중심으로 2x2 포지션을 확인하세요.'
              : '우측 상단의 [💰 내 예산 사정권만] 버튼을 누르면 내 예산에 맞는 지역만 깔끔하게 추려볼 수 있습니다.'}
          </p>
        </div>
      </div>

      {/* 3. Quadrant Legend 4 Cards (Widely Spread Balanced Coordinate Guide) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        <div className={`p-3.5 rounded-2xl border transition ${
          result.quadrant === 'SMART_LIVING' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-2 ring-[#03c75a]/30 shadow-xs' 
            : 'bg-slate-50/80 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center justify-between font-black">
            <span>2사분면: 가성비 쾌적 실거주지</span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 font-bold">Living High / Buying Low</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-medium">
            남양주 다산(7.5억)·별내(6.5억), 파주 운정(5.5억), 고양 일산/삼송(7.2억), 김포(4.8억), 시흥 배곧(4.6억)
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border transition ${
          result.quadrant === 'SUPER_CORE' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-2 ring-[#03c75a]/30 shadow-xs' 
            : 'bg-slate-50/80 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center justify-between font-black">
            <span>1사분면: 핵심 상급지 (Super Core)</span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 font-bold">Living High / Buying High</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-medium">
            분당·판교(17.5억), 과천(16.5억), 마용성(18.5억), 광교(13.0억), 하남 미사(11.5억), 용인 수지(9.5억), 동탄(8.5억)
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border transition ${
          result.quadrant === 'BALANCED_STARTER' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-2 ring-[#03c75a]/30 shadow-xs' 
            : 'bg-slate-50/80 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center justify-between font-black">
            <span>3사분면: 실속 징검다리지</span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 font-bold">Living Mid / Buying Mid</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-medium">
            구리(6.5억), 수원 영통/화서(6.8억), 부천 중동(6.0억), 평택 고덕(5.0억), 안산(4.5억), 의정부(4.3억)
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border transition ${
          result.quadrant === 'FUTURE_GROWTH' 
            ? 'bg-[#e8f8ee] border-[#03c75a] text-[#029f45] font-bold ring-2 ring-[#03c75a]/30 shadow-xs' 
            : 'bg-slate-50/80 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center justify-between font-black">
            <span>4사분면: 자산증식 갭투자·재개발지</span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 font-bold">Living Low / Buying High</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-medium">
            동작 흑석/노량진(15.5억), 한남3구역(22억), 성수 전략정비(21억), 용인 기흥(7.2억), 노원 상계(5.8억)
          </div>
        </div>
      </div>

      {/* 4. Recharts Scatter Matrix (Spread out from 10 to 100 with 50 midlines) */}
      <div className="w-full h-88 sm:h-[440px] relative bg-slate-50/50 p-2 sm:p-4 rounded-3xl border border-slate-200/80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 25, right: 35, bottom: 30, left: 35 }}
          >
            <XAxis 
              type="number" 
              dataKey="buying" 
              name="자산 투자 가치" 
              domain={[10, 100]} 
              stroke="#94a3b8" 
              fontSize={11}
              tickCount={10}
              label={{ 
                value: '자산 투자 가치 (Buying Power: 강남 접근성·환금성·시세상승력) →', 
                position: 'insideBottom', 
                offset: -18, 
                fill: '#0066ff', 
                fontSize: 11, 
                fontWeight: 800 
              }}
            />
            <YAxis 
              type="number" 
              dataKey="living" 
              name="실거주 만족도" 
              domain={[10, 100]} 
              stroke="#94a3b8" 
              fontSize={11}
              tickCount={10}
              label={{ 
                value: '↑ 실거주 만족도 (Living Satisfaction: 신축·통근쾌적·인프라)', 
                angle: -90, 
                position: 'insideLeft', 
                offset: -20, 
                fill: '#029f45', 
                fontSize: 11, 
                fontWeight: 800 
              }}
            />
            <ZAxis range={[220, 500]} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Midline Reference Lines for 4 Quadrants (Balanced Center: 50, 50) */}
            <ReferenceLine x={50} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} />
            <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} />

            <Scatter name="Regions" data={benchmarkData}>
              {benchmarkData.map((entry, index) => {
                const isUser = entry.type === 'user';
                const isAffordable = entry.entryPrice <= userBudget * 1.15;
                
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isUser ? '#03c75a' : isAffordable ? '#0066ff' : '#94a3b8'}
                    stroke={isUser ? '#029f45' : isAffordable ? '#004fc4' : '#64748b'}
                    strokeWidth={isUser ? 4 : 2}
                  />
                );
              })}
              {/* Point Label List */}
              <LabelList 
                dataKey="shortLabel" 
                position="top" 
                offset={7} 
                fontSize={10} 
                fontWeight={800}
                fill="#1e293b" 
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Top 3 Realistic Closest Matching Regions within User's Budget */}
      {closestRegions.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-[#03c75a]" />
              <span>
                내 예산(<strong className="text-[#029f45]">{userBudget.toFixed(1)}억 원</strong>) & 성향 맞춤 추천 권역 Top 3:
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-bold">
              ※ 내 가용 예산 내 진입 가능한 최우선 추천지
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {closestRegions.map((region, idx) => (
              <div 
                key={region.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-[#03c75a] transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 font-black text-slate-900 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#e8f8ee] text-[#029f45] flex items-center justify-center text-[10px] font-black">
                        {idx + 1}
                      </span>
                      <span>{region.name}</span>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-[#029f45] border border-emerald-200">
                      매수 사정권
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {region.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="font-bold text-slate-700">
                    평균 진입가: <strong className="text-[#0066ff]">{region.priceLabel}</strong>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    성향차 {region.distance}점
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Bottom Summary Bar with clickable breakdown link */}
      <div className="p-4 rounded-2xl bg-[#e8f8ee]/50 border border-[#03c75a]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#03c75a] mt-0.5 shrink-0" />
          <div>
            <span className="font-black text-slate-900">맞춤 전략 조언: </span>
            <span className="leading-relaxed">
              당신은 <strong className="text-[#029f45]">[{result.quadrantName}]</strong> 포지션이며, 
              총 가용 예산 <strong className="text-slate-900">{userBudget.toFixed(1)}억 원</strong> 기준으로는 
              무리한 상급지 진입 대신 <strong>{closestRegions.map(r => r.shortLabel).join(', ')}</strong> 등의 
              알짜 징검다리 권역을 우선 매수하여 자산을 안정적으로 불려나가는 전략이 가장 현명합니다.
            </span>
          </div>
        </div>

        {onOpenScoreBreakdown && (
          <button
            onClick={() => onOpenScoreBreakdown('living')}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#029f45] border border-slate-200 shadow-2xs font-black flex items-center gap-1 transition text-xs cursor-pointer"
          >
            <span>점수 산출 근거</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};
