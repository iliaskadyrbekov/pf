import { ILanguageWithCountry } from 'src/shared/interfaces/Shop';

export const getOption = (languageWithCountryOptions: ILanguageWithCountry[], value?: string) => {
  const [languageId, countryId] = value?.split('.') || [];

  return languageWithCountryOptions.find(
    ({ language, country }) => language.id === languageId && country.id === countryId,
  );
};
