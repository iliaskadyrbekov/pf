import React from 'react';

import { Flag } from '../Flag';
import { Button } from '@components/common/Button';

import { getLanguageParam } from 'src/helpers';
import { FormLanguageContext, ILanguage } from 'src/context/FormLanguageContext';

const classes = {
  wrapper: 'relative z-0 inline-flex shadow-sm rounded-md h-full',
};

interface ILangSwitcherProps {
  errors?: { [key: string]: boolean };
}

const LangSwitcher = ({ errors }: ILangSwitcherProps) => {
  const { availableLangs, lang, setLang, defaultLang } = React.useContext(FormLanguageContext);

  const renderButton = React.useCallback(
    ({ languageId, countryId }: ILanguage, isActive: boolean, isError: boolean, onClick: () => void) => {
      let className =
        '-ml-px first:ml-auto space-x-2 rounded-r-none rounded-l-none first:rounded-l-md last:rounded-r-md uppercase';

      if (isActive) {
        className = `${className} z-20 ring-1 ring-indigo-500 border-indigo-500`;
      } else if (isError) {
        className = `${className} z-10 ring-1 ring-red-500 border-red-500`;
      }
      return (
        <Button
          key={getLanguageParam(languageId, countryId)}
          variant="contained"
          color="default"
          onClick={onClick}
          className={className}
        >
          <Flag countryId={countryId} />
          <span>{languageId}</span>
        </Button>
      );
    },
    [],
  );

  const handleClick = React.useCallback(
    (lang: ILanguage) => () => {
      setLang(lang);
    },
    [setLang],
  );

  const isActive = React.useCallback(
    ({ countryId, languageId }: ILanguage) => {
      return languageId === lang.languageId && countryId === lang.countryId;
    },
    [lang],
  );

  const isError = React.useCallback(
    (language: ILanguage) => {
      return !!errors && errors[language.languageId];
    },
    [errors],
  );

  const sortedLangs = availableLangs.reduce<ILanguage[]>((acc, cur) => {
    if (cur.languageId === defaultLang.languageId && cur.countryId === defaultLang.countryId) {
      return [cur, ...acc];
    }
    return [...acc, cur];
  }, []);

  return (
    <div className={classes.wrapper}>
      {sortedLangs.map((language) =>
        renderButton(language, isActive(language), isError(language), handleClick(language)),
      )}
    </div>
  );
};

export default LangSwitcher;
