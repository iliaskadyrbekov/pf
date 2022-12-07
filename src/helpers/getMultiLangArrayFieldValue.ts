import { ILanguage } from 'src/context';
import { MultiLanguageArrayField } from 'src/shared/interfaces/MultiLanguageArrayField';

export const getMultiLangArrayFieldValue = (
  language: ILanguage,
  field: MultiLanguageArrayField[],
  availableLanguages: ILanguage[],
) => {
  if (!field) {
    return [];
  }

  const languageValue = field.find(
    ({ lang, country }) => language.languageId === lang && language.countryId === country,
  )?.value;

  if (languageValue) {
    return languageValue;
  } else {
    return (
      field.find(
        ({ value, lang, country }) =>
          availableLanguages.find((language) => language.languageId === lang && language.countryId === country) &&
          !!value,
      )?.value || []
    );
  }
};
