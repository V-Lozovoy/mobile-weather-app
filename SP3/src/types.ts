// Власна модель даних застосунку. P1 потрібен один тип: місто таким, яким його бачить
// екран. У наступних практичних він росте крок за кроком — не переписуйте його,
// а розширюйте.

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

