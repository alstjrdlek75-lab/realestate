import React, { useState, useRef } from 'react';
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
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Map as MapIcon,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface RealEstateFutureProps {
  onStartDiagnostic?: () => void;
}

type FutureTab = 'NEW_TOWNS' | 'FUTURE_NEWS' | 'GLOSSARY';
type MapViewType = 'DISTRICT_BLOCKS' | 'METRO';
type CalcMode = 'DSR' | 'LTV' | 'GAP';

interface BlockDetail {
  blockCode: string;
  shortCode: string;
  supplyType: '공공분양' | '신혼희망타운' | '민간분양' | '주상복합';
  units: number;
  sizes: string;
  priceEstimate: string;
  stationDistance: string;
  featureBadge: string;
  progressStatus: string;
  progressStatusColor: string;
  note: string;
  // Exact percentage location on Official LH Master Plan Blueprint (top: 0~100%, left: 0~100%)
  pinPos: { x: number; y: number };
}

interface NewTownDetail {
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
    namuWikiUrl: 'https://namu.wiki/w/%EC%99%95%EC%88%99%EC%8B%A0%EB%8F%84%EC%8B%9C',
    lhOfficialUrl: 'https://3rd-newtown.lh.or.kr',
    mapCoords: { x: 670, y: 170, gangnamTime: '강남 25분 (9호선)', seoulTime: '서울역 15분 (GTX-B)' },
    blocks: [
      {
        blockCode: '왕숙1 A-19 블록',
        shortCode: 'A-19',
        supplyType: '공공분양',
        units: 720,
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '74㎡ 약 4.6억 / 84㎡ 약 5.3억',
        stationDistance: 'GTX-B / 9호선 왕숙역 도보 4분 (중심상업지구 바로 앞)',
        featureBadge: '👑 왕숙 1위 대장 로또 블록',
        progressStatus: '본청약 준비 중',
        progressStatusColor: 'bg-rose-600 text-white',
        note: '도면 중앙 중심상업지구와 복합환승역 바로 동측에 위치한 왕숙지구 최고의 핵심 대장 블록',
        pinPos: { x: 65, y: 52 }
      },
      {
        blockCode: '왕숙1 B-1 블록',
        shortCode: 'B-1',
        supplyType: '공공분양',
        units: 569,
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '74㎡ 약 4.5억 / 84㎡ 약 5.2억',
        stationDistance: 'GTX-B / 9호선 왕숙역 도보 5분 (초역세권)',
        featureBadge: '🏆 핵심 초역세권 대장',
        progressStatus: '본청약 진행/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: '복합환승 왕숙역 북동측 도보 5분 거리의 84㎡ 중형 위주 최선호 공공분양 단지',
        pinPos: { x: 77, y: 13 }
      },
      {
        blockCode: '왕숙1 B-2 블록',
        shortCode: 'B-2',
        supplyType: '공공분양',
        units: 587,
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '74㎡ 약 4.4억 / 84㎡ 약 5.1억',
        stationDistance: '신설역 도보 7분 (초품아)',
        featureBadge: '🎒 초품아 & 근린공원',
        progressStatus: '2025년 본청약',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '단지 바로 옆 초등학교와 근린공원을 품은 쾌적한 84㎡ 주거 블록',
        pinPos: { x: 75, y: 17 }
      },
      {
        blockCode: '왕숙1 A-1 블록',
        shortCode: 'A-1',
        supplyType: '공공분양',
        units: 583,
        sizes: '전용 59㎡',
        priceEstimate: '59㎡ 약 3.8억~4.0억',
        stationDistance: '북부 신설역 도보 6분',
        featureBadge: '💰 실속 소형 59㎡',
        progressStatus: '본청약 준비 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '왕숙1 북단 진접 방면 진입부 위치, 가성비가 가장 뛰어난 실속 59㎡ 단지',
        pinPos: { x: 72, y: 8 }
      },
      {
        blockCode: '왕숙1 S-8 블록',
        shortCode: 'S-8',
        supplyType: '공공분양',
        units: 680,
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.1억',
        stationDistance: '중심상업지구 도보 5분',
        featureBadge: '🛍️ 중심상권 슬세권',
        progressStatus: '본청약 예정',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '중심상업지구 북측 맞닿은 입지로 쇼핑·편의시설 이용이 가장 편리한 블록',
        pinPos: { x: 60, y: 44 }
      },
      {
        blockCode: '왕숙1 S-19 블록',
        shortCode: 'S-19',
        supplyType: '공공분양',
        units: 640,
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 5.2억',
        stationDistance: '동측 완충녹지 도보 2분',
        featureBadge: '🌿 숲세권 힐링단지',
        progressStatus: '본청약 예정',
        progressStatusColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30',
        note: '동측 대규모 녹지축과 중앙공원에 바로 연결되는 쾌적한 숲세권 주거 단지',
        pinPos: { x: 73, y: 31 }
      },
      {
        blockCode: '왕숙1 A-24 블록',
        shortCode: 'A-24',
        supplyType: '신혼희망타운',
        units: 602,
        sizes: '전용 55㎡',
        priceEstimate: '55㎡ 약 3.4억~3.6억',
        stationDistance: '유치원·초등학교 인접',
        featureBadge: '👶 신혼희망타운 보육특화',
        progressStatus: '착공 및 본청약',
        progressStatusColor: 'bg-emerald-50 text-[#029f45] border-[#03c75a]/30',
        note: '남부 진건 생활권 인접, 단지 내 국공립 어린이집과 초등학교 통학 안전 완비',
        pinPos: { x: 72, y: 68 }
      },
      {
        blockCode: '왕숙1 A-22 블록',
        shortCode: 'A-22',
        supplyType: '공공분양',
        units: 510,
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
        blockCode: '왕숙2 A-4 블록',
        shortCode: '왕숙2 A-4',
        supplyType: '공공분양',
        units: 520,
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.1억 / 84㎡ 약 5.5억',
        stationDistance: '경의중앙선 신설역 도보 5분',
        featureBadge: '🎨 문화예술 복합축 대장',
        progressStatus: '본청약 진행 중',
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
    transitSummary: '지하철 3호선 연장(송파하남선, 오금역~감일~교산~하남시청), 송파~양평고속도로, 서하남로 확장',
    transitLines: ['지하철 3호선', '송파하남선', '중부고속도로', '수도권제1순환'],
    anchorCompanies: 'AI 혁신 클러스터, 첨단 바이오·헬스케어 앵커 기업, 판교·강남 연계 테크 스타트업 파크',
    selfSufficientLand: '판교테크노밸리 1.4배 규모 (약 92만㎡ 자족용지)',
    currentStatus: '토지 보상 100% 완료 후 지장물 철거 및 단지 조성 공사 순항 중. 3호선 송파하남선 기본계획 확정.',
    proTip: '강남(GBD) 및 송파와 가장 가까운 입지로 3기 신도시 중 실수요자 선호도 1위. 3호선 개통 시 수서·양재 20분대 진입.',
    naverNewsQuery: '하남 교산 3기 신도시 3호선 송파하남선',
    officialBlueprintUrl: '/maps/wangsook_master_plan.png',
    namuWikiUrl: 'https://namu.wiki/w/%EA%B5%90%EC%82%B0%EC%8B%A0%EB%8F%84%EC%8B%9C',
    lhOfficialUrl: 'https://3rd-newtown.lh.or.kr',
    mapCoords: { x: 670, y: 400, gangnamTime: '수서 15분 / 양재 22분', seoulTime: '잠실 15분' },
    blocks: [
      {
        blockCode: '교산 A-2 블록',
        shortCode: 'A-2',
        supplyType: '공공분양',
        units: 1115,
        sizes: '전용 51㎡, 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.8억 / 84㎡ 약 6.4억',
        stationDistance: '지하철 3호선 신설역 도보 4분',
        featureBadge: '🏆 교산 1호 대단지',
        progressStatus: '2025년 본청약 예정',
        progressStatusColor: 'bg-[#0066ff] text-white',
        note: '1,115세대 랜드마크 대단지로 3호선 초역세권과 상업지구를 모두 갖춘 최고 핵심 블록',
        pinPos: { x: 50, y: 40 }
      },
      {
        blockCode: '교산 B-1 블록',
        shortCode: 'B-1',
        supplyType: '민간분양',
        units: 840,
        sizes: '전용 74㎡, 84㎡',
        priceEstimate: '84㎡ 약 6.8억~7.2억',
        stationDistance: '중앙호수공원 및 수변상가 인접',
        featureBadge: '🌿 호수공원 조망',
        progressStatus: '지구조성 중',
        progressStatusColor: 'bg-slate-100 text-slate-700 border-slate-300',
        note: '민간 1군 브랜드가 시공 예정인 84㎡ 중심 하이엔드 공원 조망 단지',
        pinPos: { x: 60, y: 55 }
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
    transitSummary: 'GTX-A 창릉역(삼성역 10분대), 고양은평선(새절~창릉~고양시청), 화랑로 확장 및 BRT',
    transitLines: ['GTX-A (창릉역)', '고양은평선', '서부선 직결', '자유로'],
    anchorCompanies: '상암DMC·마곡 연계 방송·영상 미디어 콘텐츠 기업, 스마트 물류·드론 R&D, ICT 융합 혁신 기업',
    selfSufficientLand: '약 130만㎡ 자족용지 (판교 1.5배 규모 테크노밸리)',
    currentStatus: '2024년 말 첫 본청약(A4, S5, S6블록) 진행 시작. GTX-A 창릉역 신설 확정 및 공사진행.',
    proTip: 'GTX-A 개통 시 서울역 8분, 삼성역 13분 컷. 상암DMC 직주근접 수요와 일산·은평 거주민의 최고 선호지.',
    naverNewsQuery: '고양 창릉 3기 신도시 GTX 창릉역',
    officialBlueprintUrl: '/maps/wangsook_master_plan.png',
    namuWikiUrl: 'https://namu.wiki/w/%EC%B0%BD%EB%A6%89%EC%8B%A0%EB%8F%84%EC%8B%9C',
    lhOfficialUrl: 'https://3rd-newtown.lh.or.kr',
    mapCoords: { x: 340, y: 190, gangnamTime: '삼성역 13분 (GTX-A)', seoulTime: '서울역 8분' },
    blocks: [
      {
        blockCode: '창릉 S-5 블록',
        shortCode: 'S-5',
        supplyType: '공공분양',
        units: 718,
        sizes: '전용 51㎡, 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.9억 / 84㎡ 약 6.7억',
        stationDistance: 'GTX-A 창릉역 도보 5분 (초역세권)',
        featureBadge: '🏆 3기 신도시 최고 경쟁률',
        progressStatus: '본청약 완료/착공',
        progressStatusColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30',
        note: 'GTX-A 창릉역을 걸어서 이용하는 창릉 최고 대장 블록. 삼성역 10분대 직결',
        pinPos: { x: 52, y: 48 }
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
    officialBlueprintUrl: '/maps/wangsook_master_plan.png',
    namuWikiUrl: 'https://namu.wiki/w/%EB%8C%80%EC%9E%A5%EC%8B%A0%EB%8F%84%EC%8B%9C',
    lhOfficialUrl: 'https://3rd-newtown.lh.or.kr',
    mapCoords: { x: 230, y: 350, gangnamTime: '여의도 20분 / 강남 40분', seoulTime: '홍대입구 20분 (대장홍대선)' },
    blocks: [
      {
        blockCode: '대장 A-7 블록',
        shortCode: 'A-7',
        supplyType: '공공분양',
        units: 449,
        sizes: '전용 59㎡',
        priceEstimate: '59㎡ 약 4.2억~4.4억',
        stationDistance: '대장홍대선 신설역 도보 5분',
        featureBadge: '🏆 대장지구 대장 블록',
        progressStatus: '2025년 본청약 예정',
        progressStatusColor: 'bg-[#03c75a] text-white',
        note: '홍대입구역 20분 컷 대장홍대선 초역세권으로 마곡/상암 직주근접 최고 입지',
        pinPos: { x: 45, y: 45 }
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
    officialBlueprintUrl: '/maps/wangsook_master_plan.png',
    namuWikiUrl: 'https://namu.wiki/w/%EA%B3%84%EC%96%91%EC%8B%A0%EB%8F%84%EC%8B%9C',
    lhOfficialUrl: 'https://3rd-newtown.lh.or.kr',
    mapCoords: { x: 170, y: 340, gangnamTime: '여의도 25분 / 마곡 10분', seoulTime: '서울역 30분 (공항철도)' },
    blocks: [
      {
        blockCode: '계양 A-2 블록',
        shortCode: 'A-2',
        supplyType: '공공분양',
        units: 813,
        sizes: '전용 59㎡, 74㎡, 84㎡',
        priceEstimate: '59㎡ 약 4.1억 / 84㎡ 약 5.8억',
        stationDistance: 'S-BRT 신설역 도보 3분',
        featureBadge: '🏆 3기 최초 본청약 단지',
        progressStatus: '본청약 완료 / 2026 입주',
        progressStatusColor: 'bg-[#03c75a] text-white',
        note: '3기 신도시 전체 중 가장 먼저 2024년 9월 본청약 완료. 2026년 12월 첫 입주 개시',
        pinPos: { x: 48, y: 50 }
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
    officialBlueprintUrl: '/maps/wangsook_master_plan.png',
    namuWikiUrl: 'https://namu.wiki/w/%EA%B3%BC%EC%B2%9C%EA%B3%BC%EC%B2%9C%EC%A7%80%EA%B5%AC',
    lhOfficialUrl: 'https://3rd-newtown.lh.or.kr',
    mapCoords: { x: 470, y: 470, gangnamTime: '양재 8분 / 강남역 15분', seoulTime: '사당 7분 (4호선)' },
    blocks: [
      {
        blockCode: '과천 A-1 블록',
        shortCode: 'A-1',
        supplyType: '공공분양',
        units: 650,
        sizes: '전용 59㎡, 84㎡',
        priceEstimate: '59㎡ 약 6.8억 / 84㎡ 약 9.2억 예상',
        stationDistance: '지하철 4호선 선바위역 도보 4분 (초역세권)',
        featureBadge: '👑 3기 신도시 원탑 황금 입지',
        progressStatus: '2025~2026년 분양 예정',
        progressStatusColor: 'bg-[#0066ff] text-white',
        note: '서초구 양재동 바로 옆! 사당·강남 10분대 진입 가능한 3기 신도시 최고의 로또 블록',
        pinPos: { x: 50, y: 40 }
      }
    ]
  }
];

export const RealEstateFuture: React.FC<RealEstateFutureProps> = () => {
  const [activeTab, setActiveTab] = useState<FutureTab>('NEW_TOWNS');
  const [mapViewType, setMapViewType] = useState<MapViewType>('DISTRICT_BLOCKS');
  const [selectedTownId, setSelectedTownId] = useState<string>(NEW_TOWNS_DATA[0].id);
  const [selectedBlockCode, setSelectedBlockCode] = useState<string>('왕숙1 A-19 블록');
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
    b.sizes.includes(blockSearchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Clean & High-Contrast Header Banner */}
      <div className="naver-card p-6 sm:p-10 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f8ee] text-[#029f45] border border-[#03c75a]/30 text-xs font-black mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>국토교통부 & LH 공식 토지이용계획(변경)도 기반 인터랙티브 도감</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            LH 공식 도면으로 보는 <br />
            <span className="text-[#03c75a]">{selectedTown.name}</span> 토지이용계획도 & 블록 도감
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-medium">
            실제 정부·LH 공식 고화질 마스터플랜 도면을 통해 <strong>A-1, A-19, B-1 등 각 블록의 실제 위치와 왕숙천 수변축, GTX-B·9호선 복합환승역, 중심상업지구</strong>의 공간 배치를 정밀하게 확인할 수 있습니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
            <a 
              href={selectedTown.namuWikiUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0066ff]" />
              <span>나무위키 {selectedTown.shortName} 백과 원문 ↗</span>
            </a>
            <a 
              href={selectedTown.lhOfficialUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e8f8ee] hover:bg-[#03c75a] text-[#029f45] hover:text-white transition"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>LH 3기 신도시 공식 포털 ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3 Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
        {[
          { id: 'NEW_TOWNS', label: '1. LH 공식 도면 & 블록별(A-1, A-19) 정밀 도감', icon: '🗺️' },
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
                    <span>남양주 왕숙 공공주택지구 토지이용계획(변경)도 정밀 원본</span>
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
                                {/* Red Pointer Triangle */}
                                <div className="w-0 h-0 border-y-5 border-y-transparent border-r-6 border-r-red-600" />
                                {/* Red Label Box */}
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
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-[#4ade80] block">
                          {activeBlock.supplyType}
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold">
                          {activeBlock.units}세대
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
                        <span className="text-slate-400 font-medium">분양가(추정/본청약):</span>
                        <span className="font-black text-[#4ade80] text-sm">{activeBlock.priceEstimate}</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
                        <span className="text-slate-400 font-medium">공급 평형:</span>
                        <span className="font-black text-white">{activeBlock.sizes}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-0.5">
                        <span className="text-slate-400 font-medium block">역세권 및 인프라:</span>
                        <span className="font-bold text-slate-200 block">{activeBlock.stationDistance}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                      💡 {activeBlock.note}
                    </p>

                    <button
                      onClick={() => handleOpenNaverNews(`${selectedTown.name} ${activeBlock.blockCode} 분양`)}
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
                        placeholder="블록 검색 (예: A-19, B-1, 84㎡)"
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

                  {/* Official Land Use Color Legend */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
                    <span className="text-[11px] font-black text-slate-700 block">
                      🎨 LH 법정 토지이용계획 색상 가이드
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-[#f59e0b] shrink-0" />
                        <span>노랑: 주거(공공/민간)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-[#10b981] shrink-0" />
                        <span>초록: 신혼희망·임대</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-[#ef4444] shrink-0" />
                        <span>빨강: 중심상업용지</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-xs bg-[#3b82f6] shrink-0" />
                        <span>파랑: 첨단 IT 자족용지</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* 🗺️ MAP VIEW 2: 수도권 광역 교통망 지도 */}
          {/* ===================================================================== */}
          {mapViewType === 'METRO' && (
            <div className="naver-card p-4 sm:p-7 bg-white border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#0066ff]" />
                    <span>수도권 3기 신도시 광역 입지 & 철도망 지도</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    서울 3대 도심(강남·도심·여의도)과 6개 신도시 간의 직결 철도 노선망을 보여줍니다.
                  </p>
                </div>
              </div>

              {/* Metro SVG Map */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[520px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
                <svg viewBox="0 0 860 540" className="w-full h-full">
                  {/* Han River */}
                  <path d="M 120 280 Q 250 320, 370 290 T 520 310 T 640 260 T 780 230 T 840 200" fill="none" stroke="#93c5fd" strokeWidth="18" strokeLinecap="round" strokeOpacity="0.8" />
                  {/* Seoul Boundary */}
                  <path d="M 310 210 Q 420 180, 560 210 Q 610 280, 580 370 Q 530 430, 420 420 Q 300 400, 280 320 Z" fill="#ffffff" fillOpacity="0.75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
                  <text x="420" y="240" fill="#64748b" fontSize="13" fontWeight="900" letterSpacing="3" opacity="0.5">서울특별시 (SEOUL)</text>

                  {/* Transit Lines */}
                  <path d="M 340 190 L 420 280 L 490 350 L 530 460" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="6,3" />
                  <path d="M 670 170 L 510 250 L 420 280 L 360 310 L 230 350" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="6,3" />
                  <path d="M 490 350 L 550 360 L 670 400" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="5,3" />
                  <path d="M 490 350 L 560 310 L 620 250 L 670 170" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="5,3" />
                  <path d="M 230 350 L 310 320 L 380 270" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5,3" />
                  <path d="M 470 470 L 440 380 L 420 280" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,3" />

                  {/* Seoul Hubs */}
                  <g transform="translate(420, 280)"><circle r="9" fill="#1e293b" /><text x="0" y="4" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">도심</text></g>
                  <g transform="translate(360, 310)"><circle r="8" fill="#1e293b" /><text x="0" y="3" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">여의</text></g>
                  <g transform="translate(490, 350)"><circle r="12" fill="#03c75a" /><text x="0" y="4" fill="#fff" fontSize="8" fontWeight="black" textAnchor="middle">GBD</text><text x="0" y="22" fill="#0f172a" fontSize="12" fontWeight="black" textAnchor="middle">강남·삼성역</text></g>

                  {/* 6 New Towns Nodes */}
                  {NEW_TOWNS_DATA.map((town) => {
                    const isSelected = selectedTownId === town.id;
                    const { x, y } = town.mapCoords;
                    return (
                      <g 
                        key={town.id} 
                        transform={`translate(${x}, ${y})`} 
                        onClick={() => {
                          handleSelectTown(town.id);
                          setMapViewType('DISTRICT_BLOCKS');
                        }}
                        className="cursor-pointer group"
                      >
                        {isSelected && <circle r="26" fill="#03c75a" fillOpacity="0.2" className="animate-ping" />}
                        <circle r="16" fill={isSelected ? "#03c75a" : "#fff"} stroke="#03c75a" strokeWidth="3" />
                        <text x="0" y="4" fill={isSelected ? "#fff" : "#029f45"} fontSize="11" fontWeight="900" textAnchor="middle">3기</text>
                        <g transform={`translate(0, ${y > 400 ? -28 : 28})`}>
                          <rect x="-56" y="-13" width="112" height="26" rx="6" fill={isSelected ? "#0f172a" : "#fff"} stroke="#cbd5e1" />
                          <text x="0" y="-1" fill={isSelected ? "#fff" : "#0f172a"} fontSize="10" fontWeight="900" textAnchor="middle">{town.shortName}</text>
                          <text x="0" y="9" fill="#029f45" fontSize="8" fontWeight="bold" textAnchor="middle">{town.mapCoords.gangnamTime}</text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* Detailed Town Profile Card */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${selectedTown.statusTagColor}`}>
                    {selectedTown.statusTag}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {selectedTown.units}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    · 면적 {selectedTown.areaSize}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {selectedTown.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedTown.location}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-left lg:text-right">
                  <span className="text-[11px] text-slate-400 font-bold block">입주 목표 시기</span>
                  <span className="text-base font-black text-[#029f45]">{selectedTown.expectedMoveIn}</span>
                </div>

                <button
                  onClick={() => handleOpenNaverNews(selectedTown.naverNewsQuery)}
                  className="px-3.5 py-2 rounded-xl bg-[#e8f8ee] hover:bg-[#03c75a] text-[#029f45] hover:text-white text-xs font-black border border-[#03c75a]/30 transition flex items-center gap-1 cursor-pointer"
                  title="네이버에서 이 신도시의 최신 분양 및 개발 뉴스 검색"
                >
                  <span>실시간 뉴스</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 4 Pillars Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pillar 1: Transit */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-[#0066ff] font-bold text-sm">
                  <Train className="w-4 h-4" />
                  <span>핵심 교통망 & 서울 직결 철도</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
                  {selectedTown.transitSummary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTown.transitLines.map(line => (
                    <span key={line} className="text-[11px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                      #{line}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillar 2: Anchor Companies & Self-Sufficient Land */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-[#029f45] font-bold text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>유치/약속된 핵심 앵커 기업 및 자족 용지</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-medium">
                  <p className="font-bold text-slate-900">
                    🏢 <strong>유치 기업</strong>: {selectedTown.anchorCompanies}
                  </p>
                  <p className="text-slate-600 text-xs mt-1">
                    📐 <strong>자족용지 규모</strong>: {selectedTown.selfSufficientLand}
                  </p>
                </div>
              </div>

              {/* Pillar 3: Current Status */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>현재 진행 상황 & 분양 일정</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedTown.currentStatus}
                </p>
              </div>

              {/* Pillar 4: Pro Tip & Strategic Analysis */}
              <div className="p-5 rounded-2xl bg-[#e8f8ee]/60 border border-[#03c75a]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#029f45] font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>실전 청약 & 매수 판단 팁</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedTown.proTip}
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 🏢 지구별 구체적인 블록(A-1, A-19, B-1 등) 공급 도감 */}
            {/* ========================================================================= */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#e8f8ee] text-[#029f45] flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                      <span>{selectedTown.name} 주요 분양 블록별(A·B·S) 상세 도감</span>
                      <span className="text-[10px] text-[#029f45] bg-[#e8f8ee] px-2 py-0.5 rounded font-black border border-[#03c75a]/20">
                        총 {selectedTown.blocks.length}개 핵심 블록
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      블록별 공급 유형, 세대수, 평형(59·84㎡), 추정/본청약 분양가 및 역세권 도보거리 분석
                    </p>
                  </div>
                </div>
              </div>

              {/* Blocks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedTown.blocks.map((block) => (
                  <div
                    key={block.blockCode}
                    onClick={() => {
                      setSelectedBlockCode(block.blockCode);
                      setMapViewType('DISTRICT_BLOCKS');
                    }}
                    className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-3 relative group cursor-pointer ${
                      selectedBlockCode === block.blockCode
                        ? 'border-2 border-rose-500 shadow-md bg-rose-50/20'
                        : 'border-slate-200 hover:border-[#03c75a] hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Badge & Status Header */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {block.featureBadge}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${block.progressStatusColor}`}>
                          {block.progressStatus}
                        </span>
                      </div>

                      {/* Block Name & Supply Type */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-[#029f45] transition-colors">
                          {block.blockCode}
                        </h4>
                        <span className="text-xs font-bold text-[#0066ff]">
                          {block.supplyType} ({block.units}세대)
                        </span>
                      </div>

                      {/* Station Distance */}
                      <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                        <Train className="w-3.5 h-3.5 text-[#03c75a] shrink-0" />
                        <span>{block.stationDistance}</span>
                      </div>

                      {/* Price & Size Box */}
                      <div className="mt-3 p-3 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">공급 평형:</span>
                          <span className="font-black text-slate-900">{block.sizes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">분양가(추정/확정):</span>
                          <span className="font-black text-[#029f45] text-sm">{block.priceEstimate}</span>
                        </div>
                      </div>

                      {/* Note */}
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                        💡 {block.note}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span className="text-rose-600">위치: 상단 도면 {block.shortCode}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenNaverNews(`${selectedTown.name} ${block.blockCode} 분양`);
                        }}
                        className="text-[#0066ff] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>뉴스 보기</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: 입지가 애매한 2~3채 다주택보다 '확실한 수도권 똘똘한 1채'로 자산을 집중하세요.
                </div>
              </div>

              {/* Point 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#0066ff] bg-[#edf4ff] px-2.5 py-1 rounded-md border border-[#0066ff]/20">
                    미래 변수 ②
                  </span>
                  <span className="text-xs text-slate-400 font-bold">공사비 폭등</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  평당 공사비 1,000만 원 시대 — 신축 품귀와 분양가 급등
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  원자재와 인건비 폭등으로 아파트 평당 건축비가 900~1,000만 원을 돌파했습니다. 
                  사업성이 떨어지는 구축 재건축은 추가분담금 부담으로 사업이 장기 중단되고 있으며, 이에 따라 <strong>향후 3~5년간 수도권 신축 아파트 입주 물량이 급감(절벽)</strong>하여 기존 신축·준신축 대단지의 몸값이 치솟고 있습니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: 재건축 기대감만 있는 구축보다 '이미 지어진 5~10년 차 준신축 대단지'를 선점하세요.
                </div>
              </div>

              {/* Point 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                    미래 변수 ③
                  </span>
                  <span className="text-xs text-slate-400 font-bold">철도망 혁명</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  수도권 30분 혁명 — GTX, 8호선 연장, 신분당선 확장
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  GTX-A 부분 개통을 필두로, <strong>8호선 별내 연장(잠실 20분 직결), 신분당선 호매실/용산 연장, GTX-B/C 착공</strong>이 가시화되고 있습니다. 
                  서울 핵심 업무지구까지 30분 이내로 물리적 시간을 압축해 주는 역세권은 판교/분당 수준의 위상을 갖추게 됩니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: 말뿐인 계획이 아니라 '실제 착공/개통 단계'에 진입한 역세권 단지만 집중 타겟팅하세요.
                </div>
              </div>

              {/* Point 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    미래 변수 ④
                  </span>
                  <span className="text-xs text-slate-400 font-bold">금리 & 대출 환경</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  기준금리 인하 유동성 vs '스트레스 DSR'의 줄다리기
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  금리 인하가 시작되더라도 금융당국의 <strong>스트레스 DSR 2~3단계 규제</strong>로 대출 한도가 묶여있습니다. 
                  따라서 '무리한 영끌'보다는 <strong>가구 소득이 높고 순현금을 보유한 실수요자가 탄탄한 9억~15억 원대 중상급지 아파트</strong>가 가장 안정적으로 상승 랠리를 이끌게 됩니다.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                  🎯 <strong>전략</strong>: DSR 40% 범위 내에서 감당 가능한 원리금 구조를 유지하며 장기 보유하세요.
                </div>
              </div>
            </div>
          </div>

          {/* News Hub */}
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-[#0066ff]" />
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    실시간 네이버 부동산 주요 뉴스 & 토픽 연동
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  버튼을 클릭하면 네이버 포털의 최신 부동산 뉴스와 실시간 속보가 새 탭에서 즉시 열립니다.
                </p>
              </div>

              <button
                onClick={() => window.open('https://land.naver.com/news/', '_blank', 'noopener,noreferrer')}
                className="px-4 py-2.5 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto cursor-pointer"
              >
                <span>네이버 부동산 뉴스 홈 ↗</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* 6 News Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: '수도권 아파트 시세 & 실거래가',
                  desc: '서울 및 경기 주요 지역 아파트 매매·전세 실거래가 추이 및 주간 상승률',
                  keyword: '수도권 아파트 실거래가 시세',
                  tag: '📊 시세 동향',
                  tagColor: 'bg-[#e8f8ee] text-[#029f45] border-[#03c75a]/30'
                },
                {
                  title: '3기 신도시 본청약 & 착공',
                  desc: '왕숙, 교산, 창릉, 대장, 계양, 과천 3기 신도시 분양가 및 사전청약 본청약 일정',
                  keyword: '3기 신도시 본청약 분양가 일정',
                  tag: '🏗️ 신도시',
                  tagColor: 'bg-[#edf4ff] text-[#0066ff] border-[#0066ff]/30'
                },
                {
                  title: 'GTX & 신분당선·8호선 철도망',
                  desc: 'GTX-A/B/C 노선 개통 및 8호선 별내선, 신분당선 연장선 최신 진행 상황',
                  keyword: 'GTX 신분당선 8호선 연장 개통',
                  tag: '🚇 철도망 호재',
                  tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
                },
                {
                  title: '기준금리 & 스트레스 DSR 대출',
                  desc: '한국은행 기준금리 결정, 주택담보대출 금리 변동 및 스트레스 DSR 규제',
                  keyword: '스트레스 DSR 주택담보대출 금리',
                  tag: '💰 금융 & 대출',
                  tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
                },
                {
                  title: '1기 신도시 재건축 선도지구',
                  desc: '분당, 일산, 평촌, 산본, 중동 특별법 선도지구 지정 및 공사비 현황',
                  keyword: '1기 신도시 재건축 선도지구 분당 평촌',
                  tag: '🏢 재건축 & 공급',
                  tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
                },
                {
                  title: '전세 시장 & 갭투자 동향',
                  desc: '가을/봄 이사철 수도권 아파트 전세가율 상승세 및 매매가 하방 지지력',
                  keyword: '수도권 아파트 전세가율 갭투자',
                  tag: '🔑 전세 & 임대차',
                  tagColor: 'bg-teal-50 text-teal-700 border-teal-200'
                },
              ].map((news) => (
                <div
                  key={news.title}
                  onClick={() => handleOpenNaverNews(news.keyword)}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#0066ff] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${news.tagColor}`}>
                        {news.tag}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066ff] transition-colors" />
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#0066ff] transition-colors leading-snug">
                      {news.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                      {news.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#0066ff]">
                    <span>실시간 네이버 뉴스 보기</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: 필수 용어 & 대출 계산기 */}
      {/* ========================================================================= */}
      {activeTab === 'GLOSSARY' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
            
            {/* Header & Direct Calculator Launch Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#03c75a]" />
                  <span>알아두면 돈이 되는 필수 부동산 & 대출 용어 사전</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  용어 카드의 <strong>[🧮 직접 계산해보기]</strong> 버튼을 누르면 내 소득과 주택 가격에 맞춘 대출 한도를 즉시 계산할 수 있습니다.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => handleOpenCalculator('DSR')}
                  className="px-3.5 py-2 rounded-xl bg-[#e8f8ee] hover:bg-[#03c75a] text-[#029f45] hover:text-white text-xs font-black border border-[#03c75a]/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>DSR 대출 한도 계산기</span>
                </button>

                <button
                  onClick={() => handleOpenCalculator('LTV')}
                  className="px-3.5 py-2 rounded-xl bg-[#edf4ff] hover:bg-[#0066ff] text-[#0066ff] hover:text-white text-xs font-black border border-[#0066ff]/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>LTV 계산기</span>
                </button>
              </div>
            </div>

            {/* Category 1: 대출 및 금융 규제 용어 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black text-[#0066ff]">
                  <Scale className="w-4 h-4" />
                  <span>1. 대출 & 금융 규제 용어 (클릭하여 실시간 계산하기)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DSR Card */}
                <div 
                  onClick={() => handleOpenCalculator('DSR')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#03c75a] hover:shadow-md transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base group-hover:text-[#029f45] transition-colors flex items-center gap-1.5">
                      <span>DSR (총부채원리금상환비율)</span>
                      <Calculator className="w-4 h-4 text-slate-400 group-hover:text-[#03c75a]" />
                    </span>
                    <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      가장 엄격한 규제
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    내 <strong>1년 연봉 중 모든 빚의 '원금+이자'를 갚는 데 쓸 수 있는 최대 한도 비율(보통 40%)</strong>입니다. 주택담보대출뿐만 아니라 신용대출, 마이너스통장, 자동차 할부까지 전부 합산하여 계산합니다.
                  </p>
                  <div className="p-2.5 bg-white group-hover:bg-[#e8f8ee] rounded-xl border border-slate-200 group-hover:border-[#03c75a]/30 text-xs text-slate-800 font-bold flex items-center justify-between">
                    <span>💡 연봉 8천만 ➡️ 최대 대출액 약 5.4억~6.2억</span>
                    <span className="text-[#029f45] font-black text-[11px]">계산기 열기 ↗</span>
                  </div>
                </div>

                {/* LTV Card */}
                <div 
                  onClick={() => handleOpenCalculator('LTV')}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#0066ff] hover:shadow-md transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base group-hover:text-[#0066ff] transition-colors flex items-center gap-1.5">
                      <span>LTV (주택담보인정비율)</span>
                      <Calculator className="w-4 h-4 text-slate-400 group-hover:text-[#0066ff]" />
                    </span>
                    <span className="text-[10px] font-black text-[#0066ff] bg-[#edf4ff] px-2 py-0.5 rounded border border-[#0066ff]/20">
                      담보 가치 기준
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    <strong>집값 대비 최대로 빌릴 수 있는 대출 금액의 비율</strong>입니다. 예를 들어 10억 원짜리 아파트의 LTV가 70%라면 최대 7억 원까지 대출이 가능합니다. (단, DSR 소득 한도를 초과할 수는 없습니다.)
                  </p>
                  <div className="p-2.5 bg-white group-hover:bg-[#edf4ff] rounded-xl border border-slate-200 group-hover:border-[#0066ff]/30 text-xs text-slate-800 font-bold flex items-center justify-between">
                    <span>💡 10억 주택 LTV 70% ➡️ 최대 7억 대출</span>
                    <span className="text-[#0066ff] font-black text-[11px]">계산기 열기 ↗</span>
                  </div>
                </div>
              </div>
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
                  {selectedTown.name} 공식 토지이용계획(변경)도 전체화면
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Area */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img 
                src={selectedTown.officialBlueprintUrl} 
                alt={`${selectedTown.name} 토지이용계획도 원본`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" 
              />
            </div>

            {/* Modal Footer with Direct External Links */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium">
                💡 출처: 국토교통부 고시 제2023-580호 / 한국토지주택공사(LH)
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={selectedTown.namuWikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition flex items-center gap-1"
                >
                  <span>나무위키 상세 정보 보기 ↗</span>
                </a>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#03c75a] text-white font-bold transition cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🧮 INTERACTIVE CALCULATOR MODAL */}
      {/* ========================================================================= */}
      {isCalcOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-scaleUp my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#e8f8ee] text-[#029f45] flex items-center justify-center font-black">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    실시간 대출 규제 & 자금 한도 계산기
                  </h3>
                  <p className="text-xs text-slate-500">
                    내 소득과 자산에 맞춘 DSR 40%, 스트레스 DSR, LTV, 갭투자금을 즉시 시뮬레이션합니다.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCalcOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* DSR Calc */}
            {calcMode === 'DSR' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-bold">
                      <span className="text-slate-700">가구 연소득 (세전 총소득)</span>
                      <span className="text-base font-black text-[#029f45]">{annualIncome.toLocaleString()}만 원 ({(annualIncome / 10000).toFixed(1)}억)</span>
                    </div>
                    <input
                      type="range"
                      min={3000}
                      max={25000}
                      step={500}
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(Number(e.target.value))}
                      className="w-full accent-[#03c75a]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">기본 대출 금리 (%)</label>
                      <input
                        type="number"
                        step={0.1}
                        min={2.0}
                        max={8.0}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">대출 상환 만기</label>
                      <select
                        value={loanPeriodYears}
                        onChange={(e) => setLoanPeriodYears(Number(e.target.value))}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900"
                      >
                        <option value={30}>30년 만기 (원리금균등)</option>
                        <option value={35}>35년 만기 (원리금균등)</option>
                        <option value={40}>40년 만기 (원리금균등)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#e8f8ee] to-emerald-50/50 border border-[#03c75a]/30 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>연간 DSR 40% 법적 원리금 상환 한도:</span>
                    <strong className="text-slate-900 font-black">
                      연 {maxYearlyPaymentDsr40.toLocaleString()}만 원 (월 {Math.round(maxYearlyPaymentDsr40 / 12).toLocaleString()}만 원)
                    </strong>
                  </div>

                  <div className="pt-2 border-t border-[#03c75a]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-600">
                        {applyStressDsr ? '⚡ 스트레스 DSR 적용 시 최대 대출 가능액:' : '🏦 일반 DSR 기준 최대 대출 가능액:'}
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-[#029f45]">
                        약 {(maxLoanDsrPrincipal / 10000).toFixed(2)}억 원
                        <span className="text-sm font-bold text-slate-700 ml-1.5">
                          ({maxLoanDsrPrincipal.toLocaleString()}만 원)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsCalcOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
