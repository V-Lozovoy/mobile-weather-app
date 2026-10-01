import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Text } from 'react-native'
import { SQLiteProvider } from 'expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '../drizzle/migrations'
import { db } from '../src/db/client'
import { seedIfEmpty } from '../src/db/seed'
import { syncForecasts } from '../src/lib/sync'
import { cities } from '../src/db/schema'

const queryClient = new QueryClient()

// Провайдери + кореневий Stack, як у SP3-SP4. QueryClientProvider тут уже
// стоїть: на екрані міста живе useQuery із SP3, і без провайдера він упаде.
// Нове в SP5 — база: вона має піднятися ДО першого екрана, інакше live-запити
// стріляють у ще не створені таблиці.

function Screens() {
  const { success, error } = useMigrations(db, migrations)

  useEffect(() => {
    if (!success) return
    seedIfEmpty()
    syncForecasts().catch((e) => console.warn('sync failed', e))
  }, [success])

  if (error) return <Text>Помилка міграції: {error.message}</Text>
  if (!success) return null

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: 'Weather Cities' }} />
      <Stack.Screen name="city/[id]" options={{ title: 'Місто' }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <SQLiteProvider databaseName="weather.db"><Screens /></SQLiteProvider>
    </QueryClientProvider>
  )
}
  /*
    TODO(2) [SP5 · S5 слайди 10–11 — міграції на старті]:
      спершу породіть міграції: npx drizzle-kit generate (після TODO(1)) —
      у теці drizzle/ з'явиться SQL. Далі тут: обгорніть Stack у
      SQLiteProvider з expo-sqlite (той самий файл weather.db — provider
      відкриває його за іменем), застосуйте міграції і запустіть розсів + синк.
      SQLiteProvider стає під QueryClientProvider: порядок — запити, база,
      екрани.
    Каркас — розкоментуйте і заповніть (імпорти допишіть: useEffect з
      'react', SQLiteProvider з 'expo-sqlite', useMigrations з
      'drizzle-orm/expo-sqlite/migrator', migrations — default-експорт із
      '../drizzle/migrations', db із src/db/client.ts, seedIfEmpty і
      syncForecasts):

      // function Screens() {
      //   useMigrations(db, migrations)
      //   useEffect(() => {
      //     seedIfEmpty()          // один раз за запуск
      //     syncForecasts()        // це TODO(4): без нього кеш порожній
      //   }, [])
      //   return ( …той самий Stack, що нижче… )
      // }

      // у RootLayout:
      // <SQLiteProvider databaseName="weather.db">
      //   <Screens />
      // </SQLiteProvider>

    Обережно: обгортка має стати НАД навігатором — і під провайдерами
      реакта, якщо вони колись з'являться. Порядок: база → запити → екрани.
  */