import { useEffect, useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { router } from 'expo-router'
import { MANY_CITIES } from '../../src/data/many-cities'
import { applyFilters, type CityFilter } from '../../src/lib/filters'
import { cityPath } from '../../src/lib/cities'
import { useRequestCounter } from '../../src/lib/counter'
import { useFiltersStore } from '../../src/store/filters'
import type { CityWithWeather } from '../../src/types'

// Зелений із SP4: debounce 400 мс (лічильник нараховує 1 на «Dnipro»),
// query і filter — у сторі з persist, компонент читає свої зрізи селекторами.
// Сьогодні цей екран не змінюється: робота пари — у стрічці й базі.

const FILTERS: CityFilter[] = ['all', 'warm', 'cold', 'rain']
const FILTER_LABEL: Record<CityFilter, string> = {
  all: 'Усі',
  warm: 'Тепло',
  cold: 'Холодно',
  rain: 'Дощ',
}

export default function ExploreScreen() {
  const query = useFiltersStore((s) => s.query)
  const filter = useFiltersStore((s) => s.filter)
  const setQuery = useFiltersStore((s) => s.setQuery)
  const setFilter = useFiltersStore((s) => s.setFilter)

  const [debounced, setDebounced] = useState('')
  const [results, setResults] = useState<CityWithWeather[]>([])
  const { count, bump } = useRequestCounter()

  // один «запит» на паузу набору: нова літера скасовує попередній таймер
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 400)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!debounced) {
      setResults([])
      return
    }
    bump()
    const byName = MANY_CITIES.filter((c) =>
      c.name.toLowerCase().includes(debounced.toLowerCase()),
    )
    setResults(applyFilters(byName, { query: debounced, filter }))
  }, [debounced, filter])

  const chips = useMemo(
    () =>
      FILTERS.map((f) => (
        <Pressable
          key={f}
          style={[styles.chip, f === filter && styles.chipOn]}
          onPress={() => setFilter(f)}
        >
          <Text style={[styles.chipText, f === filter && styles.chipTextOn]}>
            {FILTER_LABEL[f]}
          </Text>
        </Pressable>
      )),
    [filter, setFilter],
  )

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Пошук міста"
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.counter}>Запитів: {count}</Text>
      <ScrollView horizontal style={styles.chips} contentContainerStyle={{ gap: 8 }}>
        {chips}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.results}>
        {results.map((city) => (
          <Pressable
            key={city.id}
            style={styles.row}
            onPress={() => router.push(cityPath(city.id))}
          >
            <Text style={styles.rowName}>{city.name}</Text>
            <Text style={styles.rowMeta}>{city.country}</Text>
          </Pressable>
        ))}
        {results.length === 0 && <Text style={styles.empty}>Нікого не знайшли</Text>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 8 },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  counter: { fontSize: 13, color: '#6b7280' },
  chips: { flexGrow: 0 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  chipOn: { backgroundColor: '#111827' },
  chipText: { fontSize: 13, color: '#374151' },
  chipTextOn: { color: '#ffffff' },
  results: { gap: 8, paddingBottom: 24 },
  row: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowName: { fontSize: 15, fontWeight: '600' },
  rowMeta: { fontSize: 14, color: '#6b7280' },
  empty: { color: '#6b7280', paddingVertical: 24, textAlign: 'center' },
})
