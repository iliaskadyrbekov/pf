import React from 'react';

interface IRecommendedTitleLayoutProps {
  title: React.ReactNode;
  caption: React.ReactNode;
}

const classes = {
  content: 'flex flex-col space-y-2',
  title: 'text-lg font-medium leading-normal text-gray-600',
  caption: 'text-xs leading-normal text-gray-500',
};

const RecommendedTitleLayout = ({ title, caption }: IRecommendedTitleLayoutProps) => {
  return (
    <div>
      <p className={classes.title}>{title}</p>
      <p className={classes.caption}>{caption}</p>
    </div>
  );
};

export default RecommendedTitleLayout;
