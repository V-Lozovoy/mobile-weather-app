// Власна модель даних застосунку. City — те, що обирає користувач у стрічці;
// WeatherResponse — відповідь WeatherAPI, і вона вже готова до екрана:
// температура у °C, погода словами, іконка готовою картинкою. Мапер не
// потрібен: тип описує поля, які екран читає, — і цього достатньо. Решта
// полів справжньої відповіді (а їх сотні) просто ігнорується.

export type City = {
  /** Стабільна ідентичність: ключ списку і параметр маршруту /city/[id]. */
  id: string
  /** Те, що піде в параметр q запиту: назва, яку розуміє WeatherAPI. */
  name: string
  country: string
}

/** Відповідь forecast.json WeatherAPI — тільки поля, які читає екран. */
export type WeatherResponse = {
  location: {
    name: string
    country: string
    localtime: string
  }
  current: {
    temp_c: number
    feelslike_c: number
    humidity: number
    wind_kph: number
    condition: { text: string; icon: string; code: number }
  }
  forecast: {
    forecastday: {
      date: string
      hour: {
        time: string
        temp_c: number
        condition: { text: string; icon: string }
      }[]
    }[]
  }
}
