import React, { useEffect, useRef } from 'react';
import type { Settings } from '../types';
import { DEFAULT_SETTINGS } from '../data/cities';

interface Props {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
  onReset: () => void;
  onClose: () => void;
}

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, checked, onChange }) => (
  <label className="settings-row">
    <div className="settings-row__info">
      <span className="settings-row__label">{label}</span>
      {description && <span className="settings-row__desc">{description}</span>}
    </div>
    <button
      role="switch"
      aria-checked={checked}
      className={`toggle ${checked ? 'toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
      aria-label={label}
    >
      <span className="toggle__thumb" />
    </button>
  </label>
);

export const SettingsPanel: React.FC<Props> = ({ settings, onChange, onReset, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstFocusRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Settings">
      <div className="modal modal--settings">
        <div className="modal__header">
          <h2 className="modal__title">Settings</h2>
          <button className="icon-btn" ref={firstFocusRef} onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="settings-section">
          <h3 className="settings-section__title">Display</h3>

          <ToggleRow
            label="24-hour time"
            description="Show times in 24h format instead of AM/PM"
            checked={settings.use24Hour}
            onChange={(v) => onChange({ use24Hour: v })}
          />

          <ToggleRow
            label="Compact rows"
            description="Smaller cards, show more cities at once"
            checked={settings.compactRows}
            onChange={(v) => onChange({ compactRows: v })}
          />

          <ToggleRow
            label="Highlight base city"
            description="Visually emphasize the base reference city"
            checked={settings.highlightBase}
            onChange={(v) => onChange({ highlightBase: v })}
          />
        </div>

        <div className="settings-section">
          <h3 className="settings-section__title">Ordering</h3>

          <ToggleRow
            label="Sort by time difference"
            description="Order cities by UTC offset instead of manual order"
            checked={settings.sortByDifference}
            onChange={(v) => onChange({ sortByDifference: v })}
          />
        </div>

        <div className="settings-section">
          <h3 className="settings-section__title">Labels</h3>

          <div className="settings-row settings-row--field">
            <div className="settings-row__info">
              <span className="settings-row__label">Base badge label</span>
              <span className="settings-row__desc">Text shown on the base city card</span>
            </div>
            <input
              className="settings-text-input"
              type="text"
              value={settings.baseBadgeLabel}
              onChange={(e) => onChange({ baseBadgeLabel: e.target.value })}
              maxLength={20}
              placeholder={DEFAULT_SETTINGS.baseBadgeLabel}
              aria-label="Base badge label"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section__title">Reset</h3>
          <p className="settings-reset__desc">
            Restore default settings and city list.
          </p>
          <button className="btn btn--danger" onClick={onReset}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
