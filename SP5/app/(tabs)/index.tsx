import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

import { router } from 'expo-router'
import { cityPath } from '../../src/lib/cities'
import { keyOf } from '../../src/lib/row'
import { eq } from 'drizzle-orm' 
import { db } from '../../src/db/client'
import { useLiveQuery } from '../../src/db/live'
import {cities, forecast_cache} from '../../src/db/schema'
import { useEffect } from 'react'

// Стрічка міст. Усі попередні пари список читав із файла чи зі стору — і він
// зникав разом із запуском. Сьогодні у нього з'являється дім: SQLite у
// src/db/, вісім міст посіву, і список має приїжджати live-запитом із бази.
//
// Температура на картці приходить із forecast_cache, а не з мережі: стрічку
// наповнює синк, і саме тому вона працює в авіарежимі. Поки кеш порожній, на
// місці градусів стоїть прочерк.
//
// Свайпу-видалення в цьому курсі не було й немає: видаляти з бази без запису
// в базу не можна, а запису в короткому курсі нема. Як він виглядав би —
// спитають на фінальному захисті.

export default function CitiesScreen() {
  // Стартова позиція: міста з пам'яті, погоди в них немає — тому прочерки.
  const { data: rows, error } = useLiveQuery<FeedRow[]>(
    () => db.select({
      id: cities.id,
      name: cities.name,
      country: cities.country,
      temperature: forecast_cache.temperature,
      condition: forecast_cache.condition,
    })
    .from(cities)
    .leftJoin(forecast_cache, eq(cities.id, forecast_cache.cityId))
    .orderBy(cities.sortOrder)
    .all(),
  [],)

  const feed = rows ?? []

  /*
    TODO(3) [SP5 · S5 слайди 15 і 18 — читання з бази]:
      замініть стор на live-запит: useLiveQuery із src/db/live.ts (дано;
      чому не з бібліотеки — прочитайте той файл, там шість рядків і вся
      відповідь). Після заміни файл стору src/store/cities.ts можна видалити.
      Температура приїжджає не з cities, а з forecast_cache, і кладе її туди
      синк (TODO(4)) — тому таблиці треба з'єднати. Саме leftJoin, а не join:
      поки кеш порожній, міста мають лишитися у стрічці з прочерком замість
      градусів.
    Каркас — розкоментуйте замість рядка з useCitiesStore (імпорти:
      db — із src/db/client.ts, cities і forecast_cache — із src/db/schema,
      eq — із 'drizzle-orm'):

      // const { data: rows } = useLiveQuery<FeedRow[]>(
      //   () =>
      //     db
      //       .select({
      //         id: cities.id,
      //         name: cities.name,
      //         country: cities.country,
      //         temperature: forecast_cache.temperature,
      //         condition: forecast_cache.condition,
      //       })
      //       .from(cities)
      //       .leftJoin(forecast_cache, eq(cities.id, forecast_cache.cityId))
      //       .orderBy(cities.sortOrder)
      //       .all(),
      //   [],
      // )
      // const feed = rows ?? []

    Перевірка: зійти з табу й повернутися — список на місці; вбити застосунок
      і відкрити в авіарежимі — список і температури УСЕ ЩЕ на місці. Ось це
      і є база.
    Обережно: жодного ручного refetch після дій немає й не буде — live-запит
      чує зміни сам (прапорець enableChangeListener у client.ts стоїть з
      причини [S5 · 18]).
  */

  return (
    <FlatList
      data={feed}
      renderItem={({ item }) => <CityCard city={item} />}
      keyExtractor={keyOf}
      contentContainerStyle={styles.list}
    />
  )
}

/** Рядок стрічки: місто з cities плюс погода з forecast_cache, якщо вона там є. */
export type FeedRow = {
  id: string
  name: string
  country: string
  temperature: number | null
  condition: string | null
}

function CityCard({ city }: { city: FeedRow }) {
  return (
    <Pressable style={styles.card} onPress={() => router.push(cityPath(city.id))}>
      <View>
        <Text style={styles.name}>{city.name}</Text>
        <Text style={styles.meta}>{city.country}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.temp}>
          {city.temperature === null ? '—' : `${city.temperature}°C`}
        </Text>
        {city.condition && <Text style={styles.meta}>{city.condition}</Text>}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  name: { fontSize: 17, fontWeight: '600' },
  temp: { fontSize: 17, color: '#9ca3af' },
  meta: { fontSize: 14, color: '#6b7280', marginTop: 2 },
  right: { alignItems: 'flex-end' },
})
