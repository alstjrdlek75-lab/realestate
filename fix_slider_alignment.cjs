const fs = require('fs');

let content = fs.readFileSync('src/components/LoanCalculator.tsx', 'utf-8');

// Replace the House Price Slider section with perfectly aligned relative/absolute tick marks and labels
const oldHouseSliderBlock = `<input
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.1"
                  value={housePricePolicy}
                  onChange={(e) => setHousePricePolicy(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#03c75a]"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-2 font-bold">
                  <span>2억</span>
                  <span className="text-slate-800">6억 (디딤돌 상한)</span>
                  <span className="text-[#028137] font-black">9억 (신생아 상한)</span>
                  <span>15억</span>
                </div>`;

const newHouseSliderBlock = `<div className="relative pt-1 pb-6">
                  <input
                    type="range"
                    min="2.0"
                    max="15.0"
                    step="0.1"
                    value={housePricePolicy}
                    onChange={(e) => setHousePricePolicy(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#03c75a] relative z-10"
                  />
                  {/* Absolute Positioned Precise Alignment Markers */}
                  <div className="absolute left-0 right-0 top-6 h-8 text-xs font-bold pointer-events-none">
                    {/* 2억 (0%) */}
                    <div 
                      onClick={() => setHousePricePolicy(2.0)}
                      className="absolute left-0 text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 mb-0.5" />
                      <span>2억</span>
                    </div>

                    {/* 6억 ((6-2)/(15-2) = 30.77%) */}
                    <div 
                      onClick={() => setHousePricePolicy(6.0)}
                      style={{ left: '30.77%' }}
                      className="absolute -translate-x-1/2 text-center text-slate-700 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-500 mx-auto mb-0.5" />
                      <span className="whitespace-nowrap">6억 <span className="text-[10px] text-slate-500 font-semibold">(디딤돌)</span></span>
                    </div>

                    {/* 9억 ((9-2)/(15-2) = 53.85%) -> EXACTLY ALIGNED WITH THUMB AT 9.0 */}
                    <div 
                      onClick={() => setHousePricePolicy(9.0)}
                      style={{ left: '53.85%' }}
                      className="absolute -translate-x-1/2 text-center text-[#028137] font-black cursor-pointer pointer-events-auto hover:scale-105 transition-transform"
                    >
                      <div className="w-1 h-2 bg-[#03c75a] mx-auto mb-0.5 rounded-full" />
                      <span className="whitespace-nowrap bg-[#e8f8ee] px-1.5 py-0.5 rounded border border-[#03c75a]/30 shadow-2xs">
                        9억 <span className="text-[10px] font-bold">(신생아 상한)</span>
                      </span>
                    </div>

                    {/* 15억 (100%) */}
                    <div 
                      onClick={() => setHousePricePolicy(15.0)}
                      className="absolute right-0 text-right text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 ml-auto mb-0.5" />
                      <span>15억</span>
                    </div>
                  </div>
                </div>`;

content = content.replace(oldHouseSliderBlock, newHouseSliderBlock);

// Replace the Annual Income Slider section with perfectly aligned relative/absolute tick marks and labels
const oldIncomeSliderBlock = `<input
                  type="range"
                  min="3000"
                  max="25000"
                  step="500"
                  value={annualIncomePolicy}
                  onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-2 font-bold">
                  <span>3,000만</span>
                  <span className="text-slate-800">8,500만 (신혼)</span>
                  <span className="text-[#0055d4] font-black">2억 (신생아 상한)</span>
                </div>`;

const newIncomeSliderBlock = `<div className="relative pt-1 pb-6">
                  <input
                    type="range"
                    min="3000"
                    max="25000"
                    step="500"
                    value={annualIncomePolicy}
                    onChange={(e) => setAnnualIncomePolicy(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff] relative z-10"
                  />
                  {/* Absolute Positioned Precise Alignment Markers */}
                  <div className="absolute left-0 right-0 top-6 h-8 text-xs font-bold pointer-events-none">
                    {/* 3,000만 (0%) */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(3000)}
                      className="absolute left-0 text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 mb-0.5" />
                      <span>3,000만</span>
                    </div>

                    {/* 8,500만 ((8500-3000)/(25000-3000) = 5500/22000 = 25.00%) -> EXACTLY ALIGNED WITH THUMB AT 8,500 */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(8500)}
                      style={{ left: '25.00%' }}
                      className="absolute -translate-x-1/2 text-center text-slate-700 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-500 mx-auto mb-0.5" />
                      <span className="whitespace-nowrap">8,500만 <span className="text-[10px] text-slate-500 font-semibold">(신혼)</span></span>
                    </div>

                    {/* 2억 ((20000-3000)/(25000-3000) = 17000/22000 = 77.27%) -> EXACTLY ALIGNED WITH THUMB AT 2억 */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(20000)}
                      style={{ left: '77.27%' }}
                      className="absolute -translate-x-1/2 text-center text-[#0055d4] font-black cursor-pointer pointer-events-auto hover:scale-105 transition-transform"
                    >
                      <div className="w-1 h-2 bg-[#0066ff] mx-auto mb-0.5 rounded-full" />
                      <span className="whitespace-nowrap bg-[#edf4ff] px-1.5 py-0.5 rounded border border-[#0066ff]/30 shadow-2xs">
                        2억 <span className="text-[10px] font-bold">(신생아 상한)</span>
                      </span>
                    </div>

                    {/* 2.5억 (100%) */}
                    <div 
                      onClick={() => setAnnualIncomePolicy(25000)}
                      className="absolute right-0 text-right text-slate-500 cursor-pointer pointer-events-auto hover:text-slate-900"
                    >
                      <div className="w-0.5 h-1.5 bg-slate-400 ml-auto mb-0.5" />
                      <span>2.5억</span>
                    </div>
                  </div>
                </div>`;

content = content.replace(oldIncomeSliderBlock, newIncomeSliderBlock);

fs.writeFileSync('src/components/LoanCalculator.tsx', content, 'utf-8');
console.log('Successfully aligned slider thumb and markers with absolute math!');
