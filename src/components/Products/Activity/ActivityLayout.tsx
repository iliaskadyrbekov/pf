import React from 'react';

import { PageActionsPortal } from '@components/common/PageActionsPortal';

interface IActivityLayoutProps {
  actions?: React.ReactNode[];
  products?: React.ReactNode;
  widgets: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4',
};

const ActivityLayout = ({ actions, products, widgets }: IActivityLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {<PageActionsPortal actions={actions} />}
      {widgets}
      {products}
    </div>
  );
};

export default ActivityLayout;
