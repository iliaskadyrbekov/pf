export function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
export const get = (object: any, path?: string | Array<string>, defaultValue?: unknown) => {
  if (!path) {
    return object;
  }

  const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key);
  const pathArrayFlat = flatMap(pathArray, (part) => (typeof part === 'string' ? part.split('.') : part));
  const value = pathArrayFlat.reduce((obj, key) => obj && obj[key], object as any);

  return !value && defaultValue ? defaultValue : value;
};
