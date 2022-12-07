export type NonNullableProps<M, K extends keyof M> = Omit<M, K> & {
  [P in K]-?: NonNullable<M[P]>;
};
