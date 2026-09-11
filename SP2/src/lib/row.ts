import type { City } from '../types'

// ДАНО, готове — не змінюйте. Ключ рядка — id міста, а не індекс масиву:
// FlatList рециклить рядки, і з ключем-індексом під швидким скролом вони
// перескакують на чужі дані [S2 · 5–6]. Текст картки — формат зі SP1.

/** Ключ рядка стрічки: його підставляють у keyExtractor списку. */
export function keyOf(item: { id: string }): string {
  return item.id
}

/** Текст картки одним рядком — «Dnipro · Ukraine · 24°». */
export function rowOf(city: City): string {
  return `${city.name} · ${city.country} · ${city.temperature}°`
}
