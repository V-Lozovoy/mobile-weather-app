import { SEED_CITIES } from '../data/seed-cities'
import { db } from './client'
import { cities } from './schema'

// ДАНО — не змінюйте. Розсів перших міст: якщо таблиця cities порожня (перший
// запуск, бази ще нема), вісім міст із src/data/seed-cities.ts лягають у базу
// однією синхронною транзакцією. Драйвер expo синхронний, тому тут немає
// жодного await: db.transaction(async …) закомітився б ще до першої
// вставки. Транзакція — не для краси: посередині не буває «півсіда»,
// або всі вісім, або жодного. Зміните sortOrder у seed-cities і видалите
// застосунок з телефона — наступний запуск посіє вже новий порядок.
export function seedIfEmpty(): void {
  db.transaction((tx) => {
    const existing = tx.select({ id: cities.id }).from(cities).limit(1).all()
    if (existing.length === 0) {
      tx.insert(cities).values(SEED_CITIES).run()
    }
  })
}
