import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

// Спадок SP2, зелений: два таби з іконками, шапки табів прибрані (headerShown:
// false), кореневий Stack дає кожному екрану свій заголовок. Сьогодні цей
// файл не змінюється.

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'list',
  explore: 'search',
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name] ?? 'ellipse'} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Cities' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
    </Tabs>
  )
}