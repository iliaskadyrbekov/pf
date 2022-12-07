import React from 'react';

interface IDescriptionListTitleLayoutProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 py-5 sm:px-6',
  title: 'text-lg leading-6 font-medium text-gray-900',
  subTitle: 'mt-1 text-sm text-gray-500',
};

const DescriptionListTitleLayout = ({ title, subTitle }: IDescriptionListTitleLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>{title}</h3>
      {!!subTitle && <p className={classes.subTitle}>{subTitle}</p>}
    </div>
  );
};

export default DescriptionListTitleLayout;
