import React from 'react';
import { FormLanguageContext, FormLanguageProvider } from 'src/context/FormLanguageContext';
import { FormLangSwitcherField } from '../FormFields/FormLangSwitcherField';
import MultiLanguageBlockLayout from './MultiLanguageBlockLayout';

interface IMultiLanguageBlockProps {
  children: React.ReactNode;
}

const MultiLanguageBlock = ({ children }: IMultiLanguageBlockProps) => {
  const { availableLangs, defaultLang } = React.useContext(FormLanguageContext);

  return (
    <FormLanguageProvider availableLanguages={availableLangs} defaultLanguage={defaultLang}>
      <MultiLanguageBlockLayout langSwitcher={<FormLangSwitcherField />}>{children}</MultiLanguageBlockLayout>
    </FormLanguageProvider>
  );
};

export default MultiLanguageBlock;
