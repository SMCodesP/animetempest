/* eslint-disable no-plusplus */
export default function getRandom<T>(arr: T[], multiple: number): T[] {
  const result = new Array(multiple);
  let len = arr.length;
  const taken = new Array(len);
  if (multiple > len)
    throw new RangeError(`getRandom: more elements taken than available`);
  // eslint-disable-next-line no-param-reassign
  while (multiple--) {
    const x = Math.floor(Math.random() * len);
    result[multiple] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
