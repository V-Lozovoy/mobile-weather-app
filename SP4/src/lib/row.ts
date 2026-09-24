// Спадок SP2, зелений до кінця курсу.

/** Ключ рядка списку: id, не індекс — індекси ламають ключі при зміні даних. */
export function keyOf(item: { id: string }): string {
  return item.id
}
