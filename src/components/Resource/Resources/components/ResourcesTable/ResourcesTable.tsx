import React from 'react';

import { Table } from '@components/common/Table';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { EditCell } from '../EditCell';
import { ShopContext } from 'src/context/ShopContext';
import { BadgeCell, GrayTextCell } from '@components/common/Table/components';
import { useResourcesQuery } from 'src/graphql/queries/resources';
import { TResource } from 'src/shared/interfaces';
import { labelByResourceType } from 'src/shared/enums/ResourceType';

const ResourcesTable = () => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);
  const { shop } = React.useContext(ShopContext);

  const { data } = useResourcesQuery({ shopId: shop?.id });
  const resources = data?.resources || [];

  const tableHeadRow = [
    { label: 'NAME', accessor: ({ name }: TResource) => getMultiLanguageValue(name) },
    { label: 'CATEGORY', accessor: 'category.name', renderCell: GrayTextCell },
    { label: 'Type', accessor: ({ type }: TResource) => labelByResourceType[type], renderCell: GrayTextCell },
    { label: 'LIMIT', accessor: 'availability', renderCell: GrayTextCell },
    { label: 'GROUP NAME', accessor: 'group.name', renderCell: BadgeCell },
    { label: 'Edit', accessor: 'id', renderCell: EditCell },
  ];

  return <Table headRow={tableHeadRow} items={resources} emptyValue="-" />;
};

export default ResourcesTable;
