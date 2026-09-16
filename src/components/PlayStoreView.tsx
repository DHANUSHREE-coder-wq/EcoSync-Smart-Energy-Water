import React, { useState } from 'react';
import { TabType } from '../types';
import { PLAY_STORE_APP_ICON } from '../data/mockData';

interface PlayStoreViewProps {
  onNavigateTab: (tab: TabType) => void;
}

export const PlayStoreView: React.FC<PlayStoreViewProps> = ({ onNavigateTab }) => {
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'installed'>('idle');
  const [helpfulVotes, setHelpfulVotes] = useState(184);
  const [hasVoted, setHasVoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleInstallClick = () => {
    if (installState === 'idle') {
      setInstallState('installing');
      setTimeout(() => {
        setInstallState('installed');
      }, 1200);
    } else if (installState === 'installed') {
      onNavigateTab('dashboard');
    }
  };

  const handleVote = () => {
    if (!hasVoted) {
      setHelpfulVotes((v) => v + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-white text-[#202124] font-roboto min-h-screen pb-16 animate-in fade-in duration-200">
      {/* Official Google Play Store TopBar */}
      <header className="sticky top-0 z-30 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('dashboard')}
            aria-label="Back to App"
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-gray-500 font-sans hidden sm:inline">Launch App</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <button aria-label="Search" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button aria-label="Voice Search" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </button>
          <button aria-label="More options" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="space-y-6 pt-3">
        {/* App Identity Header */}
        <section className="px-5 pt-3 pb-1">
          <div className="flex gap-4 items-start">
            {/* App Icon */}
            <div className="w-20 h-20 shrink-0 shadow-md rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-gray-100">
              <img
                src={PLAY_STORE_APP_ICON}
                alt="EcoSync App Icon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* App Title and Developer Details */}
            <div className="flex flex-col justify-center pt-0.5">
              <h1 className="text-xl font-medium tracking-tight text-gray-900 leading-tight">
                EcoSync: Smart Energy & Water
              </h1>
              <a
                href="#developer"
                className="text-sm font-medium text-[#01875f] hover:underline mt-1 inline-block"
              >
                Veridian Labs • House & Home
              </a>
              <p className="text-xs text-[#5f6368] mt-1 font-normal">
                Contains ads • In-app purchases
              </p>
            </div>
          </div>
        </section>

        {/* Play Store Metrics Bar */}
        <section className="px-4 py-2 border-y border-gray-100">
          <div className="flex items-center justify-between text-center overflow-x-auto no-scrollbar py-1">
            {/* Rating Column */}
            <div className="flex flex-col items-center flex-1 min-w-[70px]">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900">4.8</span>
                <svg className="w-3.5 h-3.5 text-gray-900 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-[11px] text-[#5f6368] mt-0.5">12K reviews</span>
            </div>

            <div className="h-6 w-px bg-gray-200 shrink-0"></div>

            {/* Download Size Column */}
            <div className="flex flex-col items-center flex-1 min-w-[70px]">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] text-[#5f6368] mt-1">24 MB</span>
            </div>

            <div className="h-6 w-px bg-gray-200 shrink-0"></div>

            {/* Content Rating Column */}
            <div className="flex flex-col items-center flex-1 min-w-[70px]">
              <div className="border border-gray-800 rounded px-1.5 py-0.5 text-[10px] font-bold leading-none">
                3+
              </div>
              <span className="text-[11px] text-[#5f6368] mt-1">Rated for 3+</span>
            </div>

            <div className="h-6 w-px bg-gray-200 shrink-0"></div>

            {/* Downloads Column */}
            <div className="flex flex-col items-center flex-1 min-w-[70px]">
              <span className="text-sm font-semibold text-gray-900">500K+</span>
              <span className="text-[11px] text-[#5f6368] mt-0.5">Downloads</span>
            </div>

            <div className="h-6 w-px bg-gray-200 shrink-0"></div>

            {/* Editor/Green Badge */}
            <div className="flex flex-col items-center flex-1 min-w-[75px]">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800">
                🌱 Eco Choice
              </span>
              <span className="text-[11px] text-[#5f6368] mt-1">Certified</span>
            </div>
          </div>
        </section>

        {/* Primary Actions: Install & Bookmark */}
        <section className="px-5">
          <div className="flex items-center gap-3">
            <button
              onClick={handleInstallClick}
              className={`flex-1 font-medium py-2.5 px-6 rounded-full text-center text-sm shadow-xs transition-all focus:outline-none ${
                installState === 'installed'
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                  : 'bg-[#01875f] hover:bg-[#017351] text-white'
              }`}
            >
              {installState === 'idle'
                ? 'Install'
                : installState === 'installing'
                ? 'Installing...'
                : 'Open EcoSync'}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              aria-label="Add to wishlist"
              className={`p-2.5 rounded-full border transition-colors ${
                bookmarked
                  ? 'bg-emerald-50 border-[#01875f] text-[#01875f]'
                  : 'border-gray-300 text-[#01875f] hover:bg-emerald-50'
              }`}
            >
              <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Share Button */}
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              aria-label="Share application"
              className="p-2.5 rounded-full border border-gray-300 text-[#01875f] hover:bg-emerald-50 transition-colors"
              title="Copy share link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3.5 text-xs text-[#5f6368]">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
            </svg>
            <span>This app is available for all of your devices</span>
          </div>
        </section>

        {/* Screenshots Carousel */}
        <section className="mt-2">
          <div className="flex items-center justify-between px-5 mb-2.5">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              App Previews
            </h2>
            <span className="text-xs text-[#01875f] font-medium">3 Feature Screens</span>
          </div>

          {/* Interactive Screen Previews Container */}
          <div className="flex gap-4 overflow-x-auto px-5 pb-3 no-scrollbar snap-x snap-mandatory">
            {/* Screen 1: Main Dashboard Preview */}
            <div
              onClick={() => onNavigateTab('dashboard')}
              className="shrink-0 w-64 snap-center cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-[#f4f7fb] shadow-sm flex flex-col h-[460px] group-hover:border-emerald-500 transition-colors">
                <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-700">Live Dashboard</span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                    Real-time
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-1 justify-between font-sans">
                  {/* Radial Dial Simulation */}
                  <div className="bg-white rounded-xl p-3 shadow-xs flex flex-col items-center">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" fill="none" r="42" stroke="#e2e8f0" strokeWidth="8" />
                        <circle cx="50" cy="50" fill="none" r="42" stroke="#00D166" strokeDasharray="264" strokeDashoffset="65" strokeLinecap="round" strokeWidth="8" />
                        <circle cx="50" cy="50" fill="none" r="32" stroke="#0284c7" strokeDasharray="200" strokeDashoffset="50" strokeLinecap="round" strokeWidth="6" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-lg font-bold font-headline text-gray-900">12.4</span>
                        <span className="text-[8px] uppercase tracking-wider text-gray-400 font-semibold">kWh Today</span>
                        <span className="text-[10px] font-bold text-sky-600 mt-0.5">💧 240L</span>
                      </div>
                    </div>

                    <div className="flex justify-between w-full mt-2 pt-2 border-t border-gray-100 text-center">
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-medium">Efficiency</span>
                        <span className="text-xs font-bold text-emerald-600">88% ↗</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-medium">Status</span>
                        <span className="text-xs font-bold text-gray-800">Optimal</span>
                      </div>
                    </div>
                  </div>

                  {/* Appliance Card */}
                  <div className="bg-white rounded-xl p-3 shadow-xs">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-700 flex items-center justify-center text-[10px]">❄️</span>
                        <span className="text-xs font-bold text-gray-800">HVAC Cooling</span>
                      </div>
                      <span className="w-7 h-4 bg-emerald-500 rounded-full flex items-center justify-end px-0.5">
                        <span className="w-3 h-3 bg-white rounded-full"></span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div className="bg-emerald-500 h-full w-2/3"></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                      <span>Current Draw</span>
                      <span className="font-bold text-gray-700">1.2 kW</span>
                    </div>
                  </div>

                  {/* Banner */}
                  <div className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-xl p-2.5">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-bold block">
                      Peak Saving Window
                    </span>
                    <p className="text-[10px] text-emerald-100 leading-tight mt-0.5">
                      Rates drop between 11 PM & 5 AM.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs font-medium text-center text-gray-700 mt-2">
                Real-time Energy & Water Monitor →
              </p>
            </div>

            {/* Screen 2: Usage & Savings Preview */}
            <div
              onClick={() => onNavigateTab('usage')}
              className="shrink-0 w-64 snap-center cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-[#f4f7fb] shadow-sm flex flex-col h-[460px] group-hover:border-emerald-500 transition-colors">
                <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-700">Analytics & Savings</span>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                    ₹ INR Tracking
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-1 justify-between font-sans">
                  {/* Big INR Green Savings Box */}
                  <div className="bg-emerald-800 text-white rounded-xl p-3 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-emerald-200">⚡ Month-to-date</span>
                      <span className="text-emerald-300 text-xs">↗ +12%</span>
                    </div>
                    <div className="text-2xl font-bold font-headline tracking-tight text-white mt-1">
                      -₹3,500
                    </div>
                    <div className="text-[10px] text-emerald-200 mt-0.5">
                      Estimated bill savings this month
                    </div>
                  </div>

                  {/* 7-Day Chart Simulation */}
                  <div className="bg-white rounded-xl p-3 shadow-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold text-gray-800">7-Day Trends</span>
                      <div className="flex gap-2 text-[8px] text-gray-500">
                        <span className="flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span> kWh
                        </span>
                        <span className="flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block"></span> Liters
                        </span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between h-20 pt-2 pb-1 border-b border-gray-100">
                      <div className="flex gap-0.5 items-end"><div className="w-1.5 bg-emerald-200 h-8 rounded-t"></div><div className="w-1.5 bg-sky-200 h-11 rounded-t"></div></div>
                      <div className="flex gap-0.5 items-end"><div className="w-1.5 bg-emerald-200 h-10 rounded-t"></div><div className="w-1.5 bg-sky-200 h-8 rounded-t"></div></div>
                      <div className="flex gap-0.5 items-end"><div className="w-1.5 bg-emerald-300 h-12 rounded-t"></div><div className="w-1.5 bg-sky-300 h-14 rounded-t"></div></div>
                      <div className="flex gap-0.5 items-end"><div className="w-1.5 bg-emerald-700 h-16 rounded-t"></div><div className="w-1.5 bg-sky-600 h-10 rounded-t"></div></div>
                      <div className="flex gap-0.5 items-end"><div className="w-1.5 bg-emerald-200 h-9 rounded-t"></div><div className="w-1.5 bg-sky-200 h-11 rounded-t"></div></div>
                      <div className="flex gap-0.5 items-end"><div className="w-1.5 bg-emerald-200 h-7 rounded-t"></div><div className="w-1.5 bg-sky-200 h-8 rounded-t"></div></div>
                      <div className="flex gap-0.5 items-end"><div className="w-1.5 bg-emerald-300 h-11 rounded-t"></div><div className="w-1.5 bg-sky-200 h-12 rounded-t"></div></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-400 mt-1 font-mono">
                      <span>M</span><span>T</span><span>W</span><span className="text-emerald-700 font-bold">T</span><span>F</span><span>S</span><span>S</span>
                    </div>
                  </div>

                  {/* Top Consumer */}
                  <div className="bg-white rounded-xl p-2.5 shadow-xs flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-gray-800">HVAC System</div>
                      <div className="text-[9px] text-red-500 font-medium">+4% vs last week</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-900">
                        84.2 <span className="text-[9px] font-normal text-gray-400">kWh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs font-medium text-center text-gray-700 mt-2">
                Track Utility Savings in ₹ INR →
              </p>
            </div>

            {/* Screen 3: Automations Preview */}
            <div
              onClick={() => onNavigateTab('automations')}
              className="shrink-0 w-64 snap-center cursor-pointer group"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-[#f4f7fb] shadow-sm flex flex-col h-[460px] group-hover:border-emerald-500 transition-colors">
                <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-700">Smart Automations</span>
                  <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                    7 Active
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-1 justify-between font-sans">
                  {/* Flow Card */}
                  <div className="bg-white rounded-xl p-3 shadow-xs border-l-4 border-emerald-500">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-gray-900 leading-snug">
                        Peak Hours<br />Eco Mode
                      </span>
                      <span className="w-7 h-4 bg-emerald-500 rounded-full flex items-center justify-end px-0.5">
                        <span className="w-3 h-3 bg-white rounded-full"></span>
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Dims idle loads and shifts HVAC during surcharge spikes.
                    </p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 text-[10px]">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        -15% kWh
                      </span>
                      <span className="text-gray-400">12 devices</span>
                    </div>
                  </div>

                  {/* Sprinkler Card */}
                  <div className="bg-white rounded-xl p-3 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-900">Smart Sprinkler</span>
                      <span className="w-7 h-4 bg-sky-600 rounded-full flex items-center justify-end px-0.5">
                        <span className="w-3 h-3 bg-white rounded-full"></span>
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Pauses schedule when rain probability is above 60%.
                    </p>
                    <div className="text-[9px] text-sky-600 font-medium mt-1">
                      🌧️ 80% Rain Chance • Idle
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-xl p-2 text-center shadow-xs">
                      <span className="text-[9px] text-gray-400 block font-medium">Daily Savings</span>
                      <span className="text-xs font-bold text-gray-800">₹350</span>
                    </div>
                    <div className="bg-white rounded-xl p-2 text-center shadow-xs">
                      <span className="text-[9px] text-gray-400 block font-medium">CO₂ Offset</span>
                      <span className="text-xs font-bold text-gray-800">12.4 kg</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs font-medium text-center text-gray-700 mt-2">
                Automated Tariff Scheduling →
              </p>
            </div>
          </div>
        </section>

        {/* About this app */}
        <section className="px-5 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              About this app
            </h2>
            <button aria-label="Read full description" className="text-gray-600 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mt-2.5">
            Take control of your household utility costs. EcoSync monitors power and
            water draw in real time, automates smart appliances during off-peak tariff
            hours, and tracks monthly savings in ₹ INR.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700 bg-gray-50">
              #1 Top Free in House & Home
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700">
              Smart Home
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700">
              Energy Monitor
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700">
              Eco Friendly
            </span>
          </div>
        </section>

        {/* Data safety */}
        <section className="px-5 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              Data safety
            </h2>
            <button aria-label="View data safety details" className="text-gray-600 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="text-xs text-[#5f6368] leading-relaxed mb-3.5">
            Safety starts with understanding how developers collect and share your data.
            Data privacy and security practices may vary based on your use, region, and
            age.
          </p>

          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/70 space-y-3.5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">
                  No data shared with third parties
                </h4>
                <p className="text-[11px] text-[#5f6368] mt-0.5">
                  The developer states that this app doesn't share user data with other companies or organizations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">
                  Data is encrypted in transit
                </h4>
                <p className="text-[11px] text-[#5f6368] mt-0.5">
                  Your energy & consumption metrics are transferred over a secure SSL/TLS connection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">
                  You can request data deletion
                </h4>
                <p className="text-[11px] text-[#5f6368] mt-0.5">
                  The developer provides a way for you to request that your utility sensor data be erased.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings and Reviews */}
        <section className="px-5 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              Ratings and reviews
            </h2>
            <button className="text-[#01875f] text-sm font-medium">See all</button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-light text-gray-900 font-headline">4.8</span>
              <div className="flex text-amber-500 mt-1 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
              </div>
              <span className="text-xs text-[#5f6368] mt-1">12,482 ratings</span>
            </div>

            <div className="flex-1 space-y-1.5 text-xs text-[#5f6368]">
              <div className="flex items-center gap-2">
                <span className="w-2 font-medium text-right">5</span>
                <div className="bg-[#e8eaed] rounded-full flex-1 h-2 overflow-hidden">
                  <div className="bg-[#01875f] h-full w-[82%] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 font-medium text-right">4</span>
                <div className="bg-[#e8eaed] rounded-full flex-1 h-2 overflow-hidden">
                  <div className="bg-[#01875f] h-full w-[12%] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 font-medium text-right">3</span>
                <div className="bg-[#e8eaed] rounded-full flex-1 h-2 overflow-hidden">
                  <div className="bg-[#01875f] h-full w-[4%] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 font-medium text-right">2</span>
                <div className="bg-[#e8eaed] rounded-full flex-1 h-2 overflow-hidden">
                  <div className="bg-[#01875f] h-full w-[1%] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 font-medium text-right">1</span>
                <div className="bg-[#e8eaed] rounded-full flex-1 h-2 overflow-hidden">
                  <div className="bg-[#01875f] h-full w-[1%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Featured Review */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  AK
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-900 block">
                    Arjun Kapoor
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500 text-[10px]">★★★★★</div>
                    <span className="text-[10px] text-gray-400">October 14, 2024</span>
                  </div>
                </div>
              </div>
              <button aria-label="Review options" className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mt-2.5">
              The smart tariff synchronization is unbelievable. Linked it to our heat pump
              and EV charger, and our power bill dropped by nearly ₹3,500 in the very
              first month. Water leakage detection is an awesome bonus.
            </p>

            <div className="flex items-center gap-3 mt-3 text-xs text-[#5f6368]">
              <span>Was this review helpful?</span>
              <button
                onClick={handleVote}
                className={`px-3 py-1 rounded-full border text-[11px] font-medium transition-colors ${
                  hasVoted
                    ? 'bg-emerald-50 border-[#01875f] text-[#01875f]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Yes ({helpfulVotes})
              </button>
              <button className="px-3 py-1 rounded-full border border-gray-200 text-gray-700 text-[11px] font-medium hover:bg-gray-50">
                No
              </button>
            </div>
          </div>
        </section>

        {/* Developer Contact */}
        <section
          id="developer"
          className="px-5 border-t border-gray-100 pt-5 text-xs text-[#5f6368] space-y-2.5"
        >
          <h3 className="text-sm font-semibold text-gray-900">Developer contact</h3>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              Website:{' '}
              <a href="#website" className="text-[#01875f] underline">
                ecosync.veridianlabs.io
              </a>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Support: support@veridianlabs.io</span>
          </div>

          <p className="text-[11px] text-gray-400 pt-2">
            © 2024 Veridian Labs Inc. Google Play and the Google Play logo are
            trademarks of Google LLC.
          </p>
        </section>
      </main>
    </div>
  );
};
