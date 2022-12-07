import React from 'react';

import { PageActionsPortal } from '@components/common/PageActionsPortal';

interface ICreateEntityLayoutProps {
  infoBlocks: React.ReactNode[];
  settings: React.ReactNode;
  actions?: React.ReactNode[];
}

const classes = {
  wrapper: 'flex flex-col space-y-4',
  formWrapper: 'flex-1',
  infoBlocksWrapper: 'flex flex-col space-y-4',
};

const CreateEntityLayout = ({ infoBlocks, actions, settings }: ICreateEntityLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {settings}
      <div className={classes.formWrapper}>
        <div className={classes.infoBlocksWrapper}>{infoBlocks}</div>
        {<PageActionsPortal actions={actions} />}
      </div>
    </div>
  );
};

export default CreateEntityLayout;
