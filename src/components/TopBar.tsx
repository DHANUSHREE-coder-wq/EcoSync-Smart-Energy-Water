import React, { useState } from 'react';
import { NotificationItem, TabType } from '../types';
import { PROFILE_AVATAR_URL } from '../data/mockData';

interface TopBarProps {
  notifications: NotificationItem[];
  onClearNotification: (id: string) => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  notifications,
  onClearNotification,
  activeTab,
  onSelectTab,
  isPhoneFrame,
  onTogglePhoneFrame,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 bg-[#f8f9ff]/90 backdrop-blur-md border-b border-[#0b1c30]/5 transition-all">
      {/* Brand & User Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#eff4ff] border border-[#006d32]/20 flex items-center justify-center overflow-hidden shadow-xs transition-transform group-hover:scale-105">
            <img
              src={PROFILE_AVATAR_URL}
              alt="User Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-xl tracking-tight text-[#0b1c30]">
                EcoSync
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00d166] animate-pulse"></span>
            </div>
            <span className="text-[10px] text-[#6c7b6c] font-medium tracking-wide uppercase block -mt-0.5">
              Smart Energy & Water
            </span>
          </div>
        </button>
      </div>

      {/* Right Action Icons & View Mode Toggles */}
      <div className="flex items-center gap-2">
        {/* Play Store Listing Quick Link */}
        <button
          onClick={() => onSelectTab(activeTab === 'store' ? 'dashboard' : 'store')}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
            activeTab === 'store'
              ? 'bg-[#01875f] text-white border-[#01875f]'
              : 'bg-white text-[#01875f] border-[#01875f]/30 hover:bg-[#01875f]/10'
          }`}
          title="Toggle Google Play Store View"
        >
          <span className="material-symbols-outlined text-sm">storefront</span>
          <span className="hidden sm:inline">Play Store</span>
        </button>

        {/* Frame Toggle (Desktop Mode vs Phone Mockup) */}
        <button
          onClick={onTogglePhoneFrame}
          className={`p-2 rounded-full border transition-colors ${
            isPhoneFrame
              ? 'bg-[#e5eeff] text-[#0059bb] border-[#0059bb]/30'
              : 'bg-white text-[#6c7b6c] border-gray-200 hover:bg-gray-100'
          }`}
          title={isPhoneFrame ? 'Expand to Full Width' : 'Fit to Mobile Phone Frame'}
          aria-label="Toggle device frame"
        >
          <span className="material-symbols-outlined text-[19px]">
            {isPhoneFrame ? 'fullscreen' : 'stay_current_portrait'}
          </span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eff4ff] text-[#0b1c30] transition-colors relative focus:outline-none"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline font-bold text-sm text-[#0b1c30]">
                    System Alerts & Tips
                  </span>
                  <span className="text-[10px] font-semibold bg-[#e5eeff] text-[#0059bb] px-2 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-gray-400">
                    No active alerts. Grid running smoothly.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors border border-gray-100 flex items-start gap-2.5 text-left"
                    >
                      <span
                        className={`material-symbols-outlined text-base mt-0.5 ${
                          n.type === 'tariff'
                            ? 'text-[#006d32]'
                            : n.type === 'water'
                            ? 'text-[#0059bb]'
                            : 'text-emerald-600'
                        }`}
                      >
                        {n.type === 'tariff'
                          ? 'bolt'
                          : n.type === 'water'
                          ? 'water_drop'
                          : 'eco'}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs text-[#0b1c30] leading-snug font-medium">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {n.time}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClearNotification(n.id);
                        }}
                        className="text-gray-300 hover:text-gray-500 p-0.5"
                        title="Dismiss"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
