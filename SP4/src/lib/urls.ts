// Розв'язок SP3, TODO(1): URL прогнозу WeatherAPI. Форма — дослівно з
// документації (Forecast weather → forecast.json); готове посилання можна
// відкрити в браузері й побачити відповідь, яку типує WeatherResponse.

// Ключ викладача, вшитий у заготовку: студентам реєструватися не треба.
// Безкоштовний план WeatherAPI — мільйон запитів на місяць, парі вистачить.
export const WEATHERAPI_KEY = 'ddfb0c0d623f4b5aadb192437261009'

export function buildWeatherUrl(city: string): string {
  const params = new URLSearchParams({
    key: WEATHERAPI_KEY,
    q: city,
    days: '3',
  })
  return `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`
}
