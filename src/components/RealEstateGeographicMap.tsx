import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Layers, MapPin, Sparkles, Compass, Maximize2, ExternalLink, CheckCircle2, ShieldCheck, ChevronRight } from "lucide-react";
import { NewTownDetail } from "./RealEstateFuture";

interface RealEstateGeographicMapProps {
  towns: NewTownDetail[];
  selectedTownId: string;
  onSelectTown: (id: string) => void;
  selectedCategory: "ALL" | "NEW_TOWN" | "REDEVELOPMENT";
}

type MapLayerType = "VOYAGER" | "OSM" | "SATELLITE" | "DARK";

// Real Transit Line Coordinates in Seoul Metropolitan Area
const TRANSIT_ROUTES = [
  {
    name: "GTX-A (운정 ~ 삼성 ~ 동탄)",
    color: "#9333ea",
    weight: 4.5,
    dashArray: undefined,
    coords: [
      [37.7125, 126.7410],
      [37.6690, 126.7510],
      [37.6310, 126.8160],
      [37.6320, 126.8850],
      [37.6180, 126.9200],
      [37.5560, 126.9725],
      [37.5085, 127.0630],
      [37.4870, 127.1015],
      [37.4020, 127.1110],
      [37.2000, 127.1000],
    ] as [number, number][]
  },
  {
    name: "GTX-B (송도 ~ 여의도 ~ 왕숙 ~ 마석)",
    color: "#2563eb",
    weight: 4.5,
    dashArray: undefined,
    coords: [
      [37.3850, 126.6550],
      [37.4560, 126.7050],
      [37.4890, 126.7240],
      [37.5385, 126.7725],
      [37.5215, 126.9240],
      [37.5295, 126.9680],
      [37.5560, 126.9725],
      [37.5800, 127.0450],
      [37.6430, 127.1260],
      [37.6625, 127.1680],
      [37.6530, 127.3000],
    ] as [number, number][]
  },
  {
    name: "GTX-C (덕정 ~ 청량리 ~ 삼성 ~ 과천 ~ 수원)",
    color: "#ea580c",
    weight: 4.5,
    dashArray: undefined,
    coords: [
      [37.8420, 127.0600],
      [37.7380, 127.0460],
      [37.6530, 127.0480],
      [37.5800, 127.0450],
      [37.5085, 127.0630],
      [37.4840, 127.0340],
      [37.4420, 127.0090],
      [37.3720, 126.9430],
      [37.2660, 127.0000],
    ] as [number, number][]
  },
  {
    name: "8호선 별내선 (잠실 ~ 암사 ~ 토평 ~ 구리 ~ 별내)",
    color: "#db2777",
    weight: 4,
    dashArray: "6, 4",
    coords: [
      [37.5135, 127.1000],
      [37.5500, 127.1275],
      [37.5850, 127.1350],
      [37.5985, 127.1390],
      [37.6080, 127.1530],
      [37.6430, 127.1260],
    ] as [number, number][]
  },
  {
    name: "3호선 송파하남선 (오금 ~ 감일 ~ 교산 ~ 하남시청)",
    color: "#f97316",
    weight: 4,
    dashArray: "6, 4",
    coords: [
      [37.5020, 127.1280],
      [37.5120, 127.1530],
      [37.5255, 127.2085],
      [37.5390, 127.2140],
    ] as [number, number][]
  },
  {
    name: "9호선 강동하남남양주선 (신논현 ~ 잠실 ~ 강일 ~ 왕숙)",
    color: "#eab308",
    weight: 4,
    dashArray: "6, 4",
    coords: [
      [37.5045, 127.0250],
      [37.5110, 127.0730],
      [37.5160, 127.1300],
      [37.5550, 127.1750],
      [37.5610, 127.1930],
      [37.6250, 127.1600],
      [37.6625, 127.1680],
    ] as [number, number][]
  },
  {
    name: "대장홍대선 (부천대장 ~ 화곡 ~ 가양 ~ 홍대입구)",
    color: "#059669",
    weight: 4,
    dashArray: "6, 4",
    coords: [
      [37.5385, 126.7725],
      [37.5270, 126.7970],
      [37.5320, 126.8400],
      [37.5610, 126.8540],
      [37.5770, 126.8990],
      [37.5570, 126.9240],
    ] as [number, number][]
  }
];

