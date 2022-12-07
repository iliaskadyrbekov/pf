import React from 'react';

interface IAvailableLanguagesFormProps {
  addLanguage: React.ReactNode;
  availableLanguages: React.ReactNode;
  modal: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-4',
  addLanguageWrapper: 'ml-auto',
};

const AvailableLanguagesForm = ({ availableLanguages, modal, addLanguage }: IAvailableLanguagesFormProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.addLanguageWrapper}>{addLanguage}</div>
      {availableLanguages}
      {modal}
    </div>
  );
};

export default AvailableLanguagesForm;
