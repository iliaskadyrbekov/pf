import React from 'react';

import { CreateEntityLayout } from 'src/layouts';
import { Settings, MainInfo, Availability } from './components';
import { useAvailabilityResourceMetaQuery } from 'src/graphql/queries/availabilityResouceMeta';

interface IResourceFormProps {
  actions: React.ReactNode[];
}

const ResourceForm = ({ actions }: IResourceFormProps) => {
  const { data } = useAvailabilityResourceMetaQuery();
  const categoryOptions = data?.availabilityResourceMeta.fields.category.options || [];

  return (
    <CreateEntityLayout
      infoBlocks={[<MainInfo key="main-info" categoryOptions={categoryOptions} />, <Availability key="availability" />]}
      actions={actions}
      settings={<Settings />}
    />
  );
};

export default ResourceForm;
