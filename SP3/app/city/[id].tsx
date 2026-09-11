import { StyleSheet, Text, View } from 'react-native'

import { useLocalSearchParams } from 'expo-router'

import { CITIES } from '../../src/data/cities'
import { findCity } from '../../src/lib/cities'

// Екран погоди — головна робота пари. Зараз тут заглушка: місто за id
// знаходиться, а погоди нема — її принесе запит до WeatherAPI через
// TanStack Query. Це TODO(3) (запит і стани) і TODO(4) (дані на екрані),
// каркаси — у коментарях нижче.

export default function CityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const city = findCity(CITIES, id)

  if (!city) {
    return (
      <View style={styles.screen}>
        <Text style={styles.name}>Місто не знайдено</Text>
        <Text style={styles.meta}>id {String(id)} немає у списку міст</Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.name}>{city.name}</Text>
      <Text style={styles.meta}>{city.country}</Text>
      <Text style={styles.hint}>Погода приїде з WeatherAPI — TODO(3) і TODO(4)</Text>
    </View>
  )
}

/*
  TODO(3) [SP3 · S3 слайди 13–14 — запит через TanStack Query]:
    замініть заглушку на useQuery (провайдер уже обгорнутий в app/_layout.tsx).
    useQuery — хук: його не можна викликати після умовного return вище, тому
    запит живе в окремому компоненті WeatherView, а CityScreen лишите як є.
  Каркас — розкоментуйте, заповніть, далі за текстом:

    // import { useQuery } from '@tanstack/react-query'
    // import { fetchWeather } from '../../src/lib/api'
    // import type { City, WeatherResponse } from '../../src/types'
    //
    // function WeatherView({ city }: { city: City }) {
    //   const { data, isPending, error, refetch, isRefetching } = useQuery({
    //     queryKey: ['weather', city.name], // місто — частина ключа
    //     queryFn: () => fetchWeather(city.name),
    //     staleTime: 5 * 60_000, // 5 хвилин дані вважаються свіжими
    //   })
    //
    //   if (isPending) {
    //     return ( …ActivityIndicator по центру… )
    //   }
    //   if (error) {
    //     return (
    //       …текст error.message (його напише TODO(2)) і кнопка
    //       «Спробувати ще»: onPress={() => refetch()}…
    //     )
    //   }
    //   return <WeatherData weather={data} /> // TODO(4)
    // }
    //
    // …а в CityScreen замість заглушки: return <WeatherView city={city} />

  Перевірка: вийшли з міста й одразу повернулися — дані миттєво, без
  спінера (кеш, той самий ключ); режим літака — екран помилки з кнопкою,
  а не порожні дані; хвилин через п'ять — новий запит (staleTime минув).
*/

/*
  TODO(4) [SP3 · S3 слайди 8–9 — дані на екрані]:
    поля відповіді вже у °C і вже словами — мапер не потрібен, екран читає
    їх напряму. Що де лежить — у src/types.ts (WeatherResponse): поточна
    погода в current, сьогоднішні 24 години — у forecast.forecastday[0].hour.
  Каркас — розкоментуйте і заповніть пропущені поля:

    // function WeatherData({ weather }: { weather: WeatherResponse }) {
    //   return (
    //     <FlatList
    //       data={weather.forecast.forecastday[0].hour}
    //       keyExtractor={(hour) => hour.time}
    //       refreshControl={
    //         <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
    //       } // refetch і isRefetching дістаються з useQuery — прокиньте їх
    //         // пропсами з WeatherView (або тримайте FlatList там)
    //       ListHeaderComponent={
    //         <View style={styles.header}>
    //           <Text style={styles.cityName}>{weather.location.name}</Text>
    //           // country і localtime — мета-рядком поруч
    //           <Image
    //             source={{ uri: 'https:' + weather.current.condition.icon }}
    //             style={styles.icon}
    //           />
    //           <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
    //           // condition.text — під температурою;
    //           // feelslike_c, humidity, wind_kph — одним мета-рядком
    //           <Text style={styles.section}>Сьогодні по годинах</Text>
    //         </View>
    //       }
    //       renderItem={({ item }) => (
    //         // item.time виглядає «2026-09-11 14:00» — година це останні
    //         // п'ять символів: item.time.slice(11)
    //         // далі item.temp_c і item.condition.text
    //       )}
    //     />
    //   )
    // }

  Іконка приходить готовою картинкою, але без протоколу:
  //cdn.weatherapi.com/weather/64x64/night/113.png — їй бракує «https:».
  Це єдине «перетворення» даних у всьому застосунку.

  Перевірка: потягнули екран вниз — спінер у шапці, дані оновилися.
*/

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
  hint: { fontSize: 14, color: '#9aa3af', marginTop: 16 },
})
