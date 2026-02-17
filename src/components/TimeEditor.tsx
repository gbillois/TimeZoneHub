import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Location } from '../types';
import { formatTimeInZone, getLocalHoursMinutes, formatUTCOffset, getUTCOffsetMinutes } from '../utils/timeUtils';

interface Props {
  location: Location;
  baseDate: Date;
  use24Hour: boolean;
  onSave: (hours: number, minutes: number, timezone: string) => void;
  onClose: () => void;
}

export const TimeEditor: React.FC<Props> = ({ location, baseDate, use24Hour, onSave, onClose }) => {
  const { hours: initHours, minutes: initMinutes } = getLocalHoursMinutes(baseDate, location.timezone);
  const [hours, setHours] = useState(initHours);
  const [minutes, setMinutes] = useState(initMinutes);
  const [isPM, setIsPM] = useState(initHours >= 12);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Sync AM/PM with hours in 12h mode
  useEffect(() => {
    setIsPM(hours >= 12);
  }, [hours]);

  // Focus trap & ESC key
  useEffect(() => {
    firstFocusRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const display12Hours = use24Hour ? hours : ((hours % 12) || 12);
  const displayMinutes = String(minutes).padStart(2, '0');

  const adjustHours = useCallback((delta: number) => {
    setHours((h) => (h + delta + 24) % 24);
  }, []);

  const adjustMinutes = useCallback((delta: number) => {
    setMinutes((m) => (m + delta + 60) % 60);
  }, []);

  const toggleAMPM = () => {
    const newHours = hours >= 12 ? hours - 12 : hours + 12;
    setHours(newHours);
    setIsPM(!isPM);
  };

  const handleHoursInput = (val: string) => {
    const n = parseInt(val, 10);
    if (isNaN(n)) return;
    if (use24Hour) {
      setHours(Math.min(23, Math.max(0, n)));
    } else {
      const h = Math.min(12, Math.max(1, n));
      setHours(isPM ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h));
    }
  };

  const handleMinutesInput = (val: string) => {
    const n = parseInt(val, 10);
    if (isNaN(n)) return;
    setMinutes(Math.min(59, Math.max(0, n)));
  };

  const handleSave = () => {
    onSave(hours, minutes, location.timezone);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const offsetMinutes = getUTCOffsetMinutes(location.timezone, baseDate);
  const offsetStr = formatUTCOffset(offsetMinutes);
  const currentTimeStr = formatTimeInZone(baseDate, location.timezone, use24Hour);

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Edit time">
      <div className="modal">
        <div className="modal__header">
          <div>
            <h2 className="modal__title">{location.name}</h2>
            <p className="modal__subtitle">{offsetStr} · {location.timezone}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close" ref={firstFocusRef}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal__current-time">
          <span className="modal__current-label">Current</span>
          <span className="modal__current-value">{currentTimeStr}</span>
        </div>

        <div className="time-picker">
          {/* Hours */}
          <div className="time-picker__unit">
            <button
              className="time-picker__arrow"
              onClick={() => adjustHours(1)}
              aria-label="Increase hours"
            >▲</button>
            <input
              className="time-picker__input"
              type="number"
              min={use24Hour ? 0 : 1}
              max={use24Hour ? 23 : 12}
              value={display12Hours}
              onChange={(e) => handleHoursInput(e.target.value)}
              aria-label="Hours"
            />
            <button
              className="time-picker__arrow"
              onClick={() => adjustHours(-1)}
              aria-label="Decrease hours"
            >▼</button>
          </div>

          <div className="time-picker__colon">:</div>

          {/* Minutes */}
          <div className="time-picker__unit">
            <button
              className="time-picker__arrow"
              onClick={() => adjustMinutes(5)}
              aria-label="Increase minutes"
            >▲</button>
            <input
              className="time-picker__input"
              type="number"
              min={0}
              max={59}
              value={displayMinutes}
              onChange={(e) => handleMinutesInput(e.target.value)}
              aria-label="Minutes"
            />
            <button
              className="time-picker__arrow"
              onClick={() => adjustMinutes(-5)}
              aria-label="Decrease minutes"
            >▼</button>
          </div>

          {/* AM/PM */}
          {!use24Hour && (
            <button
              className={`time-picker__ampm ${isPM ? 'is-pm' : 'is-am'}`}
              onClick={toggleAMPM}
              aria-label={`Switch to ${isPM ? 'AM' : 'PM'}`}
            >
              {isPM ? 'PM' : 'AM'}
            </button>
          )}
        </div>

        <p className="modal__hint">Set as base time for all cities</p>

        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSave}>Set as Base</button>
        </div>
      </div>
    </div>
  );
};
