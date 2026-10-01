// Адреса запиту і ключ. Живе окремо від api.ts (де сам fetch): URL зручно
// читати і звіряти з документацією WeatherAPI окремо від коду запиту.

// Ключ викладача, вшитий у заготовку: реєструватися нічого не треба.
// Безкоштовний план WeatherAPI — мільйон запитів на місяць, парі вистачить.
export const WEATHERAPI_KEY = 'ddfb0c0d623f4b5aadb192437261009'

/**
 * URL прогнозу. Параметр q приймає і назву міста («Kyiv»), і пару
 * «широта,довгота» («50.4501,30.5234») — форма та сама, відповідь та сама.
 * days=3: стільки прогнозу дає безкоштовний план.
 */
export function buildWeatherUrl(q: string): string {
  const params = new URLSearchParams({
    key: WEATHERAPI_KEY,
    q,
    days: '3',
  })
  return `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`
}

/**
 * Координати міста у вигляді, який розуміє q. Синк питає саме так: назва
 * неоднозначна (q=Dnipro віддає Дніпрорудне), координати — ні.
 */
export function coordsQuery(city: { latitude: number; longitude: number }): string {
  return `${city.latitude},${city.longitude}`
}
