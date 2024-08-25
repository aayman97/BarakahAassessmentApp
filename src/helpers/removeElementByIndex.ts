export function removeElementByIndex<T>(array: T[], index: number): T[] {
  if (index >= 0 && index < array.length) {
    array.splice(index, 1);
  }
  return array;
}
