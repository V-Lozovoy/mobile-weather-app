// Частина мережевого шару, яку видно без мережі: адреса запиту. Живе окремо
// від api.ts (де сам fetch): URL зручно читати і звіряти з документацією
// WeatherAPI окремо від коду запиту.

// Ключ викладача, вшитий у заготовку: реєструватися нічого не треба.
// Безкоштовний план WeatherAPI — мільйон запитів на місяць, парі вистачить.
export const WEATHERAPI_KEY = 'ddfb0c0d623f4b5aadb192437261009'

/**
 * Предмет TODO(1) [S3 · 5]: URL прогнозу для міста. WeatherAPI читає все з
 * query-параметрів: key (наш ключ), q (місто), days=3 (безкоштовний план
 * дає три дні прогнозу). База — https://api.weatherapi.com/v1/forecast.json.
 * Готовий URL можна відкрити в браузері й побачити відповідь, яку типує
 * WeatherResponse у src/types.ts.
 */
export function buildWeatherUrl(city: string): string {
  const params = new URLSearchParams({
    key: WEATHERAPI_KEY,
    q: city,
    days: '3',
  })

  return `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`
  
  /*
    Як зробити — зберіть параметри в URLSearchParams і приклейте їх до бази:

      const params = ...
      return `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`

    Перевірка: готовий URL у браузері показує location, current і forecast —
    ті самі поля, що читає екран погоди.
  */
}
