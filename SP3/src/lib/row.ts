// Спадок SP2, зелений до кінця курсу.

/** Ключ рядка стрічки: його підставляють у keyExtractor списку. */
export function keyOf(item: { id: string }): string {
  return item.id
}