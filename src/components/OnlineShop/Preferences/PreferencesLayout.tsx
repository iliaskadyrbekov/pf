import React from 'react';

interface IPreferencesLayoutProps {
  items: React.ReactNode[];
  actions: React.ReactNode;
}

const classes = {
  itemsWrapper: 'space-y-5',
};

const PreferencesLayout = ({ items, actions }: IPreferencesLayoutProps) => {
  return (
    <div>
      <div className={classes.itemsWrapper}>{items}</div>
      {actions}
    </div>
  );
};

export default PreferencesLayout;
