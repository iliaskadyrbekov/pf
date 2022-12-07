export const mapFromArray = <T>(arr: T[], keyFn: (el: T) => string) =>
  arr.reduce<{ [key: string]: T }>((acc, cur) => ({ ...acc, [keyFn(cur)]: cur }), {});
