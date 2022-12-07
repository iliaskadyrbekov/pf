import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { MENU_ITEMS } from '@components/Menu';
import { TWithProductsHandlerProps, withProductsMenu } from 'src/lib/withProductsMenu';
import { EditAreaResource, EditAvailabilityResource } from '@components/Resource';
import { IAvailabilityResourceMetaRes, AVAILABILITY_RESOURCE_META } from 'src/graphql/queries/availabilityResouceMeta';
import { IResourceRes, IResourceVars, RESOURCE, useResourceQuery } from 'src/graphql/queries/resource';
import { ShopContext } from 'src/context/ShopContext';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import CloseIcon from '@components/Icons/CloseIcon';
import { ResourceType } from 'src/shared/enums/ResourceType';
import { TResource } from 'src/shared/interfaces';

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
  await client.query<IAvailabilityResourceMetaRes>({ query: AVAILABILITY_RESOURCE_META });

  try {
    const { data } = await client.query<IResourceRes, IResourceVars>({
      query: RESOURCE,
      variables: { shopId: shop?.id, id: query.resourceId as string },
    });
    if (!data.resource) {
      return {
        props: { user, shop },
        redirect: { destination: `/products/resources`, permanent: false },
      };
    }
  } catch (err) {
    return {
      props: { user, shop },
      redirect: { destination: `/products/resources`, permanent: false },
    };
  }

  return { props: { user, shop, initialApolloState: client.cache.extract() } };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withProductsMenu(resoveFn)));

const getContent = (resource: TResource) => {
  switch (resource.type) {
    case ResourceType.AVAILABILITY:
      return <EditAvailabilityResource resource={resource} />;
    case ResourceType.AREA:
      return <EditAreaResource resource={resource} />;
    default:
      return null;
  }
};

const EditResourcesPage = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { data } = useResourceQuery({ shopId: shop?.id, id: router.query.resourceId as string });
  const resource = data?.resource;

  const handleBack = () => {
    router.push(`/products/resources/`);
  };

  if (!resource) {
    return null;
  }

  return (
    <PageContentLayout
      header={
        <PageHeaderLayout
          title={`Edit: ${getMultiLanguageValue(resource.name)}`}
          goBack={<CloseIcon onClick={handleBack} />}
        />
      }
      content={getContent(resource)}
    />
  );
};

const EditResourcesPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['PRODUCTS']}>{page}</AppLayout>
);

EditResourcesPage.getLayout = EditResourcesPageLayout;

export default EditResourcesPage;
