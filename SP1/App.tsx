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
  const [cityNumber, setCityNumber] = useState(0)

  const city = MOCK_CITIES[cityNumber]

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Weather</Text>

      {/*
        TODO(1) [SP1 · S1 слайди 18 і 20 — core-компоненти, StyleSheet]:
          замініть підказку нижче на перше місто з MOCK_CITIES.
          Треба: <View>-картка із <Text> усередині — ім'я міста, країна, поточна
                 температура і погода словами. Усі чотири значення — це поля
                 MOCK_CITIES[0]; надрукуйте їх, а не переписуйте руками.
          Верстка: розширте StyleSheet унизу — картка це фон, трохи відступів
                 і заокруглений кут. Числа в стилях — без одиниць.
          Обережно: кожен рядок живе всередині <Text>. <View>{city.name}</View> —
                 червоний екран на пристрої, а не попередження.
      */}
      
      <View style={styles.cityCard}>
        <Text>{city.name}</Text>
        <Text>{city.country}</Text>
        <Text>{city.temperature}</Text>
        <Text>{city.condition}</Text>
      </View>

      {/*
        TODO(2) [SP1 · S1 слайд 18 — Pressable у зразку CityCard]:
          зробіть екран інтерактивним: <Pressable> із <Text>-підписом («Next city»),
          який змінює картку на наступне місто з MOCK_CITIES — і після останнього
          замикає цикл на першому.
          Як: один useState тримає індекс показаного міста; onPress робить крок уперед
                 (остача % замикає цикл). Це простий React, який ви вже знаєте, — тема
                 «де має жити значення» це L5, одному екрану вона сьогодні не потрібна.
          Імпорти додасте самі: useState із 'react', Pressable із 'react-native'.
      */}
      


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
})
