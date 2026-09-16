import React from 'react';
import { TabType } from '../types';

interface SettingsViewProps {
  gridStandard: string;
  onSelectGridStandard: (standard: string) => void;
  peakRate: number;
  onUpdatePeakRate: (rate: number) => void;
  offPeakRate: number;
  onUpdateOffPeakRate: (rate: number) => void;
  todayEnergy: number;
  onUpdateTodayEnergy: (val: number) => void;
  todayWater: number;
  onUpdateTodayWater: (val: number) => void;
  onTriggerWaterAnomaly: () => void;
  onResetDefaults: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  gridStandard,
  onSelectGridStandard,
  peakRate,
  onUpdatePeakRate,
  offPeakRate,
  onUpdateOffPeakRate,
  todayEnergy,
  onUpdateTodayEnergy,
  todayWater,
  onUpdateTodayWater,
  onTriggerWaterAnomaly,
  onResetDefaults,
  onNavigateTab,
}) => {
  const standards = [
    'Northern European Grid Standards',
    'Indian National Grid Standards (CERC)',
    'UK National Grid Standards',
    'North American Grid (CAISO/ERCOT)',
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <section className="space-y-1 pt-2">
        <h1 className="font-headline text-3xl font-bold text-[#0b1c30] tracking-tight">
          System Settings
        </h1>
        <p className="text-sm text-[#6c7b6c]">
          Configure grid standards, dynamic tariffs, and sensor thresholds.
        </p>
      </section>

      {/* Grid Standard Selection */}
      <section className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#0b1c30]">
          <span className="material-symbols-outlined text-xl text-[#006d32]">public</span>
          <h2 className="font-headline text-lg font-bold">Grid Interconnect Standard</h2>
        </div>

        <p className="text-xs text-[#6c7b6c] leading-relaxed">
          Determines frequency tolerance, automated demand response thresholds, and
          dynamic curtailment signals.
        </p>

        <div className="space-y-2">
          {standards.map((std) => (
            <label
              key={std}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                gridStandard === std
                  ? 'border-[#006d32] bg-[#e3f9ed]/30 text-[#0b1c30]'
                  : 'border-gray-100 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="gridStandard"
                  checked={gridStandard === std}
                  onChange={() => onSelectGridStandard(std)}
                  className="w-4 h-4 text-[#006d32] focus:ring-[#006d32]"
                />
                <span className="text-xs font-semibold">{std}</span>
              </div>
              {gridStandard === std && (
                <span className="text-[10px] uppercase font-bold text-[#006d32] bg-[#00d166]/20 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Tariff Rates (in ₹ INR) */}
      <section className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#0b1c30]">
          <span className="material-symbols-outlined text-xl text-[#006d32]">currency_rupee</span>
          <h2 className="font-headline text-lg font-bold">Time-of-Day Electricity Tariff</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#eff4ff] border border-gray-100">
            <span className="text-xs text-[#6c7b6c] font-medium block">
              Peak Rate (5 PM – 11 PM)
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-base font-bold text-[#0b1c30]">₹</span>
              <input
                type="number"
                step="0.1"
                value={peakRate}
                onChange={(e) => onUpdatePeakRate(parseFloat(e.target.value) || 0)}
                className="w-24 px-2.5 py-1 text-sm font-bold font-headline bg-white border border-gray-200 rounded-lg text-[#0b1c30]"
              />
              <span className="text-xs text-gray-500">/ kWh</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#eff4ff] border border-gray-100">
            <span className="text-xs text-[#6c7b6c] font-medium block">
              Off-Peak Rate (11 PM – 5 AM)
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-base font-bold text-[#0b1c30]">₹</span>
              <input
                type="number"
                step="0.1"
                value={offPeakRate}
                onChange={(e) => onUpdateOffPeakRate(parseFloat(e.target.value) || 0)}
                className="w-24 px-2.5 py-1 text-sm font-bold font-headline bg-white border border-gray-200 rounded-lg text-[#0b1c30]"
              />
              <span className="text-xs text-gray-500">/ kWh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Simulation Playground */}
      <section className="p-6 rounded-3xl bg-[#eff4ff] border border-[#d3e4fe] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0b1c30]">
            <span className="material-symbols-outlined text-xl text-[#0059bb]">tune</span>
            <h2 className="font-headline text-lg font-bold">Live Sensor Telemetry Simulation</h2>
          </div>
          <button
            onClick={onResetDefaults}
            className="text-xs font-semibold text-[#0059bb] hover:underline"
          >
            Reset Defaults
          </button>
        </div>

        <p className="text-xs text-[#3c4a3d]">
          Adjust simulated meter telemetry to observe real-time recalculation of dials,
          costs, and automation thresholds.
        </p>

        {/* Energy Slider */}
        <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-gray-100">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-gray-700">Simulate Today Energy Draw</span>
            <span className="font-bold text-[#006d32] font-headline">
              {todayEnergy.toFixed(1)} kWh
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="25"
            step="0.2"
            value={todayEnergy}
            onChange={(e) => onUpdateTodayEnergy(parseFloat(e.target.value))}
            className="w-full accent-[#006d32] cursor-pointer"
          />
        </div>

        {/* Water Slider */}
        <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-gray-100">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-gray-700">Simulate Today Water Draw</span>
            <span className="font-bold text-[#0059bb] font-headline">
              {todayWater} Liters
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="600"
            step="10"
            value={todayWater}
            onChange={(e) => onUpdateTodayWater(parseInt(e.target.value, 10))}
            className="w-full accent-[#0059bb] cursor-pointer"
          />
        </div>

        {/* Water Anomaly Test */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onTriggerWaterAnomaly}
            className="flex-1 py-2.5 px-4 bg-white border border-[#0059bb]/40 text-[#0059bb] hover:bg-[#0059bb]/10 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">emergency_home</span>
            <span>Simulate Micro-Leak Anomaly</span>
          </button>

          <button
            onClick={() => onNavigateTab('store')}
            className="flex-1 py-2.5 px-4 bg-[#01875f] text-white hover:bg-[#017351] font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            <span>View Google Play Listing</span>
          </button>
        </div>
      </section>

      {/* Hardware / Firmware Info */}
      <section className="p-5 rounded-2xl bg-white border border-gray-100 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <span className="font-bold text-gray-800">Veridian Smart Gateway v4.2</span>
          <p className="mt-0.5 text-[11px]">Hardware MAC: 7E:44:A1:90:B3:01</p>
        </div>
        <div className="sm:text-right">
          <span className="text-emerald-700 font-semibold">● Connected to Luminous Cloud</span>
          <p className="mt-0.5 text-[11px]">Firmware: 2026.08.1-opt</p>
        </div>
      </section>
    </div>
  );
};
