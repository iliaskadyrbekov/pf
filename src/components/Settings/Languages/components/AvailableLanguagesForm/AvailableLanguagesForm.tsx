import React from 'react';

import AvailableLanguagesFormLayout from './AvailableLanguagesFormLayout';
import { ILanguageWithCountry } from 'src/shared/interfaces/Shop';
import { Table } from '@components/common/Table';
import { Button } from '@components/common/Button';
import { AddShopLanguageModal, Modal } from '@components/Modals';
import { useCustomField } from 'src/lib/useCustomField';
import { Flag } from '@components/common/Flag';
import { BadgesLayout, CellLayout, IconWithTextCellLayout } from '@components/common/Table/components';

interface IAvailableLanguagesFormProps {
  languageWithCountryOptions: ILanguageWithCountry[];
}

interface ILanguageField {
  defaultLanguage: ILanguageWithCountry;
  availableLanguages: ILanguageWithCountry[];
}

const AvailableLanguagesForm = ({ languageWithCountryOptions }: IAvailableLanguagesFormProps) => {
  const [{ value }, , { setValue }] = useCustomField<ILanguageField, string[]>('language');
  const { availableLanguages, defaultLanguage } = value;

  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = React.useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const handleCloseModal = React.useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const handleAddLanguage = React.useCallback(
    (lang?: ILanguageWithCountry) => {
      handleCloseModal();

      if (!lang) {
        return;
      }

      setValue({ ...value, availableLanguages: [...availableLanguages, lang] });
    },
    [value, setValue, handleCloseModal],
  );

  const handleDeleteLanguage = React.useCallback(
    (item: ILanguageWithCountry) => {
      const availableLanguages = value.availableLanguages.filter(
        ({ language, country }) => language.id !== item.language.id || country.id !== item.country.id,
      );
      setValue({ ...value, availableLanguages });
    },
    [value, setValue, handleCloseModal],
  );

  const handleSetDefaultLanguage = React.useCallback(
    (item: ILanguageWithCountry) => {
      const defaultLanguage = value.availableLanguages.find(
        ({ language, country }) => language.id === item.language.id && country.id === item.country.id,
      ) as ILanguageWithCountry;

      setValue({ ...value, defaultLanguage });
    },
    [value, setValue, handleCloseModal],
  );

  const tableHeadRow = [
    {
      label: 'Language',
      renderCell: ({ item }: { item: ILanguageWithCountry }) => (
        <IconWithTextCellLayout
          icon={<Flag countryId={item.country.id} />}
          text={
            languageWithCountryOptions.find(
              ({ language, country }) => language.id === item.language.id && country.id === item.country.id,
            )?.language.native
          }
        />
      ),
    },
    {
      label: 'Default',
      // eslint-disable-next-line react/display-name
      renderCell: ({ item }: { item: ILanguageWithCountry }) =>
        item.language.id === defaultLanguage.language.id && item.country.id === defaultLanguage.country.id ? (
          <BadgesLayout color="green">Default</BadgesLayout>
        ) : (
          <td />
        ),
    },
    {
      label: 'Delete',
      // eslint-disable-next-line react/display-name
      renderCell: ({ item }: { item: ILanguageWithCountry }) =>
        item.language.id === defaultLanguage.language.id && item.country.id === defaultLanguage.country.id ? (
          <td />
        ) : (
          <CellLayout>
            <Button onClick={() => handleDeleteLanguage(item)}>Delete</Button>
          </CellLayout>
        ),
    },
    {
      label: 'Set default',
      // eslint-disable-next-line react/display-name
      renderCell: ({ item }: { item: ILanguageWithCountry }) =>
        item.language.id === defaultLanguage.language.id && item.country.id === defaultLanguage.country.id ? (
          <td />
        ) : (
          <CellLayout>
            <Button onClick={() => handleSetDefaultLanguage(item)}>Set default</Button>
          </CellLayout>
        ),
    },
  ];

  const uniqueLanguageWithCountryOptions = languageWithCountryOptions.filter(
    ({ language, country }) =>
      !availableLanguages.find(
        (availableLanguage) =>
          availableLanguage.language.id === language.id && availableLanguage.country.id === country.id,
      ),
  );

  return (
    <AvailableLanguagesFormLayout
      addLanguage={
        <Button variant="contained" color="primary" key="2" onClick={handleOpenModal}>
          Add language
        </Button>
      }
      modal={
        <Modal isOpen={isModalOpen}>
          <AddShopLanguageModal
            languageWithCountryOptions={uniqueLanguageWithCountryOptions}
            onClose={handleCloseModal}
            onAddLanguage={handleAddLanguage}
          />
        </Modal>
      }
      availableLanguages={<Table items={availableLanguages} headRow={tableHeadRow} />}
    />
  );
};

export default AvailableLanguagesForm;
