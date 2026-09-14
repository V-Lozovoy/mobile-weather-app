import { Pressable, FlatList, StyleSheet, Text, View } from 'react-native'

import { MANY_CITIES } from '../../../SP2/src/data/many-cities'
import { keyOf, rowOf } from '../../../SP2/src/lib/row'
import { router } from 'expo-router'
import { cityPath } from '../../../SP2/src/lib/cities'

// Стрічка міст — запускається і працює, але двічі неправильно. Перше:
// ScrollView монтує усі триста рядків одразу, ще до першого дотику — на
// швидкому скролі це видно неозброєним оком [S2 · 5–6]. Друге: тап по
// картці нічого не відкриває [S2 · 12]. Виправляють це TODO(1) і TODO(5).

export default function CitiesScreen() {
  return (
    <FlatList
            style={styles.feed}
            data={MANY_CITIES}
            keyExtractor={keyOf}
            renderItem={({ item }) => (
              <Pressable style={styles.row} onPress={() => router.push(cityPath(item.id))}>
                <View style={styles.cityInfo}>
                  <Text style={styles.cityName}>{item.name}</Text>
                  <Text style={styles.cityCountry}>{item.country}</Text>
                </View>

                <Text style={styles.temperature}>{item.temperature}&deg;C</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={styles.feedContent}
          />
  )
}

function Separator() {
  return <View style={styles.separator} />
}
      {/*
        TODO(1) [SP2 · S2 слайди 5–6 — лінивий список]:
          замініть увесь ScrollView із map нижче на FlatList: монтується лише
          те, що біля екрана, плюс запас; решта рядків приїжджає під час
          скролу. Чотири пропси: data, renderItem, keyExtractor,
          ItemSeparatorComponent. Документація:
          https://react2native.dev/docs/flatlist
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

const styles = StyleSheet.create({
  feed: { flex: 1, backgroundColor: '#e8f0f8' },
  feedContent: { padding: 16 },
  row: { paddingVertical: 10 },
  rowText: { fontSize: 15, color: '#111827' },
  cityInfo: { flex: 1 },
  cityName: { fontSize: 15, color: '#111827' },
  cityCountry: { fontSize: 13, color: '#6b7280' },
  temperature: { fontSize: 15, color: '#111827' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#a3a5aa', marginVertical: 4 },
})
