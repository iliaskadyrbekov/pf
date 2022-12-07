import React from 'react';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';

import { Button } from '@components/common/Button';
import CustomPagesLayout from './CustomPagesLayout';
import { Table } from '@components/common/Table';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { TagLayout } from '@components/OnlineShop/components/TagsCell/components';
import { DateCell, EditCell, NameCell, PublishedCell, TagsCell } from '@components/OnlineShop/components';

import { ShopContext } from 'src/context/ShopContext';
import { ICustomPage } from 'src/shared/interfaces/CustomPage';
import { useListPageQuery } from 'src/graphql/queries/listPage';
import { FormLanguageContext } from 'src/context/FormLanguageContext';

const CustomPages = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { data } = useListPageQuery({ shopId: shop?.id, withDraft: true });
  const listPage = data?.listPage || [];

  const handleCreatePage = React.useCallback(async () => {
    await router.push('/online-shop/pages/create');
  }, []);

  const tableHeadRow = [
    {
      label: 'NAME',
      accessor: (page: ICustomPage) => ({
        name: getMultiLanguageValue(page.name),
        image: page.headImage,
      }),
      renderCell: NameCell,
    },
    {
      label: 'TAGS',
      accessor: (page: ICustomPage) => page.tags?.map((tag, index) => <TagLayout tag={tag} key={`${tag}.${index}`} />),
      renderCell: TagsCell,
    },
    {
      label: 'DATE',
      accessor: (page: ICustomPage) => moment(page.createdAt).format('DD.MM.YYYY'),
      renderCell: DateCell,
    },
    {
      label: 'PUBLISHED',
      accessor: 'visibility',
      renderCell: PublishedCell,
    },
    { label: 'EDIT', accessor: (page: ICustomPage) => `/online-shop/pages/${page.id}/edit`, renderCell: EditCell },
  ];

  return (
    <CustomPagesLayout
      table={<Table headRow={tableHeadRow} items={listPage} emptyValue="-" />}
      actions={
        <PageActionsPortal
          actions={[
            <Button onClick={handleCreatePage} key="1" variant="contained" color="primary">
              New Page
            </Button>,
          ]}
        />
      }
    />
  );
};

export default CustomPages;
