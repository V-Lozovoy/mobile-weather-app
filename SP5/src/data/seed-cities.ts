import type { City } from '../types'

// ДАНО — не змінюйте.
//
// Перші вісім міст застосунку: розсів для порожньої бази (src/db/seed.ts).
// id збігаються з many-cities.ts — це один простір id на весь застосунок:
// тап у Explore і картка в стрічці ведуть на те саме місто.
// Дати — фіксовані ISO-рядки: у SQLite немає типу date, і ми домовилися
// писати рядки [S5 · 8].
//
// Координати справжні, і саме ними синк питає погоду. WeatherAPI приймає в
// параметрі q і назву, і пару «широта,довгота» — а назва неоднозначна:
// q=Dnipro віддає Дніпрорудне, і точно так само q=Kyiv за координатами
// центру віддасть Пущу-Водицю. Кешу потрібне однозначне місто, тому синк
// ходить за координатами, а екран міста лишається на назві [S5 · 19].
// Погоди в рядках немає: температура й умова живуть у forecast_cache, і
// кладе їх туди синк.

export type SeedCity = City & {
  admin1: string | null
  latitude: number
  longitude: number
  favorite: boolean
  sortOrder: number
  createdAt: string
}

export const SEED_CITIES: SeedCity[] = [
  { id: 'c-1', name: 'Dnipro', country: 'Ukraine', admin1: 'Dnipropetrovsk Oblast', latitude: 48.4647, longitude: 35.0462, favorite: true, sortOrder: 1, createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'c-4', name: 'Kyiv', country: 'Ukraine', admin1: 'Kyiv City', latitude: 50.4501, longitude: 30.5234, favorite: true, sortOrder: 2, createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'c-2', name: 'Reykjavík', country: 'Iceland', admin1: 'Capital Region', latitude: 64.1466, longitude: -21.9426, favorite: false, sortOrder: 3, createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'c-3', name: 'Dubai', country: 'UAE', admin1: 'Dubai', latitude: 25.2048, longitude: 55.2708, favorite: false, sortOrder: 4, createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'c-176', name: 'Tokyo', country: 'Japan', admin1: 'Tokyo', latitude: 35.6762, longitude: 139.6503, favorite: false, sortOrder: 5, createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'c-116', name: 'New York', country: 'USA', admin1: 'New York', latitude: 40.7128, longitude: -74.006, favorite: false, sortOrder: 6, createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'c-72', name: 'London', country: 'United Kingdom', admin1: 'England', latitude: 51.5074, longitude: -0.1278, favorite: false, sortOrder: 7, createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'c-265', name: 'Nairobi', country: 'Kenya', admin1: 'Nairobi County', latitude: -1.2921, longitude: 36.8219, favorite: false, sortOrder: 8, createdAt: '2026-09-01T09:00:00.000Z' },
]
