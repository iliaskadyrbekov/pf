import React from 'react';

interface IMainInfoLayoutProps {
  langSwitcher: React.ReactNode;
  name: React.ReactNode;
  icon: React.ReactNode;
  description: React.ReactNode;
  headImage: React.ReactNode;
  content: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white rounded-md p-8 space-y-8',
  form: 'flex flex-col space-y-4 pr-4 max-w-[41rem] w-full',
  nameIconWrapper: 'flex space-x-4',
  iconWrapper: 'w-28',
};

const MainInfoLayout = ({ name, icon, description, headImage, content, langSwitcher }: IMainInfoLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {langSwitcher}
      <div className={classes.form}>
        <div className={classes.nameIconWrapper}>
          {name}
          <div className={classes.iconWrapper}>{icon}</div>
        </div>
        {description}
        {headImage}
        {content}
      </div>
    </div>
  );
};

export default MainInfoLayout;
