import type { City } from '../types'

// ДАНО, готове — сьогодні не змінюйте.
//
// Погодні дані, які показує екран, написані руками, щоб мережа не була потрібна:
// уся практична працює з вимкненим Wi-Fi. У наступній практичній цю константу
// замінить справжня відповідь API тієї ж форми — і екран не зміниться. У цьому
// й сенс даних, що живуть в окремому файлі.

export const MOCK_CITIES: City[] = [
  {
    id: 'c-1',
    name: 'Dnipro',
    country: 'Ukraine',
    temperature: 24,
    condition: 'Partly cloudy',
  },
  {
    id: 'c-2',
    name: 'Reykjavík',
    country: 'Iceland',
    temperature: 9,
    condition: 'Light rain',
  },
  {
    id: 'c-3',
    name: 'Dubai',
    country: 'UAE',
    temperature: 38,
    condition: 'Clear sky',
  },
]
