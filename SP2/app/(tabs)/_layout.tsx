import { Tabs } from 'expo-router'

// ДАНО, майже готове: навігатор табів уже з'єднує обидва екрани цієї групи
// (імена — від імен файлів) і дає кожному заголовок. Шапки табів прибрані
// через headerShown: false — інакше кореневий Stack і Tabs малювали б два
// заголовки один над одним [S2 · 11]; цього пропса вже не чіпайте.
// Не вистачає одного: іконок.

// TODO(3) [SP2 · S2 слайд 11 — іконки табів]:
//   іконка — це проп tabBarIcon, а не картинка. Набір іконок Ionicons уже
//   стоїть у залежностях; саму бібліотеку ми не вивчаємо, тож імена вже
//   обрані: 'list' для Cities, 'search' для Explore.
// Як зробити — розкоментуйте і вставте на своє місце:
//   1) імпорт Ionicons додайте зверху;
//   2) словник ICONS — під цим коментарем;
//   3) замініть <Tabs screenOptions={{ headerShown: false }}> на версію
//      з tabBarIcon із прикладу.

//   import { Ionicons } from '@expo/vector-icons'

//   const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
//     index: 'list',
//     explore: 'search',
//   }

//   <Tabs
//     screenOptions={({ route }) => ({
//       headerShown: false,
//       tabBarIcon: ({ color, size }) => (
//         <Ionicons name={ICONS[route.name] ?? 'ellipse'} size={size} color={color} />
//       ),
//     })}
//   >
// Перевірка: під кожним табом з'являється картинка, а не лише текст;
//   перемикання табів не губить скрол стрічки.

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Cities' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
    </Tabs>
  )
}
