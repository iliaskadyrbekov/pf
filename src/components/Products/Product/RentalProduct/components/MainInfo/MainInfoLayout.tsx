import React from 'react';

interface IMainInfoLayoutProps {
  langSwitcher: React.ReactNode;
  name: React.ReactNode;
  shortDescription: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white rounded-md p-8 space-y-8',
  form: 'flex flex-col space-y-4 pr-4 max-w-[41rem] w-full',
};

const MainInfoLayout = ({ name, shortDescription, langSwitcher }: IMainInfoLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {langSwitcher}
      <div className={classes.form}>
        {name}
        {shortDescription}
      </div>
    </div>
  );
};

export default MainInfoLayout;
