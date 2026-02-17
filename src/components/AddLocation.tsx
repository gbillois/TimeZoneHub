import React, { useState, useEffect, useRef } from 'react';
import type { CityOption } from '../types';
import { searchCities, CITIES, CONTINENTS, TIMEZONE_GROUPS } from '../data/cities';
import { isValidTimezone, formatUTCOffset, getUTCOffsetMinutes } from '../utils/timeUtils';

interface Props {
  existingTimezones: string[];
  onAdd: (name: string, timezone: string) => void;
  onClose: () => void;
}

type Tab = 'search' | 'manual';

export const AddLocation: React.FC<Props> = ({ existingTimezones, onAdd, onClose }) => {
  const [tab, setTab] = useState<Tab>('search');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityOption[]>([]);
  const [manualName, setManualName] = useState('');
  const [manualTimezone, setManualTimezone] = useState('');
  const [manualContinent, setManualContinent] = useState('Americas');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [tab]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const t = setTimeout(() => {
      const found = searchCities(query);
      setResults(found);
      setIsSearching(false);
    }, 150);
    return () => clearTimeout(t);
  }, [query]);

  const handleSelectCity = (city: CityOption) => {
    setError('');
    if (!isValidTimezone(city.timezone)) {
      setError(`Unsupported timezone: ${city.timezone}`);
      return;
    }
    onAdd(city.name, city.timezone);
  };

  const handleManualAdd = () => {
    setError('');
    if (!manualName.trim()) {
      setError('Please enter a city name.');
      return;
    }
    if (!manualTimezone) {
      setError('Please select a timezone.');
      return;
    }
    if (!isValidTimezone(manualTimezone)) {
      setError(`Unsupported timezone: ${manualTimezone}`);
      return;
    }
    onAdd(manualName.trim(), manualTimezone);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const now = new Date();
  const availableTimezones = TIMEZONE_GROUPS[manualContinent] ?? [];

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Add location">
      <div className="modal modal--tall">
        <div className="modal__header">
          <h2 className="modal__title">Add Location</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab-btn ${tab === 'search' ? 'tab-btn--active' : ''}`}
            onClick={() => { setTab('search'); setError(''); }}
          >
            Quick Search
          </button>
          <button
            className={`tab-btn ${tab === 'manual' ? 'tab-btn--active' : ''}`}
            onClick={() => { setTab('manual'); setError(''); }}
          >
            Manual Entry
          </button>
        </div>

        {tab === 'search' && (
          <div className="add-search">
            <div className="search-input-wrap">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10.5 10.5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder="Search cities, countries, or timezones…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search cities"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>

            {isSearching && (
              <div className="search-status">Searching…</div>
            )}

            {!isSearching && query && results.length === 0 && (
              <div className="search-empty">
                <p>No cities found for "<strong>{query}</strong>"</p>
                <p className="search-empty__hint">Try Manual Entry to use a timezone directly.</p>
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <ul className="search-results" role="listbox">
                {results.map((city, i) => {
                  const offset = getUTCOffsetMinutes(city.timezone, now);
                  const offsetStr = formatUTCOffset(offset);
                  const alreadyAdded = existingTimezones.includes(city.timezone) &&
                    CITIES.some(c => c.name === city.name && existingTimezones.includes(c.timezone));
                  return (
                    <li
                      key={i}
                      className={`search-result ${alreadyAdded ? 'search-result--added' : ''}`}
                      role="option"
                      onClick={() => !alreadyAdded && handleSelectCity(city)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !alreadyAdded && handleSelectCity(city)}
                      tabIndex={alreadyAdded ? -1 : 0}
                      aria-selected={alreadyAdded}
                    >
                      <div className="search-result__info">
                        <span className="search-result__name">{city.name}</span>
                        <span className="search-result__country">{city.country}</span>
                      </div>
                      <div className="search-result__tz">
                        <span className="search-result__offset">{offsetStr}</span>
                        {alreadyAdded && <span className="search-result__added-tag">Added</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {!query && (
              <div className="search-placeholder">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.3" aria-hidden="true">
                  <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="2"/>
                  <path d="M28 28l8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <p>Start typing to find a city</p>
              </div>
            )}
          </div>
        )}

        {tab === 'manual' && (
          <div className="add-manual">
            <div className="form-group">
              <label className="form-label" htmlFor="manual-name">City / Location Name</label>
              <input
                ref={inputRef}
                id="manual-name"
                className="form-input"
                type="text"
                placeholder="e.g. My Office"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="manual-continent">Region</label>
              <select
                id="manual-continent"
                className="form-select"
                value={manualContinent}
                onChange={(e) => { setManualContinent(e.target.value); setManualTimezone(''); }}
              >
                {CONTINENTS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="manual-tz">Timezone</label>
              <select
                id="manual-tz"
                className="form-select"
                value={manualTimezone}
                onChange={(e) => setManualTimezone(e.target.value)}
              >
                <option value="">Select a timezone…</option>
                {availableTimezones.map((tz) => {
                  const offset = getUTCOffsetMinutes(tz, now);
                  const offsetStr = formatUTCOffset(offset);
                  return (
                    <option key={tz} value={tz}>{offsetStr} — {tz}</option>
                  );
                })}
              </select>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="modal__footer">
              <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
              <button className="btn btn--primary" onClick={handleManualAdd}>Add Location</button>
            </div>
          </div>
        )}

        {tab === 'search' && error && <p className="form-error">{error}</p>}
      </div>
    </div>
  );
};
