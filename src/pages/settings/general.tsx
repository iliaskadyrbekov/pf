import React from 'react';
import { GetServerSideProps } from 'next';

import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { General } from '@components/Settings';
import { withUserCheck } from 'src/lib/withUserCheck';
import { MENU_ITEMS, SETTINGS_ITEMS, SubMenu } from '@components/Menu';
import { getShopForm, IShopFormMeta } from 'src/api/shopForm';
import { IShop } from 'src/shared/interfaces/Shop';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop, req }) => {
  const {
    shopForm: { data, meta },
  } = await getShopForm(req, { shopId: shop?.id });

  return { props: { user, shop, data, meta } };
});

interface IGeneralPageProps {
  data: IShop;
  meta: IShopFormMeta;
}

const GeneralPage = ({ data, meta }: IGeneralPageProps) => {
  return (
    <PageContentLayout header={<PageHeaderLayout title="General" />} content={<General data={data} meta={meta} />} />
  );
};

const GeneralPageLayout = (page: React.ReactNode) => (
  <AppLayout
    SubMenu={<SubMenu menuItem={MENU_ITEMS['SETTINGS']} subMenuItem={SETTINGS_ITEMS['GENERAL']} />}
    menuItem={MENU_ITEMS['SETTINGS']}
  >
    {page}
  </AppLayout>
);
GeneralPage.getLayout = GeneralPageLayout;

export default GeneralPage;
