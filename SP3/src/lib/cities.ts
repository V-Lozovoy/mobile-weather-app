import type { City } from '../types'

// Спадок SP2, зелений: пошук міста за id і побудова шляху живуть тут з
// минулої пари. Екран погоди ними користується і сьогодні — змінюється лише
// те, що під ним: замість заготовленого тексту — відповідь API.

/** Шлях до екрана міста: cityPath('c-7') → '/city/c-7'. */
export function cityPath(id: string): string {
  return `/city/${id}`
}

/** Пошук міста за id; невідомий id дає undefined — це і є стан «не знайдено». */
export function findCity(cities: City[], id: string): City | undefined {
  return cities.find((c) => c.id === id)
}

export const CITIES: City[] = [
  { id: 'kyiv', name: 'Kyiv', country: 'Ukraine' },
  { id: 'dnipropetrovsk', name: 'Dnipropetrovsk', country: 'Ukraine' },
  { id: 'reykjavik', name: 'Reykjavik', country: 'Iceland' },
  { id: 'london', name: 'London', country: 'United Kingdom' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
  { id: 'new-york', name: 'New York', country: 'USA' },
  { id: 'dubai', name: 'Dubai', country: 'UAE' },
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa' },
]
