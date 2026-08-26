import React, { useState, useMemo } from "react";
import { 
  MapPin, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  RotateCcw, 
  Award, 
  Layers, 
  Building2, 
  TrendingUp, 
  Flame, 
  ShieldCheck, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Scan
} from "lucide-react";

export type RegionType = "SEOUL" | "GYEONGGI";
export type StudyMode = "MAP_STUDY" | "GRID_CARDS" | "QUIZ";

export interface DistrictItem {
  id: string;
  name: string;
  subRegion: string;
  tier: string;
  tierColor: string;
  leadComplex: string;
  keyTransit: string;
  memorizeTrick: string;
  description: string;
  pin: { x: number; y: number }; // percentage on the map image
}

export const SEOUL_DISTRICTS: DistrictItem[] = [
  // 동남권 (강남4구)
  { id: "gangnam", name: "강남구", subRegion: "동남권 (강남4구)", tier: "0티어 (최상급지)", tierColor: "bg-amber-100 text-amber-900 border-amber-300", leadComplex: "압구정현대, 래미안대치팰리스, 디에이치아너힐즈", keyTransit: "2·3·7·9호선, 신분당선, 수인분당선, GTX-A(삼성)", memorizeTrick: "대한민국 부촌 1번지. 압구정-대치-개포-역삼", description: "대한민국 3대 업무지구(GBD)의 심장이자 대치동 명문 학원가 보유", pin: { x: 62, y: 74 } },
  { id: "seocho", name: "서초구", subRegion: "동남권 (강남4구)", tier: "0티어 (최상급지)", tierColor: "bg-amber-100 text-amber-900 border-amber-300", leadComplex: "아크로리버파크, 원베일리, 반포자이, 래미안원펜타스", keyTransit: "2·3·7·9호선, 신분당선, 고속터미널", memorizeTrick: "반포 한강변 최고가 아파트 집결지. 반포-잠원-서초-방배", description: "평당 1억 5천 돌파 전국 최고 평단가 래미안 원베일리 위치", pin: { x: 53, y: 76 } },
  { id: "songpa", name: "송파구", subRegion: "동남권 (강남4구)", tier: "1티어 (상급지)", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "잠실엘스, 리센츠, 트리지움, 헬리오시티, 올림픽선수촌", keyTransit: "2·3·5·8·9호선, 잠실역, SRT 수서 인접", memorizeTrick: "잠실 대단지 삼총사(엘리트) + 9,510세대 헬리오시티", description: "잠실 마이스(MICE) 개발 및 롯데월드타워, 올림픽공원 보유", pin: { x: 71, y: 68 } },
  { id: "gangdong", name: "강동구", subRegion: "동남권 (강남4구)", tier: "2티어 (준상급지)", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "올림픽파크포레온(둔촌주공 1.2만세대), 고덕그라시움", keyTransit: "5·8·9호선 4단계 연장(보훈병원~고덕)", memorizeTrick: "국내 최대 1.2만세대 둔촌주공과 고덕 신축 타운", description: "강남권 동측 관문, 9호선 4단계 급행 개통 수혜", pin: { x: 77, y: 55 } },

  // 도심권 (도심 3구)
  { id: "yongsan", name: "용산구", subRegion: "도심권 (CBD 배후)", tier: "0.5티어 (최상급지)", tierColor: "bg-amber-100 text-amber-900 border-amber-300", leadComplex: "나인원한남, 한남더힐, 디에이치한남(한남3구역 착공)", keyTransit: "1·4·6호선, 경의중앙선, KTX용산역, 신분당선 연장", memorizeTrick: "서울의 정중앙 배산임수. 용산공원 + 국제업무지구 + 한남뉴타운", description: "용산국제업무지구와 한남뉴타운으로 강남을 위협하는 부촌 1순위", pin: { x: 48, y: 60 } },
  { id: "jongno", name: "종로구", subRegion: "도심권 (CBD)", tier: "2티어", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "경희궁자이 (교남동 랜드마크)", keyTransit: "1·3·4·5호선, 종로3가 환승축", memorizeTrick: "조선의 600년 역사 심장이자 광화문 직주근접 경희궁자이", description: "광화문·시청 업무지구(CBD) 도보 출퇴근 가능한 도심 주거", pin: { x: 46, y: 41 } },
  { id: "junggu", name: "중구", subRegion: "도심권 (CBD)", tier: "2티어", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "남산타운, 덕수궁롯데캐슬, 청구e편한세상", keyTransit: "1·2·3·4·5·6호선 사통팔달", memorizeTrick: "서울시청, 을지로, 명동의 심장", description: "을지로 금융 중심지 및 남산 조망 도심 주거단지", pin: { x: 50, y: 51 } },

  // 서북권 (마용성의 마 & 은평·서대문)
  { id: "mapo", name: "마포구", subRegion: "서북권 (마용성)", tier: "1.5티어 (상급지)", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "마포래미안푸르지오(마래푸), 마포프레스티지자이", keyTransit: "2·5·6호선, 공항철도, 경의중앙선 (홍대입구·공덕 환승)", memorizeTrick: "마용성의 마! 여의도·광화문 10분 컷 마래푸", description: "공덕 4개 노선 환승역과 여의도(YBD)·광화문(CBD) 샌드위치 직주근접", pin: { x: 35, y: 51 } },
  { id: "seodaemun", name: "서대문구", subRegion: "서북권", tier: "2.5티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "DMC래미안e편한세상, 홍제원아이파크, 북아현뉴타운", keyTransit: "2·3호선, 경의중앙선", memorizeTrick: "신촌·이대 대학가 + 북아현뉴타운", description: "광화문 직주근접과 신촌 대학가 상권 보유", pin: { x: 39, y: 46 } },
  { id: "eunpyeong", name: "은평구", subRegion: "서북권", tier: "3티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "은평뉴타운 제각말, 수색증산뉴타운(DMC센트럴자이)", keyTransit: "3·6호선, GTX-A(연신내역 개통)", memorizeTrick: "북한산 자락 쾌적 주거 + GTX-A 연신내 개통", description: "수색증산뉴타운 상암 배후 및 GTX-A 연신내역 삼성역 10분 직결", pin: { x: 38, y: 32 } },

  // 동북권 (마용성의 성 & 노도강·동대문)
  { id: "seongdong", name: "성동구", subRegion: "동북권 (마용성)", tier: "1티어 (상급지)", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "트리마제, 아크로서울포레스트, 성수전략정비(70층), 옥수파크힐스", keyTransit: "2·3·5호선, 수인분당선, 경의중앙선 (왕십리 4중 환승)", memorizeTrick: "마용성의 성! 서울숲 + 압구정 맞은편 성수 70층", description: "한국의 브루클린 성수동과 옥수·금호 강남 접근성 최상위", pin: { x: 59, y: 53 } },
  { id: "gwangjin", name: "광진구", subRegion: "동북권", tier: "1.5티어", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "광장동 현대3단지, 자양동 롯데캐슬이스트폴(자양1구역)", keyTransit: "2·5·7호선, 강변역, 건대입구역", memorizeTrick: "강북의 대치동 광장동 학군 + 한강변 자양동 롯데캐슬", description: "광장동 명문 학군과 잠실대교·영동대교 강남 직결 교통", pin: { x: 67, y: 56 } },
  { id: "dongdaemun", name: "동대문구", subRegion: "동북권", tier: "2.5티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "래미안라그란데(이문1), 이문아이파크자이(이문3), 청량리역 롯데캐슬", keyTransit: "1·2호선, 경의중앙선, 수인분당선, GTX-B·C(청량리)", memorizeTrick: "청량리 교통 빅뱅 + 이문·휘경 뉴타운 1.4만세대", description: "청량리 복합환승센터 GTX-B/C 환승 허브", pin: { x: 60, y: 44 } },
  { id: "jungnang", name: "중랑구", subRegion: "동북권", tier: "3티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "사가정센트럴아이파크, 중화롯데캐슬골드파크", keyTransit: "6·7호선, 경춘선, 경의중앙선 (상봉역)", memorizeTrick: "7호선 강남 직결 + 상봉 복합 환승센터", description: "중랑천 수변 산책로 및 7호선 강남 접근성 양호", pin: { x: 67, y: 41 } },
  { id: "seongbuk", name: "성북구", subRegion: "동북권", tier: "2.5티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "길음래미안센터피스, 래미안길음트리베르슈(장위뉴타운)", keyTransit: "4·6호선, 우이신설선, 동북선 경전철(예정)", memorizeTrick: "길음뉴타운 + 장위뉴타운 대단지 신축 밭", description: "종로·을지로 도심 직주근접과 장위뉴타운 대단지 공급", pin: { x: 54, y: 39 } },
  { id: "gangbuk", name: "강북구", subRegion: "동북권 (노도강)", tier: "3티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "미아사거리 래미안트리베라, 미아동 꿈의숲효성해링턴", keyTransit: "4호선, 우이신설선, 동북선(예정)", memorizeTrick: "노도강의 강! 북서울꿈의숲을 품은 쾌적 주거", description: "북한산 숲세권 및 미아뉴타운 재정비 촉진", pin: { x: 52, y: 26 } },
  { id: "dobong", name: "도봉구", subRegion: "동북권 (노도강)", tier: "3티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "창동주공19단지, 북한산아이파크", keyTransit: "1·4호선 창동역, GTX-C(창동역 착공)", memorizeTrick: "노도강의 도! 창동 아레나 + GTX-C 창동역", description: "서울아레나 복합문화시설 및 GTX-C 창동역 강남 10분대", pin: { x: 57, y: 17 } },
  { id: "nowon", name: "노원구", subRegion: "동북권 (노도강)", tier: "2.5티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "중계동 은행사거리 학군단지, 상계주공 재건축", keyTransit: "4·7호선 노원역, 동북선(예정)", memorizeTrick: "강북의 학군 성지 중계동 은행사거리 + 상계주공 4만가구", description: "서울 3대 명문 학군(중계동)과 상계·중계 대규모 택지 재건축", pin: { x: 65, y: 22 } },

  // 서남권 (영등포·여의도·양천·구로·금천·관악·동작)
  { id: "yeongdeungpo", name: "영등포구", subRegion: "서남권 (YBD)", tier: "1티어 (여의도) / 2티어", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "여의도 시범·삼익, 브라이튼여의도, 아크로타워스퀘어", keyTransit: "1·2·5·9호선, 신안산선(예정), 신림선", memorizeTrick: "대한민국 3대 업무지구 여의도(YBD) + 신길뉴타운", description: "여의도 국제금융특구 재건축과 영등포역 뉴타운 정비", pin: { x: 34, y: 64 } },
  { id: "yangcheon", name: "양천구", subRegion: "서남권 (목동)", tier: "1티어 (목동 학군)", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "목동 신시가지 1~14단지 (2.6만가구 재건축 진행)", keyTransit: "2호선 지선, 5·9호선(오목교·목동·신목동), 목동선", memorizeTrick: "서울 3대 명문 학원가 목동 신시가지 재건축", description: "초·중·고 명문 학군 프리미엄과 목동 1~14단지 통합 재건축", pin: { x: 25, y: 64 } },
  { id: "gangseo", name: "강서구", subRegion: "서남권 (마곡 R&D)", tier: "2티어", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "마곡 엠밸리 1~15단지, 마곡 르웨스트(MICE)", keyTransit: "5·9호선, 공항철도(마곡나루 급행), 김포공항", memorizeTrick: "LG 사이언스파크 첨단 R&D 도시 마곡지구", description: "LG·코오롱·롯데 대기업 R&D 15만 일자리의 중심 마곡", pin: { x: 21, y: 51 } },
  { id: "guro", name: "구로구", subRegion: "서남권", tier: "3티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "신도림 디큐브시티, 신도림 동아1·2차, 고척아이파크", keyTransit: "1·2호선 신도림역, 7호선", memorizeTrick: "사통팔달 1·2호선 환승 신도림역 + G밸리 배후", description: "신도림역 상권 및 구로디지털단지 IT 일자리 배후 주거", pin: { x: 26, y: 70 } },
  { id: "geumcheon", name: "금천구", subRegion: "서남권", tier: "3.5티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "롯데캐슬골드파크 1~4차 (독산동 4,400세대)", keyTransit: "1호선, 신안산선(시흥사거리역 착공)", memorizeTrick: "신안산선 착공 여의도 15분 + 가산디지털단지", description: "G밸리 직주근접 및 신안산선 개통 최대 수혜지", pin: { x: 34, y: 82 } },
  { id: "dongjak", name: "동작구", subRegion: "서남권 (여의도·강남 배후)", tier: "1.5티어", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "아크로리버하임(흑석), 오티에르 노량진(노량진1), 힐스테이트상도", keyTransit: "1·4·7·9호선 (노량진 급행, 동작역, 흑석역)", memorizeTrick: "흑석뉴타운 한강뷰 + 노량진 9천세대 여의도 3분 컷", description: "9호선 급행으로 여의도 3분, 강남 14분 컷 최고 요충지", pin: { x: 42, y: 68 } },
  { id: "gwanak", name: "관악구", subRegion: "서남권", tier: "3티어", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "e편한세상서울대입구, 관악드림타운, 봉천 4-1-2구역", keyTransit: "2호선(신림·서울대입구·낙성대), 신림선 경전철", memorizeTrick: "2호선 강남 15분 컷 + 서울대학교 + 신림선", description: "강남 출퇴근 청년 1~2인 가구 및 관악산 쾌적 주거", pin: { x: 41, y: 80 } }
];

export const GYEONGGI_DISTRICTS: DistrictItem[] = [
  { id: "seongnam", name: "성남시", subRegion: "경부축 (1급지)", tier: "준서울 / 강남급 (판교·분당)", tierColor: "bg-amber-100 text-amber-900 border-amber-300", leadComplex: "판교푸르지오그랑블, 분당 시범단지, 산성역자이푸르지오", keyTransit: "신분당선(판교 강남 14분), 수인분당선, 8호선, GTX-A(성남역)", memorizeTrick: "IT 수도 판교테크노밸리 + 1기 신도시 대장 분당", description: "판교 IT 10만 고소득 일자리와 분당 명문 학군 보유", pin: { x: 46, y: 66 } },
  { id: "gwacheon", name: "과천시", subRegion: "경부축 (1급지)", tier: "준강남 0.8티어", tierColor: "bg-amber-100 text-amber-900 border-amber-300", leadComplex: "과천푸르지오써밋, 과천위버필드, 과천자이, 과천지식정보타운", keyTransit: "4호선, GTX-C(과천정부청사역 착공), 위례과천선", memorizeTrick: "서울 02 국번. 관악산·청계산 품은 준강남 최고 부촌", description: "과천지정타 IT 자족도시 및 GTX-C 삼성역 10분 직결", pin: { x: 39, y: 64 } },
  { id: "hanam", name: "하남시", subRegion: "동부축 (1.5급지)", tier: "준강남 / 강동 배후", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "미사강변루나리움, 감일 에코앤e편한세상, 하남교산 신도시", keyTransit: "5호선(미사·하남검단산), 3호선 연장(송파하남선 교산), 9호선 연장", memorizeTrick: "미사 수변 + 감일 강남 10분 + 3기 신도시 교산", description: "한강변 쾌적 미사강변도시 및 3기 신도시 교산 3호선 연장", pin: { x: 53, y: 58 } },
  { id: "guri", name: "구리시", subRegion: "동북축 (1.5급지)", tier: "잠실 15분 생활권", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "수택동 메가재개발(7,007세대), 구리역롯데캐슬, 구리토평2", keyTransit: "8호선 별내선(구리역·장자호수공원역 잠실 15분), 경의중앙선", memorizeTrick: "8호선 개통으로 잠실 15분 강남 직결! 수택 7천세대", description: "8호선 별내선 개통 잠실 초근접 및 구리토평2 한강 신도시", pin: { x: 48, y: 55 } },
  { id: "suwon", name: "수원시", subRegion: "경부축 (2급지)", tier: "경기 남부 최대 거점 (120만)", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "광교중흥S클래스, 화서역파크푸르지오(스타필드), 매교역푸르지오SK", keyTransit: "신분당선(광교중앙역), 1호선, 수인분당선, KTX, GTX-C(수원역)", memorizeTrick: "광교 호수공원 랜드마크 + 삼성전자 본사 본진", description: "삼성전자 영통 본사와 신분당선 광교 신도시의 높은 위계", pin: { x: 39, y: 74 } },
  { id: "yongin", name: "용인시", subRegion: "경부축 (2급지)", tier: "반도체 메가 클러스터", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "기흥역센트럴푸르지오, 수지 래미안이스트파크, 처인 반도체클러스터", keyTransit: "신분당선(수지), 수인분당선, GTX-A(구성역), 용인경전철", memorizeTrick: "수지 학군 + GTX-A 구성역 + 삼성전자 300조 반도체 클러스터", description: "수지구 강남 접근성과 처인구 남사·원삼 세계 최대 반도체 메가밸리", pin: { x: 53, y: 76 } },
  { id: "anyang", name: "안양시", subRegion: "경부축 (2급지)", tier: "평촌 1기 신도시 학군", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "평촌 목련마을 재건축, 평촌 더샵센트럴시티, 비산자이아이파크", keyTransit: "1·4호선(범계·평촌역), 월곶판교선(월판선 착공), 인동선", memorizeTrick: "수도권 3대 학군 평촌 학원가 + 월판선 판교 10분", description: "평촌 명문 학원가와 월곶판교선 판교 직결 교통 호재", pin: { x: 34, y: 66 } },
  { id: "gwangmyeong", name: "광명시", subRegion: "서남축 (2급지)", tier: "서울 02 국번 생활권", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "철산자이더헤리티지, 광명 11구역, 트리우스광명, KTX광명역파크자이", keyTransit: "7호선(철산·광명사거리 가산 5분), 1호선, KTX, 신안산선", memorizeTrick: "서울 02 국번. 7호선 강남 직통 + 광명뉴타운 2.5만가구", description: "가산디지털단지 맞닿은 02국번 및 KTX 복합 상권", pin: { x: 29, y: 63 } },
  { id: "uiwang", name: "의왕시", subRegion: "경부축", tier: "인덕원·백운호수 생활권", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "인덕원센트럴자이(포일자이), 백운밸리 효성해링턴", keyTransit: "4호선 인덕원역(GTX-C, 월판선, 인동선 쿼드러플), 1호선 의왕역", memorizeTrick: "인덕원 4중 환승역세권 + 백운호수 롯데타임빌라스", description: "GTX-C 및 월곶판교선 환승 허브 인덕원 연계 주거", pin: { x: 38, y: 68 } },
  { id: "gunpo", name: "군포시", subRegion: "경부축 (산본)", tier: "1기 신도시 산본", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "산본주공 재건축, 래미안수리산채원", keyTransit: "1·4호선 금정역, GTX-C(금정역)", memorizeTrick: "1기 신도시 산본 + 1·4호선 GTX-C 금정역", description: "수리산 쾌적 주거 및 GTX-C 금정역 삼성역 15분", pin: { x: 33, y: 70 } },
  { id: "bucheon", name: "부천시", subRegion: "서남축 (중동·대장)", tier: "3기 신도시 대장지구", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "중동 센트럴파크푸르지오, 부천대장 3기 신도시", keyTransit: "1·7호선, 서해선(소사대곡선), 대장홍대선(홍대입구 25분)", memorizeTrick: "1기 신도시 중동 + 3기 신도시 대장 + 대장홍대선", description: "대장홍대선으로 홍대·상암 직결 및 SK R&D 그린테크노캠퍼스", pin: { x: 23, y: 60 } },
  { id: "siheung", name: "시흥시", subRegion: "서남축 (은계·배곧·목감)", tier: "서해안 신흥 주거타운", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "배곧 C1·C2 호반써밋, 시흥은계 센트럴타운, 장현지구", keyTransit: "서해선, 신안산선(착공), 월곶판교선(월판선)", memorizeTrick: "배곧 서울대병원 + 신안산선 여의도 직결", description: "배곧 바이오 특화단지와 월판선·신안산선 트리플 철도망", pin: { x: 24, y: 67 } },
  { id: "ansan", name: "안산시", subRegion: "서남축 (고잔·그랑시티)", tier: "서해안 산업 거점", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "그랑시티자이 1·2차(7,600세대), 안산센트럴푸르지오", keyTransit: "4호선, 수인분당선, 서해선, 신안산선(한양대 에리카역)", memorizeTrick: "7,600세대 초대형 그랑시티자이 + 신안산선 여의도 25분", description: "신안산선 개통으로 여의도 25분대 진입하는 서남부 중심", pin: { x: 27, y: 71 } },
  { id: "hwaseong", name: "화성시", subRegion: "남부축 (동탄1·2 / 100만)", tier: "인구 100만 대도시 (동탄)", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "동탄역 롯데캐슬, 동탄 린스트라우스, 송산그린시티", keyTransit: "GTX-A(동탄역 수서 20분 개통), SRT, 동탄트램", memorizeTrick: "GTX-A 개통 수서 20분! 동탄테크노밸리 + 삼성전자 화성캠퍼스", description: "인구 100만 특례시 진입, GTX-A 수서역 20분 및 삼성전자 배후", pin: { x: 31, y: 80 } },
  { id: "pyeongtaek", name: "평택시", subRegion: "남부축 (고덕 반도체)", tier: "반도체 세계 최대 팹", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "고덕국제신도시 파라곤, 지제역 더샵센트럴파크", keyTransit: "1호선 평택지제역, SRT, KTX 직결(예정), GTX-A/C 연장 추진", memorizeTrick: "삼성전자 평택 캠퍼스 세계 최대 팹 + 지제역 SRT", description: "삼성전자 평택캠퍼스 및 지제역 광역교통 복합환승 허브", pin: { x: 37, y: 89 } },
  { id: "osan", name: "오산시", subRegion: "남부축 (세교)", tier: "세교 신도시", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "오산세교 더샵라포르테, 운암주공", keyTransit: "1호선 오산역, 분당선 연장(예정)", memorizeTrick: "동탄 옆 세교 신도시 + 1호선", description: "동탄2 신도시 인접 생활권 및 세교 2·3지구 공급", pin: { x: 42, y: 80 } },
  { id: "anseong", name: "안성시", subRegion: "남부축", tier: "동탄-청주 철도 연계", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "안성공도 우방아이유쉘, 스타필드 안성", keyTransit: "경부고속도로 안성IC, 수도권내륙선 철도 추진", memorizeTrick: "스타필드 안성 + 반도체 소부장 특화단지", description: "스타필드 안성 및 반도체 소부장 특화단지 육성", pin: { x: 57, y: 88 } },
  { id: "goyang", name: "고양시", subRegion: "경의축 (일산·창릉 / 108만)", tier: "1기 일산 + 3기 창릉 신도시", tierColor: "bg-blue-100 text-blue-900 border-blue-300", leadComplex: "킨텍스 원시티, 일산 요진와이시티, 고양창릉 3기 신도시", keyTransit: "3호선, 경의중앙선, 서해선(대곡소사), GTX-A(킨텍스·대곡·창릉 개통)", memorizeTrick: "GTX-A 개통 삼성 18분! 킨텍스 + 3기 신도시 창릉", description: "GTX-A 개통으로 강남권 20분대 주파, 일산 재건축 선도지구", pin: { x: 26, y: 51 } },
  { id: "paju", name: "파주시", subRegion: "경의축 (운정 신도시)", tier: "GTX-A 기점 도시", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "운정신도시 아이파크, 힐스테이트 운정, 센트럴푸르지오(운정 3대장)", keyTransit: "GTX-A(운정역 기점), 경의중앙선(야당·운정역)", memorizeTrick: "GTX-A 운정역 기점! 서울역 20분 직통 운정신도시", description: "GTX-A 개통으로 서울역 20분 도달, 운정 3지구 자족도시", pin: { x: 24, y: 39 } },
  { id: "gimpo", name: "김포시", subRegion: "서북축 (한강 신도시)", tier: "5호선 연장 추진 도시", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "한강메트로자이, 힐스테이트 리버시티, 김포 풍무푸르지오", keyTransit: "김포골드라인, 지하철 5호선 연장(검단-김포 추진)", memorizeTrick: "마곡 직주근접 + 5호선 연장선 추진 한강신도시", description: "마곡지구 15분 생활권 및 한강2 콤팩트시티 신규 지정", pin: { x: 10, y: 49 } },
  { id: "namyangju", name: "남양주시", subRegion: "경춘·경원축 (왕숙 6.6만)", tier: "3기 신도시 최대 거점 (왕숙)", tierColor: "bg-emerald-100 text-emerald-900 border-emerald-300", leadComplex: "다산 e편한세상자이, 별내 아이파크, 남양주 왕숙 1·2지구", keyTransit: "8호선 별내선, 4호선 진접선, 9호선 연장(풍양역), GTX-B(왕숙역)", memorizeTrick: "3기 신도시 최대어 6.6만세대 왕숙! 8호선 별내 + GTX-B", description: "다산·별내 인프라 및 3기 신도시 왕숙 6.6만호 매머드 공급", pin: { x: 55, y: 51 } },
  { id: "uijeongbu", name: "의정부시", subRegion: "경원축", tier: "경기 북부 행정 중심", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "탑석센트럴자이, 의정부역 센트럴자이앤위브캐슬", keyTransit: "1호선, 7호선 연장(탑석역), GTX-C(의정부역 착공)", memorizeTrick: "GTX-C 의정부역 삼성역 15분 + 7호선 탑석역 연장", description: "경기도 북부청사 소재지 및 GTX-C 의정부역 강남 직결", pin: { x: 43, y: 45 } },
  { id: "yangju", name: "양주시", subRegion: "경원축 (옥정·회천)", tier: "GTX-C 기점 (덕정역)", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "양주옥정 더원파크빌리지, 회천 디에트르", keyTransit: "1호선(덕정·덕계역), 7호선 옥정 연장(착공), GTX-C(덕정역)", memorizeTrick: "GTX-C 기점 덕정역 + 옥정 신도시 대단지", description: "GTX-C 덕정역과 7호선 옥정 연장선 착공", pin: { x: 41, y: 40 } },
  { id: "dongducheon", name: "동두천시", subRegion: "경원축", tier: "수도권 북부 관문", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "지행역 센트레빌, 동두천송내주공", keyTransit: "1호선(지행·동두천역), GTX-C 연장 검토", memorizeTrick: "1호선 지행역 생활권 + 소요산", description: "1호선 급행 운행 및 미군 반환 공여지 개발", pin: { x: 44, y: 35 } },
  { id: "pocheon", name: "포천시", subRegion: "동북축", tier: "7호선 옥정-포천 연장", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "포천 포레스트자이", keyTransit: "7호선 옥정~포천 광역철도 추진, 세종포천고속도로", memorizeTrick: "세종포천고속도로 + 7호선 포천 연장선", description: "세종포천고속도로 개통 및 7호선 포천 연장 추진", pin: { x: 55, y: 31 } },
  { id: "yeoncheon", name: "연천군", subRegion: "북부 청정축", tier: "1호선 전철 연장 개통", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "연천 e편한세상", keyTransit: "1호선 연천역 전철 개통", memorizeTrick: "1호선 수도권 전철 종점 연천역", description: "1호선 복선전철 개통으로 서울 접근성 개선", pin: { x: 40, y: 25 } },
  { id: "gwangju_si", name: "광주시", subRegion: "동남축 (태전·고산)", tier: "판교·강남 20분 생활권", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "태전 힐스테이트, 고산 더샵오포센트리체", keyTransit: "경강선(경기광주역 판교 13분), 수서광주선(수광선 착공)", memorizeTrick: "경강선 판교 13분 + 수서광주선 수서 12분 직결", description: "수서광주선 착공으로 강남 수서역 12분대 직결", pin: { x: 59, y: 66 } },
  { id: "icheon", name: "이천시", subRegion: "동남축 (SK하이닉스)", tier: "반도체 D램 글로벌 본진", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "이천자이 더파크, 이천롯데캐슬골드스카이", keyTransit: "경강선(이천·부발역), 중부내륙선 KTX-이음", memorizeTrick: "SK하이닉스 본사 글로벌 반도체 10만 고소득", description: "SK하이닉스 본진 위치로 탄탄한 자족 소비력 보유", pin: { x: 70, y: 77 } },
  { id: "yeoju", name: "여주시", subRegion: "동남축", tier: "경강선 종점 + 수변 힐링", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "여주역 금호어울림베르티스, 여주 KCC스위첸", keyTransit: "경강선 여주역, 여주-원주선 복선전철 착공", memorizeTrick: "경강선 판교 직결 + 남한강 힐링", description: "경강선 판교 직결 및 여주-원주선 환승 연계", pin: { x: 83, y: 74 } },
  { id: "gapyeong", name: "가평군", subRegion: "북한강 생태축", tier: "경춘선 힐링 관광", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "가평자이, e편한세상가평퍼스트원", keyTransit: "경춘선, ITX-청춘 (청량리 40분, 용산 55분)", memorizeTrick: "ITX-청춘 용산 직결 + 자라섬·남이섬", description: "ITX-청춘으로 서울 용산 50분대 진입 및 북한강 힐링 주거", pin: { x: 67, y: 41 } },
  { id: "yangpyeong", name: "양평군", subRegion: "남한강 생태축", tier: "경의중앙선 전원 주거", tierColor: "bg-slate-100 text-slate-900 border-slate-300", leadComplex: "양평역 한라비발디, 양평 센트럴파크써밋", keyTransit: "경의중앙선 양평역, KTX-이음(청량리 25분)", memorizeTrick: "KTX 양평역 청량리 25분 + 남한강 영구 조망", description: "KTX 청량리 20분대 도달 및 수도권 대표 전원 친환경 타운", pin: { x: 79, y: 60 } }
];

const MEMORIZE_QUIZZES = [
  {
    q: "서울의 강남 4구에 해당하지 않는 자치구는 어디일까요?",
    options: ["서초구", "강남구", "송파구", "동작구"],
    answer: 3,
    explanation: "강남 4구는 강남구, 서초구, 송파구, 강동구입니다. 동작구는 서남권에 속합니다."
  },
  {
    q: "서울 3대 명문 학군지이자 1~14단지 통합 재건축(2.6만가구)이 진행 중인 곳은?",
    options: ["노원구 중계동", "양천구 목동", "강남구 대치동", "송파구 잠실동"],
    answer: 1,
    explanation: "양천구 목동 신시가지는 1~14단지 약 2.6만 세대가 일제히 안전진단을 통과하고 재건축을 추진 중입니다."
  },
  {
    q: "대한민국 최대 규모의 IT 테크노밸리(10만 일자리)와 판교·분당을 품고 있는 경기도 시는?",
    options: ["수원시", "성남시", "용인시", "하남시"],
    answer: 1,
    explanation: "성남시는 판교테크노밸리(분당구 삼평동)와 1기 신도시 대장인 분당구를 품은 준강남급 1급지입니다."
  },
  {
    q: "3기 신도시 중 단일 면적 최대 규모(6.6만 세대)인 왕숙 1·2지구가 위치한 경기도 지자체는?",
    options: ["고양시", "남양주시", "부천시", "인천 계양구"],
    answer: 1,
    explanation: "남양주시에는 3기 신도시 중 가장 규모가 큰 남양주 왕숙 1·2지구(총 6.6만호)가 조성됩니다."
  },
  {
    q: "지하철 8호선 별내선 개통으로 잠실역까지 15분대에 도달하며, 수택동 7,007세대 재개발이 진행 중인 곳은?",
    options: ["구리시", "하남시", "성남시", "의정부시"],
    answer: 0,
    explanation: "구리시는 8호선 구리역·장자호수공원역 개통으로 잠실 15분 생활권에 진입했으며, 수택동 메가 재개발을 추진 중입니다."
  },
  {
    q: "마·용·성으로 불리는 서울의 대표 상급지 3개 구 묶음으로 올바른 것은?",
    options: ["마포구, 용산구, 성동구", "마포구, 용산구, 송파구", "마포구, 영등포구, 성북구", "서대문구, 용산구, 성동구"],
    answer: 0,
    explanation: "마용성은 한강변과 도심 직주근접을 갖춘 마포구, 용산구, 성동구를 의미합니다."
  }
];

export const DistrictMemorizer: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<RegionType>("SEOUL");
  const [studyMode, setStudyMode] = useState<StudyMode>("MAP_STUDY");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictItem | null>(SEOUL_DISTRICTS[0]);

  // Quiz State
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filtered district items
  const currentList = activeRegion === "SEOUL" ? SEOUL_DISTRICTS : GYEONGGI_DISTRICTS;
  const filteredList = useMemo(() => {
    return currentList.filter(item => 
      item.name.includes(searchTerm) ||
      item.subRegion.includes(searchTerm) ||
      item.leadComplex.includes(searchTerm) ||
      item.keyTransit.includes(searchTerm) ||
      item.memorizeTrick.includes(searchTerm)
    );
  }, [currentList, searchTerm]);

  // Zoom & Smart Focus State
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isDenseFocus, setIsDenseFocus] = useState<boolean>(false);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(Math.round((prev + 0.3) * 10) / 10, 2.8));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(Math.round((prev - 0.3) * 10) / 10, 1.0);
      if (next === 1.0) {
        setFocusPoint({ x: 50, y: 50 });
        setIsDenseFocus(false);
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1.0);
    setFocusPoint({ x: 50, y: 50 });
    setIsDenseFocus(false);
  };

  const handleFocusDenseCentral = () => {
    if (activeRegion === "GYEONGGI") {
      // Focus strictly on Gwacheon, Anyang, Gunpo, Uiwang, Suwon, Seongnam, Gwangmyeong
      setZoomLevel(2.2);
      setFocusPoint({ x: 38, y: 66 });
      setIsDenseFocus(true);
    } else {
      // Focus on Mapo, Yongsan, Seongdong, Gangnam, Yeongdeungpo
      setZoomLevel(2.0);
      setFocusPoint({ x: 50, y: 60 });
      setIsDenseFocus(true);
    }
  };

  const handleSelectDistrict = (item: DistrictItem) => {
    setSelectedDistrict(item);
    const denseGyeonggi = ["gwacheon", "seongnam", "anyang", "uiwang", "gunpo", "suwon", "gwangmyeong", "bucheon"];
    if (activeRegion === "GYEONGGI" && denseGyeonggi.includes(item.id)) {
      if (zoomLevel > 1.0) {
        setFocusPoint({ x: item.pin.x, y: item.pin.y });
      }
    }
  };

  const handleSelectRegion = (region: RegionType) => {
    setActiveRegion(region);
    setSelectedDistrict(region === "SEOUL" ? SEOUL_DISTRICTS[0] : GYEONGGI_DISTRICTS[0]);
    handleResetZoom();
  };

  const handleAnswerSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === MEMORIZE_QUIZZES[currentQuizIdx].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx + 1 < MEMORIZE_QUIZZES.length) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Header Banner */}
      <div className="naver-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm rounded-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0066ff] text-white text-xs font-black tracking-wider">
                부동산 지리 마스터
              </span>
              <span className="text-xs font-black text-[#0066ff] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>서울 25개 자치구 & 경기도 31개 시·군 완전 암기 도감</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              <span>수도권 행정구역 & 상급지 위계 완벽 암기</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 font-medium">
              원하는 구(시·군)를 클릭하면 <strong>지도 위에 정확한 핀(Pin)과 펄스 링이 찍히며</strong> 대장 단지 및 핵심 노선이 즉시 연동됩니다.
            </p>
          </div>

          {/* Region Switcher Tabs */}
          <div className="flex items-center gap-2 shrink-0 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-black">
            <button
              onClick={() => handleSelectRegion("SEOUL")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeRegion === "SEOUL"
                  ? "bg-white text-slate-900 shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🏛️ 서울특별시 (25개 구)</span>
            </button>
            <button
              onClick={() => handleSelectRegion("GYEONGGI")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeRegion === "GYEONGGI"
                  ? "bg-[#03c75a] text-white shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🌲 경기도 (31개 시·군)</span>
            </button>
          </div>
        </div>

        {/* Study Mode Selector & Search */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-black">
            <button
              onClick={() => setStudyMode("MAP_STUDY")}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 ${
                studyMode === "MAP_STUDY" ? "bg-white text-[#0066ff] shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🗺️ 1. 백지도 인터랙티브 핀 암기</span>
            </button>
            <button
              onClick={() => setStudyMode("GRID_CARDS")}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 ${
                studyMode === "GRID_CARDS" ? "bg-white text-[#029f45] shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>📑 2. 구·시별 상세 도감</span>
            </button>
            <button
              onClick={() => setStudyMode("QUIZ")}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 ${
                studyMode === "QUIZ" ? "bg-white text-purple-600 shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🎯 3. 암기력 테스트 퀴즈</span>
            </button>
          </div>

          {/* Search Box */}
          {studyMode !== "QUIZ" && (
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={`${activeRegion === "SEOUL" ? "구 이름 (예: 강남, 마포, 양천)" : "시·군 이름 (예: 성남, 화성, 구리)"} 검색`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0066ff] focus:bg-white transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: 🗺️ 공식 백지도 시각 핀(Pin) 암기 뷰어 */}
      {/* ========================================================================= */}
      {studyMode === "MAP_STUDY" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          
          {/* Left 7 Cols: High-Res Map Viewer with Real-Time Dynamic Pin */}
          <div className="lg:col-span-7 naver-card p-6 bg-white border border-slate-200 shadow-sm rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0066ff] animate-ping" />
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {activeRegion === "SEOUL" ? "서울특별시 25개 자치구 인터랙티브 핀 구역도" : "경기도 31개 시·군 인터랙티브 핀 행정지도"}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-bold">
                {selectedDistrict ? `📍 ${selectedDistrict.name} 선택됨` : (activeRegion === "SEOUL" ? "25개 구" : "31개 시·군")}
              </span>
            </div>

            {/* Quick Smart Focus Mode Bar & Manual Zoom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
              <div className="flex flex-wrap items-center gap-1.5 font-bold">
                <span className="text-slate-500 font-black">보기 모드:</span>
                <button
                  onClick={handleResetZoom}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 text-xs ${
                    zoomLevel === 1.0 && !isDenseFocus
                      ? "bg-white text-slate-900 border border-slate-300 shadow-xs font-black"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>전체 지도 (1.0x)</span>
                </button>
                <button
                  onClick={handleFocusDenseCentral}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs ${
                    isDenseFocus
                      ? "bg-[#03c75a] text-white shadow-xs font-black"
                      : "bg-emerald-50 text-[#029f45] hover:bg-emerald-100 border border-emerald-200"
                  }`}
                  title="면적이 좁고 밀집된 중심 권역을 2.2배 크게 확대하여 핀이 겹치지 않고 여유롭게 보이도록 합니다."
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>
                    {activeRegion === "GYEONGGI"
                      ? "🔍 경기 중남부 밀집권 집중 확대 (의왕·수원·성남·군포·과천·안양·광명) (2.2x)"
                      : "🔍 서울 도심·한강변 밀집권 집중 확대 (마용성·강남3구·영등포) (2.0x)"
                    }
                  </span>
                </button>
              </div>

              {/* Floating Zoom Step Buttons */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs shrink-0">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-bold transition cursor-pointer"
                  title="확대 (Zoom In)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-black px-1 text-slate-800">
                  {Math.round(zoomLevel * 10) / 10}x
                </span>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-bold transition cursor-pointer"
                  title="축소 (Zoom Out)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-bold transition cursor-pointer"
                  title="기본 크기 초기화"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Map Canvas Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-2 sm:p-4 min-h-[520px] max-h-[620px] select-none">
              {/* Strict Bounding Box hugging the exact rendered image width and height */}
              <div 
                className="relative inline-block max-w-full transition-transform duration-500 ease-out"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${focusPoint.x}% ${focusPoint.y}%`
                }}
              >
                <img
                  src={activeRegion === "SEOUL" ? "/maps/seoul_districts_map.png" : "/maps/gyeonggi_districts_map.png"}
                  alt={activeRegion === "SEOUL" ? "서울 25개 자치구 지도" : "경기도 31개 시·군 지도"}
                  className="block max-h-[540px] w-auto object-contain transition-all duration-300 pointer-events-none"
                />

                {/* Pin Overlay Layer strictly hugging the image */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* 1. All District Subtle Clickable Pin Dots */}
                  {currentList.map((item) => {
                    const isSelected = selectedDistrict?.id === item.id;

                    return (
                      <div
                        key={item.id}
                        style={{ left: `${item.pin.x}%`, top: `${item.pin.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                        onClick={() => handleSelectDistrict(item)}
                      >
                        {isSelected ? (
                          /* Selected Pin Badge & Ripple Pulse */
                          <div className="relative flex flex-col items-center animate-bounce z-20">
                            {/* Pin Icon with Glow */}
                            <div className="w-8 h-8 rounded-full bg-rose-500 text-white shadow-xl flex items-center justify-center border-2 border-white ring-4 ring-rose-300/80 z-20">
                              <MapPin className="w-5 h-5 fill-white" />
                            </div>

                            {/* Pin Label Tooltip */}
                            <div className="mt-1 px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-black whitespace-nowrap shadow-lg border border-slate-700 z-30 flex items-center gap-1">
                              <span>{item.name}</span>
                              <span className="text-[10px] text-rose-300 font-bold">({item.subRegion.split(" ")[0]})</span>
                            </div>

                            {/* Radar Ripple Effect */}
                            <span className="absolute -inset-2 rounded-full bg-rose-400/40 animate-ping z-0" />
                            <span className="absolute -inset-4 rounded-full bg-rose-400/20 animate-pulse z-0" />
                          </div>
                        ) : (
                          /* Unselected Minimal Pin Dot (Hoverable) */
                          <div className="relative flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-slate-700/60 hover:bg-[#0066ff] border border-white shadow-sm transition group-hover:scale-150" />
                            <div className="hidden group-hover:block absolute bottom-4 px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap shadow-md z-30">
                              {item.name}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center font-medium">
              💡 <strong>과천·성남·안양·군포·의왕·수원</strong> 등 면적이 작은 지역은 상단의 <strong>[🔍 경기 중남부 밀집권 집중 확대 (2.2x)]</strong> 버튼을 누르면 핀이 겹치지 않고 넓고 시원하게 표시됩니다!
            </p>
          </div>

          {/* Right 5 Cols: Quick Memorize Formula & Quick List */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Memorize Formula Box */}
            <div className="naver-card p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-black text-white">
                  {activeRegion === "SEOUL" ? "서울 5대 권역 묶음 암기 공식" : "경기 5대 발전축 묶음 암기 공식"}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {activeRegion === "SEOUL" ? (
                  <>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-amber-400 block mb-0.5">👑 1. 강남 4구 (동남권)</span>
                      <p className="text-slate-300">강남구 · 서초구 · 송파구 · 강동구 (대한민국 최고 부촌)</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-emerald-400 block mb-0.5">🌊 2. 마·용·성 (한강변 핵심)</span>
                      <p className="text-slate-300">마포구 · 용산구 · 성동구 (도심+강남 더블 접근성)</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-blue-400 block mb-0.5">🏢 3. 3대 업무지구 배후 (서남권)</span>
                      <p className="text-slate-300">영등포구(여의도) · 양천구(목동) · 동작구 · 강서구(마곡)</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-purple-400 block mb-0.5">🎓 4. 동북 학군 & 뉴타운 (동북권)</span>
                      <p className="text-slate-300">노원구(중계) · 광진구(광장) · 동대문구(청량리·이문) · 성북구</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-amber-400 block mb-0.5">🚀 1. 경부선 골든 라인 (핵심 1~2급지)</span>
                      <p className="text-slate-300">과천 ➡️ 성남(판교·분당) ➡️ 수원(광교) ➡️ 용인 ➡️ 화성(동탄) ➡️ 평택</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-emerald-400 block mb-0.5">🌊 2. 한강 & 동북권 벨트</span>
                      <p className="text-slate-300">하남(미사·교산) ➡️ 구리(수택·토평) ➡️ 남양주(다산·별내·왕숙)</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-blue-400 block mb-0.5">🏢 3. 서남권 환승 & 테크노</span>
                      <p className="text-slate-300">광명(02국번) ➡️ 안양(평촌) ➡️ 부천(대장) ➡️ 시흥 ➡️ 안산</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="font-black text-purple-400 block mb-0.5">🚄 4. 경의·GTX 서북권</span>
                      <p className="text-slate-300">고양(일산·창릉) ➡️ 파주(운정) ➡️ 김포(한강)</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Click District Pills List */}
            <div className="naver-card p-5 bg-white border border-slate-200 shadow-sm rounded-3xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-black text-slate-800">
                  {activeRegion === "SEOUL" ? "서울 25개 구 빠른 핀 선택 (클릭)" : "경기 31개 시·군 빠른 핀 선택 (클릭)"}
                </h3>
                <span className="text-[10px] text-slate-500 font-bold">{filteredList.length}개 지역</span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                {filteredList.map((item) => {
                  const isSelected = selectedDistrict?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectDistrict(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-1 ${
                        isSelected
                          ? "bg-[#03c75a] text-white border-[#03c75a] shadow-xs font-black scale-105"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {isSelected && <MapPin className="w-3 h-3 fill-white" />}
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected District Detail Card */}
              {selectedDistrict && (
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-2 animate-scaleUp">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span className="font-black text-sm text-slate-900">{selectedDistrict.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#029f45] border border-emerald-300 font-black">
                        {selectedDistrict.subRegion}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{selectedDistrict.tier}</span>
                  </div>

                  <p className="text-slate-700 font-medium">
                    <strong>대장 단지:</strong> {selectedDistrict.leadComplex}
                  </p>
                  <p className="text-slate-700 font-medium">
                    <strong>핵심 노선:</strong> {selectedDistrict.keyTransit}
                  </p>
                  <div className="p-2 rounded-xl bg-white text-slate-800 font-bold text-[11px] border border-emerald-100">
                    💡 <strong>암기 팁:</strong> {selectedDistrict.memorizeTrick}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: 📑 구·시별 상세 암기 카드 리스트 */}
      {/* ========================================================================= */}
      {studyMode === "GRID_CARDS" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedDistrict(item);
                  setStudyMode("MAP_STUDY");
                }}
                className="naver-card p-5 bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#03c75a]/50 transition-all rounded-3xl flex flex-col justify-between space-y-3.5 group cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black text-slate-900 group-hover:text-[#0066ff] transition">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                        {item.subRegion}
                      </span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border ${item.tierColor}`}>
                      {item.tier}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div>
                      <span className="text-[11px] text-slate-400 font-bold block">🏢 대표 대장 아파트</span>
                      <span className="font-bold text-slate-800">{item.leadComplex}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-200/60">
                      <span className="text-[11px] text-slate-400 font-bold block">🚇 핵심 교통망</span>
                      <span className="font-bold text-slate-800">{item.keyTransit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200/80 flex items-start gap-1.5 flex-1 mr-2">
                    <span className="shrink-0 text-sm">💡</span>
                    <span className="line-clamp-1"><strong>팁:</strong> {item.memorizeTrick}</span>
                  </div>
                  <span className="text-[11px] text-[#0066ff] font-bold shrink-0 flex items-center gap-0.5 group-hover:underline">
                    <span>지도 핀 보기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: 🎯 암기력 진단 퀴즈 게임 */}
      {/* ========================================================================= */}
      {studyMode === "QUIZ" && (
        <div className="max-w-2xl mx-auto naver-card p-6 sm:p-10 bg-white border border-slate-200 shadow-sm rounded-3xl space-y-6 animate-fadeIn">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Quiz Progress Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-black">
                    Q{currentQuizIdx + 1} / {MEMORIZE_QUIZZES.length}
                  </span>
                  <span className="text-xs font-bold text-slate-500">수도권 지리 암기 퀴즈</span>
                </div>
                <span className="text-xs font-black text-purple-600">현재 점수: {score}점</span>
              </div>

              {/* Question */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {MEMORIZE_QUIZZES[currentQuizIdx].q}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {MEMORIZE_QUIZZES[currentQuizIdx].options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = isAnswerSubmitted && idx === MEMORIZE_QUIZZES[currentQuizIdx].answer;
                  const isWrong = isAnswerSubmitted && isSelected && idx !== MEMORIZE_QUIZZES[currentQuizIdx].answer;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-bold transition flex items-center justify-between cursor-pointer ${
                        isCorrect
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-black"
                          : isWrong
                          ? "bg-rose-50 border-rose-500 text-rose-900 font-black"
                          : isSelected
                          ? "bg-purple-50 border-purple-500 text-purple-900 font-black"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                          isSelected ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                        }`}>
                          {idx + 1}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isCorrect && <Check className="w-5 h-5 text-emerald-600" />}
                      {isWrong && <X className="w-5 h-5 text-rose-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation on Submit */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-black text-slate-900">
                    <BookOpen className="w-4 h-4 text-[#0066ff]" />
                    <span>정답 해설</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {MEMORIZE_QUIZZES[currentQuizIdx].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="px-6 py-3 rounded-2xl bg-[#03c75a] hover:bg-[#02b14f] disabled:bg-slate-200 text-white font-black text-xs sm:text-sm transition cursor-pointer"
                  >
                    정답 확인하기
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="px-6 py-3 rounded-2xl bg-[#0066ff] hover:bg-blue-600 text-white font-black text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{currentQuizIdx + 1 < MEMORIZE_QUIZZES.length ? "다음 문제 →" : "최종 결과 보기 🏆"}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Result Screen */
            <div className="text-center space-y-6 py-6 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#03c75a] flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">
                  수도권 지리 퀴즈 완료!
                </h3>
                <p className="text-sm text-slate-600">
                  총 {MEMORIZE_QUIZZES.length}문제 중 <strong>{score}문제</strong>를 맞히셨습니다!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs font-bold text-slate-700">
                {score === MEMORIZE_QUIZZES.length
                  ? "🎉 완벽합니다! 수도권 부동산 지리를 마스터하셨습니다."
                  : score >= 4
                  ? "👍 우수합니다! 조금만 더 복습하면 완벽하게 외울 수 있습니다."
                  : "💪 백지도와 구·시별 상세 도감을 다시 한 번 살펴보세요!"
                }
              </div>

              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 rounded-2xl bg-[#0066ff] hover:bg-blue-600 text-white font-black text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>퀴즈 다시 풀기</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
