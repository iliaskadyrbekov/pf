import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { MENU_ITEMS } from '@components/Menu';
import { TWithProductsHandlerProps, withProductsMenu } from 'src/lib/withProductsMenu';
import { CreateAreaResource, CreateAvailabilityResource } from '@components/Resource';
import { IAvailabilityResourceMetaRes, AVAILABILITY_RESOURCE_META } from 'src/graphql/queries/availabilityResouceMeta';
import {
  IAreaResourceMetaRes,
  AREA_RESOURCE_META,
  IAreaResourceMetaVars,
} from '@components/Resource/AreaResource/queries/areaResouceMeta';
import CloseIcon from '@components/Icons/CloseIcon';
import { ResourceType } from 'src/shared/enums/ResourceType';

const withErrorCatch = (handler: THandler) => async (props: IHandlerProps) => {
  const { user, shop } = props;

  try {
    return handler(props);
  } catch (err) {
    return {
      redirect: { destination: `/products/resources`, permanent: false },
      props: { user, shop },
    };
  }
};

const resoveFn = async ({ user, shop, client, query }: TWithProductsHandlerProps) => {
  const type = query.type;

  switch (type) {
    case ResourceType.AREA:
      await client.query<IAreaResourceMetaRes, IAreaResourceMetaVars>({
        query: AREA_RESOURCE_META,
        variables: { shopId: shop?.id },
      });
      break;
    case ResourceType.AVAILABILITY:
      await client.query<IAvailabilityResourceMetaRes>({ query: AVAILABILITY_RESOURCE_META });
      break;
  }

  return { props: { user, shop, initialApolloState: client.cache.extract() } };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withProductsMenu(resoveFn)));

const getContent = (type: ResourceType) => {
  switch (type) {
    case ResourceType.AREA:
      return <CreateAreaResource />;
    case ResourceType.AVAILABILITY:
      return <CreateAvailabilityResource />;
    default:
      return null;
  }
};

const CreateResourcesPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push(`/products/resources/`);
  };

  const type = router.query.type;

  if (!type) {
    return null;
  }

  return (
    <PageContentLayout
      header={<PageHeaderLayout title="New Resource" goBack={<CloseIcon onClick={handleBack} />} />}
      content={getContent(type as ResourceType)}
    />
  );
};

const CreateResourcesPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['PRODUCTS']}>{page}</AppLayout>
);
CreateResourcesPage.getLayout = CreateResourcesPageLayout;

export default CreateResourcesPage;
