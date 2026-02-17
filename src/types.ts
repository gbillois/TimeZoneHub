export interface Location {
  id: string;
  name: string;
  timezone: string;
  order: number;
}

export interface Settings {
  use24Hour: boolean;
  sortByDifference: boolean;
  highlightBase: boolean;
  compactRows: boolean;
  baseBadgeLabel: string;
}

export interface CityOption {
  name: string;
  country: string;
  timezone: string;
  continent: string;
}

export type AppView = 'list' | 'add' | 'settings';

export interface AppState {
  locations: Location[];
  baseLocationId: string | null;
  baseDate: Date;
  isLive: boolean;
  settings: Settings;
  editingLocationId: string | null;
  activeView: AppView;
}
