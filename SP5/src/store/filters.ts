import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { INITIAL_FILTERS, type CityFilter, type Filters } from '../lib/filters'

// Зелений із SP4: стор фільтрів поза деревом компонентів (zustand) + persist
// на AsyncStorage, фільтри переживають рестарт. Компоненти читають свої зрізи
// селекторами: useFiltersStore((s) => s.query). Сьогодні не змінюється.

type FiltersState = Filters & {
  setQuery: (query: string) => void
  setFilter: (filter: CityFilter) => void
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      ...INITIAL_FILTERS,
      setQuery: (query) => set({ query }),
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'filters',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
