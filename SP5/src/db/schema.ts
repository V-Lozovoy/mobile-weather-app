import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Схема бази — як виглядають таблиці, описані кодом замість SQL. Цей файл читають
// одразу дво: застосунок (типи рядків) і drizzle-kit (з нього генеруються
// міграції).
//
// Одна річ, яку варто сказати наперед: у SQLite немає boolean і немає date [S5 · 8].
// Бульове поле — це integer 0/1 (у drizzle — mode: 'boolean', і конвертація
// автоматична), дата — text з ISO-рядком усередині. Хто шукає тут boolean-колонку,
// шукає те, чого в SQLite не існує.

export const cities = sqliteTable('cities', {
  // Формат-зразок: перші два поля готові — робіть решту так само.
  // text('...') — це і тип колонки, і її ім'я в базі (в апострофах).
  id: text('id').primaryKey(),
  name: text('name').notNull(),

  // TODO(1) [SP5 · S5 слайди 8–9]:
  //   допишіть решту колонок cities і всю таблицю forecast_cache.
  //   Каркас перших трьох колонок і першої колонки кешу — нижче в коментарі;
  //   розкоментуйте і ведіть далі тим самим патерном. Повний список:
  //   у cities — country (text), admin1 (text, буває без регіону — null ок),
  //   latitude і longitude (real), sortOrder (integer), favorite (integer
  //   із mode: 'boolean'), createdAt (text, ISO-рядок). Друга таблиця —
  //   forecast_cache, ключ city_id: один рядок на місто — temperature (real),
  //   condition (text), weatherCode (integer), windSpeed (real), hourlyJson
  //   (text, notNull), dailyJson (text), syncedAt (text, notNull).
  //
  //     country: text('country').notNull(),
  //     admin1: text('admin1'),
  //     latitude: real('latitude').notNull(),
  //     // … longitude, sortOrder, favorite, createdAt …
  //
  //   export const forecast_cache = sqliteTable('forecast_cache', {
  //     cityId: text('city_id').primaryKey(),
  //     // … решта колонок кешу …
  //   })
  //
  //   Після цього файлу запуститься npx drizzle-kit generate (TODO(2)).
  //   Обережно: рядок тут — це ColumnBuilder, а не значення; дужки й .notNull()
  //   обов'язкові. Ім'я в апострофах — ім'я колонки в SQL, і воно
  //   не перейменовується саме. weatherCode, windSpeed і dailyJson лишаються
  //   nullable, але заповнює їх уже синк: WeatherAPI віддає condition.code,
  //   wind_kph і денний підсумок на три дні разом із поточною погодою.
})
