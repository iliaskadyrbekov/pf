import { ILanguage } from 'src/context';
import { MultiLanguageField } from 'src/shared/interfaces';

export const getMultiLangFieldValue = (
  language: ILanguage,
  field?: MultiLanguageField[],
  availableLangs: ILanguage[] = [],
  defaultValue?: string,
) => {
  if (!field) {
    return defaultValue || undefined;
  }

  const langValue = field.find(
    ({ lang, country }) => language.languageId === lang && language.countryId === country,
  )?.value;

  if (langValue) {
    return langValue;
  } else {
    const result = field.find(
      ({ value, lang, country }) =>
        availableLangs.find((language) => language.languageId === lang && language.countryId === country) && !!value,
    )?.value;
    return !result && defaultValue ? defaultValue : result;
  }
};
