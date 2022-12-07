import React from 'react';

interface IGeneralLayoutProps {
  items: React.ReactNode[];
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-16',
};

const GeneralLayout = ({ items, actions }: IGeneralLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {items}
      {actions}
    </div>
  );
};

export default GeneralLayout;
