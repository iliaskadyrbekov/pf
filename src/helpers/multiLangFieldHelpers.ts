import { ILanguage } from 'src/context';
import { MultiLanguageField } from 'src/shared/interfaces';

export const getEmptyFields = (field: MultiLanguageField[]) => {
  return field.reduce<MultiLanguageField[]>((acc, cur) => (cur.value ? acc : [...acc, cur]), []);
};

export const isEmptyField = (field?: MultiLanguageField[] | null) => {
  if (!field || !field.length) {
    return true;
  }
  return field.every(({ value }) => !value);
};

export const getSameFields = (fieldToCompare: MultiLanguageField[], field: MultiLanguageField[]) => {
  return fieldToCompare.reduce<MultiLanguageField[]>(
    (acc, cur) =>
      field.find((n) => n.lang === cur.lang && n.country === cur.country)?.value === cur.value && cur.value
        ? [...acc, cur]
        : acc,
    [],
  );
};

export const getValueByLanguage = <T>(field: MultiLanguageField[], language: ILanguage, defaultValue: T) => {
  const value = field.find(
    ({ lang, country }) => lang === language.languageId && country === language.countryId,
  )?.value;
  return !value && defaultValue !== undefined ? defaultValue : value;
};

export const mapToErrorsObject = (field: MultiLanguageField[], value: string[]) => {
  return field.reduce((acc, cur) => ({ ...acc, [cur.lang]: value }), {});
};
