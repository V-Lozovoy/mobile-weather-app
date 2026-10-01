import { useState } from 'react'

// Лічильник «запитів» — інструмент самоперевірки, не зразок архітектури:
// сира глобальна змінна і жодного стану батька. До TODO(1) він показує 6 на
// «Dnipro», після — 1. На захисті його можна прибрати, але не обов'язково.

let requests = 0

export function useRequestCounter() {
  const [count, setCount] = useState(requests)
  return {
    count,
    bump: () => setCount(++requests),
  }
}
