// Синк прогнозів: API → SQLite, однією транзакцією, у таблицю forecast_cache.
// Ключ рядка — city_id: один рядок на місто, нова відповідь затирає стару.
// Далі за цим кешем живе стрічка: мережі нема — температури є.

/**
 * Предмет TODO(4) [S5 · 19]:
 *   міста беруться з бази (вони там після розсіву), погода — з
 *   fetchWeatherForCities(): він питає WeatherAPI за координатами кожного
 *   міста і повертає пари { id, weather }. Кожну пару треба покласти в
 *   forecast_cache: insert…onConflictDoUpdate({ target: forecast_cache.cityId })
 *   — нова відповідь затирає стару, а не дублює рядки. Усі міста — одним
 *   db.transaction: або весь кеш оновився, або нічого.
 *   JSON у базу пишеться рядком: hourlyJson і dailyJson — це JSON.stringify,
 *   бо колонка text, а не об'єкт. syncedAt — new Date().toISOString().
 * Обережно: транзакція синхронна. expo-драйвер drizzle синхронний, і
 *   db.transaction(async (tx) => …) закомітів би її ще до першої вставки —
 *   беріть db.transaction((tx) => …) і .run() на кожному запиті. Мережу
 *   чекайте ДО транзакції: усередині await бути не може.
 */
/*
  Каркас — розкоментуйте і заповніть значення полів (імпорти:
  fetchWeatherForCities з './api', db з '../db/client', cities і
  forecast_cache з '../db/schema'):

  // const rows = db.select().from(cities).all()
  // const answers = await fetchWeatherForCities(rows)   // мережа — до транзакції
  // db.transaction((tx) => {
  //   for (const { id, weather } of answers) {
  //     const today = weather.forecast.forecastday[0]
  //     const values = {
  //       cityId: id,
  //       // temperature, condition — із weather.current (temp_c і condition.text)
  //       // weatherCode — weather.current.condition.code
  //       // windSpeed — weather.current.wind_kph
  //       // hourlyJson — JSON.stringify(today.hour)
  //       // dailyJson — JSON.stringify(weather.forecast.forecastday.map((d) => d.day))
  //       syncedAt: new Date().toISOString(),
  //     }
  //     tx.insert(forecast_cache)
  //       .values(values)
  //       .onConflictDoUpdate({ target: forecast_cache.cityId, set: values })
  //       .run()
  //   }
  // })
*/
export async function syncForecasts(): Promise<void> {
  // Заглушка: кеш не наповнюється, тому в стрічці замість температур стоять
  // прочерки. Перевірити це можна і в базі —
  // console.log(db.select().from(forecast_cache).all()).
}
