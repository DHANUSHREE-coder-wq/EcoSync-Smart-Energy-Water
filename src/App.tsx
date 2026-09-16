import React, { useState } from 'react';
import {
  initialAppliances,
  initialAutomations,
  initialNotifications,
} from './data/mockData';
import { Appliance, AutomationFlow, NotificationItem, TabType } from './types';
import { TopBar } from './components/TopBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardView } from './components/DashboardView';
import { UsageView } from './components/UsageView';
import { AutomationsView } from './components/AutomationsView';
import { PlayStoreView } from './components/PlayStoreView';
import { SettingsView } from './components/SettingsView';
import {
  ScheduleEVModal,
  WaterDiagnosticModal,
  NewFlowModal,
  AllAppliancesModal,
} from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // App Data State
  const [appliances, setAppliances] = useState<Appliance[]>(initialAppliances);
  const [automations, setAutomations] = useState<AutomationFlow[]>(initialAutomations);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Metric states matching the screenshots
  const [todayEnergy, setTodayEnergy] = useState<number>(12.4);
  const [todayWater, setTodayWater] = useState<number>(240);
  const [efficiencyPercent, setEfficiencyPercent] = useState<number>(88);
  const [savingsINR, setSavingsINR] = useState<number>(3500);

  // Grid & Tariff State
  const [gridStandard, setGridStandard] = useState<string>(
    'Northern European Grid Standards'
  );
  const [peakRate, setPeakRate] = useState<number>(9.5);
  const [offPeakRate, setOffPeakRate] = useState<number>(3.8);

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isWaterDiagnosticOpen, setIsWaterDiagnosticOpen] = useState(false);
  const [isNewFlowModalOpen, setIsNewFlowModalOpen] = useState(false);
  const [isAllAppliancesModalOpen, setIsAllAppliancesModalOpen] = useState(false);
  const [isWaterAnomaly, setIsWaterAnomaly] = useState(false);

  // Handlers
  const handleToggleAppliance = (id: string) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const nextState = !app.isOn;
          // Reactively adjust energy or water consumption
          if (app.type === 'ev') {
            setTodayEnergy((e) => Math.max(4, nextState ? e + 2.5 : e - 2.5));
          } else if (app.type === 'hvac') {
            setTodayEnergy((e) => Math.max(4, nextState ? e + 1.2 : e - 1.2));
          } else if (app.type === 'sprinkler') {
            setTodayWater((w) => (nextState ? w + 60 : Math.max(50, w - 60)));
          }
          return { ...app, isOn: nextState };
        }
        return app;
      })
    );
  };

  const handleToggleFlow = (id: string) => {
    setAutomations((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const handleAddFlow = (newFlow: AutomationFlow) => {
    setAutomations((prev) => [newFlow, ...prev]);
    setNotifications((prev) => [
      {
        id: String(Date.now()),
        title: `Automation activated: "${newFlow.title}"`,
        time: 'Just now',
        type: 'eco',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleAutomateTip = () => {
    const tipFlow: AutomationFlow = {
      id: 'tip-dishwasher-shift',
      title: 'Night Dishwasher Shift',
      description: 'Defers dishwashing cycle to 11:00 PM off-peak tariff window.',
      enabled: true,
      category: 'peak',
      influenceInfo: 'Dishwasher Submeter',
      benefitInfo: '+₹1,200/mo saved',
      secondaryStatus: 'Active',
      isDarkCard: false,
    };
    setAutomations((prev) => [tipFlow, ...prev]);
    setSavingsINR((s) => s + 1200);
    setNotifications((prev) => [
      {
        id: String(Date.now()),
        title: 'Smart Optimization Applied: Dishwasher scheduled for 11 PM off-peak.',
        time: 'Just now',
        type: 'tariff',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleConfirmScheduleEV = (
    start: string,
    end: string,
    targetCharge: number
  ) => {
    setAutomations((prev) =>
      prev.map((f) =>
        f.id === 'ev-schedule-flow'
          ? {
              ...f,
              enabled: true,
              timeWindow: `${start} – ${end}`,
              description: `Charges during lowest tariff rates between ${start} and ${end}. Target: ${targetCharge}%.`,
            }
          : f
      )
    );
    setNotifications((prev) => [
      {
        id: String(Date.now()),
        title: `EV Charge Scheduled: ${start} – ${end} (${targetCharge}% target).`,
        time: 'Just now',
        type: 'tariff',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleTriggerWaterAnomaly = () => {
    setIsWaterAnomaly(true);
    setIsWaterDiagnosticOpen(true);
    setNotifications((prev) => [
      {
        id: String(Date.now()),
        title: 'Water Anomaly Alert: 0.8 L/min nocturnal creep on Main Line.',
        time: 'Just now',
        type: 'water',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleResolveWaterAnomaly = () => {
    setIsWaterAnomaly(false);
    setIsWaterDiagnosticOpen(false);
  };

  const handleClearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleResetDefaults = () => {
    setAppliances(initialAppliances);
    setAutomations(initialAutomations);
    setTodayEnergy(12.4);
    setTodayWater(240);
    setEfficiencyPercent(88);
    setSavingsINR(3500);
    setIsWaterAnomaly(false);
  };

  const evAppliance = appliances.find((a) => a.id === 'ev');

  return (
    <div className="min-h-screen bg-[#f0f4f9] text-[#0b1c30] flex flex-col items-center justify-start sm:py-6 selection:bg-[#00d166]/30">
      {/* Outer Mobile Frame Wrapper */}
      <div
        className={`w-full transition-all duration-300 ${
          isPhoneFrame
            ? 'max-w-[440px] sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-[#1a202c] overflow-hidden bg-[#f8f9ff] min-h-screen sm:min-h-[890px] relative'
            : 'max-w-4xl bg-[#f8f9ff] min-h-screen shadow-lg rounded-none sm:rounded-3xl'
        }`}
      >
        {/* Dynamic Mobile Speaker Bar if in phone frame */}
        {isPhoneFrame && (
          <div className="hidden sm:flex justify-center pt-2 pb-1 bg-[#f8f9ff] sticky top-0 z-50">
            <div className="w-20 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        )}

        {/* Play Store View or Main App View */}
        {activeTab === 'store' ? (
          <PlayStoreView onNavigateTab={setActiveTab} />
        ) : (
          <div className="flex flex-col min-h-screen pb-24">
            {/* Top App Bar */}
            <TopBar
              notifications={notifications}
              onClearNotification={handleClearNotification}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              isPhoneFrame={isPhoneFrame}
              onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
            />

            {/* Screen Contents */}
            <main className="flex-1 px-5 pt-4">
              {activeTab === 'dashboard' && (
                <DashboardView
                  appliances={appliances}
                  onToggleAppliance={handleToggleAppliance}
                  onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
                  onOpenWaterDiagnostic={() => setIsWaterDiagnosticOpen(true)}
                  onOpenAllAppliancesModal={() => setIsAllAppliancesModalOpen(true)}
                  todayEnergy={todayEnergy}
                  todayWater={todayWater}
                  efficiencyPercent={efficiencyPercent}
                />
              )}

              {activeTab === 'usage' && (
                <UsageView
                  onAutomateTip={handleAutomateTip}
                  savingsINR={savingsINR}
                />
              )}

              {activeTab === 'automations' && (
                <AutomationsView
                  flows={automations}
                  onToggleFlow={handleToggleFlow}
                  onOpenNewFlowModal={() => setIsNewFlowModalOpen(true)}
                  gridStandard={gridStandard}
                  onSelectGridStandard={setGridStandard}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  gridStandard={gridStandard}
                  onSelectGridStandard={setGridStandard}
                  peakRate={peakRate}
                  onUpdatePeakRate={setPeakRate}
                  offPeakRate={offPeakRate}
                  onUpdateOffPeakRate={setOffPeakRate}
                  todayEnergy={todayEnergy}
                  onUpdateTodayEnergy={setTodayEnergy}
                  todayWater={todayWater}
                  onUpdateTodayWater={setTodayWater}
                  onTriggerWaterAnomaly={handleTriggerWaterAnomaly}
                  onResetDefaults={handleResetDefaults}
                  onNavigateTab={setActiveTab}
                />
              )}
            </main>

            {/* Bottom Nav Bar */}
            <BottomNavBar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
            />
          </div>
        )}

        {/* Interactive Modals */}
        <ScheduleEVModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onConfirmSchedule={handleConfirmScheduleEV}
          currentEvDraw={evAppliance?.numericDraw || 7.4}
        />

        <WaterDiagnosticModal
          isOpen={isWaterDiagnosticOpen}
          onClose={() => setIsWaterDiagnosticOpen(false)}
          isAnomaly={isWaterAnomaly}
          onResolveAnomaly={handleResolveWaterAnomaly}
        />

        <NewFlowModal
          isOpen={isNewFlowModalOpen}
          onClose={() => setIsNewFlowModalOpen(false)}
          onAddFlow={handleAddFlow}
        />

        <AllAppliancesModal
          isOpen={isAllAppliancesModalOpen}
          onClose={() => setIsAllAppliancesModalOpen(false)}
          appliances={appliances}
          onToggleAppliance={handleToggleAppliance}
        />
      </div>
    </div>
  );
}
