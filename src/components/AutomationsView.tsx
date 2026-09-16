import React, { useState } from 'react';
import { AutomationFlow } from '../types';

interface AutomationsViewProps {
  flows: AutomationFlow[];
  onToggleFlow: (id: string) => void;
  onOpenNewFlowModal: () => void;
  gridStandard: string;
  onSelectGridStandard: (standard: string) => void;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({
  flows,
  onToggleFlow,
  onOpenNewFlowModal,
  gridStandard,
  onSelectGridStandard,
}) => {
  const [filter, setFilter] = useState<'all' | 'peak' | 'water' | 'ev'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filteredFlows = flows.filter((flow) => {
    if (filter === 'all') return true;
    return flow.category === filter;
  });

  const activeFlowsCount = flows.filter((f) => f.enabled).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <section className="space-y-3 pt-2">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00d166]/20 text-[#006d32] text-xs font-bold uppercase tracking-wider">
          <span>OPTIMIZED</span>
        </div>

        <h1 className="font-headline text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight">
          Automations
        </h1>

        <p className="text-sm md:text-base text-[#3c4a3d] leading-relaxed">
          The Luminous Engine is currently managing{' '}
          <span className="text-[#006d32] font-semibold italic">
            {activeFlowsCount} active flows
          </span>{' '}
          to reduce your carbon footprint while maximizing grid efficiency.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2 relative">
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-5 py-2.5 rounded-xl bg-[#dce9ff] text-[#0059bb] font-semibold text-sm hover:bg-[#cbdbf5] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-base">filter_list</span>
              <span>Filter{filter !== 'all' ? `: ${filter.toUpperCase()}` : ''}</span>
            </button>

            {/* Filter Dropdown */}
            {showFilterMenu && (
              <div className="absolute top-12 left-0 w-44 bg-white rounded-xl shadow-lg border border-gray-100 p-1.5 z-20">
                {(['all', 'peak', 'water', 'ev'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg font-medium transition-colors ${
                      filter === cat
                        ? 'bg-[#006d32] text-white'
                        : 'text-[#0b1c30] hover:bg-gray-100'
                    }`}
                  >
                    {cat === 'all'
                      ? 'All Categories'
                      : cat === 'peak'
                      ? 'Peak Eco'
                      : cat === 'water'
                      ? 'Water & Irrigation'
                      : 'EV & Mobility'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenNewFlowModal}
            className="px-5 py-2.5 rounded-xl bg-[#04622b] text-white font-semibold text-sm hover:bg-[#035123] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>New Flow</span>
          </button>
        </div>
      </section>

      {/* Primary Flow Cards List */}
      <section className="space-y-4">
        {filteredFlows
          .filter((f) => !f.isDarkCard)
          .map((flow) => (
            <div
              key={flow.id}
              className={`p-6 rounded-3xl border transition-all shadow-xs ${
                flow.category === 'water'
                  ? 'bg-gradient-to-b from-[#eff4ff] to-[#f8f9ff] border-[#d3e4fe]'
                  : 'bg-gradient-to-b from-[#e3f9ed]/50 to-white border-[#bfead0]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    flow.category === 'water'
                      ? 'bg-[#dce9ff] text-[#0059bb]'
                      : 'bg-[#00d166]/20 text-[#006d32]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {flow.category === 'water' ? 'cloud' : 'eco'}
                  </span>
                </div>

                {/* Custom Styled Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flow.enabled}
                    onChange={() => onToggleFlow(flow.id)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-12 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      flow.category === 'water'
                        ? 'peer-checked:bg-[#0059bb]'
                        : 'peer-checked:bg-[#04622b]'
                    }`}
                  ></div>
                </label>
              </div>

              <div className="mt-4">
                <h3 className="font-headline text-xl font-bold text-[#0b1c30]">
                  {flow.title}
                </h3>
                <p className="text-xs md:text-sm text-[#3c4a3d] mt-1 leading-relaxed">
                  {flow.description}
                </p>
              </div>

              {/* Bottom Metadata Badges */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                  <span className="material-symbols-outlined text-sm">
                    {flow.category === 'water' ? 'water_drop' : 'devices'}
                  </span>
                  <span>{flow.influenceInfo}</span>
                </div>

                <div
                  className={`font-bold flex items-center gap-1 ${
                    flow.category === 'water' ? 'text-[#0059bb]' : 'text-[#006d32]'
                  }`}
                >
                  {flow.category !== 'water' && (
                    <span className="material-symbols-outlined text-sm">bolt</span>
                  )}
                  <span>
                    {flow.category === 'water'
                      ? flow.secondaryStatus || 'IDLE'
                      : flow.benefitInfo}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* 2x2 Metric Grid */}
      <section className="grid grid-cols-2 gap-3">
        <div className="p-5 rounded-2xl bg-[#eff4ff] border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6c7b6c] block">
            DAILY SAVINGS
          </span>
          <div className="font-headline text-2xl md:text-3xl font-bold text-[#0b1c30] mt-1">
            ₹350
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#eff4ff] border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6c7b6c] block">
            CARBON OFFSET
          </span>
          <div className="font-headline text-2xl md:text-3xl font-bold text-[#0b1c30] mt-1">
            12.4kg
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#eff4ff] border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6c7b6c] block">
            EFFICIENCY SCORE
          </span>
          <div className="font-headline text-2xl md:text-3xl font-bold text-[#006d32] mt-1">
            94/100
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#eff4ff] border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6c7b6c] block">
            GRID HEALTH
          </span>
          <div className="font-headline text-2xl md:text-3xl font-bold text-[#0b1c30] mt-1">
            Stable
          </div>
        </div>
      </section>

      {/* Dark Card: EV Scheduled Charging */}
      {filteredFlows
        .filter((f) => f.isDarkCard)
        .map((flow) => (
          <section
            key={flow.id}
            className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1a2b3c] via-[#102030] to-[#0b1c30] text-white shadow-lg relative overflow-hidden group"
          >
            {/* Background Car Silhouette / Ambient Lights */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#00d166_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative z-10 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#006d32] text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-2xl">ev_station</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-white">
                    {flow.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 mt-1 leading-relaxed max-w-sm">
                    {flow.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flow.enabled}
                    onChange={() => onToggleFlow(flow.id)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#00d166]"></div>
                </label>

                <span className="text-xs font-semibold text-emerald-300 bg-white/10 px-3 py-1 rounded-full">
                  {flow.timeWindow || '12:00 AM – 5:00 AM'}
                </span>
              </div>
            </div>
          </section>
        ))}

      {/* Grid Standard Footer Note */}
      <footer className="pt-2 pb-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#6c7b6c] bg-[#eff4ff] px-3.5 py-1.5 rounded-full border border-gray-100">
          <span className="material-symbols-outlined text-sm text-[#006d32]">
            verified
          </span>
          <span>
            System algorithms are optimized for{' '}
            <button
              onClick={() => {
                const standards = [
                  'Northern European Grid Standards',
                  'Indian National Grid Standards (CERC)',
                  'UK National Grid Standards',
                  'North American Grid (CAISO/ERCOT)',
                ];
                const currentIndex = standards.indexOf(gridStandard);
                const nextStandard =
                  standards[(currentIndex + 1) % standards.length];
                onSelectGridStandard(nextStandard);
              }}
              className="text-[#006d32] font-semibold underline hover:opacity-80 focus:outline-none"
              title="Click to cycle grid standard"
            >
              {gridStandard}
            </button>
          </span>
        </div>
      </footer>
    </div>
  );
};
