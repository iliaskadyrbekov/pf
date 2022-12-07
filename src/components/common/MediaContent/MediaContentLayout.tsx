import React from 'react';

interface IMediaContentLayoutProps {
  contentItems: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-8',
  contentWrapper: 'space-y-4',
  actionsWrapper: 'space-x-4',
};

const MediaContentLayout = ({ contentItems, actions }: IMediaContentLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>{contentItems}</div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default MediaContentLayout;
