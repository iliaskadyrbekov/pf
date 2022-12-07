export const uniqueBy = <T, V>(items: T[], fn: (item: T) => V) => {
  return [...new Map(items.map((item) => [fn(item), item])).values()];
};
