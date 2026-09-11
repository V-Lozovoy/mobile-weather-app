import { StyleSheet, Text, View } from 'react-native'

import { MANY_CITIES } from '../../../SP2/src/data/many-cities'
import { findCity } from '../../../SP2/src/lib/cities'

// Екран міста. Ім'я файлу [id] означає: частина маршруту після /city/
// прилітає сюди параметром [S2 · 9 і 13]. Але поки цей код параметр не
// читає: id захардкоджений, тож /city/c-2 і навіть /city/абракадабра
// показують Дніпро. І це не «екран», а одне ім'я по центру.

export default function CityScreen() {
  /*
    TODO(4) [SP2 · S2 слайди 12–13 — параметр маршруту]:
      прочитайте id РЯДКОМ і знайдіть місто за ним. Параметр із адреси —
      завжди рядок, навіть якщо виглядає як число; findCity уже готова в
      src/lib/cities.ts.
    Як зробити — імпорт useLocalSearchParams з 'expo-router' додайте
      зверху і замініть рядок з 'c-1' нижче на ці два:

      const { id } = useLocalSearchParams<{ id: string }>()
      const city = findCity(MANY_CITIES, id)

    Невідомий id — окремий стан «не знайдено»: спокійний текст по центру,
      без краху. Замініть `if (!city) return null` на:

      if (!city) {
        return (
          <View style={styles.screen}>
            <Text style={styles.name}>Місто не знайдено</Text>
            <Text style={styles.meta}>id {String(id)} немає у списку міст</Text>
          </View>
        )
      }

    І верстка самого екрана — ваша робота: зараз тут самотнє ім'я, а має
      бути повний екран міста: ім'я, країна, температура і погода словами
      (орієнтир — картка з SP1; стилі допишете унизу, style meta —
      сірий підпис — уже чекає).
    Обережно: 'c-1' і 'C-1' — різні рядки; id у many-cities пишуться
      маленькими.
  */
  const city = findCity(MANY_CITIES, 'c-1')

  if (!city) return null

  return (
    <View style={styles.screen}>
      <Text style={styles.name}></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
    padding: 24,
  },
  name: { fontSize: 30, fontWeight: '700' },
  meta: { fontSize: 15, color: '#6b7280', marginTop: 4 },
})
