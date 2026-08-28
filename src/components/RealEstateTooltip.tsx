import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export const REAL_ESTATE_DICTIONARY: Record<string, { term: string; simpleDesc: string; detail: string; tip: string }> = {
  'DSR': {
    term: 'DSR (총부채원리금상환비율)',
    simpleDesc: '내 연소득 중 모든 대출의 1년 원금+이자가 차지하는 비율 (보통 40% 제한)',
    detail: '연봉 5,000만 원인 사람이 1년에 갚아야 할 원리금이 2,000만 원이면 DSR 40%입니다. 신용대출, 자동차 할부 등 모든 빚이 합산되어 주택담보대출 한도가 줄어듭니다.',
    tip: '주담대를 최대로 받으려면 불필요한 마이너스통장이나 신용대출을 미리 상환하는 것이 유리합니다.'
  },
  '스트레스 DSR': {
    term: '스트레스 DSR (Stress DSR)',
    simpleDesc: '미래 금리 인상 위험을 미리 가산하여 대출 한도를 더 깎는 규제',
    detail: '실제 적용 금리에 0.75%~1.2%의 가산금리를 붙여 원리금을 가상으로 계산하므로, 같은 연봉이라도 빌릴 수 있는 주담대 총액이 수천만 원 줄어듭니다.',
    tip: '수도권 규제지역에서는 스트레스 금리가 더 높게 적용되므로 사전 한도 조회가 필수입니다.'
  },
  'LTV': {
    term: 'LTV (주택담보인정비율)',
    simpleDesc: '집값 대비 최대로 빌릴 수 있는 주택담보대출 금액의 비율',
    detail: '10억 원짜리 아파트에 LTV 70%가 적용되면 최대 7억 원까지 대출 가능합니다. 단, DSR 40% 기준을 동시에 충족해야 합니다.',
    tip: '무주택 생애최초 매수자는 최대 80%(한도 6억 원)까지 우대 혜택을 받습니다.'
  },
  '전세가율': {
    term: '전세가율 (전세가 / 매매가)',
    simpleDesc: '아파트 매매가격 대비 전세가격의 비율 (실거주 가치의 척도)',
    detail: '매매가 10억, 전세가 6억이면 전세가율은 60%입니다. 전세가율이 높을수록 갭투자 금액이 적게 들고 하방 지지력이 강합니다.',
    tip: '전세가율 45% 미만 단지는 호재로 뜬 거품일 가능성이 높고, 75% 이상은 역전세 위험을 점검해야 합니다.'
  },
  '대지지분': {
    term: '대지지분 (Land Share)',
    simpleDesc: '아파트 단지 전체 땅 중 내 호실에 속한 실제 땅의 면적',
    detail: '건물은 30년이 지나면 가치가 0에 수렴하지만 땅은 영구적입니다. 대지지분이 넓을수록 향후 재건축 시 추가분담금이 적고 새 아파트를 크게 지을 수 있습니다.',
    tip: '오피스텔은 용적률이 높아 세대당 대지지분이 극히 작아 재건축이 어렵습니다.'
  },
  '분양가상한제': {
    term: '분양가상한제 (분상제)',
    simpleDesc: '정부가 공공택지나 규제지역의 아파트 분양 가격 상한선을 법으로 통제하는 제도',
    detail: '건설사가 마음대로 분양가를 올리지 못하므로 주변 기축 아파트 시세 대비 15~30% 저렴하게 공급되어 안전마진이 확보됩니다.',
    tip: '3기 신도시, 과천, 하남교산, 구리토평2, 서울 강남3구·용산 분양 단지에 100% 적용됩니다.'
  },
  '초품아': {
    term: '초품아 (초등학교를 품은 아파트)',
    simpleDesc: '8차선 대로를 건너지 않고 단지 안이나 바로 옆에 초등학교가 있는 단지',
    detail: '학부모 실수요자들이 가장 선호하며, 부동산 침체기에도 매매가와 전세가가 가장 굳건히 방어되는 불패 입지입니다.',
    tip: '초등 자녀가 없는 1인가구라도 환금성과 나중에 집을 되팔 때를 위해 초품아를 우선순위에 둬야 합니다.'
  },
  '기축': {
    term: '기축 (이미 지어진 아파트)',
    simpleDesc: '신규 분양하는 분양권이 아닌, 이미 준공되어 사람이 살고 있는 기존 아파트',
    detail: '입주 5년 이내는 \'신축\', 5~10년은 \'준신축\', 10~25년은 \'구축\', 30년 이상은 \'재건축 대상\'으로 구분합니다.',
    tip: '고분양가 시대에는 신규 청약보다 검증된 역세권 준신축 급매물 매수가 더 유리할 수 있습니다.'
  },
  '급지': {
    term: '급지 (부동산 서열 등급)',
    simpleDesc: '입지 가치와 평당 시세에 따라 수도권을 1급지부터 5급지까지 나눈 시장 서열',
    detail: '1급지(강남·서초·송파·용산), 2급지(마포·성동·광진·영등포·과천·판교), 3급지(강동·동작·분당·평촌), 4급지(노원·성북·수지·구리) 등으로 나뉩니다.',
    tip: '부동산 상승기에는 상급지가 먼저 오르고, 하락기에는 하급지가 먼저 떨어집니다.'
  }
};

interface TermTooltipProps {
  termKey: keyof typeof REAL_ESTATE_DICTIONARY;
  children?: React.ReactNode;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({ termKey, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = REAL_ESTATE_DICTIONARY[termKey];

  if (!data) return <>{children || termKey}</>;

  return (
    <span className="relative inline-block">
      <span 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="underline decoration-dotted decoration-[#03c75a] underline-offset-4 text-slate-900 font-bold hover:text-[#029f45] cursor-pointer inline-flex items-center gap-0.5"
      >
        {children || termKey}
        <HelpCircle className="w-3 h-3 text-[#03c75a] opacity-70 inline ml-0.5" />
      </span>

      {isOpen && (
        <span 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl z-50 text-left block text-xs border border-slate-700 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-black text-[#03c75a] block text-xs mb-1 flex items-center justify-between">
            <span>💡 {data.term}</span>
            <span className="text-[10px] text-slate-400 font-normal">원클릭 해설</span>
          </span>
          <span className="text-slate-200 block text-[11px] font-semibold leading-relaxed mb-1.5">
            {data.simpleDesc}
          </span>
          <span className="text-slate-400 block text-[10px] leading-tight border-t border-slate-800 pt-1.5">
            📌 <strong>실전 팁:</strong> {data.tip}
          </span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </span>
      )}
    </span>
  );
};
