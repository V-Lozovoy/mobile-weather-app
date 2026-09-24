import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'

import { CITIES } from '../../src/data/cities'
import { MANY_CITIES } from '../../src/data/many-cities'
import { fetchWeather } from '../../src/lib/api'
import { findCity } from '../../src/lib/cities'
import type { City, WeatherResponse } from '../../src/types'

// Екран міста — спадок SP3, зелений: useQuery із ключем ['weather', name] і
// staleTime 5 хвилин. Повторне відкриття міста не коштує запиту, поки дані
// свіжі; помилка несе текст із відповіді WeatherAPI; потягнули вниз —
// refetch. Дані кладуться на екран без мапера: відповідь уже у °C і словами.
//
// Одне додалося проти SP3: id шукається у двох списках. Вісім міст стрічки
// лежать у CITIES, а Explore відкриває будь-яке з трьохсот, тому місто
// доводиться шукати і там. WeatherAPI питає назвою, не координатами, тому
// запит працює для всіх трьохсот однаково.

export default function CityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const city = findCity(CITIES, id) ?? findCity(MANY_CITIES, id)

  // useQuery — гук: після умовного return його викликати не можна, тому
  // запит живе в окремому компоненті WeatherView.
  if (!city) {
    return (
      <View style={styles.screen}>
        <Text style={styles.cityName}>Місто не знайдено</Text>
        <Text style={styles.meta}>id {String(id)} немає у списку міст</Text>
      </View>
    )
  }
  return <WeatherView city={city} />
}

function WeatherView({ city }: { city: City }) {
  const { data, isPending, error, refetch, isRefetching } = useQuery({
    queryKey: ['weather', city.name],
    queryFn: () => fetchWeather(city.name),
    staleTime: 5 * 60_000,
  })

  if (isPending) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error || !data) {
    return (
      <View style={styles.screen}>
        <Text style={styles.cityName}>Не вийшло завантажити</Text>
        <Text style={styles.meta}>{error?.message ?? 'невідома помилка'}</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonLabel}>Спробувати ще</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <FlatList
      data={data.forecast.forecastday[0].hour}
      renderItem={({ item }) => <HourRow hour={item} />}
      keyExtractor={(hour) => hour.time}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
      }
      ListHeaderComponent={<WeatherHeader weather={data} />}
      contentContainerStyle={styles.list}
    />
  )
}

function WeatherHeader({ weather }: { weather: WeatherResponse }) {
  const current = weather.current
  return (
    <View style={styles.header}>
      <Text style={styles.cityName}>{weather.location.name}</Text>
      <Text style={styles.meta}>
        {weather.location.country} · {weather.location.localtime}
      </Text>
      <View style={styles.now}>
        {/* іконка приходить без протоколу: //cdn.weatherapi.com/... */}
        <Image
          source={{ uri: 'https:' + current.condition.icon }}
          style={styles.icon}
        />
        <Text style={styles.temp}>{current.temp_c}°C</Text>
      </View>
      <Text style={styles.condition}>{current.condition.text}</Text>
      <Text style={styles.meta}>
        Відчувається як {current.feelslike_c}° · вологість {current.humidity}% ·
        вітер {current.wind_kph} км/год
      </Text>
      <Text style={styles.section}>Сьогодні по годинах</Text>
    </View>
  )
}

function HourRow({
  hour,
}: {
  hour: WeatherResponse['forecast']['forecastday'][0]['hour'][0]
}) {
  // «2026-09-11 14:00» → «14:00»: година — останні п'ять символів
  const time = hour.time.slice(11)
  return (
    <View style={styles.row}>
      <Text style={styles.rowTime}>{time}</Text>
      <Text style={styles.rowTemp}>{hour.temp_c}°</Text>
      <Text style={styles.rowCondition}>{hour.condition.text}</Text>
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
  list: { padding: 16 },
  header: { alignItems: 'center', marginBottom: 8 },
  cityName: { fontSize: 30, fontWeight: '700' },
  now: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  icon: { width: 64, height: 64 },
  temp: { fontSize: 48, fontWeight: '700', marginLeft: 8 },
  condition: { fontSize: 17, marginTop: 4 },
  section: { fontSize: 15, fontWeight: '600', marginTop: 20 },
  meta: { fontSize: 15, color: '#6b7280', marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
  },
  rowTime: { fontSize: 15, fontWeight: '600', width: 56 },
  rowTemp: { fontSize: 15, fontWeight: '600', width: 56 },
  rowCondition: { fontSize: 14, color: '#6b7280', flex: 1 },
  button: {
    marginTop: 16,
    backgroundColor: '#1f2933',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonLabel: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
})
