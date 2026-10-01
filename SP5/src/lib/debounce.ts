// Частина debounce, зелена з SP4: за мітками натискань — моменти пострілів.
// Кожен сплеск закінчується одним запитом: через ms після останнього
// натискання сплеску.

export function shouldFireAt(times: number[], ms: number): number[] {
  if (times.length === 0) return []
  const fires: number[] = []
  let burstStart = 0
  for (let i = 1; i <= times.length; i++) {
    const burstOver = i === times.length || times[i] - times[i - 1] >= ms
    if (burstOver) {
      fires.push(times[i - 1] + ms)
      if (i < times.length) burstStart = i
    }
  }
  return fires
}
