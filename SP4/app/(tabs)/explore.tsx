import { useEffect, useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { router } from 'expo-router'
import { MANY_CITIES } from '../../src/data/many-cities'
import { applyFilters, type CityFilter } from '../../src/lib/filters'
import { cityPath } from '../../src/lib/cities'
import { useRequestCounter } from '../../src/lib/counter'
import { useFiltersStore } from '../../src/store/filters'

// Таб Explore: пошук міст і фільтри. Сьогодні він працює - і працює погано,
// причому наочно: наберіть «Dnipro» - лічильник угорі нарахує шість «запитів»,
// по одному на кожну літеру. Фільтри (погода) живуть у useState цього екрана
// і зникають разом з ним. Це і є робота пари: один запит на паузу набору,
// фільтри - у сторі, що переживає все.

const FILTERS: CityFilter[] = ['all', 'warm', 'cold', 'rain']
const FILTER_LABEL: Record<CityFilter, string> = {
  all: 'Усі',
  warm: 'Тепло',
  cold: 'Холодно',
  rain: 'Дощ',
}

export default function ExploreScreen() {
  const query = useFiltersStore((s) => s.query)
  const setQuery = useFiltersStore((s) => s.setQuery)
  const filter = useFiltersStore((s) => s.filter)
  const setFilter = useFiltersStore((s) => s.setFilter)
  
  const [results, setResults] = useState<typeof MANY_CITIES>([])
  const { count, bump } = useRequestCounter()

  /*
    TODO(1) [SP4 · S4 слайд 20 - ефект і cleanup]:
      «запит» стріляє на кожну літеру - лічильник це показує. Зробіть один
      запит на паузу набору: debounce 400 мс. Математика - у готовій
      shouldFireAt (src/lib/debounce.ts); тут - живий годинник.
    Каркас - розкоментуйте і підключіть: ефект пошуку нижче має
      спрацьовувати на відкладене значення, а не на кожну літеру:

    Перевірка: набрати «Dnipro» - лічильник 1, не 6.
  */

  const [debounced, setDebounced] = useState('')
      useEffect(() => {
        const timer = setTimeout(() => setDebounced(query), 400)
        return () => clearTimeout(timer) // нова літера скасовує старий
      }, [query])

  useEffect(() => {
    if (!debounced) {
      setResults([])
      return
    }
    bump()
    // «Запит»: локальний пошук по MANY_CITIES без мережі - сьогодні важлива
    // не форма запиту, а його частота.
    const byName = MANY_CITIES.filter((c) =>
      c.name.toLowerCase().includes(debounced.toLowerCase()),
    )
    setResults(applyFilters(byName, { query: debounced, filter }))
  }, [debounced, filter])

  /*
    TODO(2) [SP4 · S4 слайд 9 - стор поза деревом]:
      query і filter живуть у useState цього екрана - перемкнули таб, вбили
      застосунок, усе зникло. Перенесіть їх у src/store/filters.ts: там уже
      лежить готовий каркас стора в коментарях; у цьому файлі обидва useState
      замінюються селекторами й діями стору.
    TODO(3) [SP4 · S4 слайд 9 - селектори]:
      читаючи стор, беріть своє, не весь:

      // const query = useFiltersStore((s) => s.query)
      // const setQuery = useFiltersStore((s) => s.setQuery)

      Хто передрябає весь стор у кожен компонент - той перерендерить весь
      екран на кожну літеру.
    TODO(4) [SP4 · S4 слайд 14 - persist]:
      обгорніть стор у persist (zustand/middleware) із AsyncStorage -
      імпорти і форма - у коментарях src/store/filters.ts. Фільтри мають
      пережити повний рестарт.
    TODO(5) [SP4 · S4 слайд 20 - застосування фільтра]:
      applyFilters у src/lib/filters.ts зараз повертає вхід без змін -
      чіпи погоди ні на що не впливають, і це видно. Каркас умови фільтра
      подано в тому файлі; вашу частину - умову пошуку - допишіть там.
  */

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
    [filter],
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

