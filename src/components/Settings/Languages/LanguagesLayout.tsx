import React from 'react';

interface ILanguagesLayoutProps {
  table: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-16',
};

const LanguagesLayout = ({ table, actions }: ILanguagesLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {table}
      {actions}
    </div>
  );
};

export default LanguagesLayout;
