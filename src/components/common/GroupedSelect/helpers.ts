type TValueType = string | number;

interface IOpt<T> {
  value: TValueType | T[];
}

export const getOptionValue = <T extends IOpt<T>>(value: TValueType | T[]): TValueType[] => {
  if (Array.isArray(value)) {
    return value.flatMap(({ value }) => getOptionValue(value));
  }
  return [value];
};

export const findSelectedOptions = <T extends IOpt<T>>(options: T[], value: TValueType): T | null => {
  return options.reduce<T | null>((acc, cur) => {
    if (acc) {
      return acc;
    }

    if (Array.isArray(cur.value)) {
      return findSelectedOptions(cur.value, value);
    }

    return cur.value === value ? cur : null;
  }, null);
};
