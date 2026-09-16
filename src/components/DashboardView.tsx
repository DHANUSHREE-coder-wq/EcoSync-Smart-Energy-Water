import React from 'react';
import { Appliance } from '../types';

interface DashboardViewProps {
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
  onOpenScheduleModal: () => void;
  onOpenWaterDiagnostic: () => void;
  onOpenAllAppliancesModal: () => void;
  todayEnergy: number;
  todayWater: number;
  efficiencyPercent: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  appliances,
  onToggleAppliance,
  onOpenScheduleModal,
  onOpenWaterDiagnostic,
  onOpenAllAppliancesModal,
  todayEnergy,
  todayWater,
  efficiencyPercent,
}) => {
  const activeCount = appliances.filter((a) => a.isOn).length;

  // Outer ring radius: 45 -> circumference 282.7
  // Inner ring radius: 35 -> circumference 220
  const energyDashoffset = Math.max(
    0,
    Math.min(282.7, 282.7 - (todayEnergy / 18) * 282.7)
  );
  const waterDashoffset = Math.max(
    0,
    Math.min(220, 220 - (todayWater / 400) * 220)
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Centerpiece: Luminous Engine Dial */}
      <section className="flex flex-col items-center pt-2">
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-[#006d32]/10 blur-3xl pointer-events-none"></div>

          {/* Outer Ring: Energy (primary green) */}
          <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-[#eff4ff]"
              cx="50"
              cy="50"
              fill="transparent"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
            />
            <circle
              className="text-[#00d166] transition-all duration-700 ease-out"
              cx="50"
              cy="50"
              fill="transparent"
              r="45"
              stroke="currentColor"
              strokeDasharray="282.7"
              strokeDashoffset={energyDashoffset}
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>

          {/* Inner Ring: Water (secondary blue) */}
          <svg className="absolute w-3/4 h-3/4 -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-[#dce9ff]"
              cx="50"
              cy="50"
              fill="transparent"
              r="35"
              stroke="currentColor"
              strokeWidth="7"
            />
            <circle
              className="text-[#0059bb] transition-all duration-700 ease-out"
              cx="50"
              cy="50"
              fill="transparent"
              r="35"
              stroke="currentColor"
              strokeDasharray="220"
              strokeDashoffset={waterDashoffset}
              strokeLinecap="round"
              strokeWidth="7"
            />
          </svg>

          {/* Central Content */}
          <div className="z-10 text-center select-none">
            <div className="font-headline text-5xl md:text-6xl font-bold text-[#0b1c30] tracking-tight">
              {todayEnergy.toFixed(1)}
            </div>
            <div className="text-xs font-semibold text-[#6c7b6c] uppercase tracking-widest mt-1">
              KWH TODAY
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[#0059bb] font-semibold">
              <span className="material-symbols-outlined text-base">water_drop</span>
              <span className="font-headline text-xl font-bold">{todayWater}L</span>
            </div>
          </div>
        </div>

        {/* Stats Metadata Asymmetry */}
        <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-sm px-2">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-tight text-[#6c7b6c] block">
              Energy Efficiency
            </span>
            <div className="flex items-center gap-1">
              <span className="font-headline text-2xl font-bold text-[#006d32]">
                {efficiencyPercent}%
              </span>
              <span className="material-symbols-outlined text-[#006d32] text-sm">
                trending_up
              </span>
            </div>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-[11px] font-bold uppercase tracking-tight text-[#6c7b6c] block">
              Resource Health
            </span>
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="font-headline text-2xl font-bold text-[#0b1c30]">
                Optimal
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00d166] inline-block mb-1"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Appliances Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between px-1">
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-[#0b1c30]">
              Active Appliances
            </h2>
            <p className="text-sm text-[#6c7b6c] font-normal">
              {activeCount} {activeCount === 1 ? 'system' : 'systems'} drawing power
            </p>
          </div>
          <button
            onClick={onOpenAllAppliancesModal}
            className="text-[#006d32] font-semibold text-sm hover:underline focus:outline-none"
          >
            View All
          </button>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 snap-x -mx-1 px-1">
          {appliances.map((appliance) => (
            <div
              key={appliance.id}
              className="snap-start shrink-0 w-64 p-5 rounded-2xl bg-[#eff4ff] border border-gray-100 shadow-xs transition-all hover:bg-[#e5eeff]/80"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-3 rounded-xl flex items-center justify-center ${
                    appliance.color === 'secondary'
                      ? 'bg-[#0070ea]/10 text-[#0059bb]'
                      : 'bg-[#00d166]/20 text-[#006d32]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {appliance.icon}
                  </span>
                </div>

                {/* Switch Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appliance.isOn}
                    onChange={() => onToggleAppliance(appliance.id)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      appliance.color === 'secondary'
                        ? 'peer-checked:bg-[#0059bb]'
                        : 'peer-checked:bg-[#006d32]'
                    }`}
                  ></div>
                </label>
              </div>

              <h3 className="font-headline text-lg font-bold text-[#0b1c30]">
                {appliance.name}
              </h3>

              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6c7b6c]">{appliance.metricLabel}</span>
                  <span className="font-headline font-bold text-[#0b1c30]">
                    {appliance.isOn ? appliance.metricValue : '0.0 kW'}
                  </span>
                </div>
                <div className="w-full bg-[#d3e4fe] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      appliance.color === 'secondary'
                        ? 'bg-[#0059bb]'
                        : 'bg-[#006d32]'
                    }`}
                    style={{
                      width: appliance.isOn ? `${appliance.percentLoad}%` : '0%',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Insights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Peak Saving Window */}
        <div className="md:col-span-2 p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="relative z-10 max-w-sm">
            <h4 className="font-headline text-xl font-bold text-[#0b1c30]">
              Peak Saving Window
            </h4>
            <p className="text-sm text-[#6c7b6c] mt-2 leading-relaxed">
              Lower rates available between 11 PM and 5 AM. Schedule your EV charge now.
            </p>
            <button
              onClick={onOpenScheduleModal}
              className="mt-6 px-6 py-2.5 bg-[#006d32] text-white font-semibold rounded-lg hover:bg-[#005224] transition-all shadow-xs flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Schedule Now</span>
            </button>
          </div>

          {/* Decorative Background Lightning Glyph */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[160px] translate-x-10 translate-y-10 text-[#006d32]">
              bolt
            </span>
          </div>
        </div>

        {/* Water Leak Alert Card */}
        <div
          onClick={onOpenWaterDiagnostic}
          className="p-6 md:p-8 rounded-2xl bg-[#0059bb] text-white flex flex-col justify-between shadow-sm cursor-pointer hover:bg-[#004eab] transition-colors relative overflow-hidden"
          role="button"
          tabIndex={0}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-3xl">water_drop</span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Live Sensor
              </span>
            </div>
            <h4 className="font-headline text-lg font-bold mt-4">Water Leak Alert</h4>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              No abnormal flow detected in the main line today.
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="font-headline text-2xl font-bold">Secure</span>
            <span className="text-xs text-white/90 underline font-medium">Diagnostic →</span>
          </div>
        </div>
      </section>
    </div>
  );
};
