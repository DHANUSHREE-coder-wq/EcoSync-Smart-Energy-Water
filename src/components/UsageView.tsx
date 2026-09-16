import React, { useState } from 'react';
import { initialWeekTrends, initialTopConsumers } from '../data/mockData';
import { DayTrend } from '../types';

interface UsageViewProps {
  onAutomateTip: () => void;
  savingsINR: number;
}

export const UsageView: React.FC<UsageViewProps> = ({
  onAutomateTip,
  savingsINR,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayTrend | null>(
    initialWeekTrends.find((d) => d.isHighlight) || initialWeekTrends[3]
  );
  const [tipAutomated, setTipAutomated] = useState(false);

  const handleAutomate = () => {
    setTipAutomated(true);
    onAutomateTip();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Weekly Insight Hero Header */}
      <section className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#e3f9ed]/70 to-[#eff4ff]/60 border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d166]/20 text-[#006d32] text-xs font-bold uppercase tracking-wider mb-4">
          <span>Weekly Insight</span>
        </div>

        <h1 className="font-headline text-3xl md:text-4xl font-bold text-[#0b1c30] leading-tight tracking-tight">
          Your efficiency rose by{' '}
          <span className="text-[#006d32]">12%</span> since last Monday.
        </h1>

        <div className="grid grid-cols-2 gap-6 mt-6 pt-5 border-t border-[#0b1c30]/10">
          <div>
            <span className="text-xs text-[#6c7b6c] font-medium block">
              Avg. Daily Energy
            </span>
            <span className="font-headline text-2xl font-bold text-[#0b1c30] mt-0.5 block">
              14.2 kWh
            </span>
          </div>
          <div>
            <span className="text-xs text-[#6c7b6c] font-medium block">
              Avg. Daily Water
            </span>
            <span className="font-headline text-2xl font-bold text-[#0b1c30] mt-0.5 block">
              420 L
            </span>
          </div>
        </div>
      </section>

      {/* Savings Metric Green Card */}
      <section className="p-6 md:p-7 rounded-2xl bg-[#04622b] text-white shadow-md relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-emerald-200">
            <span className="material-symbols-outlined text-2xl">bolt</span>
          </div>
          <span className="material-symbols-outlined text-xl text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            arrow_outward
          </span>
        </div>

        <div className="mt-2">
          <div className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            -₹{savingsINR.toLocaleString('en-IN')}
          </div>
          <p className="text-sm text-emerald-100/90 font-medium mt-1">
            Estimated Savings this month
          </p>
        </div>
      </section>

      {/* Usage Trends Section: 7-Day Comparison */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-[#0b1c30]">
              Usage Trends
            </h2>
            <p className="text-sm text-[#6c7b6c]">7-Day Resource Comparison</p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#04622b]"></span>
              <span className="text-[#0b1c30] font-medium">Energy (kWh)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0059bb]"></span>
              <span className="text-[#0b1c30] font-medium">Water (L)</span>
            </div>
          </div>
        </div>

        {/* Chart Box */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs">
          {/* Active Hover / Selection readout */}
          {selectedDay && (
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 text-xs">
              <span className="font-bold text-[#0b1c30]">
                {selectedDay.day} Consumption:
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[#04622b] font-semibold">
                  ⚡ {selectedDay.energyKWh} kWh
                </span>
                <span className="text-[#0059bb] font-semibold">
                  💧 {selectedDay.waterL} L
                </span>
              </div>
            </div>
          )}

          {/* 7-Day Bars */}
          <div className="flex items-end justify-between h-48 pt-4 pb-2 border-b border-gray-100">
            {initialWeekTrends.map((d) => {
              const isSelected = selectedDay?.day === d.day;
              return (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d)}
                  className="flex flex-col items-center flex-1 h-full justify-end group focus:outline-none px-1"
                >
                  <div className="flex items-end gap-1 w-full justify-center h-full">
                    {/* Energy Bar */}
                    <div
                      className={`w-3 sm:w-3.5 rounded-t-full transition-all duration-300 ${
                        d.isHighlight
                          ? 'bg-[#04622b]'
                          : isSelected
                          ? 'bg-[#00d166]'
                          : 'bg-[#bfead0] group-hover:bg-[#86d9a4]'
                      }`}
                      style={{ height: `${d.energyHeightPercent}%` }}
                      title={`${d.day} Energy: ${d.energyKWh} kWh`}
                    ></div>

                    {/* Water Bar */}
                    <div
                      className={`w-3 sm:w-3.5 rounded-t-full transition-all duration-300 ${
                        d.isHighlight
                          ? 'bg-[#0059bb]'
                          : isSelected
                          ? 'bg-[#0070ea]'
                          : 'bg-[#c3daf9] group-hover:bg-[#91bef7]'
                      }`}
                      style={{ height: `${d.waterHeightPercent}%` }}
                      title={`${d.day} Water: ${d.waterL} L`}
                    ></div>
                  </div>

                  <span
                    className={`text-[10px] font-bold mt-2 transition-colors ${
                      d.isHighlight || isSelected
                        ? 'text-[#0b1c30]'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  >
                    {d.day}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Consumers Section */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl font-bold tracking-tight text-[#0b1c30] px-1">
          Top Consumers
        </h2>

        <div className="space-y-3">
          {initialTopConsumers.map((consumer) => (
            <div
              key={consumer.id}
              className="p-5 rounded-2xl bg-[#eff4ff] border border-gray-100 shadow-xs hover:bg-[#e5eeff]/80 transition-all"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`p-2.5 rounded-xl flex items-center justify-center ${
                    consumer.theme === 'blue'
                      ? 'bg-[#dce9ff] text-[#0059bb]'
                      : 'bg-[#00d166]/20 text-[#006d32]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {consumer.icon}
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    consumer.changeType === 'negative'
                      ? 'text-red-600 bg-red-50'
                      : consumer.changeType === 'positive'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  {consumer.changeText}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-headline text-base font-bold text-[#0b1c30]">
                  {consumer.name}
                </h3>
                <div className="font-headline text-2xl font-bold text-[#0b1c30] mt-0.5">
                  {consumer.amount}{' '}
                  <span className="text-xs font-normal text-gray-500">
                    {consumer.unit}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#d3e4fe] h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    consumer.theme === 'blue' ? 'bg-[#0059bb]' : 'bg-[#006d32]'
                  }`}
                  style={{ width: `${consumer.barPercent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Optimization Tip Card */}
      <section className="p-6 md:p-8 rounded-3xl bg-[#eff4ff] border border-[#d3e4fe] shadow-xs text-center relative overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-[#0059bb]/10 text-[#0059bb] flex items-center justify-center mx-auto mb-3">
          <span className="material-symbols-outlined text-2xl">lightbulb</span>
        </div>

        <h3 className="font-headline text-lg font-bold text-[#0b1c30]">
          Smart Optimization Tip
        </h3>

        <p className="text-sm text-[#3c4a3d] mt-2 max-w-md mx-auto leading-relaxed">
          Your hot water usage peaks between 7 AM and 8 AM. Shifting your dishwasher
          cycle to 11 PM could save you ₹1,200/month on off-peak rates.
        </p>

        <div className="mt-6">
          <button
            onClick={handleAutomate}
            disabled={tipAutomated}
            className={`w-full max-w-xs py-3 px-6 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              tipAutomated
                ? 'bg-[#00d166] text-[#005324]'
                : 'bg-[#0b1c30] text-white hover:bg-[#1f2d42]'
            }`}
          >
            {tipAutomated ? '✓ Flow Configured & Active' : 'Automate Now'}
          </button>
        </div>
      </section>
    </div>
  );
};
