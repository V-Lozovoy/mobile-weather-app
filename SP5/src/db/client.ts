import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'

import * as schema from './schema'

// ДАНО — не змінюйте. Одне з'єднання на весь застосунок: файл weather.db лежить
// у песочниці застосунку на пристрої, тому переживає і рестарт, і відсутність
// мережі. openDatabaseSync відкриває базу одразу, синхронно — того ж вимагає
// drizzle-обгортка; ніяких await на старті. SQLiteProvider у TODO(2) відкриває
// цей самий файл за іменем — одне з'єднання, скрізь.
//
// enableChangeListener: true — не прикраса. Без нього live-запити не стріляють:
// запис спокійно лягає в базу, а екран його не чує, і шукати цей баг ви б
// вигадали в самому запиті. Студент сам би цього прапорця не знайшов — тому
// він уже стоїть, і чому він тут, сказано на лекції [S5 · 16].
export const sqlite = openDatabaseSync('weather.db', { enableChangeListener: true })

export const db = drizzle(sqlite, { schema })
