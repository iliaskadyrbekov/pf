import React from 'react';

import { MultiLanguageField } from 'src/shared/interfaces';
import { MultiLanguageArrayField } from 'src/shared/interfaces/MultiLanguageArrayField';
import { getMultiLangArrayFieldValue, getMultiLangFieldValue } from 'src/helpers';

export interface ILanguage {
  languageId: string;
  countryId: string;
}

interface ILang {
  lang: ILanguage;
  availableLangs: ILanguage[];
  setLang: (lang: ILanguage) => void;
  getMultiLanguageValue: (value?: MultiLanguageField[]) => string;
  getMultiLanguageArrayValue: (value: MultiLanguageArrayField[]) => string[];
  defaultLang: ILanguage;
}

export const FormLanguageContext = React.createContext<ILang>({
  lang: { languageId: 'en', countryId: 'AE' },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLang: () => {},
  availableLangs: [],
  defaultLang: { languageId: 'en', countryId: 'AE' },
  getMultiLanguageValue: () => '',
  getMultiLanguageArrayValue: () => [],
});

interface IFormLanguageProviderProps {
  availableLanguages: ILanguage[];
  defaultLanguage: ILanguage;
  children: React.ReactNode;
}

export const FormLanguageProvider = ({
  children,
  availableLanguages = [],
  defaultLanguage = { languageId: 'en', countryId: 'AE' },
}: IFormLanguageProviderProps) => {
  const [lang, setLang] = React.useState(defaultLanguage);

  React.useEffect(() => {
    setLang(defaultLanguage);
  }, [defaultLanguage]);

  const getMultiLanguageArrayValue = React.useCallback(
    (value: MultiLanguageArrayField[]) => {
      return getMultiLangArrayFieldValue(lang, value, availableLanguages);
    },
    [lang, availableLanguages],
  );

  const getMultiLanguageValue = React.useCallback(
    (value?: MultiLanguageField[]) => {
      return getMultiLangFieldValue(lang, value, availableLanguages) || '';
    },
    [lang, availableLanguages],
  );

  return (
    <FormLanguageContext.Provider
      value={{
        lang,
        availableLangs: availableLanguages,
        setLang,
        defaultLang: defaultLanguage,
        getMultiLanguageValue,
        getMultiLanguageArrayValue,
      }}
    >
      {children}
    </FormLanguageContext.Provider>
  );
};

interface IFormLanguageSwitcherProviderComponentProps {
  children:
    | ((props: { availableLanguages: ILanguage[]; defaultLanguage: ILanguage }) => React.ReactNode)
    | React.ReactNode;
}

export const FormLanguageSwitcherProviderComponent = ({ children }: IFormLanguageSwitcherProviderComponentProps) => {
  const { availableLangs, defaultLang } = React.useContext(FormLanguageContext);

  return (
    <FormLanguageProvider availableLanguages={availableLangs} defaultLanguage={defaultLang}>
      {typeof children === 'function'
        ? children({ availableLanguages: availableLangs, defaultLanguage: defaultLang })
        : children}
    </FormLanguageProvider>
  );
};
