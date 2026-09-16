import React, { useState } from 'react';
import { Appliance, AutomationFlow } from '../types';

// 1. Schedule EV Charge Modal
interface ScheduleEVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSchedule: (start: string, end: string, targetCharge: number) => void;
  currentEvDraw: number;
}

export const ScheduleEVModal: React.FC<ScheduleEVModalProps> = ({
  isOpen,
  onClose,
  onConfirmSchedule,
  currentEvDraw,
}) => {
  const [startTime, setStartTime] = useState('23:00');
  const [endTime, setEndTime] = useState('05:00');
  const [targetCharge, setTargetCharge] = useState(85);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#006d32]">
            <span className="material-symbols-outlined text-2xl">ev_station</span>
            <h3 className="font-headline text-xl font-bold text-[#0b1c30]">
              Schedule EV Charging
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#e3f9ed]/50 border border-[#bfead0] text-xs space-y-1">
          <span className="font-bold text-[#006d32] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">savings</span>
            Peak Saving Window: 11:00 PM – 5:00 AM
          </span>
          <p className="text-gray-600 leading-relaxed">
            Charging during this off-peak tariff window saves ₹5.70 per kWh compared to peak rates.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-headline font-bold text-sm text-[#0b1c30]"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-headline font-bold text-sm text-[#0b1c30]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="font-semibold text-gray-700">Target Battery Level</label>
              <span className="font-bold text-[#006d32] font-headline">
                {targetCharge}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={targetCharge}
              onChange={(e) => setTargetCharge(parseInt(e.target.value, 10))}
              className="w-full accent-[#006d32] cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center text-[11px] text-gray-500">
            <span>Charger Capacity: <strong>{currentEvDraw || 7.4} kW (Level 2)</strong></span>
            <span>Est. Duration: <strong>4h 15m</strong></span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirmSchedule(startTime, endTime, targetCharge);
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#006d32] text-white font-semibold text-xs hover:bg-[#005224] shadow-xs"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Water Diagnostic Modal
interface WaterDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAnomaly: boolean;
  onResolveAnomaly: () => void;
}

export const WaterDiagnosticModal: React.FC<WaterDiagnosticModalProps> = ({
  isOpen,
  onClose,
  isAnomaly,
  onResolveAnomaly,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0059bb]">
            <span className="material-symbols-outlined text-2xl">water_drop</span>
            <h3 className="font-headline text-xl font-bold text-[#0b1c30]">
              Water Main Diagnostic
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isAnomaly ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <span className="material-symbols-outlined text-amber-600">warning</span>
              <span>Potential Micro-Leak Detected</span>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Continuous 0.8 L/m flow detected between 3:00 AM and 4:30 AM when all appliances
              were idle. Check garden spigots or toilet flapper valve.
            </p>
            <button
              onClick={onResolveAnomaly}
              className="mt-2 px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold text-xs hover:bg-amber-700"
            >
              Mark As Inspected & Cleared
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#eff4ff] border border-[#d3e4fe] space-y-2">
            <div className="flex items-center gap-2 text-[#0059bb] font-bold text-sm">
              <span className="material-symbols-outlined text-emerald-600">verified</span>
              <span>All Acoustic Sensors Clear</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Main shutoff valve pressure: <strong>4.2 bar (Normal)</strong>. Zero nocturnal creep.
              Acoustic line test completed at 06:00 AM.
            </p>
          </div>
        )}

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center">
            <span className="text-gray-600">Ultrasonic Flow Meter</span>
            <span className="font-bold text-gray-900">0.00 L/min</span>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center">
            <span className="text-gray-600">Backflow Preventer</span>
            <span className="font-bold text-emerald-700">Healthy</span>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 flex justify-between items-center">
            <span className="text-gray-600">Daily Water Allowance</span>
            <span className="font-bold text-gray-900">240L / 450L (53%)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#0059bb] text-white font-semibold text-xs hover:bg-[#004eab]"
        >
          Close Diagnostic
        </button>
      </div>
    </div>
  );
};

// 3. New Automation Flow Modal
interface NewFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFlow: (flow: AutomationFlow) => void;
}

export const NewFlowModal: React.FC<NewFlowModalProps> = ({
  isOpen,
  onClose,
  onAddFlow,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'peak' | 'water' | 'ev' | 'solar'>('peak');
  const [influenceInfo, setInfluenceInfo] = useState('Influences 4 devices');
  const [benefitInfo, setBenefitInfo] = useState('-10% kWh');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddFlow({
      id: 'custom-' + Date.now(),
      title,
      description: description || 'Automated smart optimization rule created by user.',
      enabled: true,
      category,
      influenceInfo,
      benefitInfo,
      secondaryStatus: 'Active',
      isDarkCard: category === 'ev',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#006d32]">
            <span className="material-symbols-outlined text-2xl">add_circle</span>
            <h3 className="font-headline text-xl font-bold text-[#0b1c30]">
              Create New Flow
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              Flow Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Solar Heat Pump Pre-heat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#0b1c30]"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['peak', 'water', 'ev'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-xl border text-center font-medium capitalize ${
                    category === cat
                      ? 'border-[#006d32] bg-[#00d166]/10 text-[#006d32]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              Description / Trigger Logic
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Automatically power down pool pump during 5 PM – 9 PM tariff peaks."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#0b1c30]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Influenced Devices
              </label>
              <input
                type="text"
                value={influenceInfo}
                onChange={(e) => setInfluenceInfo(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Estimated Benefit
              </label>
              <input
                type="text"
                value={benefitInfo}
                onChange={(e) => setBenefitInfo(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#04622b] text-white font-semibold text-xs hover:bg-[#035123] shadow-xs"
            >
              Activate Flow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. View All Appliances Modal
interface AllAppliancesModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
}

export const AllAppliancesModal: React.FC<AllAppliancesModalProps> = ({
  isOpen,
  onClose,
  appliances,
  onToggleAppliance,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-xl font-bold text-[#0b1c30]">
              All Connected Appliances
            </h3>
            <p className="text-xs text-gray-500">
              {appliances.length} smart sub-meters linked to EcoSync Hub
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {appliances.map((app) => (
            <div
              key={app.id}
              className="p-3.5 rounded-2xl bg-[#eff4ff] border border-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    app.color === 'secondary'
                      ? 'bg-[#0070ea]/10 text-[#0059bb]'
                      : 'bg-[#00d166]/20 text-[#006d32]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{app.icon}</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-[#0b1c30]">
                    {app.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {app.isOn ? app.metricValue : 'Standby / Idle'}
                  </span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={app.isOn}
                  onChange={() => onToggleAppliance(app.id)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    app.color === 'secondary'
                      ? 'peer-checked:bg-[#0059bb]'
                      : 'peer-checked:bg-[#006d32]'
                  }`}
                ></div>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#0b1c30] text-white font-semibold text-xs hover:bg-[#1a2b3c]"
        >
          Done
        </button>
      </div>
    </div>
  );
};
