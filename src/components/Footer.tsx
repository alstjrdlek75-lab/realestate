import React from 'react';
import { Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#03c75a] flex items-center justify-center text-white font-bold">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900">부동산 매트릭스 핀테크 진단 엔진</div>
            <div className="text-[11px] text-slate-500 font-medium">실거주 만족도(Living) vs 자산가치(Buying) 최적화 솔루션</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-600 font-medium">
          <span>DSR 40% 규제 기준 산출</span>
          <span>수도권 15대 권역 실거래가 모델링</span>
          <span>개인화 알고리즘 2.0</span>
        </div>

        <div className="text-center sm:text-right text-[11px] text-slate-400">
          본 서비스의 진단 및 리포트는 모의 시뮬레이션 결과이며 실제 대출 및 계약 전 전문가 상담을 권장합니다.
        </div>
      </div>
    </footer>
  );
};
