// Предмет TODO(2) і TODO(4) [SP4 · S4 слайди 9 і 14]: стор фільтрів на
// zustand, потім — з persist на AsyncStorage. Пакети вже в залежностях;
// цей файл — єдине місце, де сьогодні з'являються нові бібліотеки.
//
// TODO(2) — розкоментуйте каркас стору (слайд 9):
//
import { create } from 'zustand'
import { INITIAL_FILTERS, type CityFilter, type Filters } from '../lib/filters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, persist } from 'zustand/middleware'

type FiltersState = Filters & {
    setQuery: (query: string) => void
    setFilter: (filter: CityFilter) => void
}

export const useFiltersStore = create<FiltersState>()(
    persist((set) => ({
    ...INITIAL_FILTERS,
    setQuery: (query) => set({ query }),
    setFilter: (filter) => set({ filter }),
    }),
    { name: 'filters', storage: createJSONStorage(() => AsyncStorage) },
    ),
)


// TODO(4) — потім обгорніть його в persist (слайд 14): create<…>()(
//   persist((set) => ({ …як вище… }), { name: 'filters',
//   storage: createJSONStorage(() => AsyncStorage) })). Імпорти:
//
//   import AsyncStorage from '@react-native-async-storage/async-storage'
//   import { createJSONStorage, persist } from 'zustand/middleware'
//
// Стор готовий — переносіть стан в explore.tsx: там, де був useState,
// тепер селектор: useFiltersStore((s) => s.query).
//
// Оголошення типу поверненого стору робити не треба: zustand виведе його сам
// із того, що ви передасте в create.

// (тут поки немає жодного експорту — він з'явиться разом зі стором)
