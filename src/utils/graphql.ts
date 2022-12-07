interface IValidationError {
  [field: string]: string[];
}

export interface IGraphqlError {
  graphQLErrors?: { validationErrors: IValidationError; status: number; message: string }[];
}

export const setErrorPrefix = (errors: IValidationError, prefix: string) => {
  return Object.entries(errors).reduce((acc, [key, val]) => ({ ...acc, [`${prefix}${key}`]: val }), {});
};

export const getValidationErrors = (err: IGraphqlError, prefix?: string): IValidationError | undefined => {
  const errors = err?.graphQLErrors?.reduce((acc, cur) => ({ ...acc, ...cur?.validationErrors }), {});

  return prefix && errors ? setErrorPrefix(errors, prefix) : errors;
};

export const getErrors = (err: IGraphqlError) => {
  return err?.graphQLErrors?.map((error) => ({ status: error?.status, message: error?.message }));
};
