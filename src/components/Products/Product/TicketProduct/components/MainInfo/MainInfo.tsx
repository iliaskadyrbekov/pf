import React from 'react';

import MainInfoLayout from './MainInfoLayout';
import { Input } from '@components/common/Input';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';

const MainInfo = () => {
  return (
    <MainInfoLayout
      name={<FormMultiLanguageField component={Input} label="Product name" name="product.name" />}
      shortDescription={
        <FormMultiLanguageField name="product.shortDescription" component={Input} label="Short description" />
      }
      langSwitcher={<FormLangSwitcherField />}
    />
  );
};

export default MainInfo;
