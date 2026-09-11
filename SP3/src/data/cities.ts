import type { City } from '../types'

// ДАНО, готове — не змінюйте (крім останнього абзацу).
//
// Вісім міст стрічки. name — те, що піде в параметр q: WeatherAPI розуміє
// назви міст, але не завжди так, як ви очікуєте (q=Dnipro знаходить
// Дніпрорудне, тому тут старе ім'я міста). Відповідь завжди показує
// location.name — те, що знайшов API, а не наш рядок: так видно, кого саме
// вам відповіли.
//
// Хочете своє місто — додайте рядок: дев'ята картка з'явиться сама, разом
// із дев'ятим прогнозом.

export const CITIES: City[] = [
  { id: 'kyiv', name: 'Kyiv', country: 'Ukraine' },
  { id: 'dnipropetrovsk', name: 'Dnipropetrovsk', country: 'Ukraine' },
  { id: 'reykjavik', name: 'Reykjavik', country: 'Iceland' },
  { id: 'london', name: 'London', country: 'United Kingdom' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
  { id: 'new-york', name: 'New York', country: 'USA' },
  { id: 'dubai', name: 'Dubai', country: 'UAE' },
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa' },
]
