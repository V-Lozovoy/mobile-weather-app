import type { WeatherResponse } from '../types'
import { buildWeatherUrl, coordsQuery } from './urls'

// Мережевий шар, зелений із SP3: усі запити живуть тут, екрани про fetch не
// знають. fetch не кидає виняток на 400 — WeatherAPI відповідає звичайним
// статусом і тілом { error: { code, message } }, тому текст помилки читаємо
// з самого API. Мапера немає свідомо: відповідь уже у °C і словами.
//
// У SP5 цей шар питає не екран, а синк: дані йдуть у forecast_cache, а
// стрічка читає базу.

/** Погода за одним q: назвою міста або парою «широта,довгота». */
export async function fetchWeather(q: string): Promise<WeatherResponse> {
  const response = await fetch(buildWeatherUrl(q))
  if (!response.ok) {
    const payload = (await response.json()) as { error?: { message: string } }
    throw new Error(payload.error?.message ?? `HTTP ${response.status}`)
  }
  return (await response.json()) as WeatherResponse
}

/** Погода для кожного міста з бази, разом з id — цим живе синк. */
export function fetchWeatherForCities<
  T extends { id: string; latitude: number; longitude: number },
>(cities: T[]): Promise<{ id: string; weather: WeatherResponse }[]> {
  return Promise.all(
    cities.map(async (city) => ({
      id: city.id,
      weather: await fetchWeather(coordsQuery(city)),
    })),
  )
}
