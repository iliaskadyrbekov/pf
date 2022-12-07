import React from 'react';

import { CreateEntityLayout } from 'src/layouts';
import { Settings, MainInfo, Group } from './components';
import { useAreaResourceMetaQuery } from '@components/Resource/AreaResource/queries/areaResouceMeta';
import { ShopContext } from 'src/context';

interface IResourceFormProps {
  actions: React.ReactNode[];
}

const ResourceForm = ({ actions }: IResourceFormProps) => {
  const { shop } = React.useContext(ShopContext);
  const { data } = useAreaResourceMetaQuery({ shopId: shop?.id });
  const categoryOptions = data?.areaResourceMeta.fields.category.options || [];
  const groupOptions = data?.areaResourceMeta.fields.group.options || [];

  return (
    <CreateEntityLayout
      infoBlocks={[
        <MainInfo key="main-info" categoryOptions={categoryOptions} />,
        <Group options={groupOptions} key="group" />,
      ]}
      actions={actions}
      settings={<Settings />}
    />
  );
};

export default ResourceForm;
