import type { CityWithWeather } from '../types'

// Фільтри Explore: рядок пошуку й погода. Тип, початкові значення і
// cityCondition — дано; застосування — предмет TODO(5), і поки воно повертає
// вхід без змін: перемикання чіпів погоди ні на що не впливає, і це видно
// на екрані.

export type CityFilter = 'all' | 'warm' | 'cold' | 'rain'

export type Filters = { query: string; filter: CityFilter }

export const INITIAL_FILTERS: Filters = { query: '', filter: 'all' }

/** ДАНО, готове — місто в одну з трьох категорій погоди. І умова, і
 *  температура беруться зі статичного масиву трьохсот міст: Explore
 *  фільтрує локально, без запиту.
 *  Дощ має пріоритет над температурою: Харків із 30° і «Heavy rain» — це
 *  'rain', а не 'warm'. Так задумано, і в даних таких міст 52 із 300, тож
 *  питання «чому тепле місто в дощі» прилетить обов'язково. */
export function cityCondition(city: CityWithWeather): Exclude<CityFilter, 'all'> {
  if (/rain|drizzle|shower|thunder/i.test(city.condition)) return 'rain'
  return city.temperature >= 20 ? 'warm' : 'cold'
}

/**
 * Предмет TODO(5) [S4 · 20]: filter збігається з cityCondition(city)
 * ('all' пропускає всіх), query — підрядок без регістру в імені.
 * Обидві умови разом, не «або».
 * Каркас — умову фільтра подано, умову пошуку допишіть:

   return cities.filter((c) => {
     if (filters.filter !== 'all' && cityCondition(c) !== filters.filter) {
       return false
     }
     // якщо рядок пошуку непорожній — ім'я міста має містити його як
     // підрядок без регістру; порожній — місто проходить
     return true
   })
 */
export function applyFilters(
  cities: CityWithWeather[],
  filters: Filters,
): CityWithWeather[] {
  return cities.filter((c) => {
     if (filters.filter !== 'all' && cityCondition(c) !== filters.filter) {
      return false
     }
     if (filters.query && !c.name.toLowerCase().includes(filters.query.toLowerCase())) {
      return false
     }
     return true
    })
  }
