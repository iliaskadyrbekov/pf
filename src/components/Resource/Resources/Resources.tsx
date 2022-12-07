import React from 'react';

import ResourcesLayout from './ResourcesLayout';
import { ResourcesTable, CreateResourceAction } from './components';
import { PageActionsPortal } from '@components/common';

const Resources = () => {
  return (
    <ResourcesLayout actions={<PageActionsPortal actions={[<CreateResourceAction key="create-resource-action" />]} />}>
      <ResourcesTable />
    </ResourcesLayout>
  );
};

export default Resources;
