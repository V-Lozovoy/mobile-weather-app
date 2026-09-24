import type { WeatherResponse } from '../types'
import { buildWeatherUrl } from './urls'

// Розв'язок SP3, TODO(2): один запит до WeatherAPI. fetch не кидає виняток
// на 400 — WeatherAPI відповідає звичайним статусом із тілом
// { error: { code, message } }, тому текст помилки читаємо з самого API:
// користувач бачить «No matching location found.», а не «HTTP 400».
// Мапера нема свідомо: відповідь уже у °C і вже словами — типу достатньо.

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  const response = await fetch(buildWeatherUrl(city))
  if (!response.ok) {
    const payload = (await response.json()) as { error?: { message: string } }
    throw new Error(payload.error?.message ?? `HTTP ${response.status}`)
  }
  return (await response.json()) as WeatherResponse
}
