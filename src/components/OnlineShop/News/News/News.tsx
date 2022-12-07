import React from 'react';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';

import NewsLayout from './NewsLayout';
import { Table } from '@components/common/Table';
import { Button } from '@components/common/Button';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { TagLayout } from '@components/OnlineShop/components/TagsCell/components';
import { DateCell, EditCell, NameCell, PublishedCell, TagsCell } from '@components/OnlineShop/components';

import { INews } from 'src/shared/interfaces/News';
import { ShopContext } from 'src/context/ShopContext';
import { useListNewsQuery } from 'src/graphql/queries/listNews';
import { FormLanguageContext } from 'src/context/FormLanguageContext';

const News = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { data } = useListNewsQuery({ shopId: shop?.id, withDraft: true });
  const listNews = data?.listNews || [];

  const handleCreateNews = React.useCallback(async () => {
    await router.push('/online-shop/news/create');
  }, []);

  const tableHeadRow = [
    {
      label: 'NAME',
      accessor: (article: INews) => ({
        name: getMultiLanguageValue(article.name),
        image: article.headImage,
      }),
      renderCell: NameCell,
    },
    {
      label: 'TAGS',
      accessor: (article: INews) => article.tags?.map((tag, index) => <TagLayout tag={tag} key={`${tag}.${index}`} />),
      renderCell: TagsCell,
    },
    {
      label: 'DATE',
      accessor: (article: INews) => moment(article.createdAt).format('DD.MM.YYYY'),
      renderCell: DateCell,
    },
    {
      label: 'PUBLISHED',
      accessor: 'visibility',
      renderCell: PublishedCell,
    },
    { label: 'EDIT', accessor: (article: INews) => `/online-shop/news/${article.id}/edit`, renderCell: EditCell },
  ];

  return (
    <NewsLayout
      table={<Table headRow={tableHeadRow} items={listNews} emptyValue="-" />}
      actions={
        <PageActionsPortal
          actions={[
            <Button onClick={handleCreateNews} key="1" variant="contained" color="primary">
              New Article
            </Button>,
          ]}
        />
      }
    />
  );
};

export default News;
