import type { WeatherResponse } from '../types'
import { buildWeatherUrl } from './urls'

// Мережевий шар застосунку: усі запити живуть тут, екрани про fetch не
// знають [S3 · 5]. Один запит — один екран погоди; кеш TanStack Query не
// дає повторному відкриттю міста коштувати новий запит, поки дані свіжі.

/**
 * Предмет TODO(2) [S3 · 5]: живий запит до WeatherAPI. Ужийте fetch() та buildWeatherUrl(city)
  */
export async function fetchWeather(city: string): Promise<WeatherResponse> {
  throw new Error('Запит ще не написано — це TODO(2)')
}
