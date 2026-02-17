import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Location, Settings } from './types';
import { DEFAULT_LOCATIONS, DEFAULT_SETTINGS } from './data/cities';
import { roundToHour, createDateFromLocalTime, getUTCOffsetMinutes } from './utils/timeUtils';
import { LocationCard } from './components/LocationCard';
import { TimeEditor } from './components/TimeEditor';
import { AddLocation } from './components/AddLocation';
import { SettingsPanel } from './components/SettingsPanel';

const STORAGE_KEY = 'world-time-hub-v1';

interface PersistedState {
  locations: Location[];
  baseLocationId: string | null;
  settings: Settings;
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {/* ignore */}
  return {
    locations: DEFAULT_LOCATIONS,
    baseLocationId: DEFAULT_LOCATIONS[0].id,
    settings: DEFAULT_SETTINGS,
  };
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {/* ignore */}
}

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function getSortedLocations(locations: Location[], settings: Settings, baseLocationId: string | null, baseDate: Date): Location[] {
  if (!settings.sortByDifference) {
    return [...locations].sort((a, b) => a.order - b.order);
  }
  const baseLoc = locations.find((l) => l.id === baseLocationId);
  const baseOffset = baseLoc ? getUTCOffsetMinutes(baseLoc.timezone, baseDate) : 0;
  return [...locations].sort((a, b) => {
    const aOff = getUTCOffsetMinutes(a.timezone, baseDate) - baseOffset;
    const bOff = getUTCOffsetMinutes(b.timezone, baseDate) - baseOffset;
    return aOff - bOff;
  });
}

