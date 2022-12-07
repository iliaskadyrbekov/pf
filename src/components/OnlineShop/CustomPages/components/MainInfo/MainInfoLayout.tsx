import React from 'react';

interface IMainInfoLayoutProps {
  langSwitcher: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  headImage: React.ReactNode;
  content: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white rounded-md p-8 space-y-8',
  form: 'flex flex-col space-y-4 pr-4 max-w-[41rem] w-full',
};

const MainInfoLayout = ({ name, description, headImage, langSwitcher, content }: IMainInfoLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {langSwitcher}
      <div className={classes.form}>
        {name}
        {description}
        {headImage}
        {content}
      </div>
    </div>
  );
};

export default MainInfoLayout;
