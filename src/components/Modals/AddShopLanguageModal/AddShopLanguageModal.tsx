import React from 'react';

import { Flag } from '@components/common/Flag';
import { Button } from '@components/common/Button';
import { Combobox } from '@components/common/Combobox';
import AddShopLanguageModalLayout from './AddShopLanguageModalLayout';
import { IconTextOption } from '@components/common/Combobox/components';

import { getOption } from './helpers';
import { ILanguageWithCountry } from 'src/shared/interfaces/Shop';

interface IOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface IAddShopLanguageModalProps {
  onAddLanguage: (lang?: ILanguageWithCountry) => void;
  onClose: () => void;
  languageWithCountryOptions: ILanguageWithCountry[];
}

const AddShopLanguageModal = ({ onClose, onAddLanguage, languageWithCountryOptions }: IAddShopLanguageModalProps) => {
  const [selected, setSelected] = React.useState<undefined | ILanguageWithCountry>(languageWithCountryOptions[0]);

  const handleSelectLang = React.useCallback(
    (value: string) => {
      const newSelected = getOption(languageWithCountryOptions, value);
      setSelected(newSelected);
    },
    [setSelected, languageWithCountryOptions],
  );

  // label: 'Please choose one...', disabled: true
  const options = languageWithCountryOptions.map(({ language, country }) => ({
    value: `${language.id}.${country.id}`,
    label: language.native,
  }));

  return (
    <AddShopLanguageModalLayout
      langSelect={
        <Combobox
          label="Language"
          value={selected ? `${selected?.language.id}.${selected?.country.id}` : ''}
          options={options}
          onChange={handleSelectLang}
          renderOption={(option?: IOption<string>) => (
            <IconTextOption
              label={option?.label}
              icon={<Flag countryId={getOption(languageWithCountryOptions, option?.value)?.country.id} />}
            />
          )}
        />
      }
      title="Add language"
      actions={[
        <Button variant="contained" color="default" key="1" onClick={onClose}>
          Close
        </Button>,
        <Button variant="contained" color="primary" key="2" onClick={() => onAddLanguage(selected)}>
          Add
        </Button>,
      ]}
    />
  );
};

export default AddShopLanguageModal;
