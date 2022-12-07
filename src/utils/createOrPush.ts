export const createOrPush = <T>(acc: Record<string, T[]>, prop: string | number, item: T) => {
  if (acc[prop]) {
    acc[prop].push(item);
  } else {
    acc[prop] = [item];
  }

  return acc;
};
