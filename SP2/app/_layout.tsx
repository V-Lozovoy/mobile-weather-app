import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

// Корінь застосунку: один Stack на все [S2 · 10–11]. Точка входу приносить
// сам роутер ('expo-router/entry' у package.json), маршрути він шукає в
// теці app/. Група (tabs) уже оголошена — разом із заголовком у шапці.

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: 'Cities' }} />

        {/*
          TODO(2) [SP2 · S2 слайд 11 — другий екран у Stack]:
            екран міста лежить файлом app/city/[id].tsx, але в цій розкладці
            його нема. Поки нема — перехід на /city/… відкриє екран без
            заголовка; оголосіть його поруч із (tabs) і дайте йому заголовок.

          Обережно: ім'я — дослівна частина шляху файла, разом із квадратними
            дужками; опечатка в дужках — і екран знову без заголовка.
        */}
      </Stack>
    </>
  )
}
