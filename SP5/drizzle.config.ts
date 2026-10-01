import { defineConfig } from 'drizzle-kit'

// ДАНО — не змінюйте. Це ворота міграцій: drizzle-kit читає схему зі src/db/schema.ts
// і складає SQL у теці ./drizzle. Поки теці немає — міграцій немає; появу їй дає
// команда `npx drizzle-kit generate` (SP5 · TODO(2)). Код застосунку ці SQL-файли
// імпортує через useMigrations — тому «код не зійшовся зі схемою» ловиться ще
// на запуску, а не на першому запиті в базу.
export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './src/db/schema.ts',
  out: './drizzle',
})
