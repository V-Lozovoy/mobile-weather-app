import { addDatabaseChangeListener } from 'expo-sqlite'
import { useEffect, useState } from 'react'

// ДАНО, готове — не змінюйте.
//
// Цикл live-запиту зі слайда S5 · 17, своїми руками: запит виконується, база
// змінюється — запит виконується ще раз, і екран отримує нові дані сам, без
// жодного ручного refetch. Зміни чує addDatabaseChangeListener з expo-sqlite —
// той самий механізм, на якому стоїть enableChangeListener у client.ts.
//
// Чому не бібліотечний useLiveQuery з drizzle-orm: у цій версії (0.45) він
// уміє лише асинхронний режим, а expo-драйвер drizzle — синхронний. Шість
// рядків замість боротьби з бібліотекою — і жодної магії: ви бачите весь цикл.
// Коли drizzle полагодить це у своїх релізах, файл можна буде видалити.

export function useLiveQuery<T>(query: () => T, deps: unknown[] = []): {
  data: T | undefined
  error: Error | undefined
  updatedAt: Date | undefined
} {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()
  const [updatedAt, setUpdatedAt] = useState<Date>()

  useEffect(() => {
    const run = () => {
      try {
        setData(query())
        setUpdatedAt(new Date())
        setError(undefined)
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)))
      }
    }
    run()
    const listener = addDatabaseChangeListener(run)
    return () => listener.remove()
    // deps свідомо керовані викликом: запит свіжий тоді, коли він свіжий
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, error, updatedAt }
}