export default function App() {
  const persisted = loadState();
  const [locations, setLocations] = useState<Location[]>(persisted.locations);
  const [baseLocationId, setBaseLocationId] = useState<string | null>(persisted.baseLocationId);
  const [baseDate, setBaseDate] = useState<Date>(roundToHour(new Date()));
  const [isLive, setIsLive] = useState(true);
  const [settings, setSettings] = useState<Settings>(persisted.settings);
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const liveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Persist state whenever it changes
  useEffect(() => {
    saveState({ locations, baseLocationId, settings });
  }, [locations, baseLocationId, settings]);

  // Live clock
  useEffect(() => {
    if (liveIntervalRef.current) clearInterval(liveIntervalRef.current);
    if (isLive) {
      setBaseDate(roundToHour(new Date()));
      liveIntervalRef.current = setInterval(() => {
        setBaseDate(roundToHour(new Date()));
      }, 10000); // update every 10 seconds (rounded to hour anyway)
    }
    return () => {
      if (liveIntervalRef.current) clearInterval(liveIntervalRef.current);
    };
  }, [isLive]);

  // --- Actions ---

  const handleEditTime = useCallback((locationId: string) => {
    setEditingLocationId(locationId);
  }, []);

  const handleSaveTime = useCallback((hours: number, minutes: number, timezone: string) => {
    const newDate = createDateFromLocalTime(hours, minutes, timezone, baseDate);
    setBaseDate(newDate);
    // Find location by timezone and set it as base
    const loc = locations.find((l) => l.timezone === timezone);
    if (loc) setBaseLocationId(loc.id);
    setIsLive(false);
    setEditingLocationId(null);
  }, [baseDate, locations]);

  const handleAddLocation = useCallback((name: string, timezone: string) => {
    const maxOrder = locations.reduce((m, l) => Math.max(m, l.order), -1);
    const newLoc: Location = {
      id: genId(),
      name,
      timezone,
      order: maxOrder + 1,
    };
    setLocations((prev) => [...prev, newLoc]);
    setShowAdd(false);
  }, [locations]);

  const handleDeleteLocation = useCallback((id: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
    // If deleted location was the base, pick the first remaining
    setBaseLocationId((prev) => {
      if (prev !== id) return prev;
      const remaining = locations.filter((l) => l.id !== id);
      return remaining.length > 0 ? remaining[0].id : null;
    });
  }, [locations]);

  const handleMoveUp = useCallback((id: string) => {
    const sorted = [...locations].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((l) => l.id === id);
    if (idx <= 0) return;
    const updated = sorted.map((l, i) => {
      if (i === idx - 1) return { ...l, order: sorted[idx].order };
      if (i === idx) return { ...l, order: sorted[idx - 1].order };
      return l;
    });
    setLocations(updated);
  }, [locations]);

  const handleMoveDown = useCallback((id: string) => {
    const sorted = [...locations].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((l) => l.id === id);
    if (idx < 0 || idx >= sorted.length - 1) return;
    const updated = sorted.map((l, i) => {
      if (i === idx) return { ...l, order: sorted[idx + 1].order };
      if (i === idx + 1) return { ...l, order: sorted[idx].order };
      return l;
    });
    setLocations(updated);
  }, [locations]);

  const handleSettingsChange = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleReset = useCallback(() => {
    setLocations(DEFAULT_LOCATIONS);
    setBaseLocationId(DEFAULT_LOCATIONS[0].id);
    setSettings(DEFAULT_SETTINGS);
    setBaseDate(roundToHour(new Date()));
    setIsLive(true);
    setShowSettings(false);
  }, []);

  const goLive = useCallback(() => {
    setIsLive(true);
    setBaseDate(roundToHour(new Date()));
    const baseLoc = locations[0];
    if (baseLoc) setBaseLocationId(baseLoc.id);
  }, [locations]);

  // Derive data
  const editingLocation = editingLocationId ? locations.find((l) => l.id === editingLocationId) : null;
  const baseLocation = baseLocationId ? locations.find((l) => l.id === baseLocationId) : null;
  const baseTimezone = baseLocation?.timezone ?? 'UTC';
  const sortedLocations = getSortedLocations(locations, settings, baseLocationId, baseDate);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <svg className="app-header__logo" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
              <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
              <line x1="14" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
              <line x1="14" y1="14" x2="20" y2="18" stroke="var(--color-accent)" strokeWidth="1.75" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="2" fill="currentColor"/>
            </svg>
            <span className="app-header__title">World Time Hub</span>
          </div>
          <div className="app-header__actions">
            {!isLive && (
              <button className="btn btn--live" onClick={goLive} title="Return to live time">
                <span className="live-dot" />
                Live
              </button>
            )}
            {isLive && (
              <div className="live-indicator" title="Showing current time">
                <span className="live-dot live-dot--active" />
                <span className="live-indicator__label">Live</span>
              </div>
            )}
            <button
              className="icon-btn icon-btn--md"
              onClick={() => setShowAdd(true)}
              aria-label="Add location"
              title="Add location"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              className="icon-btn icon-btn--md"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
              title="Settings"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.36 13.36l1.41 1.41M3.22 14.78l1.41-1.41M13.36 4.64l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Controls bar */}
      <div className="controls-bar">
        <button
          className={`control-toggle ${settings.sortByDifference ? 'control-toggle--active' : ''}`}
          onClick={() => handleSettingsChange({ sortByDifference: !settings.sortByDifference })}
          title={settings.sortByDifference ? 'Sorted by time difference (click for manual order)' : 'Manual order (click to sort by time difference)'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 3h10M3.5 7h7M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {settings.sortByDifference ? 'By offset' : 'Manual order'}
        </button>

        <button
          className={`control-toggle ${settings.use24Hour ? 'control-toggle--active' : ''}`}
          onClick={() => handleSettingsChange({ use24Hour: !settings.use24Hour })}
          title={settings.use24Hour ? '24h format active (click for 12h)' : '12h format active (click for 24h)'}
        >
          {settings.use24Hour ? '24h' : '12h'}
        </button>
      </div>

      {/* Location list */}
      <main className="location-list">
        {sortedLocations.length === 0 && (
          <div className="empty-state">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" opacity="0.3" aria-hidden="true">
              <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2"/>
              <path d="M28 16v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="empty-state__title">No locations yet</p>
            <p className="empty-state__sub">Tap <strong>+</strong> to add your first city.</p>
          </div>
        )}

        {sortedLocations.map((loc, idx) => (
          <LocationCard
            key={loc.id}
            location={loc}
            baseDate={baseDate}
            baseLocationId={baseLocationId}
            baseTimezone={baseTimezone}
            settings={settings}
            isFirst={idx === 0}
            isLast={idx === sortedLocations.length - 1}
            onClick={() => handleEditTime(loc.id)}
            onDelete={() => handleDeleteLocation(loc.id)}
            onMoveUp={() => handleMoveUp(loc.id)}
            onMoveDown={() => handleMoveDown(loc.id)}
          />
        ))}
      </main>

      {/* Modals */}
      {editingLocation && (
        <TimeEditor
          location={editingLocation}
          baseDate={baseDate}
          use24Hour={settings.use24Hour}
          onSave={handleSaveTime}
          onClose={() => setEditingLocationId(null)}
        />
      )}

      {showAdd && (
        <AddLocation
          existingTimezones={locations.map((l) => l.timezone)}
          onAdd={handleAddLocation}
          onClose={() => setShowAdd(false)}
        />
      )}

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onChange={handleSettingsChange}
          onReset={handleReset}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
