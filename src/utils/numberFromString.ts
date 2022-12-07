export const numberFromString = (value: string) => {
  if (!value) {
    return 0;
  }

  return parseInt(value);
};
