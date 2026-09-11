import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { MANY_CITIES } from '../../../SP2/src/data/many-cities'
import { keyOf, rowOf } from '../../../SP2/src/lib/row'

// Стрічка міст — запускається і працює, але двічі неправильно. Перше:
// ScrollView монтує усі триста рядків одразу, ще до першого дотику — на
// швидкому скролі це видно неозброєним оком [S2 · 5–6]. Друге: тап по
// картці нічого не відкриває [S2 · 12]. Виправляють це TODO(1) і TODO(5).

export default function CitiesScreen() {
  return (
    <ScrollView style={styles.feed} contentContainerStyle={styles.feedContent}>
      {/*
        TODO(1) [SP2 · S2 слайди 5–6 — лінивий список]:
          замініть увесь ScrollView із map нижче на FlatList: монтується лише
          те, що біля екрана, плюс запас; решта рядків приїжджає під час
          скролу. Чотири пропси: data, renderItem, keyExtractor,
          ItemSeparatorComponent. Документація:
          https://reactnative.dev/docs/flatlist
        Каркас — розкоментуйте і вбудуйте замість ScrollView (FlatList
          додайте до імпорту react-native, ScrollView звідти приберіть;
          View у списку імпортів лишиться — він потрібен розділювачу):

          <FlatList
            style={styles.feed}
            data={...}
            keyExtractor={keyOf}
            renderItem={({ item }) => (
              ...
            )}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={styles.feedContent}
          />

        Розділювач — окремий маленький компонент (не межа в стилі рядка:
          з межею лінія виросте й під останнім містом, а її там нема).
          Поставте його над StyleSheet і додайте стиль separator унизу:

          function Separator() {
            return <View style={styles.separator} />
          }

          І у FlatList: ItemSeparatorComponent={Separator}

        І головне — верстка картки. Text з одним {item.name} у каркасі —
          це заготовка, а не результат: зробіть рядок картки, де видно ім'я
          міста, країну і температуру. Наприклад: зліва ім'я з країною,
          справа температура (орієнтир — CityCard на слайді 4 і картка з
          SP1). Який саме вигляд — вирішуйте самі, стилі ваші.
        Перевірка: швидкий скрол трьохсот рядків — без білих «спалахів»
          (до заміни ви їх побачите одразу).
      */}

      {/*
        TODO(5) [SP2 · S2 слайд 12 — перехід на екран міста]:
          тап по картці має відкривати екран цього міста. Шлях будує готова
          cityPath із src/lib/cities.ts, перехід — router.push. Саме push,
          не replace: «назад» має повертатися на стрічку з її позицією скролу.
        Як зробити — додайте імпорти зверху і заповніть onPress (після
          TODO(1) рядок живе у renderItem, item — це те саме місто):

          import { router } from 'expo-router'
          import { cityPath } from '../../src/lib/cities'

          onPress={() => router.push(cityPath(item.id))}
      */}

      {MANY_CITIES.map((c) => (
        <Pressable key={keyOf(c)} style={styles.row} onPress={() => {}}>
          <Text style={styles.rowText}>{rowOf(c)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  feed: { flex: 1 },
  feedContent: { padding: 16 },
  row: { paddingVertical: 10 },
  rowText: { fontSize: 15, color: '#111827' },
})
