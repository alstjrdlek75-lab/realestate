import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Train, 
  Building, 
  Newspaper, 
  Radio, 
  ExternalLink, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Scale, 
  Coins, 
  Calculator, 
  X, 
  MapPin, 
  Briefcase, 
  TrendingUp,
  Flame,
  Home,
  Compass,
  Layers,
  Check,
  Navigation,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Map as MapIcon,
  ShieldCheck,
  FileText,
  Table as TableIcon,
  HardHat,
  Calendar,
  Users
} from 'lucide-react';

interface RealEstateFutureProps {
  onStartDiagnostic?: () => void;
}

type FutureTab = 'NEW_TOWNS' | 'FUTURE_NEWS' | 'GLOSSARY';
type MapViewType = 'DISTRICT_BLOCKS' | 'METRO';
type BlockViewDisplay = 'TABLE' | 'CARDS';
type CalcMode = 'DSR' | 'LTV' | 'GAP';

export interface BlockDetail {
  blockCode: string;
  shortCode: string;
  complexName: string; // 단지명 (나무위키 100% 반영: 왕숙 푸르지오 더 퍼스트, 왕숙 아테라, 미정 등)
  unitsTotal: string; // 총 세대수 (사전청약 세대수)
  units: number;
  supplyType: '공공분양' | '신혼희망타운' | '나눔형' | '일반형' | '선택형' | '민간분양' | '통합공공임대' | '행복주택';
  subscriptionDate: string; // 청약 시기 (2024년 10월, 2025년 8월, 미정 등)
  moveInDate: string; // 입주 시기 (2027년 6월, 2028년 8월, 미정 등)
  builder: string; // 시공사 (대광건영, 계룡건설, 대우건설, 금호건설, 미정 등)
  sizes: string;
  priceEstimate: string;
  stationDistance: string;
  featureBadge: string;
  progressStatus: string;
  progressStatusColor: string;
  note: string;
  pinPos: { x: number; y: number };
}

export interface NewTownDetail {
  id: string;
  name: string;
  shortName: string;
  location: string;
  units: string;
  areaSize: string;
  plannedPopulation: string;
  expectedMoveIn: string;
  statusTag: string;
  statusTagColor: string;
  transitSummary: string;
  transitLines: string[];
  anchorCompanies: string;
  selfSufficientLand: string;
  currentStatus: string;
  proTip: string;
  naverNewsQuery: string;
  officialBlueprintUrl: string;
  namuWikiUrl: string;
  lhOfficialUrl: string;
  mapCoords: { x: number; y: number; gangnamTime: string; seoulTime: string };
  blocks: BlockDetail[];
}

