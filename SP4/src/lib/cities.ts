import type { City } from '../types'

// Спадок SP2, зелений: пошук міста за id і побудова шляху живуть тут з
// минулої пари. Екран погоди ними користується і сьогодні — змінюється лише
// те, що під ним: замість заготовленого тексту — відповідь API.

export function findCity(cities: City[], id: string): City | undefined {
  return cities.find((c) => c.id === id)
}

export function cityPath(id: string): string {
  return `/city/${id}`
}
