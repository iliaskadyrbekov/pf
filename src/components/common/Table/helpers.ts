import { get } from 'src/helpers';

type TAccessor<T> = (item: T) => unknown;

export const getCellValue = <T>(item: T, accessor?: TAccessor<T> | string, emptyValue?: unknown) =>
  typeof accessor === 'function' ? accessor(item) || emptyValue : get(item, accessor, emptyValue);
