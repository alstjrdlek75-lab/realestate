import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { DiagnosticResult } from '../types';
import { Shield, Award } from 'lucide-react';

interface RadarProfileChartProps {
  result: DiagnosticResult;
}

export const RadarProfileChart: React.FC<RadarProfileChartProps> = ({ result }) => {
  return (
    <div className="naver-card p-6 sm:p-8 bg-white flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#0066ff]" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">6대 핵심 지표 프로파일</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#edf4ff] text-[#0066ff] text-xs font-bold border border-[#0066ff]/20">
            <Award className="w-3.5 h-3.5" />
            <span>균형도 진단</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-2">
          선호도 설문을 기반으로 한 6개 핵심 지표별 충족 점수
        </p>

        {/* Radar Chart Container */}
        <div className="w-full h-72 sm:h-80 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={result.radarScores}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: '#94a3b8', fontSize: 10 }} 
                stroke="#cbd5e1"
              />
              <Radar
                name="나의 부동산 니즈 점수"
                dataKey="value"
                stroke="#03c75a"
                fill="#03c75a"
                fillOpacity={0.35}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '12px',
                  color: '#1e293b',
                  fontSize: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Mini Score Tags */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-[11px]">
        {result.radarScores.map((score) => (
          <div key={score.subject} className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
            <div className="text-slate-500 truncate font-medium">{score.subject}</div>
            <div className="font-extrabold text-[#029f45] mt-0.5">{score.value}점</div>
          </div>
        ))}
      </div>
    </div>
  );
};