export const RealEstateGeographicMap: React.FC<RealEstateGeographicMapProps> = ({
  towns,
  selectedTownId,
  onSelectTown,
  selectedCategory
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const polylinesRef = useRef<L.Polyline[]>([]);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapLayer, setMapLayer] = useState<MapLayerType>("VOYAGER");
  const [showTransitLines, setShowTransitLines] = useState<boolean>(true);

  const selectedTown = towns.find(t => t.id === selectedTownId) || towns[0];

  const getTileUrl = (type: MapLayerType) => {
    switch (type) {
      case "VOYAGER":
        return "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      case "SATELLITE":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "DARK":
        return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      case "OSM":
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  const getTileSubdomains = (type: MapLayerType) => {
    switch (type) {
      case "VOYAGER":
      case "DARK":
        return "abcd";
      case "OSM":
        return "abc";
      default:
        return "abc";
    }
  };

  // 1. Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [37.5665, 126.9780],
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: "topright" }).addTo(map);
      L.control.attribution({ position: "bottomright", prefix: "Leaflet | CartoDB & OpenStreetMap" }).addTo(map);

      const tileLayer = L.tileLayer(getTileUrl(mapLayer), {
        subdomains: getTileSubdomains(mapLayer),
        maxZoom: 19
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Change Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const newTileLayer = L.tileLayer(getTileUrl(mapLayer), {
      subdomains: getTileSubdomains(mapLayer),
      maxZoom: 19
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;
  }, [mapLayer]);

  // 3. Render Transit Lines Polylines
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    polylinesRef.current.forEach(p => map.removeLayer(p));
    polylinesRef.current = [];

    if (showTransitLines) {
      TRANSIT_ROUTES.forEach(route => {
        const poly = L.polyline(route.coords, {
          color: route.color,
          weight: route.weight,
          dashArray: route.dashArray,
          opacity: mapLayer === "SATELLITE" ? 0.95 : 0.85,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        poly.bindTooltip("🚇 " + route.name, { sticky: true, className: "leaflet-transit-tooltip" });
        polylinesRef.current.push(poly);
      });
    }
  }, [showTransitLines, mapLayer]);

  // 4. Render Interactive Markers for Towns & Redevelopments
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    towns.forEach(town => {
      const isSelected = town.id === selectedTownId;
      const isRedev = town.category === "REDEVELOPMENT";

      const customIcon = L.divIcon({
        className: "custom-realestate-marker",
        html: `
          <div class="group cursor-pointer transition-transform duration-200 ${isSelected ? "scale-110 z-50" : "hover:scale-105 z-20"}">
            <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg border-2 whitespace-nowrap font-black text-xs ${
              isSelected
                ? isRedev
                  ? "bg-indigo-600 text-white border-white ring-4 ring-indigo-400/40"
                  : "bg-[#03c75a] text-white border-white ring-4 ring-[#03c75a]/40"
                : isRedev
                ? "bg-white text-indigo-900 border-indigo-600 hover:bg-indigo-50"
                : "bg-white text-[#029f45] border-[#03c75a] hover:bg-emerald-50"
            }">
              <span class="w-2 h-2 rounded-full ${isSelected ? "bg-white animate-ping" : isRedev ? "bg-indigo-600" : "bg-[#03c75a]"}"></span>
              <span>${town.shortName}</span>
              <span class="text-[10px] px-1 py-0.2 rounded font-bold ${
                isSelected ? "bg-white/20 text-white" : isRedev ? "bg-indigo-100 text-indigo-800" : "bg-emerald-100 text-[#029f45]"
              }">
                ${town.units.split(" ")[0]}
              </span>
            </div>
          </div>
        `,
        iconSize: [120, 36],
        iconAnchor: [60, 18]
      });

      const marker = L.marker([town.lat, town.lng], { icon: customIcon }).addTo(map);

      marker.on("click", () => {
        onSelectTown(town.id);
        map.flyTo([town.lat, town.lng], 13, { duration: 1 });
      });

      markersRef.current[town.id] = marker;
    });
  }, [towns, selectedTownId, onSelectTown]);

  // 5. Fly to selected town when selectedTownId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedTown) return;
    mapInstanceRef.current.flyTo([selectedTown.lat, selectedTown.lng], 13, { duration: 1.2 });
  }, [selectedTownId]);

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([37.5665, 126.9780], 11, { duration: 1 });
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Map Mode & Layer Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
        {/* Layer Styles Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <span className="px-2 text-slate-500 text-[11px] font-black hidden lg:inline">🗺️ 지도 스타일:</span>
          <button
            onClick={() => setMapLayer("VOYAGER")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              mapLayer === "VOYAGER" ? "bg-white text-[#029f45] shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>네이버/카카오 벡터</span>
          </button>
          <button
            onClick={() => setMapLayer("SATELLITE")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              mapLayer === "SATELLITE" ? "bg-white text-indigo-700 shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>위성 항공사진</span>
          </button>
          <button
            onClick={() => setMapLayer("DARK")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              mapLayer === "DARK" ? "bg-white text-slate-900 shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>다크 노선도</span>
          </button>
        </div>

        {/* Action Buttons (Transit Overlay & Reset) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setShowTransitLines(!showTransitLines)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              showTransitLines
                ? "bg-blue-50 text-[#0066ff] border-[#0066ff]/30 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>GTX·철도 노선망 {showTransitLines ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={handleResetView}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            title="수도권 전체 중심 보기"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>전체 중심</span>
          </button>
        </div>
      </div>

      {/* Main Map Canvas Grid with Side Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Real Leaflet Map Container */}
        <div className="lg:col-span-8 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative h-[520px] sm:h-[620px]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Map Legend */}
          <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-md text-xs font-bold space-y-1.5 max-w-[260px]">
            <span className="text-[11px] text-slate-500 font-black block">📌 마커 & 철도 안내 (클릭 시 확대)</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#03c75a]"></span>
              <span className="text-slate-800">3기 신도시 & 신규택지 (7개)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
              <span className="text-slate-800">서울·수도권 메가 재개발 (6개)</span>
            </div>
            {showTransitLines && (
              <div className="pt-1.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-600">
                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">GTX-A</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">GTX-B</span>
                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 font-bold">GTX-C</span>
                <span className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-800 font-bold">8호선</span>
                <span className="px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 font-bold">9호선</span>
              </div>
            )}
          </div>
        </div>

        {/* Selected District Real Spot Info Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            
            {/* Header Tag & Title */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border ${selectedTown.statusTagColor}`}>
                  {selectedTown.statusTag}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  selectedTown.category === "REDEVELOPMENT" ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-[#029f45]"
                }`}>
                  {selectedTown.categoryLabel}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {selectedTown.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{selectedTown.location}</span>
              </p>
            </div>

            {/* Travel Times Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-bold block">강남·잠실 소요시간</span>
                <span className="text-sm font-black text-[#0066ff] mt-0.5 block">{selectedTown.mapCoords.gangnamTime}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-bold block">서울 도심 소요시간</span>
                <span className="text-sm font-black text-slate-900 mt-0.5 block">{selectedTown.mapCoords.seoulTime}</span>
              </div>
            </div>

            {/* Key Stats Pill */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold">공급 규모 / 면적:</span>
                <span className="font-black text-slate-900">{selectedTown.units} ({selectedTown.areaSize})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold">입주 목표:</span>
                <span className="font-black text-[#029f45]">{selectedTown.expectedMoveIn}</span>
              </div>
            </div>

            {/* Transit Summary */}
            <div className="text-xs space-y-1">
              <span className="text-slate-500 font-bold block">연계 광역 교통망:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTown.transitLines.map((line, idx) => (
                  <span key={idx} className="px-2 py-1 rounded-lg bg-blue-50 text-[#0066ff] font-bold text-[11px] border border-blue-100">
                    {line}
                  </span>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-medium">
              💡 <strong>핵심 입지 가치:</strong> {selectedTown.proTip}
            </div>

            {/* Direct Map Links (Naver & Kakao Map) */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold">
              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(selectedTown.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#03c75a] hover:bg-[#02b14f] text-white transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>네이버 지도 보기 ↗</span>
              </a>
              <a
                href={`https://map.kakao.com/?q=${encodeURIComponent(selectedTown.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#fee500] hover:bg-[#fdd835] text-[#191919] transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>카카오맵 보기 ↗</span>
              </a>
            </div>

          </div>

          {/* Quick Town Pill List */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <span className="text-xs font-black text-slate-700 block">다른 지구 지도 바로가기</span>
            <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {towns.map(t => {
                const isSelected = selectedTownId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTown(t.id)}
                    className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer text-left truncate border flex items-center justify-between ${
                      isSelected
                        ? t.category === "REDEVELOPMENT"
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-[#03c75a] text-white border-[#03c75a]"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <span className="truncate">{t.shortName}</span>
                    <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
