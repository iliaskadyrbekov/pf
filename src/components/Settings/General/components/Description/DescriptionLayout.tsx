import React from 'react';

interface IDescriptionLayoutProps {
  title: string;
  description: string;
}

const classes = {
  wrapper: 'flex flex-col space-y-4',
  title: 'text-sm font-medium leading-tight text-gray-900',
  description: 'text-sm text-gray-500',
};

const DescriptionLayout = ({ title, description }: IDescriptionLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default DescriptionLayout;