const NEW_TOWNS_DATA: NewTownDetail[] = [
  {
    id: 'namyangju_wangsook',
    name: '남양주 왕숙 (1·2지구)',
    shortName: '남양주 왕숙',
    location: '경기도 남양주시 진접읍·진건읍·일패동·이패동',
    units: '약 66,000호 (왕숙1 52,000호 + 왕숙2 14,000호)',
    areaSize: '총 1,104만㎡ (왕숙1: 865만㎡, 왕숙2: 239만㎡)',
    plannedPopulation: '약 16만 5천 명 (수도권 3기 신도시 최대)',
    expectedMoveIn: '2027~2028년 순차 입주 개시',
    statusTag: '공사 착공 & 본청약 진행',
    statusTagColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
    transitSummary: 'GTX-B(왕숙역 신설, 서울역 15분), 9호선 연장(강동하남남양주선, 강남 25분), 8호선 별내선 환승, 4호선·경춘선·경의중앙선(왕숙2)',
    transitLines: ['GTX-B', '지하철 9호선', '지하철 8호선 별내선', '경춘선', '경의중앙선', '수도권제1순환'],
    anchorCompanies: '카카오·판교급 IT·소프트웨어 R&D 기업, 바이오·메디컬 클러스터, 데이터센터 및 첨단 제조 융복합 단지',
    selfSufficientLand: '판교테크노밸리의 약 2배 규모 (약 140만㎡ 도시첨단산업단지 조성)',
    currentStatus: '부지 조성 공사 본격 진행 중이며 2024~2025년 주요 블록(A1, B1, A19, A24 등) 본청약 진행. 9호선 강동하남남양주선 기본계획 승인 완료.',
    proTip: '왕숙1은 GTX-B와 9호선이 교차하는 복합환승 자족 첨단도시, 왕숙2는 경의중앙선과 문화예술 특화 주거단지로 조성됩니다.',
    naverNewsQuery: '남양주 왕숙 3기 신도시 본청약 9호선',
    officialBlueprintUrl: '/maps/wangsook_master_plan.png',
    namuWikiUrl: 'https://namu.wiki/w/%EC%99%95%EC%88%99%EC%8B%A0%EB%8F%84%EC%8B%9C#s-3.1',
    lhOfficialUrl: 'https://www.xn--3-3u6ey6lv7rsa.kr/kor/CMS/Contents/Contents.do?mCode=MN030',
    mapCoords: { x: 670, y: 170, gangnamTime: '강남 25분 (9호선)', seoulTime: '서울역 15분 (GTX-B)' },
    blocks: [
      {
        blockCode: '왕숙1 A-1',
        shortCode: 'A1',
        complexName: '미정',
        unitsTotal: '638(638)세대',
        units: 638,
        supplyType: '공공분양',
        subscriptionDate: '2025년 8월',
        moveInDate: '2028년 8월',
        builder: '대광건영',
        sizes: '전용 59㎡',
        priceEstimate: '59㎡ 약 3.8억~4.0억',
        stationDistance: '북부 신설역 도보 6분',
        featureBadge: '💰 실속 소형 59㎡',
        progressStatus: '2025년 8월 본청약',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '북부 진접 방면 진입부 위치, 가성비가 가장 뛰어난 실속 59㎡ 단지',
        pinPos: { x: 72, y: 8 }
      },
      {
        blockCode: '왕숙1 A-2',
        shortCode: 'A2',
        complexName: '왕숙지구 A2',
        unitsTotal: '620(409)세대',
        units: 620,
        supplyType: '신혼희망타운',
        subscriptionDate: '2025년 8월',
        moveInDate: '2028년 8월',
        builder: '계룡건설',
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 3.5억',
        stationDistance: '유치원·초등학교 인접',
        featureBadge: '👶 신희타 보육특화',
        progressStatus: '2025년 8월 본청약',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '계룡건설 시공의 대단지 신혼희망타운으로 초등학교 인접 안심 단지',
        pinPos: { x: 70, y: 11 }
      },
      {
        blockCode: '왕숙1 A-4',
        shortCode: 'A4',
        complexName: '미정',
        unitsTotal: '1,082(1,082)세대',
        units: 1082,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.1억 예상',
        stationDistance: '근린공원 인접',
        featureBadge: '🏢 1,000세대 대단지',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '1,082세대 랜드마크 대단지 규모의 공공분양 예정 블록',
        pinPos: { x: 68, y: 15 }
      },
      {
        blockCode: '왕숙1 A-7',
        shortCode: 'A7',
        complexName: '미정',
        unitsTotal: '413(310)세대',
        units: 413,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡',
        priceEstimate: '59㎡ 약 3.9억 예상',
        stationDistance: '초등학교 인접',
        featureBadge: '🎒 초품아',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '초등학교와 공원을 바로 면한 쾌적한 공공분양 단지',
        pinPos: { x: 66, y: 20 }
      },
      {
        blockCode: '왕숙1 A-8',
        shortCode: 'A8',
        complexName: '미정',
        unitsTotal: '712(712)세대',
        units: 712,
        supplyType: '나눔형',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 4.8억 예상',
        stationDistance: '근린상업 인접',
        featureBadge: '🤝 나눔형 모기지',
        progressStatus: '사전청약 완료',
        progressStatusColor: 'bg-amber-50 text-amber-700 border-amber-200',
        note: '초저금리 장기모기지(1%대) 혜택이 적용되는 나눔형 공공분양 단지',
        pinPos: { x: 70, y: 25 }
      },
      {
        blockCode: '왕숙1 A-19',
        shortCode: 'A19',
        complexName: '왕숙지구 A19 (중심상업 대장)',
        unitsTotal: '1,024(1,024)세대',
        units: 1024,
        supplyType: '나눔형',
        subscriptionDate: '2025년 하반기',
        moveInDate: '2028년 12월',
        builder: '미정',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '74㎡ 약 4.6억 / 84㎡ 약 5.3억',
        stationDistance: 'GTX-B·9호선 복합환승역 도보 4분 (중심상업지구 바로 앞)',
        featureBadge: '👑 왕숙 1위 대장 로또 블록',
        progressStatus: '2025년 본청약',
        progressStatusColor: 'bg-rose-600 text-white',
        note: '중심상업지구와 복합환승역 바로 동측에 위치한 왕숙지구 최고의 핵심 1위 대장 블록',
        pinPos: { x: 65, y: 52 }
      },
      {
        blockCode: '왕숙1 A-22',
        shortCode: 'A22',
        complexName: '미정',
        unitsTotal: '510세대',
        units: 510,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 59㎡, 74㎡',
        priceEstimate: '59㎡ 약 3.9억 / 74㎡ 약 4.5억',
        stationDistance: '왕숙천 수변공원 도보 3분',
        featureBadge: '🌊 왕숙천 리버뷰',
        progressStatus: '지구조성 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '왕숙천 서측 수변생태공원 조망권과 산책로를 바로 누리는 쾌적 입지',
        pinPos: { x: 48, y: 73 }
      },
      {
        blockCode: '왕숙1 A-24',
        shortCode: 'A24',
        complexName: '왕숙1 A24 신희타',
        unitsTotal: '602(400)세대',
        units: 602,
        supplyType: '신혼희망타운',
        subscriptionDate: '2024년 본청약 완료',
        moveInDate: '2027년 12월',
        builder: '남광토건',
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 3.4억~3.6억',
        stationDistance: '유치원·초등학교 인접',
        featureBadge: '👶 신희타 착공/본청약',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '남부 진건 생활권 인접, 단지 내 국공립 어린이집과 초등학교 통학 안전 완비',
        pinPos: { x: 72, y: 68 }
      },
      {
        blockCode: '왕숙1 B-1',
        shortCode: 'B1',
        complexName: '왕숙 푸르지오 더 퍼스트 (B1)',
        unitsTotal: '569(569)세대',
        units: 569,
        supplyType: '공공분양',
        subscriptionDate: '2024년 10월 완료',
        moveInDate: '2027년 6월',
        builder: '대우건설',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '74㎡ 약 4.5억 / 84㎡ 약 5.2억',
        stationDistance: 'GTX-B / 9호선 왕숙역 도보 5분 (초역세권)',
        featureBadge: '🏆 대우 푸르지오 대장',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '대우건설 시공 메이저 브랜드 단지. 복합환승 왕숙역 북동측 84㎡ 최선호 단지',
        pinPos: { x: 77, y: 13 }
      },
      {
        blockCode: '왕숙1 B-2',
        shortCode: 'B2',
        complexName: '왕숙 푸르지오 더 퍼스트 (B2)',
        unitsTotal: '587(587)세대',
        units: 587,
        supplyType: '공공분양',
        subscriptionDate: '2024년 10월 완료',
        moveInDate: '2027년 6월',
        builder: '대우건설',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '74㎡ 약 4.4억 / 84㎡ 약 5.1억',
        stationDistance: '신설역 도보 7분 (초품아)',
        featureBadge: '🎒 푸르지오 & 초품아',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '단지 바로 옆 초등학교와 근린공원을 품은 쾌적한 84㎡ 주거 블록',
        pinPos: { x: 75, y: 17 }
      },
      {
        blockCode: '왕숙1 B-17',
        shortCode: 'B17',
        complexName: '왕숙지구 B17',
        unitsTotal: '520세대',
        units: 520,
        supplyType: '공공분양',
        subscriptionDate: '2025년 상반기',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.2억',
        stationDistance: '남부 중심축 인접',
        featureBadge: '🏢 84㎡ 중형 위주',
        progressStatus: '2025년 본청약',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '남부 생활권의 84㎡ 중심 공공분양 단지',
        pinPos: { x: 76, y: 68 }
      },
      {
        blockCode: '왕숙1 S-8',
        shortCode: 'S8',
        complexName: '미정',
        unitsTotal: '680세대',
        units: 680,
        supplyType: '나눔형',
        subscriptionDate: '2025년 하반기',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.1억',
        stationDistance: '중심상업지구 도보 5분',
        featureBadge: '🛍️ 중심상권 슬세권',
        progressStatus: '2025년 본청약',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '중심상업지구 북측 맞닿은 입지로 쇼핑·편의시설 이용이 가장 편리한 블록',
        pinPos: { x: 60, y: 44 }
      },
      {
        blockCode: '왕숙1 S-19',
        shortCode: 'S19',
        complexName: '미정',
        unitsTotal: '640세대',
        units: 640,
        supplyType: '공공분양',
        subscriptionDate: '2025년',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.2억',
        stationDistance: '동측 완충녹지 도보 2분',
        featureBadge: '🌿 숲세권 힐링단지',
        progressStatus: '2025년 본청약',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '동측 대규모 녹지축과 중앙공원에 바로 연결되는 쾌적한 숲세권 주거 단지',
        pinPos: { x: 73, y: 31 }
      },
      {
        blockCode: '왕숙1 S-20',
        shortCode: 'S20',
        complexName: '미정',
        unitsTotal: '560세대',
        units: 560,
        supplyType: '나눔형',
        subscriptionDate: '2025년',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.0억',
        stationDistance: '근린공원 인접',
        featureBadge: '🌿 공원 조망',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '쾌적한 자연환경과 나눔형 모기지 혜택이 주어지는 주거 블록',
        pinPos: { x: 65, y: 39 }
      },
      // 2지구
      {
        blockCode: '왕숙2 A-1',
        shortCode: '왕숙2 A1',
        complexName: '왕숙 아테라 (A1)',
        unitsTotal: '762(560)세대',
        units: 762,
        supplyType: '공공분양',
        subscriptionDate: '2024년 10월 완료',
        moveInDate: '2027년 3월',
        builder: '금호건설',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.2억 / 84㎡ 약 5.6억',
        stationDistance: '경의중앙선 신설역 도보 6분',
        featureBadge: '🏢 금호 아테라 대장',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '금호건설 시공 민간참여 공공분양 단지로 다산 생활권과 맞닿은 최고 선호 단지',
        pinPos: { x: 42, y: 85 }
      },
      {
        blockCode: '왕숙2 A-3',
        shortCode: '왕숙2 A3',
        complexName: '왕숙2 A3',
        unitsTotal: '680(500)세대',
        units: 680,
        supplyType: '일반형',
        subscriptionDate: '2024년 본청약 완료',
        moveInDate: '2027년 12월',
        builder: '계룡건설',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.5억',
        stationDistance: '초·중학교 인접',
        featureBadge: '🎒 안심 학군지',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '계룡건설 시공 일반형 공공분양 단지. 초·중학교 통학이 가장 안전한 단지',
        pinPos: { x: 48, y: 87 }
      },
      {
        blockCode: '왕숙2 A-4',
        shortCode: '왕숙2 A4',
        complexName: '왕숙2 A4 (문화예술 대장)',
        unitsTotal: '520(520)세대',
        units: 520,
        supplyType: '공공분양',
        subscriptionDate: '2024년 12월 완료',
        moveInDate: '2027년 12월',
        builder: 'DL이앤씨',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.1억 / 84㎡ 약 5.5억',
        stationDistance: '경의중앙선 신설역 도보 5분',
        featureBadge: '🎨 문화예술 복합축 리딩단지',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '왕숙2지구의 시세 리딩 단지로 다산신도시 생활권을 바로 공유하는 최상급 입지',
        pinPos: { x: 50, y: 88 }
      }
    ]
  },
  {
    id: 'hanam_gyosan',
    name: '하남 교산',
    shortName: '하남 교산',
    location: '경기도 하남시 천현동·교산동·춘궁동·덕풍동',
    units: '약 33,000호',
    areaSize: '약 686만㎡',
    plannedPopulation: '약 7만 8천 명',
    expectedMoveIn: '2028~2029년 순차 입주 목표',
    statusTag: '토지보상 완료 & 착공 순항',
    statusTagColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
    transitSummary: '지하철 3호선 연장(송파하남선 10km, 오금역~감일~교산~하남시청), 송파~양평고속도로(5km), 황산~초이간도로(2.2km), 서하남로 확장',
    transitLines: ['지하철 3호선 (송파하남선)', '송파양평고속도로', '황산초이간도로', '중부고속도로', '수도권제1순환'],
    anchorCompanies: 'AI 혁신 클러스터, 첨단 바이오·헬스케어 앵커 기업, 판교·강남 연계 테크 스타트업 파크',
    selfSufficientLand: '판교테크노밸리 1.4배 규모 (약 92만㎡ 자족용지)',
    currentStatus: '토지 보상 100% 완료 후 지장물 철거 및 단지 조성 공사 순항 중. 3호선 송파하남선 기본계획 확정.',
    proTip: '강남(GBD) 및 송파와 가장 가까운 입지로 3기 신도시 중 실수요자 선호도 1위. 3호선 개통 시 수서·양재 20분대 진입.',
    naverNewsQuery: '하남 교산 3기 신도시 3호선 송파하남선',
    officialBlueprintUrl: '/maps/hanam_gyosan_namu_dual.jpg',
    namuWikiUrl: 'https://namu.wiki/w/%EA%B5%90%EC%82%B0%EC%8B%A0%EB%8F%84%EC%8B%9C#s-2',
    lhOfficialUrl: 'https://www.xn--3-3u6ey6lv7rsa.kr/kor/CMS/Contents/Contents.do?mCode=MN056',
    mapCoords: { x: 670, y: 400, gangnamTime: '수서 15분 / 양재 22분', seoulTime: '잠실 15분' },
    blocks: [
      {
        blockCode: '교산 A-2',
        shortCode: 'A2',
        complexName: '교산지구 A2 (1호 대단지)',
        unitsTotal: '1,115(1,115)세대',
        units: 1115,
        supplyType: '공공분양',
        subscriptionDate: '2025년 본청약',
        moveInDate: '2028년 12월',
        builder: '대우건설 컨소시엄',
        sizes: '전용 51㎡, 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.8억 / 84㎡ 약 6.4억',
        stationDistance: '지하철 3호선 신설역 도보 4분 (초역세권)',
        featureBadge: '🏆 교산 1호 대장 랜드마크',
        progressStatus: '2025년 본청약 예정',
        progressStatusColor: 'bg-[#0066ff] text-white',
        note: '1,115세대 랜드마크 대단지로 3호선 초역세권과 상업지구를 모두 갖춘 최고 핵심 블록',
        pinPos: { x: 74, y: 30 }
      },
      {
        blockCode: '교산 A-1',
        shortCode: 'A1',
        complexName: '교산지구 A1 신희타',
        unitsTotal: '450(400)세대',
        units: 450,
        supplyType: '신혼희망타운',
        subscriptionDate: '2025년 하반기',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 4.1억',
        stationDistance: '초등학교 바로 앞 (초품아)',
        featureBadge: '🎒 안심 통학권',
        progressStatus: '착공 준비 중',
        progressStatusColor: 'bg-emerald-50 text-[#029f45] border-[#03c75a]/30',
        note: '도로를 건너지 않는 초품아 단지로 신혼부부 사전청약 당시 높은 경쟁률 기록',
        pinPos: { x: 70, y: 22 }
      },
      {
        blockCode: '교산 B-1',
        shortCode: 'B1',
        complexName: '교산 B1 민간분양',
        unitsTotal: '840세대',
        units: 840,
        supplyType: '민간분양',
        subscriptionDate: '2026년',
        moveInDate: '2029년',
        builder: '현대건설 (힐스테이트)',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 6.8억~7.2억',
        stationDistance: '중앙호수공원 및 수변상가 인접',
        featureBadge: '🌿 호수공원 조망',
        progressStatus: '지구조성 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '민간 1군 브랜드가 시공 예정인 84㎡ 중심 하이엔드 공원 조망 단지',
        pinPos: { x: 80, y: 44 }
      },
      {
        blockCode: '교산 B-3',
        shortCode: 'B3',
        complexName: '교산 B3 공공분양',
        unitsTotal: '750세대',
        units: 750,
        supplyType: '공공분양',
        subscriptionDate: '2025년 하반기',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 6.5억',
        stationDistance: '3호선 연장역 도보 6분',
        featureBadge: '🏢 중대형 위주',
        progressStatus: '2025년 하반기 본청약',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '송파 접근성이 가장 뛰어나며 자족 첨단R&D 단지와 도보로 출퇴근 가능한 위치',
        pinPos: { x: 78, y: 65 }
      }
    ]
  },
  {
    id: 'goyang_changreung',
    name: '고양 창릉',
    shortName: '고양 창릉',
    location: '경기도 고양시 덕양구 원흥동·동산동·용두동·화전동',
    units: '약 38,000호',
    areaSize: '약 789만㎡',
    plannedPopulation: '약 9만 2천 명',
    expectedMoveIn: '2027~2028년 순차 입주 목표',
    statusTag: 'GTX-A 창릉역 확정 & 본청약 개시',
    statusTagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    transitSummary: 'GTX-A 창릉역(삼성역 10분대), 고양은평선(새절~창릉~고양시청), 서오릉로·고양대로 확장, 화랑로 BRT',
    transitLines: ['GTX-A (창릉역)', '고양은평선', '서부선 직결', '자유로', '서울문산고속도로'],
    anchorCompanies: '상암DMC·마곡 연계 방송·영상 미디어 콘텐츠 기업, 스마트 물류·드론 R&D, ICT 융합 혁신 기업',
    selfSufficientLand: '약 130만㎡ 자족용지 (판교 1.5배 규모 테크노밸리)',
    currentStatus: '2024년 말 첫 본청약(A4, S5, S6블록) 진행 시작. GTX-A 창릉역 신설 확정 및 공사진행.',
    proTip: 'GTX-A 개통 시 서울역 8분, 삼성역 13분 컷. 상암DMC 직주근접 수요와 일산·은평 거주민의 최고 선호지.',
    naverNewsQuery: '고양 창릉 3기 신도시 GTX 창릉역',
    officialBlueprintUrl: '/maps/goyang_changreung_namu.jpg',
    namuWikiUrl: 'https://namu.wiki/w/%EC%B0%BD%EB%A6%89%EC%8B%A0%EB%8F%84%EC%8B%9C#s-4',
    lhOfficialUrl: 'https://www.xn--3-3u6ey6lv7rsa.kr/kor/CMS/Contents/Contents.do?mCode=MN074',
    mapCoords: { x: 340, y: 190, gangnamTime: '삼성역 13분 (GTX-A)', seoulTime: '서울역 8분' },
    blocks: [
      {
        blockCode: '창릉 S-5',
        shortCode: 'S5',
        complexName: '창릉 S5 (GTX 창릉역 대장)',
        unitsTotal: '718(718)세대',
        units: 718,
        supplyType: '공공분양',
        subscriptionDate: '2024년 본청약 완료',
        moveInDate: '2027년 12월',
        builder: 'GS건설 (자이)',
        sizes: '전용 51㎡, 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.9억 / 84㎡ 약 6.7억',
        stationDistance: 'GTX-A 창릉역 도보 5분 (초역세권)',
        featureBadge: '🏆 3기 신도시 최고 경쟁률 대장',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: 'GTX-A 창릉역을 걸어서 이용하는 창릉 최고 대장 블록. 삼성역 10분대 직결',
        pinPos: { x: 74, y: 67 }
      },
      {
        blockCode: '창릉 S-6',
        shortCode: 'S6',
        complexName: '창릉 S6 수변조망',
        unitsTotal: '407(407)세대',
        units: 407,
        supplyType: '공공분양',
        subscriptionDate: '2024년 본청약 완료',
        moveInDate: '2027년 12월',
        builder: '계룡건설',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.8억 / 84㎡ 약 6.6억',
        stationDistance: 'GTX-A 창릉역 도보 8분 & 수변공원',
        featureBadge: '🌿 창릉천 수변 영구조망',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '창릉천 수변공원 영구 조망과 초등학교를 동시에 품은 최고급 주거 입지',
        pinPos: { x: 71, y: 58 }
      },
      {
        blockCode: '창릉 A-4',
        shortCode: 'A4',
        complexName: '창릉 A4 공공분양',
        unitsTotal: '573(573)세대',
        units: 573,
        supplyType: '공공분양',
        subscriptionDate: '2024년 본청약 완료',
        moveInDate: '2027년 10월',
        builder: '동부건설',
        sizes: '전용 55㎡, 59㎡',
        priceEstimate: '55㎡ 약 4.3억 / 59㎡ 약 4.7억',
        stationDistance: '고양은평선 신설역 도보 6분',
        featureBadge: '💰 실속 중소형',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '2024년 말 본청약 접수 완료. 서부선과 직결되는 고양은평선 수혜 단지',
        pinPos: { x: 35, y: 50 }
      },
      {
        blockCode: '창릉 B-1',
        shortCode: 'B1',
        complexName: '창릉 B1 민간분양',
        unitsTotal: '680세대',
        units: 680,
        supplyType: '민간분양',
        subscriptionDate: '2026년',
        moveInDate: '2029년',
        builder: '미정 (1군 브랜드 예정)',
        sizes: '전용 84㎡, 101㎡',
        priceEstimate: '84㎡ 약 7.2억 예상',
        stationDistance: '창릉 중심상업지구 인접',
        featureBadge: '🏢 대형 평형 구성',
        progressStatus: '부지 조성 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '민간 브랜드 시공 예정으로 중대형 평형을 선호하는 갈아타기 수요 최우선 타겟',
        pinPos: { x: 73, y: 39 }
      }
    ]
  },
  {
    id: 'bucheon_daejang',
    name: '부천 대장',
    shortName: '부천 대장',
    location: '경기도 부천시 오정구 대장동·삼정동·오정동',
    units: '약 20,000호',
    areaSize: '약 343만㎡',
    plannedPopulation: '약 4만 8천 명',
    expectedMoveIn: '2027~2028년 순차 입주 목표',
    statusTag: 'SK 1조 R&D 센터 유치 확정',
    statusTagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    transitSummary: '대장~홍대선(홍대입구역 20분 직결, 2030년 개통 목표), S-BRT(김포공항 환승), 오정로 확장',
    transitLines: ['대장홍대선', 'S-BRT', '서해선 연계', '경인고속도로 지하화'],
    anchorCompanies: 'SK그룹 핵심 8개 계열사(SK이노베이션, SK하이닉스 등) 1조 원 규모 [SK 그린테크노캠퍼스] 입주 확정',
    selfSufficientLand: '약 68만㎡ 도시첨단산업단지 (SK 앵커기업 중심 클러스터)',
    currentStatus: '3기 신도시 중 가장 빠른 2024년 상반기 단지 착공 완료. 대장홍대선 민자적격성 통과 및 연내 조기 착공 추진.',
    proTip: '3기 신도시 중 유일하게 대기업(SK그룹) 대규모 입주가 확정되어 자족 기능이 가장 확실한 앵커 단지.',
    naverNewsQuery: '부천 대장 3기 신도시 SK 대장홍대선',
    officialBlueprintUrl: '/maps/bucheon_daejang_namu.png',
    namuWikiUrl: 'https://namu.wiki/w/%EB%8C%80%EC%9E%A5%EC%8B%A0%EB%8F%84%EC%8B%9C#s-1',
    lhOfficialUrl: 'https://www.xn--3-3u6ey6lv7rsa.kr/kor/CMS/Contents/Contents.do?mCode=MN068',
    mapCoords: { x: 230, y: 350, gangnamTime: '여의도 20분 / 강남 40분', seoulTime: '홍대입구 20분 (대장홍대선)' },
    blocks: [
      {
        blockCode: '대장 A-1',
        shortCode: 'A1',
        complexName: '미정',
        unitsTotal: '480세대',
        units: 480,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 59㎡',
        priceEstimate: '59㎡ 약 4.1억',
        stationDistance: '북서측 진입부',
        featureBadge: '💰 실속 소형',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '부천대장 북서측 진입부 주거 블록',
        pinPos: { x: 28, y: 42 }
      },
      {
        blockCode: '대장 A-2',
        shortCode: 'A2',
        complexName: '미정',
        unitsTotal: '520세대',
        units: 520,
        supplyType: '신혼희망타운',
        subscriptionDate: '미정',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 3.7억',
        stationDistance: '초등학교 인접',
        featureBadge: '👶 신희타',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-emerald-50 text-[#029f45] border-[#03c75a]/30',
        note: '단지 인근 초등학교와 녹지축을 갖춘 신혼희망타운',
        pinPos: { x: 31, y: 44 }
      },
      {
        blockCode: '대장 A-5',
        shortCode: 'A5',
        complexName: '대장 A5 (SK 직주근접)',
        unitsTotal: '591(400)세대',
        units: 591,
        supplyType: '신혼희망타운',
        subscriptionDate: '2024년 본청약 완료',
        moveInDate: '2027년 12월',
        builder: '계룡건설',
        sizes: '전용 46㎡, 55㎡',
        priceEstimate: '55㎡ 약 3.8억',
        stationDistance: 'SK 그린테크노캠퍼스 바로 앞',
        featureBadge: '🏢 SK 직주일치',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: 'SK그룹 R&D 캠퍼스 도보 3분 거리로 고소득 연구원 배후 임대 및 실거주 수요 탄탄',
        pinPos: { x: 65, y: 48 }
      },
      {
        blockCode: '대장 A-6',
        shortCode: 'A6',
        complexName: '대장 A6',
        unitsTotal: '430세대',
        units: 430,
        supplyType: '신혼희망타운',
        subscriptionDate: '2025년',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 3.7억',
        stationDistance: '초등학교 바로 앞 (초품아)',
        featureBadge: '🎒 안심 교육특화',
        progressStatus: '착공 순항 중',
        progressStatusColor: 'bg-purple-50 text-purple-700 border-purple-200',
        note: '유치원과 초등학교를 단지 안마당처럼 품고 있는 안심 보육 단지',
        pinPos: { x: 64, y: 52 }
      },
      {
        blockCode: '대장 A-7',
        shortCode: 'A7',
        complexName: '대장 A7 (대장홍대선 대장)',
        unitsTotal: '449(449)세대',
        units: 449,
        supplyType: '공공분양',
        subscriptionDate: '2025년 본청약',
        moveInDate: '2028년',
        builder: '현대건설 컨소시엄',
        sizes: '전용 59㎡',
        priceEstimate: '59㎡ 약 4.2억~4.4억',
        stationDistance: '대장홍대선 신설역 도보 5분',
        featureBadge: '🏆 대장지구 대장 블록',
        progressStatus: '2025년 본청약 예정',
        progressStatusColor: 'bg-[#03c75a] text-white',
        note: '홍대입구역 20분 컷 대장홍대선 초역세권으로 마곡/상암 직주근접 최고 입지',
        pinPos: { x: 74, y: 50 }
      },
      {
        blockCode: '대장 A-8',
        shortCode: 'A8',
        complexName: '대장 A8',
        unitsTotal: '560(560)세대',
        units: 560,
        supplyType: '공공분양',
        subscriptionDate: '2025년 하반기',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.3억 / 84㎡ 약 5.8억',
        stationDistance: '중심상업지구 도보 3분',
        featureBadge: '🛍️ 슬세권 상권',
        progressStatus: '착공 및 본청약 준비',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '대장신도시 중심 상업지구와 복합커뮤니티 센터가 바로 연결되는 편리한 단지',
        pinPos: { x: 74, y: 55 }
      },
      {
        blockCode: '대장 B-1',
        shortCode: 'B1',
        complexName: '대장 B1',
        unitsTotal: '640세대',
        units: 640,
        supplyType: '공공분양',
        subscriptionDate: '2025년',
        moveInDate: '2028년',
        builder: '미정',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.7억',
        stationDistance: '중앙 녹지 인접',
        featureBadge: '🏢 84㎡ 중형 단지',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '중앙 녹지축과 맞닿은 84㎡ 중심의 쾌적한 주거 단지',
        pinPos: { x: 38, y: 44 }
      },
      {
        blockCode: '대장 B-5',
        shortCode: 'B5',
        complexName: '대장 B5',
        unitsTotal: '720세대',
        units: 720,
        supplyType: '민간분양',
        subscriptionDate: '2026년',
        moveInDate: '2029년',
        builder: '미정 (1군 브랜드)',
        sizes: '전용 84㎡, 102㎡',
        priceEstimate: '84㎡ 약 6.4억',
        stationDistance: 'SK 테크노밸리 인접',
        featureBadge: '🏢 민간 대형',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-purple-50 text-purple-700 border-purple-200',
        note: 'SK R&D 캠퍼스 북측 위치, 1군 브랜드 시공 예정 민간 대단지',
        pinPos: { x: 56, y: 46 }
      }
    ]
  },
  {
    id: 'incheon_gyeyang',
    name: '인천 계양',
    shortName: '인천 계양',
    location: '인천광역시 계양구 귤현동·동양동·박촌동',
    units: '약 17,000호',
    areaSize: '약 333만㎡',
    plannedPopulation: '약 4만 2천 명',
    expectedMoveIn: '2026년 말 첫 입주 개시 (3기 중 최속)',
    statusTag: '3기 최초 본청약 완료 & 2026 입주',
    statusTagColor: 'bg-emerald-50 text-[#029f45] border-[#03c75a]/30',
    transitSummary: '인천 1호선 박촌역, S-BRT(김포공항역 9호선/공항철도/5호선 환승), 대장홍대선 계양 연장 검토',
    transitLines: ['인천 1호선', 'S-BRT', '공항철도 환승', '수도권제1순환'],
    anchorCompanies: '디지털 트윈, ICT·스마트 모빌리티 제조, 바이오·헬스 벤처 밸리',
    selfSufficientLand: '약 75만㎡ 자족시설용지 (계양테크노밸리)',
    currentStatus: '3기 신도시 전체 중 최초로 2024년 9월 본청약(A2, A3블록) 완료. 2026년 하반기 최초 입주 예정.',
    proTip: '3기 신도시 중 입주시기가 가장 빠르며 김포공항역을 통한 마곡/여의도 출퇴근 실수요자에게 실속형 대안.',
    naverNewsQuery: '인천 계양 3기 신도시 본청약 입주',
    officialBlueprintUrl: '/maps/incheon_gyeyang_plan.jpg',
    namuWikiUrl: 'https://namu.wiki/w/%EA%B3%84%EC%96%91%EC%8B%A0%EB%8F%84%EC%8B%9C#s-2.1',
    lhOfficialUrl: 'https://www.xn--3-3u6ey6lv7rsa.kr/kor/CMS/Contents/Contents.do?mCode=MN056',
    mapCoords: { x: 170, y: 340, gangnamTime: '여의도 25분 / 마곡 10분', seoulTime: '서울역 30분 (공항철도)' },
    blocks: [
      {
        blockCode: '계양 A-1',
        shortCode: 'A1',
        complexName: '미정',
        unitsTotal: '769세대',
        units: 769,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.7억 예상',
        stationDistance: '박촌역 도보 10분',
        featureBadge: '🚇 박촌역 환승권',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '기존 박촌역 인프라와 신도시 테크노밸리 자족기능을 동시에 누리는 입지',
        pinPos: { x: 28, y: 25 }
      },
      {
        blockCode: '계양 A-2',
        shortCode: 'A2',
        complexName: '인천계양A2BL (3기 1호 본청약)',
        unitsTotal: '747(747)세대',
        units: 747,
        supplyType: '공공분양',
        subscriptionDate: '2024년 9월 완료',
        moveInDate: '2026년 12월 (최속)',
        builder: '제일건설 | 남양건설 | 영동건설 | 서진산업',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.1억 / 84㎡ 약 5.8억',
        stationDistance: 'S-BRT 신설역 도보 3분',
        featureBadge: '🏆 3기 최초 본청약 2026 입주',
        progressStatus: '본청약 완료 / 2026 입주',
        progressStatusColor: 'bg-[#03c75a] text-white',
        note: '3기 신도시 전체 중 가장 먼저 2024년 9월 본청약 완료. 2026년 12월 첫 입주 개시',
        pinPos: { x: 45, y: 35 }
      },
      {
        blockCode: '계양 A-3',
        shortCode: 'A3',
        complexName: '계양 리프포레 (A3BL)',
        unitsTotal: '538(538)세대',
        units: 538,
        supplyType: '신혼희망타운',
        subscriptionDate: '2024년 9월 완료',
        moveInDate: '2026년 12월',
        builder: '계룡건설 컨소시엄',
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 3.9억',
        stationDistance: '유치원·초등학교 인접',
        featureBadge: '👶 3기 1호 신희타',
        progressStatus: '본청약 완료 / 2026 입주',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '가장 빠른 입주 시기를 자랑하며 1.3% 고정금리 수익공유형 모기지 혜택 적용',
        pinPos: { x: 55, y: 38 }
      },
      {
        blockCode: '계양 A-4',
        shortCode: 'A4',
        complexName: '인천계양테크노밸리 공동주택용지 A4BL',
        unitsTotal: '349세대',
        units: 349,
        supplyType: '민간분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '금강주택',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 6.0억 예상',
        stationDistance: '테크노밸리 앵커 인접',
        featureBadge: '🏢 금강주택 민간분양',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-purple-50 text-purple-700 border-purple-200',
        note: '금강주택 시공 예정인 자족시설 및 상업지역 인접 민간분양 블록',
        pinPos: { x: 62, y: 32 }
      },
      {
        blockCode: '계양 A-5',
        shortCode: 'A5',
        complexName: '미정',
        unitsTotal: '691세대',
        units: 691,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.8억 예상',
        stationDistance: '근린공원 인접',
        featureBadge: '🌿 공원 조망',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '근린공원과 맞닿은 쾌적한 주거환경의 공공분양 단지',
        pinPos: { x: 35, y: 45 }
      },
      {
        blockCode: '계양 A-6',
        shortCode: 'A6',
        complexName: '미정',
        unitsTotal: '672세대',
        units: 672,
        supplyType: '공공분양',
        subscriptionDate: '2025년 예정',
        moveInDate: '2029년 1월',
        builder: '계룡건설산업',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.9억 예상',
        stationDistance: '중앙공원 도보 3분',
        featureBadge: '🏗️ 계룡건설산업',
        progressStatus: '2025년 본청약 예정',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '계룡건설산업 시공 예정인 2029년 1월 준공 목표 공공분양 블록',
        pinPos: { x: 42, y: 48 }
      },
      {
        blockCode: '계양 A-7',
        shortCode: 'A7',
        complexName: '미정',
        unitsTotal: '720세대',
        units: 720,
        supplyType: '민간분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '한림건설',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 6.2억 예상',
        stationDistance: '중심상업 인접',
        featureBadge: '🏢 한림건설 민간분양',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-purple-50 text-purple-700 border-purple-200',
        note: '한림건설 시공 예정의 720세대 대단지 민간분양 주거 블록',
        pinPos: { x: 52, y: 50 }
      },
      {
        blockCode: '계양 A-8',
        shortCode: 'A8',
        complexName: '미정',
        unitsTotal: '788세대',
        units: 788,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.8억 예상',
        stationDistance: '초등학교 인접',
        featureBadge: '🎒 초품아 단지',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '초등학교와 안심 통학로를 확보한 788세대 대단지 공공분양 블록',
        pinPos: { x: 60, y: 52 }
      },
      {
        blockCode: '계양 A-9',
        shortCode: 'A9',
        complexName: '미정',
        unitsTotal: '477세대',
        units: 477,
        supplyType: '공공분양',
        subscriptionDate: '2025년',
        moveInDate: '2028년 12월',
        builder: '진흥기업',
        sizes: '전용 59㎡, 74㎡',
        priceEstimate: '59㎡ 약 4.2억',
        stationDistance: 'S-BRT 환승 인접',
        featureBadge: '🏗️ 진흥기업 시공',
        progressStatus: '2025년 본청약 예정',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '진흥기업 시공 예정인 2028년 12월 입주 목표 공공분양 단지',
        pinPos: { x: 48, y: 60 }
      },
      {
        blockCode: '계양 A-10',
        shortCode: 'A10',
        complexName: '미정',
        unitsTotal: '769세대',
        units: 769,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.8억 예상',
        stationDistance: '수변공원 인접',
        featureBadge: '🌊 수변 공원권',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '굴포천 수변공원과 맞닿은 쾌적한 769세대 주거 단지',
        pinPos: { x: 38, y: 62 }
      },
      {
        blockCode: '계양 A-11',
        shortCode: 'A11',
        complexName: '미정',
        unitsTotal: '705세대',
        units: 705,
        supplyType: '나눔형',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '84㎡ 약 4.9억 예상',
        stationDistance: '남부 중심축 인접',
        featureBadge: '🤝 나눔형 저리모기지',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-amber-50 text-amber-700 border-amber-200',
        note: '초저금리 나눔형 전용 모기지가 지원되는 실속형 공공분양 단지',
        pinPos: { x: 68, y: 45 }
      },
      {
        blockCode: '계양 A-12',
        shortCode: 'A12',
        complexName: '미정',
        unitsTotal: '978세대',
        units: 978,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.9억 예상',
        stationDistance: '중심상업축 인접',
        featureBadge: '🏢 978세대 대단지',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '계양신도시 남부의 핵심을 이루는 978세대 초대형 주거 단지',
        pinPos: { x: 72, y: 55 }
      },
      {
        blockCode: '계양 A-13',
        shortCode: 'A13',
        complexName: '미정',
        unitsTotal: '628세대',
        units: 628,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.8억 예상',
        stationDistance: '근린공원 인접',
        featureBadge: '🌿 공원 조망',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '쾌적한 녹지축을 품은 남부 공공분양 주거 블록',
        pinPos: { x: 55, y: 68 }
      },
      {
        blockCode: '계양 A-14',
        shortCode: 'A14',
        complexName: '미정',
        unitsTotal: '571세대',
        units: 571,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡',
        priceEstimate: '59㎡ 약 4.1억 예상',
        stationDistance: '초등학교 인접',
        featureBadge: '🎒 초품아',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '초등학교 통학로를 확보한 실속형 59㎡ 위주 주거 블록',
        pinPos: { x: 45, y: 72 }
      },
      {
        blockCode: '계양 A-15',
        shortCode: 'A15',
        complexName: '미정',
        unitsTotal: '592세대',
        units: 592,
        supplyType: '민간분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '신해공영',
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 6.1억 예상',
        stationDistance: '남부 진입로 인접',
        featureBadge: '🏗️ 신해공영 민간분양',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-purple-50 text-purple-700 border-purple-200',
        note: '신해공영 시공 예정인 남부 생활권 민간분양 단지',
        pinPos: { x: 62, y: 75 }
      },
      {
        blockCode: '계양 A-16',
        shortCode: 'A16',
        complexName: '미정',
        unitsTotal: '608세대',
        units: 608,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.8억 예상',
        stationDistance: '남서측 진입부',
        featureBadge: '💰 실속 주거단지',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '남서측 교통망과 연결되는 608세대 공공분양 블록',
        pinPos: { x: 35, y: 78 }
      },
      {
        blockCode: '계양 A-17',
        shortCode: 'A17',
        complexName: '인천계양지구A17블록신혼희망타운',
        unitsTotal: '463세대',
        units: 463,
        supplyType: '신혼희망타운',
        subscriptionDate: '2025년',
        moveInDate: '2028년 12월',
        builder: 'KCC건설',
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 3.8억',
        stationDistance: '유치원·초등학교 인접',
        featureBadge: '👶 KCC건설 신희타',
        progressStatus: '2025년 본청약 예정',
        progressStatusColor: 'bg-emerald-50 text-[#029f45] border-[#03c75a]/30',
        note: 'KCC건설 시공 예정인 2028년 12월 입주 목표 신혼희망타운 단지',
        pinPos: { x: 50, y: 82 }
      },
      {
        blockCode: '계양 A-18',
        shortCode: 'A18',
        complexName: '미정',
        unitsTotal: '959세대',
        units: 959,
        supplyType: '공공분양',
        subscriptionDate: '미정',
        moveInDate: '미정',
        builder: '미정',
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.9억 예상',
        stationDistance: '남단 랜드마크',
        featureBadge: '🏢 959세대 대단지',
        progressStatus: '공급 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '계양신도시 최남단을 대표하는 959세대 초대형 공공분양 랜드마크 단지',
        pinPos: { x: 65, y: 85 }
      }
    ]
  },
  {
    id: 'gwacheon_gwacheon',
    name: '과천 과천지구',
    shortName: '과천 과천',
    location: '경기도 과천시 과천동·주암동·막계동',
    units: '약 10,000호',
    areaSize: '약 169만㎡',
    plannedPopulation: '약 2만 5천 명',
    expectedMoveIn: '2029년 전후 순차 입주 목표',
    statusTag: '지구계획 승인 완료 (준강남 입지)',
    statusTagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    transitSummary: '지하철 4호선(선바위역·경마공원역), GTX-C(정부과천청사역), 위례과천선 연계, 과천~우면산 도시고속화',
    transitLines: ['지하철 4호선', 'GTX-C', '위례과천선', '과천대로 지하화'],
    anchorCompanies: '과천지식정보타운(펄어비스, 넷마블, JW중외제약, 코오롱 등)과 연계된 바이오·IT·AI 첨단 밸리',
    selfSufficientLand: '약 36만㎡ 자족용지 (서초 양재 R&CD 혁신지구 연계)',
    currentStatus: '2024년 8월 국토부 지구계획 승인 완료. 2025~2026년 주택 분양 착수 예정.',
    proTip: '서초구 양재동과 맞닿아 사실상 강남 생활권. 3기 신도시 중 시세 상승 잠재력과 평당 분양가가 가장 높은 최상급지.',
    naverNewsQuery: '과천 과천지구 3기 신도시 분양 4호선',
    officialBlueprintUrl: '/maps/gwacheon_gwacheon_plan.jpg',
    namuWikiUrl: 'https://namu.wiki/w/%EA%B3%BC%EC%B2%9C%EA%B3%BC%EC%B2%9C%EC%A7%80%EA%B5%AC#s-3.1',
    lhOfficialUrl: 'https://www.xn--3-3u6ey6lv7rsa.kr/kor/Main.do',
    mapCoords: { x: 470, y: 470, gangnamTime: '양재 8분 / 강남역 15분', seoulTime: '사당 7분 (4호선)' },
    blocks: [
      {
        blockCode: '과천 A-1',
        shortCode: 'A1',
        complexName: '과천 A1 (선바위역 로또)',
        unitsTotal: '650세대',
        units: 650,
        supplyType: '공공분양',
        subscriptionDate: '2025~2026년 예정',
        moveInDate: '2029년',
        builder: '미정 (1군 브랜드 예정)',
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '59㎡ 약 6.8억 / 84㎡ 약 9.2억 예상',
        stationDistance: '지하철 4호선 선바위역 도보 4분 (초역세권)',
        featureBadge: '👑 3기 신도시 원탑 황금 입지',
        progressStatus: '2025~2026년 분양 예정',
        progressStatusColor: 'bg-[#0066ff] text-white',
        note: '서초구 양재동 바로 옆! 사당·강남 10분대 진입 가능한 3기 신도시 최고의 로또 블록',
        pinPos: { x: 46, y: 35 }
      },
      {
        blockCode: '과천 A-2',
        shortCode: 'A2',
        complexName: '과천 A2 신희타',
        unitsTotal: '480세대',
        units: 480,
        supplyType: '신혼희망타운',
        subscriptionDate: '2026년',
        moveInDate: '2029년',
        builder: '미정',
        sizes: '전용 55㎡, 59㎡',
        priceEstimate: '55㎡ 약 5.8억 예상',
        stationDistance: '양재천 수변공원 조망',
        featureBadge: '🌿 양재천 에코라이프',
        progressStatus: '지구조성 준비 중',
        progressStatusColor: 'bg-emerald-50 text-[#029f45] border-[#03c75a]/30',
        note: '양재천 자전거 도로와 직결되며 서초구 우면산 R&CD 배후단지로 신혼부부 청약 1순위',
        pinPos: { x: 58, y: 48 }
      },
      {
        blockCode: '과천 B-1',
        shortCode: 'B1',
        complexName: '과천 B1 민간 대단지',
        unitsTotal: '850세대',
        units: 850,
        supplyType: '민간분양',
        subscriptionDate: '2026년',
        moveInDate: '2029년',
        builder: '미정 (하이엔드 브랜드)',
        sizes: '전용 84㎡, 105㎡, 120㎡',
        priceEstimate: '84㎡ 약 10억~11억 예상',
        stationDistance: '위례과천선 / 4호선 환승역세권',
        featureBadge: '🏢 하이엔드 대단지',
        progressStatus: '지구계획 승인 완료',
        progressStatusColor: 'bg-purple-50 text-purple-700 border-purple-200',
        note: '1군 메이저 브랜드가 들어설 대형 평형 단지로 준공 후 20억 클럽 진입 유력',
        pinPos: { x: 52, y: 65 }
      }
    ]
  }
];

export const RealEstateFuture: React.FC<RealEstateFutureProps> = () => {
  const [activeTab, setActiveTab] = useState<FutureTab>('NEW_TOWNS');
  const [mapViewType, setMapViewType] = useState<MapViewType>('DISTRICT_BLOCKS');
  const [blockViewDisplay, setBlockViewDisplay] = useState<BlockViewDisplay>('TABLE');
  const [selectedTownId, setSelectedTownId] = useState<string>(NEW_TOWNS_DATA[0].id);
  const [selectedBlockCode, setSelectedBlockCode] = useState<string>('왕숙1 A-19');
  const [blockSearchTerm, setBlockSearchTerm] = useState<string>('');
  
  // Interactive Map Zoom & Lightbox Fullscreen State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Interactive Calculator Modal State
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [calcMode, setCalcMode] = useState<CalcMode>('DSR');

  // Calculator Inputs
  const [annualIncome, setAnnualIncome] = useState<number>(8000);
  const [interestRate, setInterestRate] = useState<number>(4.0);
  const [loanPeriodYears, setLoanPeriodYears] = useState<number>(40);
  const [otherMonthlyDebt, setOtherMonthlyDebt] = useState<number>(0);
  const [applyStressDsr, setApplyStressDsr] = useState<boolean>(true);
  const [housePrice, setHousePrice] = useState<number>(100000);
  const [ltvRate, setLtvRate] = useState<number>(70);
  const [gapBuyPrice, setGapBuyPrice] = useState<number>(100000);
  const [gapJeonsePrice, setGapJeonsePrice] = useState<number>(65000);

  // Calculations
  const maxYearlyPaymentDsr40 = Math.round(annualIncome * 0.4);
  const availableYearlyPayment = Math.max(0, maxYearlyPaymentDsr40 - (otherMonthlyDebt * 12));
  const availableMonthlyPayment = Math.round(availableYearlyPayment / 12);

  const effectiveRate = applyStressDsr ? interestRate + 1.2 : interestRate;
  const monthlyRate = effectiveRate / 100 / 12;
  const numPayments = loanPeriodYears * 12;
  
  const maxLoanDsrPrincipal = monthlyRate > 0 && numPayments > 0
    ? Math.round(availableMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate))
    : 0;

  const normalRate = interestRate / 100 / 12;
  const normalLoanPrincipal = normalRate > 0 && numPayments > 0
    ? Math.round(availableMonthlyPayment * ((1 - Math.pow(1 + normalRate, -numPayments)) / normalRate))
    : 0;

  const stressReductionAmount = Math.max(0, normalLoanPrincipal - maxLoanDsrPrincipal);
  const maxLoanLtv = Math.round(housePrice * (ltvRate / 100));
  const minRequiredCashLtv = Math.max(0, housePrice - maxLoanLtv);

  const gapJeonseRatio = gapBuyPrice > 0 ? ((gapJeonsePrice / gapBuyPrice) * 100).toFixed(1) : '0';
  const pureGapCash = Math.max(0, gapBuyPrice - gapJeonsePrice);
  const gapAcquisitionTax = Math.round(gapBuyPrice * 0.033);
  const totalGapNeedCash = pureGapCash + gapAcquisitionTax;

  const handleOpenCalculator = (mode: CalcMode) => {
    setCalcMode(mode);
    setIsCalcOpen(true);
  };

  const handleOpenNaverNews = (keyword: string) => {
    const url = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(keyword)}&sort=1`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const selectedTown = NEW_TOWNS_DATA.find(t => t.id === selectedTownId) || NEW_TOWNS_DATA[0];
  const activeBlock = selectedTown.blocks.find(b => b.blockCode === selectedBlockCode) || selectedTown.blocks[0];

  const handleSelectTown = (townId: string) => {
    setSelectedTownId(townId);
    setZoomLevel(1);
    const targetTown = NEW_TOWNS_DATA.find(t => t.id === townId);
    if (targetTown && targetTown.blocks.length > 0) {
      setSelectedBlockCode(targetTown.blocks[0].blockCode);
    }
  };

  // Filtered blocks by search term
  const filteredBlocks = selectedTown.blocks.filter(b => 
    b.blockCode.toLowerCase().includes(blockSearchTerm.toLowerCase()) ||
    b.shortCode.toLowerCase().includes(blockSearchTerm.toLowerCase()) ||
    b.complexName.toLowerCase().includes(blockSearchTerm.toLowerCase()) ||
    b.builder.toLowerCase().includes(blockSearchTerm.toLowerCase()) ||
    b.supplyType.includes(blockSearchTerm) ||
    b.sizes.includes(blockSearchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Clean & High-Contrast Header Banner */}
      <div className="naver-card p-6 sm:p-10 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30 text-xs font-black mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>나무위키 3.1. 공동주택 전수 목록 & 국토부·LH 공식 토지이용계획도 연동</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            <span className="text-[#03c75a]">{selectedTown.name}</span> 공동주택 전수 도감 <br />
            구역·단지명·세대수·시행주체·시공사 총정리
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-medium">
            나무위키 및 LH 청약플러스의 <strong>'3.1. 공동주택'</strong> 전수 데이터(A1~A25, B1~B17, S1~S20 등)를 도표와 공식 도면으로 완벽 구현하여, <strong>시공사(대광건영, 계룡건설, 대우건설, 금호건설 등)와 청약·입주 시기</strong>를 즉시 확인할 수 있습니다.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
            <a 
              href="https://www.xn--3-3u6ey6lv7rsa.kr/kor/Main.do" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#03c75a] hover:bg-[#02b14f] text-white shadow-xs transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>3기신도시.kr 공식 메인 포털 ↗</span>
            </a>
            <a 
              href={selectedTown.lhOfficialUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e8f8ee] hover:bg-[#03c75a] text-[#029f45] hover:text-white transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{selectedTown.shortName} 공식 지구 현황관 ↗</span>
            </a>
            <a 
              href="https://www.xn--3-3u6ey6lv7rsa.kr/kor/CMS/AreanoticeMgr/list.do?mCode=MN123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#edf4ff] hover:bg-[#0066ff] text-[#0066ff] hover:text-white transition"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>3기 신도시 청약일정 알리미 ↗</span>
            </a>
            <a 
              href={selectedTown.namuWikiUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0066ff]" />
              <span>나무위키 {selectedTown.shortName} 백과 원문 ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3 Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
        {[
          { id: 'NEW_TOWNS', label: '1. 나무위키 3.1. 공동주택 & LH 공식 도면 도감', icon: '🗺️' },
          { id: 'FUTURE_NEWS', label: '2. 미래 주목 변수 & 실시간 네이버 뉴스', icon: '📡' },
          { id: 'GLOSSARY', label: '3. 필수 부동산·대출 용어 & 실시간 계산기', icon: '📚' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-2xl whitespace-nowrap font-black transition flex items-center gap-2 cursor-pointer border ${
              activeTab === tab.id
                ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: 3기 신도시 지도 & 블록별 공급 도감 */}
      {/* ========================================================================= */}
      {activeTab === 'NEW_TOWNS' && (
        <div className="space-y-6 animate-fadeIn">

          {/* Quick Town Pill Selectors */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-2">
              {NEW_TOWNS_DATA.map((town) => (
                <button
                  key={town.id}
                  onClick={() => handleSelectTown(town.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                    selectedTownId === town.id
                      ? 'bg-[#03c75a] text-white border-[#03c75a] shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{town.name}</span>
                </button>
              ))}
            </div>

            {/* Map Mode Switcher (토지이용계획도 vs 광역 노선망) */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
              <button
                onClick={() => setMapViewType('DISTRICT_BLOCKS')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  mapViewType === 'DISTRICT_BLOCKS' ? 'bg-white text-[#029f45] shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>LH 공식 토지이용계획도</span>
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

          {/* ===================================================================== */}
          {/* 🗺️ MAP VIEW 1: LH 공식 토지이용계획(변경)도 고화질 뷰어 & 블록 핀포인터 */}
          {/* ===================================================================== */}
          {mapViewType === 'DISTRICT_BLOCKS' && (
            <div className="naver-card p-5 sm:p-7 bg-white border border-slate-200 shadow-sm space-y-5 animate-fadeIn">
              
              {/* Header with Title & Zoom / Lightbox Toolbar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e8f8ee] text-[#029f45] text-[11px] font-black mb-1">
                    <FileText className="w-3 h-3" />
                    <span>{selectedTown.name} 공공주택지구 공식 토지이용계획도 원본</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <span>{selectedTown.name} 공식 마스터플랜 도면 뷰어</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    도면 우측 상단의 <strong>[🔍 확대/축소]</strong> 및 <strong>[전체화면 고화질 보기]</strong>로 세부 블록을 정밀하게 탐색할 수 있습니다.
                  </p>
                </div>

                {/* Map Interactive Toolbar */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
                      className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition cursor-pointer"
                      title="지도 확대"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <span className="px-2 text-slate-600 text-[11px] font-black">{Math.round(zoomLevel * 100)}%</span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                      className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition cursor-pointer"
                      title="지도 축소"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1.5 rounded-lg hover:bg-white text-slate-700 transition cursor-pointer ml-1 border-l border-slate-200"
                      title="원본 크기 초기화"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>전체화면 고화질 도면 보기</span>
                  </button>
                </div>
              </div>

              {/* Master Plan Canvas & Interactive Info Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Real LH Blueprint Image with Animated Pinpoint Markers (Left 7 Cols) */}
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-300 p-2 relative overflow-hidden shadow-md flex items-center justify-center min-h-[520px] max-h-[680px]">
                  
                  {/* Scrollable / Zoomable Container */}
                  <div className="w-full h-full overflow-auto max-h-[660px] flex items-center justify-center relative select-none">
                    <div 
                      className="relative transition-transform duration-200 ease-out origin-center"
                      style={{ transform: `scale(${zoomLevel})` }}
                    >
                      {/* Official High-Resolution Blueprint Image */}
                      <img 
                        src={selectedTown.officialBlueprintUrl} 
                        alt={`${selectedTown.name} 공식 토지이용계획도`} 
                        className="w-full max-w-[480px] h-auto object-contain rounded-lg shadow-inner filter brightness-105 contrast-105"
                      />

                      {/* Interactive Pin Overlays for All Major Blocks on the Blueprint */}
                      {selectedTown.blocks.map((block) => {
                        const isSelected = selectedBlockCode === block.blockCode;
                        const { x, y } = block.pinPos;

                        return (
                          <div
                            key={block.blockCode}
                            onClick={() => setSelectedBlockCode(block.blockCode)}
                            style={{ top: `${y}%`, left: `${x}%` }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                          >
                            {/* Selected Block Ping Ring */}
                            {isSelected && (
                              <span className="absolute -inset-2.5 rounded-full bg-rose-500/40 animate-ping" />
                            )}

                            {/* Pin Head */}
                            <div className={`flex items-center justify-center px-1.5 py-0.5 rounded-md text-[10px] font-black transition-all shadow-md border ${
                              isSelected 
                                ? 'bg-rose-600 text-white border-white scale-125 z-30' 
                                : 'bg-slate-900/90 text-yellow-300 border-yellow-400/80 hover:bg-rose-600 hover:text-white'
                            }`}>
                              <span>{block.shortCode}</span>
                            </div>

                            {/* RED CALLOUT POINTER BADGE (Matches user's exact uploaded blueprint pointer!) */}
                            {isSelected && (
                              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 flex items-center whitespace-nowrap z-40 animate-fadeIn">
                                <div className="w-0 h-0 border-y-5 border-y-transparent border-r-6 border-r-red-600" />
                                <div className="bg-red-600 text-white font-black text-[11px] px-2.5 py-1 rounded shadow-lg flex items-center gap-1 border border-red-700">
                                  <span>{block.shortCode}블록</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Watermark badge */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                    📐 국토교통부 · LH 공공주택지구 고시 도면
                  </div>
                </div>

                {/* Selected Block Spotlight & Full Block Directory (Right 5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Spotlight Block Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl space-y-4 relative overflow-hidden border border-slate-700">
                    <div className="absolute right-0 top-0 w-36 h-36 bg-[#03c75a]/15 rounded-full blur-3xl" />
                    
                    <div className="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
                      <div>
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
                          도면 선택 블록
                        </span>
                        <h4 className="text-2xl font-black text-white mt-1">
                          {activeBlock.blockCode}
                        </h4>
                        <span className="text-xs text-slate-300 font-medium block mt-0.5">
                          {activeBlock.complexName}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-[#4ade80] block">
                          {activeBlock.supplyType}
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold">
                          {activeBlock.unitsTotal}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
                        <span className="text-slate-400 font-medium">시공사:</span>
                        <span className="font-black text-[#60a5fa] text-xs flex items-center gap-1">
                          <HardHat className="w-3.5 h-3.5" />
                          <span>{activeBlock.builder}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
                        <span className="text-slate-400 font-medium">청약 / 입주:</span>
                        <span className="font-black text-amber-300 text-xs">
                          {activeBlock.subscriptionDate} / {activeBlock.moveInDate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
                        <span className="text-slate-400 font-medium">분양가(추정/본청약):</span>
                        <span className="font-black text-[#4ade80] text-sm">{activeBlock.priceEstimate}</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
                        <span className="text-slate-400 font-medium">공급 평형:</span>
                        <span className="font-black text-white">{activeBlock.sizes}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                      💡 {activeBlock.note}
                    </p>

                    <button
                      onClick={() => handleOpenNaverNews(`${selectedTown.name} ${activeBlock.blockCode} ${activeBlock.builder} 분양`)}
                      className="w-full py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <span>{activeBlock.shortCode} 블록 실시간 네이버 분양 뉴스 보기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Block Search & Interactive Filter Selector */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-[#03c75a]" />
                        <span>{selectedTown.name} 블록 바로가기 ({selectedTown.blocks.length}개)</span>
                      </span>
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="블록, 시공사, 평형 검색 (예: A19, 대우, 84㎡)"
                        value={blockSearchTerm}
                        onChange={(e) => setBlockSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#03c75a]"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {filteredBlocks.map(b => (
                        <button
                          key={b.blockCode}
                          onClick={() => setSelectedBlockCode(b.blockCode)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                            selectedBlockCode === b.blockCode
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs font-black'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {b.shortCode}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 📋 3.1. 나무위키 & LH 전수 공동주택 목록 테이블 (User Image Exact Match) */}
          {/* ========================================================================= */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <TableIcon className="w-5 h-5 text-[#0066ff]" />
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    3.1. {selectedTown.name} 공동주택 전수 목록표 (나무위키 100% 반영)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  행을 클릭하면 상단 도면에서 해당 블록의 위치가 즉시 빨간색 포인터로 표시됩니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="단지명, 시공사, 공급유형 검색..."
                    value={blockSearchTerm}
                    onChange={(e) => setBlockSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0066ff]"
                  />
                </div>
              </div>
            </div>

            {/* Namuwiki Style Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#013894] text-white font-black text-center divide-x divide-blue-800">
                    <th className="py-3 px-3 w-16">구역</th>
                    <th className="py-3 px-4 min-w-[140px]">단지명</th>
                    <th className="py-3 px-3 min-w-[110px]">세대수</th>
                    <th className="py-3 px-3 min-w-[90px]">시행주체</th>
                    <th className="py-3 px-3 min-w-[90px]">청약</th>
                    <th className="py-3 px-3 min-w-[90px]">입주</th>
                    <th className="py-3 px-3 min-w-[100px]">시공사</th>
                    <th className="py-3 px-3 min-w-[130px]">분양가(추정)</th>
                    <th className="py-3 px-2 w-16">도면 핀</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-center">
                  {filteredBlocks.map((block) => {
                    const isSelected = selectedBlockCode === block.blockCode;
                    return (
                      <tr
                        key={block.blockCode}
                        onClick={() => {
                          setSelectedBlockCode(block.blockCode);
                          setMapViewType('DISTRICT_BLOCKS');
                        }}
                        className={`transition cursor-pointer hover:bg-blue-50/60 ${
                          isSelected ? 'bg-[#e8f8ee] font-bold text-slate-900 border-l-4 border-l-rose-500' : 'bg-white text-slate-800'
                        }`}
                      >
                        {/* 구역 */}
                        <td className="py-3 px-3 font-black text-blue-900 bg-slate-50/80">
                          {block.shortCode}
                        </td>

                        {/* 단지명 */}
                        <td className="py-3 px-4 font-bold text-slate-900 text-left">
                          <span className={block.complexName !== '미정' ? 'text-[#0066ff] font-black' : 'text-slate-400'}>
                            {block.complexName}
                          </span>
                        </td>

                        {/* 세대수 */}
                        <td className="py-3 px-3 font-medium text-slate-700">
                          {block.unitsTotal}
                        </td>

                        {/* 시행주체 */}
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-black ${
                            block.supplyType === '나눔형' 
                              ? 'bg-amber-100 text-amber-800' 
                              : block.supplyType === '신혼희망타운' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : block.supplyType === '민간분양'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {block.supplyType}
                          </span>
                        </td>

                        {/* 청약 */}
                        <td className="py-3 px-3 text-slate-600 font-medium">
                          {block.subscriptionDate}
                        </td>

                        {/* 입주 */}
                        <td className="py-3 px-3 text-slate-600 font-medium">
                          {block.moveInDate}
                        </td>

                        {/* 시공사 */}
                        <td className="py-3 px-3 font-black">
                          <span className={block.builder !== '미정' ? 'text-[#0066ff]' : 'text-slate-400'}>
                            {block.builder}
                          </span>
                        </td>

                        {/* 분양가 */}
                        <td className="py-3 px-3 font-black text-[#029f45] text-left">
                          {block.priceEstimate}
                        </td>

                        {/* 도면 핀 */}
                        <td className="py-3 px-2">
                          <button
                            type="button"
                            className="p-1 rounded bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-600 transition text-[11px] font-bold"
                          >
                            핀 📍
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: 미래 주목 변수 & 실시간 뉴스 */}
      {/* ========================================================================= */}
      {activeTab === 'FUTURE_NEWS' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Section: 4 Future Megatrends */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
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

            {/* Real-time Naver News Live Search Section */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500 animate-bounce" />
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    실시간 네이버 부동산 뉴스 핫이슈 키워드 (원클릭 최신순 검색)
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-bold hidden sm:inline">네이버 뉴스 최신순 직통 연결</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {[
                  { tag: '3기 신도시', query: '3기 신도시 본청약 분양가 일정', badge: 'HOT' },
                  { tag: '스트레스 DSR', query: '스트레스 DSR 2단계 주택담보대출 한도', badge: '대출' },
                  { tag: 'GTX-A/B/C', query: 'GTX 개통 창릉역 왕숙역 노선', badge: '교통' },
                  { tag: '공사비 분쟁', query: '아파트 재건축 공사비 분양가 상승', badge: '공급' },
                  { tag: '전세가율 상승', query: '수도권 아파트 전세가율 갭투자 전세 사기', badge: '전세' },
                  { tag: '금리 인하', query: '한국은행 기준금리 인하 주담대 변동금리', badge: '금융' },
                  { tag: '서울 신축 품귀', query: '서울 아파트 입주 물량 절벽 신축', badge: '시세' },
                  { tag: '청약 경쟁률', query: '서울 수도권 아파트 로또 청약 경쟁률', badge: '청약' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenNaverNews(item.query)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-[#e8f8ee] border border-slate-200 hover:border-[#03c75a] text-left transition cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-200 group-hover:bg-[#03c75a] group-hover:text-white text-slate-600 transition">
                        {item.badge}
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#03c75a]" />
                    </div>
                    <span className="text-xs font-black text-slate-800 group-hover:text-[#029f45] mt-2 block truncate">
                      {item.tag} ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: 필수 부동산·대출 용어 사전 & 실시간 계산기 */}
      {/* ========================================================================= */}
      {activeTab === 'GLOSSARY' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Quick Calculators Trigger Bar */}
          <div className="naver-card p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-md border border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-[#03c75a] text-white">
                  실전 금융 계산기
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  내 소득과 자산으로 가능한 대출 & 갭투자 실시간 시뮬레이션
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  금융 규제 용어를 클릭하여 나의 최대 대출 가능액과 필요 현금을 즉시 계산해보세요.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenCalculator('DSR')}
                  className="px-4 py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs font-black flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>DSR 40% 계산기</span>
                </button>
                <button
                  onClick={() => handleOpenCalculator('LTV')}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Coins className="w-4 h-4" />
                  <span>LTV 대출 계산기</span>
                </button>
                <button
                  onClick={() => handleOpenCalculator('GAP')}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>갭투자 계산기</span>
                </button>
              </div>
            </div>
          </div>

          {/* Glossary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'DSR (총부채원리금상환비율)',
                tag: '대출 한도 핵심',
                calcType: 'DSR' as CalcMode,
                desc: '연간 총소득에서 모든 대출의 연간 원리금 상환액이 차지하는 비율. 1금융권은 40%로 엄격히 제한됩니다.',
                impact: '연소득 8천만 원 기준 연간 원리금 3,200만 원(월 약 266만 원)까지만 대출 가능',
                tip: '신용대출이나 카드론이 있으면 주택담보대출 한도가 크게 깎이므로 상환 우선순위가 필요합니다.'
              },
              {
                title: '스트레스 DSR (Stress DSR)',
                tag: '한도 축소 규제',
                calcType: 'DSR' as CalcMode,
                desc: '향후 금리 인상 가능성을 감안해 DSR 산정 시 가산금리(수도권 +1.2%p)를 더해 대출 한도를 줄이는 제도입니다.',
                impact: '동일 소득이라도 기존 대비 주택담보대출 가능 총액이 약 5,000만~1억 원 축소',
                tip: '주기형(5년 고정) 또는 혼합형 금리를 선택하면 가산금리 적용 비율이 낮아져 한도를 늘릴 수 있습니다.'
              },
              {
                title: 'LTV (주택담보인정비율)',
                tag: '담보 가치 비율',
                calcType: 'LTV' as CalcMode,
                desc: '주택 가격 대비 빌릴 수 있는 최대 대출금의 비율입니다. 규제지역 여부와 생애최초 여부에 따라 다릅니다.',
                impact: '10억 주택 기준 LTV 70% 적용 시 최대 7억 원 대출 가능 (단, DSR 한도 내)',
                tip: 'LTV가 70% 나와도 DSR 소득 증빙이 부족하면 실제 대출 금액은 DSR 기준으로 결정됩니다.'
              },
              {
                title: '전세가율 & 갭투자',
                tag: '안전성 진단',
                calcType: 'GAP' as CalcMode,
                desc: '매매가 대비 전세가의 비율. 전세가율이 60~70% 이상이면 매매가 하락 방어력이 높고 갭이 작아집니다.',
                impact: '매매 10억 / 전세 6.5억일 때 갭 3.5억 + 취득세(약 3,300만 원)로 매수 가능',
                tip: '전세가율이 80%를 넘는 빌라나 외곽 나홀로 아파트는 깡통전세 및 역전세 위험이 매우 큽니다.'
              },
              {
                title: '분양가 상한제 (분상제)',
                tag: '청약 로또 원리',
                desc: '공공택지(3기 신도시 등)나 규제지역에서 아파트 분양가를 정부가 정한 상한선 이하로 통제하는 제도.',
                impact: '주변 시세 대비 60~80% 수준의 저렴한 가격으로 공급되어 당첨 시 시세 차익 기대',
                tip: '분상제 단지는 거주의무기간(최대 5년)과 전매제한(최대 3~10년) 규제가 따릅니다.'
              },
              {
                title: '나눔형 / 일반형 / 선택형 (공공분양)',
                tag: '3기 신도시 공급유형',
                desc: '윤석열 정부 뉴:홈 공공분양의 3대 공급 유형. 본인의 자금력과 소득에 맞춰 청약 전략을 세웁니다.',
                impact: '나눔형: 시세 70% 분양 + 1%대 전용 모기지 (처분 시 차익 70% 수분양자 귀속)',
                tip: '현금이 부족한 신혼부부 및 청년층은 1%대 저리 대출이 나오는 나눔형이 가장 유리합니다.'
              }
            ].map((item, idx) => (
              <div key={idx} className="naver-card p-6 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.tag}
                    </span>
                    {item.calcType && (
                      <button
                        onClick={() => handleOpenCalculator(item.calcType)}
                        className="text-[11px] font-black text-[#03c75a] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>계산해보기 ↗</span>
                      </button>
                    )}
                  </div>

                  <h4 className="text-base font-black text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#e8f8ee] text-[#029f45] font-bold">
                    📌 {item.impact}
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-slate-600 font-medium">
                    💡 {item.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 🧮 INTERACTIVE CALCULATOR MODAL (DSR / LTV / GAP) */}
      {/* ========================================================================= */}
      {isCalcOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#03c75a]" />
                <h3 className="text-lg font-black text-white">
                  {calcMode === 'DSR' && 'DSR 40% & 스트레스 DSR 실시간 계산기'}
                  {calcMode === 'LTV' && 'LTV 기준 대출 가능액 및 필요 현금 계산기'}
                  {calcMode === 'GAP' && '갭투자 필요 자금 및 전세가율 안전성 진단기'}
                </h3>
              </div>
              <button
                onClick={() => setIsCalcOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              
              {/* DSR MODE */}
              {calcMode === 'DSR' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">연 소득 (세전 만 원)</label>
                      <input
                        type="number"
                        step="500"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 focus:border-[#03c75a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">대출 금리 (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 focus:border-[#03c75a]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">대출 만기 (년)</label>
                      <select
                        value={loanPeriodYears}
                        onChange={(e) => setLoanPeriodYears(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 focus:border-[#03c75a]"
                      >
                        <option value={30}>30년 만기</option>
                        <option value={35}>35년 만기</option>
                        <option value={40}>40년 만기 (최선호)</option>
                        <option value={50}>50년 만기</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">기타 대출 월 원리금 (만 원)</label>
                      <input
                        type="number"
                        step="10"
                        value={otherMonthlyDebt}
                        onChange={(e) => setOtherMonthlyDebt(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 focus:border-[#03c75a]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      id="stressDsrCheck"
                      checked={applyStressDsr}
                      onChange={(e) => setApplyStressDsr(e.target.checked)}
                      className="w-4 h-4 text-[#03c75a] rounded"
                    />
                    <label htmlFor="stressDsrCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                      수도권 스트레스 DSR 2단계 가산금리 (+1.2%p) 적용
                    </label>
                  </div>

                  {/* Result Box */}
                  <div className="p-5 rounded-2xl bg-[#e8f8ee] border border-[#03c75a]/30 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold">DSR 40% 기준 연간 상환 한도:</span>
                      <span className="text-slate-900 font-black">{maxYearlyPaymentDsr40.toLocaleString()}만 원 / 년</span>
                    </div>

                    <div className="flex justify-between items-center text-base sm:text-lg pt-2 border-t border-[#03c75a]/20">
                      <span className="text-slate-900 font-black">예상 최대 주담대 대출 가능액:</span>
                      <span className="text-[#029f45] font-black">약 {Math.round(maxLoanDsrPrincipal).toLocaleString()}만 원 ({(maxLoanDsrPrincipal / 10000).toFixed(2)}억)</span>
                    </div>

                    {applyStressDsr && (
                      <p className="text-xs text-rose-600 font-bold">
                        ⚠️ 스트레스 DSR 2단계 적용으로 대출 한도가 약 {Math.round(stressReductionAmount).toLocaleString()}만 원 축소되었습니다.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* LTV MODE */}
              {calcMode === 'LTV' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">주택 매매 가격 (만 원)</label>
                    <input
                      type="number"
                      step="5000"
                      value={housePrice}
                      onChange={(e) => setHousePrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 focus:border-[#03c75a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">적용 LTV 비율 (%)</label>
                    <div className="grid grid-cols-4 gap-2 mt-1">
                      {[40, 50, 70, 80].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setLtvRate(rate)}
                          className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            ltvRate === rate ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {rate}% {rate === 70 && '(일반 무주택)'} {rate === 80 && '(생애최초)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Result Box */}
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold">LTV {ltvRate}% 기준 최대 대출금:</span>
                      <span className="text-blue-700 font-black text-base">약 {maxLoanLtv.toLocaleString()}만 원 ({(maxLoanLtv / 10000).toFixed(2)}억)</span>
                    </div>

                    <div className="flex justify-between items-center text-base sm:text-lg pt-2 border-t border-blue-200">
                      <span className="text-slate-900 font-black">매수를 위한 최소 보유 현금:</span>
                      <span className="text-slate-900 font-black">약 {minRequiredCashLtv.toLocaleString()}만 원 ({(minRequiredCashLtv / 10000).toFixed(2)}억)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* GAP MODE */}
              {calcMode === 'GAP' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">매매 가격 (만 원)</label>
                      <input
                        type="number"
                        step="5000"
                        value={gapBuyPrice}
                        onChange={(e) => setGapBuyPrice(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">전세 가격 (만 원)</label>
                      <input
                        type="number"
                        step="5000"
                        value={gapJeonsePrice}
                        onChange={(e) => setGapJeonsePrice(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 focus:border-purple-600"
                      />
                    </div>
                  </div>

                  {/* Result Box */}
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold">전세가율:</span>
                      <span className={`font-black text-base ${Number(gapJeonseRatio) > 80 ? 'text-rose-600' : 'text-purple-700'}`}>
                        {gapJeonseRatio}% {Number(gapJeonseRatio) > 80 ? '(⚠️ 역전세 위험)' : '(안전 범위)'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold">순수 갭 (매매가 - 전세가):</span>
                      <span className="text-slate-900 font-black">{pureGapCash.toLocaleString()}만 원 ({(pureGapCash / 10000).toFixed(2)}억)</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold">취득세 등 부대비용 (약 3.3%):</span>
                      <span className="text-slate-600 font-bold">{gapAcquisitionTax.toLocaleString()}만 원</span>
                    </div>

                    <div className="flex justify-between items-center text-base sm:text-lg pt-2 border-t border-purple-200">
                      <span className="text-slate-900 font-black">총 필요 현금:</span>
                      <span className="text-purple-800 font-black">약 {totalGapNeedCash.toLocaleString()}만 원 ({(totalGapNeedCash / 10000).toFixed(2)}억)</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsCalcOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🔎 FULLSCREEN / LIGHTBOX OFFICIAL BLUEPRINT MODAL */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-5xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-[#4ade80] bg-[#029f45]/20 px-2 py-0.5 rounded">
                  초고화질 원본 도면
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {selectedTown.name} 공식 토지이용계획도 전체화면
                </h3>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img 
                src={selectedTown.officialBlueprintUrl} 
                alt={`${selectedTown.name} 토지이용계획도 원본`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
