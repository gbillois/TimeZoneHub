import React from 'react';
import type { Location, Settings } from '../types';
import {
  formatTimeInZone,
  formatUTCOffset,
  getUTCOffsetMinutes,
  getTimeDiff,
  formatDayInZone,
} from '../utils/timeUtils';

interface Props {
  location: Location;
  baseDate: Date;
  baseLocationId: string | null;
  baseTimezone: string;
  settings: Settings;
  isFirst: boolean;
  isLast: boolean;
  onClick: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const LocationCard: React.FC<Props> = ({
  location,
  baseDate,
  baseLocationId,
  baseTimezone,
  settings,
  isFirst,
  isLast,
  onClick,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const isBase = location.id === baseLocationId;
  const offsetMinutes = getUTCOffsetMinutes(location.timezone, baseDate);
  const offsetStr = formatUTCOffset(offsetMinutes);
  const timeStr = formatTimeInZone(baseDate, location.timezone, settings.use24Hour);
  const diffStr = isBase ? '' : getTimeDiff(location.timezone, baseTimezone, baseDate);
  const dayDiff = isBase ? '' : formatDayInZone(baseDate, location.timezone, baseTimezone);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveUp();
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveDown();
  };

  return (
    <div
      className={`location-card ${isBase && settings.highlightBase ? 'location-card--base' : ''} ${settings.compactRows ? 'location-card--compact' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`${location.name}, ${timeStr}. Click to edit.`}
    >
      <div className="location-card__left">
        <div className="location-card__header">
          <span className="location-card__name">{location.name}</span>
          {isBase && settings.highlightBase && (
            <span className="location-card__base-badge">{settings.baseBadgeLabel}</span>
          )}
        </div>
        <div className="location-card__tz">
          <span className="location-card__offset">{offsetStr}</span>
          <span className="location-card__tz-sep">·</span>
          <span className="location-card__tzname">{location.timezone}</span>
        </div>
        {!isBase && diffStr && (
          <div className="location-card__diff">
            <span className={`location-card__diff-badge ${diffStr.startsWith('+') ? 'ahead' : diffStr === 'same' ? 'same' : 'behind'}`}>
              {diffStr}
            </span>
          </div>
        )}
      </div>

      <div className="location-card__right">
        <div className="location-card__time-group">
          <span className="location-card__time">{timeStr}</span>
          {dayDiff && <span className="location-card__day-diff">{dayDiff}</span>}
        </div>
        <div className="location-card__actions" onClick={(e) => e.stopPropagation()}>
          {!settings.sortByDifference && (
            <div className="location-card__order-btns">
              <button
                className="icon-btn icon-btn--sm"
                onClick={handleMoveUp}
                disabled={isFirst}
                aria-label="Move up"
                title="Move up"
              >
                ▲
              </button>
              <button
                className="icon-btn icon-btn--sm"
                onClick={handleMoveDown}
                disabled={isLast}
                aria-label="Move down"
                title="Move down"
              >
                ▼
              </button>
            </div>
          )}
          <button
            className="icon-btn icon-btn--delete"
            onClick={handleDelete}
            aria-label={`Delete ${location.name}`}
            title="Delete"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
