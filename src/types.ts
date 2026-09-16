export type TabType = 'dashboard' | 'usage' | 'automations' | 'settings' | 'store';

export interface Appliance {
  id: string;
  name: string;
  type: 'hvac' | 'ev' | 'sprinkler' | 'dishwasher' | 'heater';
  icon: string;
  metricLabel: string;
  metricValue: string;
  numericDraw: number; // in kW or L/min
  isOn: boolean;
  color: 'primary' | 'secondary' | 'emerald';
  percentLoad: number;
}

export interface AutomationFlow {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  badge?: string;
  category: 'peak' | 'water' | 'ev' | 'solar';
  influenceInfo?: string;
  benefitInfo?: string;
  secondaryStatus?: string;
  timeWindow?: string;
  isDarkCard?: boolean;
}

export interface DayTrend {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  energyKWh: number;
  waterL: number;
  energyHeightPercent: number;
  waterHeightPercent: number;
  isHighlight?: boolean;
}

export interface TopConsumer {
  id: string;
  name: string;
  icon: string;
  amount: string;
  unit: string;
  changeText: string;
  changeType: 'positive' | 'negative' | 'stable';
  barPercent: number;
  theme: 'green' | 'blue';
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  type: 'tariff' | 'savings' | 'eco' | 'water';
  read: boolean;
}
