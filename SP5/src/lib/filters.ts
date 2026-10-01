import type { CityWithWeather } from '../types'

// Зелений із SP4: filter збігається з cityCondition(city) ('all' пропускає
// всіх), query — підрядок без регістру в імені, обидві умови разом. Погода
// тут статична: Explore фільтрує триста міст локально, без запиту.

export type CityFilter = 'all' | 'warm' | 'cold' | 'rain'

export type Filters = { query: string; filter: CityFilter }

export const INITIAL_FILTERS: Filters = { query: '', filter: 'all' }

/** ДАНО, готове — місто в одну з трьох категорій погоди. Дощ має пріоритет
 *  над температурою: Харків із 30° і «Heavy rain» — це 'rain', а не 'warm'. */
export function cityCondition(city: CityWithWeather): Exclude<CityFilter, 'all'> {
  if (/rain|drizzle|shower|thunder/i.test(city.condition)) return 'rain'
  return city.temperature >= 20 ? 'warm' : 'cold'
}

/** Обидві умови разом: погода збігається з фільтром, ім'я містить рядок
 *  пошуку як підрядок без регістру. */
export function applyFilters(
  cities: CityWithWeather[],
  filters: Filters,
): CityWithWeather[] {
  const q = filters.query.trim().toLowerCase()
  return cities.filter((c) => {
    if (filters.filter !== 'all' && cityCondition(c) !== filters.filter) {
      return false
    }
    if (q && !c.name.toLowerCase().includes(q)) {
      return false
    }
    return true
  })
}
