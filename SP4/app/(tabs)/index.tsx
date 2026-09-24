import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

import { router } from 'expo-router'

import { CITIES } from '../../src/data/cities'
import { cityPath } from '../../src/lib/cities'
import { keyOf } from '../../src/lib/row'
import type { City } from '../../src/types'

// Список міст — спадок SP2-SP3, зелений і сьогодні не змінюється: FlatList,
// картки, навігація, а за тапом — живий запит на екрані міста. Робота пари
// живе на сусідньому табі, Explore: там пошук стріляє на кожну літеру, а
// фільтри не переживають навіть перемикання таба.

export default function CitiesScreen() {
  return (
    <FlatList
      data={CITIES}
      renderItem={({ item }) => <CityCard city={item} />}
      keyExtractor={keyOf}
      contentContainerStyle={styles.list}
    />
  )
}

function CityCard({ city }: { city: City }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(cityPath(city.id))}
    >
      <View>
        <Text style={styles.name}>{city.name}</Text>
        <Text style={styles.meta}>{city.country}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
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
  meta: { fontSize: 14, color: '#6b7280', marginTop: 2 },
  chevron: { fontSize: 22, color: '#c3c9d2' },
})
