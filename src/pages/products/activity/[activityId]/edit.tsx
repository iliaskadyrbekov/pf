import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import CloseIcon from '@components/Icons/CloseIcon';
import { MENU_ITEMS, ProductsSubMenu } from '@components/Menu';
import { EditAccommodationActivity, EditCommonActivity } from '@components/Products/EditActivity';

import { ActivityType } from 'src/shared/enums';
import { ShopContext } from 'src/context/ShopContext';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { TWithProductsHandlerProps, withProductsMenu } from 'src/lib/withProductsMenu';
import {
  ACTIVITY_FORM,
  IActivityFormRes,
  IActivityFormVars,
  useActivityFormQuery,
} from 'src/graphql/queries/activityForm';
import {
  ACCOMMODATION_PRODUCT_META_FIELDS,
  IAccommodationProductMetaFieldsRes,
} from 'src/graphql/queries/accommodationProductMetaFields';

const withErrorCatch = (handler: THandler) => async (props: IHandlerProps) => {
  const { user, shop, params } = props;

  try {
    return handler(props);
  } catch (err) {
    return {
      redirect: { destination: `/products/activity/${params.activityId}`, permanent: false },
      props: { user, shop },
    };
  }
};

const resoveFn = async ({ user, shop, params, query, client }: TWithProductsHandlerProps) => {
  const {
    data: {
      activityForm: { data },
    },
  } = await client.query<IActivityFormRes, IActivityFormVars>({
    query: ACTIVITY_FORM,
    variables: { id: params.activityId as string, shopId: shop?.id },
  });

  if (data?.type === ActivityType.ACCOMMODATION) {
    await client.query<IAccommodationProductMetaFieldsRes>({ query: ACCOMMODATION_PRODUCT_META_FIELDS });
  }

  if (!data) {
    return {
      props: { user, shop },
      redirect: { destination: `/products/activity/${query.activityId}`, permanent: false },
    };
  }

  return {
    props: { user, shop, activityId: params.activityId, initialApolloState: client.cache.extract() },
  };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withProductsMenu(resoveFn)));

const EditActivityPage = () => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);

  const { data } = useActivityFormQuery({ shopId: shop?.id, id: router.query.activityId as string });
  const activity = data?.activityForm.data;

  const handleBack = React.useCallback(async () => {
    await router.push(`/products/activity/${router.query.activityId}`);
  }, [router]);

  const name = activity ? activity.name.find(({ value }) => !!value)?.value || '' : '';

  const getActivityContentByType = () => {
    switch (activity?.type) {
      case ActivityType.ACCOMMODATION:
        return <EditAccommodationActivity />;
      default:
        return <EditCommonActivity />;
    }
  };

  return (
    <PageContentLayout
      header={<PageHeaderLayout title={`Edit activity: ${name}`} goBack={<CloseIcon onClick={handleBack} />} />}
      content={getActivityContentByType()}
    />
  );
};

const EditActivityPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['PRODUCTS']} SubMenu={<ProductsSubMenu />}>
    {page}
  </AppLayout>
);

EditActivityPage.getLayout = EditActivityPageLayout;

export default EditActivityPage;
