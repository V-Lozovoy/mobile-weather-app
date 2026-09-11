import type { City } from '../types'

// ДАНО, готове — не змінюйте. Ці дві функції — весь словник між стрічкою та
// екраном міста: стрічка за ними будує шлях для router.push, екран міста —
// шукає місто за id, що прилетів з адреси [S2 · 13–14].

/** Шлях до екрана міста: cityPath('c-7') → '/city/c-7'. */
export function cityPath(id: string): string {
  return `/city/${id}`
}

/** Пошук міста за id; невідомий id дає undefined — це і є стан «не знайдено». */
export function findCity(cities: City[], id: string): City | undefined {
  return cities.find((c) => c.id === id)
}
