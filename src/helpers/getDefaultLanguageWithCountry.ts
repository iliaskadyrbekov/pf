import { ILanguage } from 'src/context';

export const getDefaultLanguageWithCountry = (availableLangs: ILanguage[]) =>
  availableLangs.map(({ languageId, countryId }) => ({
    value: '',
    lang: languageId,
    country: countryId,
  }));
