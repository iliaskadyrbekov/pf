import React from 'react';

interface IRecommendedLayoutProps {
  description: React.ReactNode;
  button: React.ReactNode;
  skip: React.ReactNode;
  learnMore: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-5',
  description: 'text-sm leading-tight text-gray-500',
  learnMore: 'text-sm leading-tight text-indigo-600',
  actionsWrapper: 'flex items-center justify-between',
  skip: 'text-sm leading-tight text-indigo-600',
};

const RecommendedLayout = ({ description, button, skip, learnMore }: IRecommendedLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.description}>
        {description}
        <span className={classes.learnMore}> {learnMore}</span>
      </p>
      <div className={classes.actionsWrapper}>
        {button}
        <p className={classes.skip}>{skip}</p>
      </div>
    </div>
  );
};

export default RecommendedLayout;
