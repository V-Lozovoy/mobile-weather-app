import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

// Провайдер TanStack Query огорнує весь застосунок — це дано, а не завдання:
// без нього useQuery не працює, а шукати цю деталь — не ваша робота.
// Сам useQuery приїхав із SP3 і сьогодні зелений: він на екрані міста.
const queryClient = new QueryClient()

// Точка входу — 'expo-router/entry' (у package.json). Ця розкладка з SP2:
// кореневий Stack із двома екранами, заголовок один, таб-бар ховається
// пропсом headerShown у групі (tabs) — ви знайшли його минулої пари.

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: 'Weather Cities' }} />
        <Stack.Screen name="city/[id]" options={{ title: 'Місто' }} />
      </Stack>
    </QueryClientProvider>
  )
}
