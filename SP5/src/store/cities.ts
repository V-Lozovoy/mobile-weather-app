import { create } from 'zustand'

import { SEED_CITIES, type SeedCity } from '../data/seed-cities'

// Список міст як стан застосунку. Цей стор відпрацював своє: стрічка читала
// міста звідси, з пам'яті. У SP5 список переїжджає в
// SQLite (live-запити, TODO(3)), і цей файл лишається в заготовці лише як
// стартова позиція: він у пам'яті, і після перезапуску база має останнє слово.
// Коли TODO(3) зроблено, файл можна видалити.

type CitiesState = {
  cities: SeedCity[]
}

export const useCitiesStore = create<CitiesState>()(() => ({
  cities: SEED_CITIES,
}))
