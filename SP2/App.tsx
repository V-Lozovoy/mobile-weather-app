import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useState } from 'react'

import { MOCK_CITIES } from './src/data/mocks'

// ДАНО — оболонка нижче готова: вона запускається і показує екран. Сьогодні ви пишете
// лише те, що названо у двох TODO, і обидва — в цьому одному файлі. Усе для даних уже
// існує: MOCK_CITIES у src/data/mocks.ts тримає три міста з поточною погодою, типізовані
// через City у src/types.ts. Спершу прочитайте обидва файли — разом це п'ятнадцять рядків.
//
// Чого тут немає — навмисно: списків (списки — це S2), навігації і другого екрана (S2),
// мережі (S3). Один екран, одна картка, одна кнопка.

export default function App() {
const [cityIndex, setCityIndex] = useState(0)

const city = MOCK_CITIES[cityIndex]

const nextCity = () => {
  setCityIndex(currentIndex => (currentIndex + 1) % MOCK_CITIES.length)
}

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Weather</Text>
      
      <View style={styles.cityCard}>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.cityCountry}>{city.country}</Text>
        <Text style={styles.cityTemperature}>{city.temperature}&deg;C</Text>
        <Text style={styles.cityCondition}>{city.condition}</Text>
      </View>

      <Pressable style={({ pressed}) => [
        styles.button,
        pressed && styles.pressedButton,
      ]}
      onPress={nextCity}
      >
        <Text style={styles.buttonText}>Next city</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingTop: 72,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 16,
  },
  hint: {
    fontSize: 15,
    color: '#6b7280',
  },
  cityCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10
  },
  cityName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  cityCountry: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 8,
  },
  cityTemperature: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  cityCondition: {
    fontSize: 16,
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#275a91',
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  pressedButton: {
    backgroundColor: '#15467a',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
})
