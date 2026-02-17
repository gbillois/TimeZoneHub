/**
 * Get UTC offset in minutes for a given timezone at a given date.
 * Positive = east of UTC, negative = west of UTC.
 */
export function getUTCOffsetMinutes(timezone: string, date: Date): number {
  try {
    // Use Intl to format a date in both UTC and the target timezone
    const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzStr = date.toLocaleString('en-US', { timeZone: timezone });
    const utcDate = new Date(utcStr);
    const tzDate = new Date(tzStr);
    return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
  } catch {
    return 0;
  }
}

/**
 * Format UTC offset as a string like "UTC+05:30" or "UTC-07:00"
 */
export function formatUTCOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  return `UTC${sign}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * Format a Date in a specific timezone for display.
 */
export function formatTimeInZone(
  date: Date,
  timezone: string,
  use24Hour: boolean
): string {
  try {
    return date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: !use24Hour,
    });
  } catch {
    return '--:--';
  }
}

/**
 * Format a Date's day name in a specific timezone.
 */
export function formatDayInZone(date: Date, timezone: string, baseTimezone: string): string {
  try {
    const baseDay = date.toLocaleDateString('en-US', { timeZone: baseTimezone, weekday: 'short', day: 'numeric' });
    const tzDay = date.toLocaleDateString('en-US', { timeZone: timezone, weekday: 'short', day: 'numeric' });
    if (baseDay !== tzDay) {
      // Return day difference indicator
      const baseDate = new Date(date.toLocaleString('en-US', { timeZone: baseTimezone }));
      const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
      const diffDays = Math.round((tzDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) return `+${diffDays}d`;
      if (diffDays < 0) return `${diffDays}d`;
    }
    return '';
  } catch {
    return '';
  }
}

/**
 * Get the current hours and minutes in a given timezone.
 */
export function getLocalHoursMinutes(date: Date, timezone: string): { hours: number; minutes: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).formatToParts(date);
    const hours = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
    const minutes = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);
    return { hours: hours % 24, minutes };
  } catch {
    return { hours: 0, minutes: 0 };
  }
}

/**
 * Given a desired local time (hours, minutes) in a timezone, return a new Date
 * representing that moment in absolute time. Uses the same calendar day as baseDate.
 */
export function createDateFromLocalTime(
  hours: number,
  minutes: number,
  timezone: string,
  baseDate: Date
): Date {
  try {
    // Get today's date parts in the target timezone
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(baseDate);

    const year = parseInt(parts.find((p) => p.type === 'year')?.value ?? '2024', 10);
    const month = parseInt(parts.find((p) => p.type === 'month')?.value ?? '1', 10) - 1;
    const day = parseInt(parts.find((p) => p.type === 'day')?.value ?? '1', 10);

    // Get the UTC offset at a rough time (current base date)
    const offsetMinutes = getUTCOffsetMinutes(timezone, baseDate);

    // Target UTC time = desired local time minus offset
    const targetUTC = Date.UTC(year, month, day, hours, minutes) - offsetMinutes * 60000;
    return new Date(targetUTC);
  } catch {
    return baseDate;
  }
}

/**
 * Round a Date to the nearest hour.
 */
export function roundToHour(date: Date): Date {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}

/**
 * Get a human-readable diff between two timezones at a given moment.
 * e.g. "+5h", "-3.5h", "same"
 */
export function getTimeDiff(
  timezone: string,
  baseTimezone: string,
  date: Date
): string {
  const offset = getUTCOffsetMinutes(timezone, date);
  const baseOffset = getUTCOffsetMinutes(baseTimezone, date);
  const diffMinutes = offset - baseOffset;
  if (diffMinutes === 0) return 'same';
  const sign = diffMinutes > 0 ? '+' : '-';
  const abs = Math.abs(diffMinutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  if (mins === 0) return `${sign}${hours}h`;
  return `${sign}${hours}h ${mins}m`;
}

/**
 * Check if the Intl API supports a given timezone string.
 */
export function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
