import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'usage' as TabType,
      label: 'Usage',
      icon: 'bar_chart',
    },
    {
      id: 'automations' as TabType,
      label: 'Automations',
      icon: 'settings_input_component',
    },
    {
      id: 'settings' as TabType,
      label: 'Settings',
      icon: 'settings',
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-xl px-6 py-2.5 border-t border-[#0b1c30]/10"
      aria-label="Main Navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-lg focus:outline-none ${
                isActive
                  ? 'text-[#006d32] font-bold'
                  : 'text-[#6c7b6c] hover:text-[#0b1c30]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[23px] transition-transform"
                style={{
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 600"
                    : "'FILL' 0, 'wght' 400",
                }}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] tracking-widest uppercase leading-none">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#006d32] -mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
