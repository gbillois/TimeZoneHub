import type { CityOption } from '../types';

export const CITIES: CityOption[] = [
  // Americas - North
  { name: 'New York', country: 'United States', timezone: 'America/New_York', continent: 'Americas' },
  { name: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', continent: 'Americas' },
  { name: 'Chicago', country: 'United States', timezone: 'America/Chicago', continent: 'Americas' },
  { name: 'Denver', country: 'United States', timezone: 'America/Denver', continent: 'Americas' },
  { name: 'Phoenix', country: 'United States', timezone: 'America/Phoenix', continent: 'Americas' },
  { name: 'Seattle', country: 'United States', timezone: 'America/Los_Angeles', continent: 'Americas' },
  { name: 'San Francisco', country: 'United States', timezone: 'America/Los_Angeles', continent: 'Americas' },
  { name: 'Miami', country: 'United States', timezone: 'America/New_York', continent: 'Americas' },
  { name: 'Atlanta', country: 'United States', timezone: 'America/New_York', continent: 'Americas' },
  { name: 'Boston', country: 'United States', timezone: 'America/New_York', continent: 'Americas' },
  { name: 'Dallas', country: 'United States', timezone: 'America/Chicago', continent: 'Americas' },
  { name: 'Houston', country: 'United States', timezone: 'America/Chicago', continent: 'Americas' },
  { name: 'Minneapolis', country: 'United States', timezone: 'America/Chicago', continent: 'Americas' },
  { name: 'Las Vegas', country: 'United States', timezone: 'America/Los_Angeles', continent: 'Americas' },
  { name: 'Portland', country: 'United States', timezone: 'America/Los_Angeles', continent: 'Americas' },
  { name: 'Detroit', country: 'United States', timezone: 'America/Detroit', continent: 'Americas' },
  { name: 'Honolulu', country: 'United States', timezone: 'Pacific/Honolulu', continent: 'Pacific' },
  { name: 'Anchorage', country: 'United States', timezone: 'America/Anchorage', continent: 'Americas' },
  { name: 'Toronto', country: 'Canada', timezone: 'America/Toronto', continent: 'Americas' },
  { name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', continent: 'Americas' },
  { name: 'Montreal', country: 'Canada', timezone: 'America/Toronto', continent: 'Americas' },
  { name: 'Calgary', country: 'Canada', timezone: 'America/Edmonton', continent: 'Americas' },
  { name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', continent: 'Americas' },
  { name: 'Guadalajara', country: 'Mexico', timezone: 'America/Mexico_City', continent: 'Americas' },
  { name: 'Havana', country: 'Cuba', timezone: 'America/Havana', continent: 'Americas' },
  { name: 'Panama City', country: 'Panama', timezone: 'America/Panama', continent: 'Americas' },
  { name: 'San José', country: 'Costa Rica', timezone: 'America/Costa_Rica', continent: 'Americas' },
  { name: 'Guatemala City', country: 'Guatemala', timezone: 'America/Guatemala', continent: 'Americas' },

  // Americas - South
  { name: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', continent: 'Americas' },
  { name: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo', continent: 'Americas' },
  { name: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', continent: 'Americas' },
  { name: 'Santiago', country: 'Chile', timezone: 'America/Santiago', continent: 'Americas' },
  { name: 'Bogotá', country: 'Colombia', timezone: 'America/Bogota', continent: 'Americas' },
  { name: 'Lima', country: 'Peru', timezone: 'America/Lima', continent: 'Americas' },
  { name: 'Caracas', country: 'Venezuela', timezone: 'America/Caracas', continent: 'Americas' },
  { name: 'Quito', country: 'Ecuador', timezone: 'America/Guayaquil', continent: 'Americas' },
  { name: 'Montevideo', country: 'Uruguay', timezone: 'America/Montevideo', continent: 'Americas' },
  { name: 'Asunción', country: 'Paraguay', timezone: 'America/Asuncion', continent: 'Americas' },

  // Europe - West
  { name: 'London', country: 'United Kingdom', timezone: 'Europe/London', continent: 'Europe' },
  { name: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin', continent: 'Europe' },
  { name: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', continent: 'Europe' },
  { name: 'Paris', country: 'France', timezone: 'Europe/Paris', continent: 'Europe' },
  { name: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', continent: 'Europe' },
  { name: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels', continent: 'Europe' },
  { name: 'Luxembourg', country: 'Luxembourg', timezone: 'Europe/Luxembourg', continent: 'Europe' },
  { name: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', continent: 'Europe' },
  { name: 'Barcelona', country: 'Spain', timezone: 'Europe/Madrid', continent: 'Europe' },
  { name: 'Rome', country: 'Italy', timezone: 'Europe/Rome', continent: 'Europe' },
  { name: 'Milan', country: 'Italy', timezone: 'Europe/Rome', continent: 'Europe' },
  { name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', continent: 'Europe' },
  { name: 'Munich', country: 'Germany', timezone: 'Europe/Berlin', continent: 'Europe' },
  { name: 'Hamburg', country: 'Germany', timezone: 'Europe/Berlin', continent: 'Europe' },
  { name: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna', continent: 'Europe' },
  { name: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', continent: 'Europe' },
  { name: 'Geneva', country: 'Switzerland', timezone: 'Europe/Zurich', continent: 'Europe' },
  { name: 'Bern', country: 'Switzerland', timezone: 'Europe/Zurich', continent: 'Europe' },

  // Europe - North
  { name: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', continent: 'Europe' },
  { name: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo', continent: 'Europe' },
  { name: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen', continent: 'Europe' },
  { name: 'Helsinki', country: 'Finland', timezone: 'Europe/Helsinki', continent: 'Europe' },
  { name: 'Reykjavik', country: 'Iceland', timezone: 'Atlantic/Reykjavik', continent: 'Europe' },

  // Europe - East/Central
  { name: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw', continent: 'Europe' },
  { name: 'Prague', country: 'Czech Republic', timezone: 'Europe/Prague', continent: 'Europe' },
  { name: 'Budapest', country: 'Hungary', timezone: 'Europe/Budapest', continent: 'Europe' },
  { name: 'Bucharest', country: 'Romania', timezone: 'Europe/Bucharest', continent: 'Europe' },
  { name: 'Sofia', country: 'Bulgaria', timezone: 'Europe/Sofia', continent: 'Europe' },
  { name: 'Athens', country: 'Greece', timezone: 'Europe/Athens', continent: 'Europe' },
  { name: 'Belgrade', country: 'Serbia', timezone: 'Europe/Belgrade', continent: 'Europe' },
  { name: 'Zagreb', country: 'Croatia', timezone: 'Europe/Zagreb', continent: 'Europe' },
  { name: 'Kyiv', country: 'Ukraine', timezone: 'Europe/Kyiv', continent: 'Europe' },
  { name: 'Minsk', country: 'Belarus', timezone: 'Europe/Minsk', continent: 'Europe' },
  { name: 'Vilnius', country: 'Lithuania', timezone: 'Europe/Vilnius', continent: 'Europe' },
  { name: 'Riga', country: 'Latvia', timezone: 'Europe/Riga', continent: 'Europe' },
  { name: 'Tallinn', country: 'Estonia', timezone: 'Europe/Tallinn', continent: 'Europe' },
  { name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', continent: 'Europe' },
  { name: 'St Petersburg', country: 'Russia', timezone: 'Europe/Moscow', continent: 'Europe' },
  { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', continent: 'Europe' },

  // Africa
  { name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', continent: 'Africa' },
  { name: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', continent: 'Africa' },
  { name: 'Tunis', country: 'Tunisia', timezone: 'Africa/Tunis', continent: 'Africa' },
  { name: 'Algiers', country: 'Algeria', timezone: 'Africa/Algiers', continent: 'Africa' },
  { name: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', continent: 'Africa' },
  { name: 'Accra', country: 'Ghana', timezone: 'Africa/Accra', continent: 'Africa' },
  { name: 'Abidjan', country: 'Ivory Coast', timezone: 'Africa/Abidjan', continent: 'Africa' },
  { name: 'Dakar', country: 'Senegal', timezone: 'Africa/Dakar', continent: 'Africa' },
  { name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', continent: 'Africa' },
  { name: 'Addis Ababa', country: 'Ethiopia', timezone: 'Africa/Addis_Ababa', continent: 'Africa' },
  { name: 'Dar es Salaam', country: 'Tanzania', timezone: 'Africa/Dar_es_Salaam', continent: 'Africa' },
  { name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', continent: 'Africa' },
  { name: 'Cape Town', country: 'South Africa', timezone: 'Africa/Johannesburg', continent: 'Africa' },
  { name: 'Luanda', country: 'Angola', timezone: 'Africa/Luanda', continent: 'Africa' },
  { name: 'Khartoum', country: 'Sudan', timezone: 'Africa/Khartoum', continent: 'Africa' },

  // Middle East / West Asia
  { name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', continent: 'Asia' },
  { name: 'Abu Dhabi', country: 'UAE', timezone: 'Asia/Dubai', continent: 'Asia' },
  { name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', continent: 'Asia' },
  { name: 'Jeddah', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', continent: 'Asia' },
  { name: 'Doha', country: 'Qatar', timezone: 'Asia/Qatar', continent: 'Asia' },
  { name: 'Kuwait City', country: 'Kuwait', timezone: 'Asia/Kuwait', continent: 'Asia' },
  { name: 'Bahrain', country: 'Bahrain', timezone: 'Asia/Bahrain', continent: 'Asia' },
  { name: 'Muscat', country: 'Oman', timezone: 'Asia/Muscat', continent: 'Asia' },
  { name: 'Beirut', country: 'Lebanon', timezone: 'Asia/Beirut', continent: 'Asia' },
  { name: 'Amman', country: 'Jordan', timezone: 'Asia/Amman', continent: 'Asia' },
  { name: 'Baghdad', country: 'Iraq', timezone: 'Asia/Baghdad', continent: 'Asia' },
  { name: 'Tehran', country: 'Iran', timezone: 'Asia/Tehran', continent: 'Asia' },
  { name: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem', continent: 'Asia' },
  { name: 'Jerusalem', country: 'Israel', timezone: 'Asia/Jerusalem', continent: 'Asia' },
  { name: 'Damascus', country: 'Syria', timezone: 'Asia/Damascus', continent: 'Asia' },

  // Asia - Central
  { name: 'Tashkent', country: 'Uzbekistan', timezone: 'Asia/Tashkent', continent: 'Asia' },
  { name: 'Almaty', country: 'Kazakhstan', timezone: 'Asia/Almaty', continent: 'Asia' },
  { name: 'Astana', country: 'Kazakhstan', timezone: 'Asia/Almaty', continent: 'Asia' },
  { name: 'Baku', country: 'Azerbaijan', timezone: 'Asia/Baku', continent: 'Asia' },
  { name: 'Tbilisi', country: 'Georgia', timezone: 'Asia/Tbilisi', continent: 'Asia' },
  { name: 'Yerevan', country: 'Armenia', timezone: 'Asia/Yerevan', continent: 'Asia' },
  { name: 'Kabul', country: 'Afghanistan', timezone: 'Asia/Kabul', continent: 'Asia' },

  // Asia - South
  { name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', continent: 'Asia' },
  { name: 'Islamabad', country: 'Pakistan', timezone: 'Asia/Karachi', continent: 'Asia' },
  { name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', continent: 'Asia' },
  { name: 'New Delhi', country: 'India', timezone: 'Asia/Kolkata', continent: 'Asia' },
  { name: 'Bangalore', country: 'India', timezone: 'Asia/Kolkata', continent: 'Asia' },
  { name: 'Chennai', country: 'India', timezone: 'Asia/Kolkata', continent: 'Asia' },
  { name: 'Kolkata', country: 'India', timezone: 'Asia/Kolkata', continent: 'Asia' },
  { name: 'Hyderabad', country: 'India', timezone: 'Asia/Kolkata', continent: 'Asia' },
  { name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', continent: 'Asia' },
  { name: 'Colombo', country: 'Sri Lanka', timezone: 'Asia/Colombo', continent: 'Asia' },
  { name: 'Kathmandu', country: 'Nepal', timezone: 'Asia/Kathmandu', continent: 'Asia' },

  // Asia - Southeast
  { name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', continent: 'Asia' },
  { name: 'Yangon', country: 'Myanmar', timezone: 'Asia/Yangon', continent: 'Asia' },
  { name: 'Hanoi', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', continent: 'Asia' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', continent: 'Asia' },
  { name: 'Phnom Penh', country: 'Cambodia', timezone: 'Asia/Phnom_Penh', continent: 'Asia' },
  { name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', continent: 'Asia' },
  { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', continent: 'Asia' },
  { name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', continent: 'Asia' },
  { name: 'Bali', country: 'Indonesia', timezone: 'Asia/Makassar', continent: 'Asia' },
  { name: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', continent: 'Asia' },
  { name: 'Vientiane', country: 'Laos', timezone: 'Asia/Vientiane', continent: 'Asia' },

  // Asia - East
  { name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', continent: 'Asia' },
  { name: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', continent: 'Asia' },
  { name: 'Guangzhou', country: 'China', timezone: 'Asia/Shanghai', continent: 'Asia' },
  { name: 'Shenzhen', country: 'China', timezone: 'Asia/Shanghai', continent: 'Asia' },
  { name: 'Chengdu', country: 'China', timezone: 'Asia/Shanghai', continent: 'Asia' },
  { name: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong', continent: 'Asia' },
  { name: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', continent: 'Asia' },
  { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', continent: 'Asia' },
  { name: 'Osaka', country: 'Japan', timezone: 'Asia/Tokyo', continent: 'Asia' },
  { name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', continent: 'Asia' },
  { name: 'Busan', country: 'South Korea', timezone: 'Asia/Seoul', continent: 'Asia' },
  { name: 'Ulaanbaatar', country: 'Mongolia', timezone: 'Asia/Ulaanbaatar', continent: 'Asia' },

  // Oceania
  { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', continent: 'Oceania' },
  { name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', continent: 'Oceania' },
  { name: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane', continent: 'Oceania' },
  { name: 'Perth', country: 'Australia', timezone: 'Australia/Perth', continent: 'Oceania' },
  { name: 'Adelaide', country: 'Australia', timezone: 'Australia/Adelaide', continent: 'Oceania' },
  { name: 'Darwin', country: 'Australia', timezone: 'Australia/Darwin', continent: 'Oceania' },
  { name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', continent: 'Oceania' },
  { name: 'Wellington', country: 'New Zealand', timezone: 'Pacific/Auckland', continent: 'Oceania' },
  { name: 'Suva', country: 'Fiji', timezone: 'Pacific/Fiji', continent: 'Pacific' },
  { name: 'Guam', country: 'Guam', timezone: 'Pacific/Guam', continent: 'Pacific' },
  { name: 'Port Moresby', country: 'Papua New Guinea', timezone: 'Pacific/Port_Moresby', continent: 'Pacific' },
  { name: 'Noumea', country: 'New Caledonia', timezone: 'Pacific/Noumea', continent: 'Pacific' },
];

export const CONTINENTS = ['Americas', 'Europe', 'Africa', 'Asia', 'Oceania', 'Pacific'] as const;

export function searchCities(query: string): CityOption[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.timezone.toLowerCase().includes(q)
  ).slice(0, 8);
}

export const DEFAULT_LOCATIONS = [
  { id: '1', name: 'New York', timezone: 'America/New_York', order: 0 },
  { id: '2', name: 'London', timezone: 'Europe/London', order: 1 },
  { id: '3', name: 'Dubai', timezone: 'Asia/Dubai', order: 2 },
  { id: '4', name: 'Tokyo', timezone: 'Asia/Tokyo', order: 3 },
  { id: '5', name: 'Sydney', timezone: 'Australia/Sydney', order: 4 },
  { id: '6', name: 'Los Angeles', timezone: 'America/Los_Angeles', order: 5 },
];

export const DEFAULT_SETTINGS = {
  use24Hour: false,
  sortByDifference: false,
  highlightBase: true,
  compactRows: false,
  baseBadgeLabel: 'Base',
};

// Get all unique IANA timezones grouped by continent
export const TIMEZONE_GROUPS: Record<string, string[]> = (() => {
  const groups: Record<string, string[]> = {};
  const seen = new Set<string>();
  for (const city of CITIES) {
    const continent = city.continent;
    if (!groups[continent]) groups[continent] = [];
    if (!seen.has(city.timezone)) {
      seen.add(city.timezone);
      groups[continent].push(city.timezone);
    }
  }
  // Sort each group alphabetically
  for (const key of Object.keys(groups)) {
    groups[key].sort();
  }
  return groups;
})();
