// Власна модель даних застосунку. City — спадок SP3: місто, яким його бачить
// стрічка, і більше нічого. Погоди в ньому немає свідомо: її віддає WeatherAPI
// на екрані міста, і живе вона у WeatherResponse [S3 · 4].
//
// Explore працює з іншим масивом — трьомастами містами, у яких погода написана
// руками. Фільтрувати їх треба локально, без мережі, тому там потрібні
// температура й умова. Саме цим CityWithWeather і відрізняється від City.

export type City = {
  /** Стабільна ідентичність: ключ списку і параметр маршруту /city/[id]. */
  id: string
  /** Те, що піде в параметр q запиту: назва, яку розуміє WeatherAPI. */
  name: string
  country: string
}

/** Місто зі статичною погодою: рядки Explore і предмет фільтрів [S4 · 20]. */
export type CityWithWeather = City & {
  /** Температура, °C — написана руками, щоб пошук працював без мережі. */
  temperature: number
  /** Погода словами; cityCondition розкладає її на три категорії. */
  condition: string
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
