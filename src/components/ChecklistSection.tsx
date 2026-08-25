import React, { useState } from 'react';
import { THREE_CORE_METRICS_CRITERIA } from '../data/strategyData';
import { CheckSquare, Square, ShieldCheck } from 'lucide-react';

export const ChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'transit-0': true,
    'transit-1': true,
    'scale-0': true,
    'scale-1': true,
    'school_commercial-0': true,
  });

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalChecks = 9;
  const currentCheckedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionRate = Math.round((currentCheckedCount / totalChecks) * 100);

  return (
    <div className="naver-card p-6 sm:p-10 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0066ff]" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              매수 전 반드시 확인해야 할 3대 황금 지표 체크리스트
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            어떤 부동산을 사더라도 하락장 방어력과 상승장 탄력성을 결정짓는 3대 불변의 원칙
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-medium">자가 검증 완료율</span>
            <div className="text-lg font-black text-[#029f45]">{completionRate}% ({currentCheckedCount}/{totalChecks})</div>
          </div>
        </div>
      </div>

      {/* 3 Criteria Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {THREE_CORE_METRICS_CRITERIA.map((criterion) => (
          <div 
            key={criterion.id}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs text-[#029f45] font-black mb-1">
                {criterion.importance}
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                {criterion.name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4 pb-4 border-b border-slate-200 font-medium">
                {criterion.desc}
              </p>

              {/* Checklist Items */}
              <div className="space-y-2.5">
                {criterion.checkDetails.map((detail, idx) => {
                  const checkKey = `${criterion.id}-${idx}`;
                  const isChecked = !!checkedItems[checkKey];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(checkKey)}
                      className={`p-3 rounded-xl cursor-pointer flex items-start gap-2.5 transition text-xs select-none ${
                        isChecked 
                          ? 'bg-white text-slate-900 border border-[#03c75a] shadow-2xs font-bold' 
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#03c75a] mt-0.5 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      )}
                      <span className="leading-snug">{detail}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>검증 항목 3개</span>
              <span className="text-[#0066ff] font-bold">실사 임장 필수</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
