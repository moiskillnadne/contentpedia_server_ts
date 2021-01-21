export const test = 'test'

export async function isExist<K extends string, V>(body: Record<K, V>, expected: Array<K>): Promise<Array<K>> {
  const errors = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < expected.length; i++) {
    if (!body[expected[i]] && !!body[expected[i]] !== false) {
      errors.push(expected[i])
    }
  }
  return errors
}
