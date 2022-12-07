import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import CloseIcon from '@components/Icons/CloseIcon';
import { MENU_ITEMS } from '@components/Menu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import {
  EditAccommodationProduct,
  EditGiftCardProduct,
  EditRentalProduct,
  EditTicketProduct,
} from '@components/Products';

import { ProductType } from 'src/shared/enums/ProductType';
import { IEventsRes, IEventsVars, EVENTS } from 'src/graphql/queries/events';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { TWithProductsHandlerProps, withProductsMenu } from 'src/lib/withProductsMenu';
import { IProductRes, IProductVars, PRODUCT, useProductQuery } from 'src/graphql/queries/product/product.query';
import {
  ACCOMMODATION_PRODUCT_META_FIELDS,
  IAccommodationProductMetaFieldsRes,
} from 'src/graphql/queries/accommodationProductMetaFields';
import { ITicketProductMetaFieldsRes, TICKET_PRODUCT_META_FIELDS } from 'src/graphql/queries/ticketProductMetaFields';
import { IRentalProductMetaFieldsRes, RENTAL_PRODUCT_META_FIELDS } from 'src/graphql/queries/rentalProductMetaFields';
import { GIFT_CARD_PRODUCT_META_FIELDS } from 'src/graphql/queries/giftCardProductMetaFields';
import { ShopContext } from 'src/context';

const withErrorCatch = (handler: THandler) => async (props: IHandlerProps) => {
  const { user, shop, query } = props;

  try {
    return handler(props);
  } catch (err) {
    return {
      props: { user, shop },
      redirect: { destination: `/products/activity/${query.activityId}`, permanent: false },
    };
  }
};

const resoveFn = async ({ user, shop, query, client }: TWithProductsHandlerProps) => {
  await client.query<IEventsRes, IEventsVars>({
    query: EVENTS,
    variables: { productId: query.productId as string },
  });

  const {
    data: { product },
  } = await client.query<IProductRes, IProductVars>({
    query: PRODUCT,
    variables: { shopId: shop?.id, id: query.productId as string },
  });

  if (!product) {
    return {
      props: { user, shop },
      redirect: { destination: `/products/activity/${query.activityId}`, permanent: false },
    };
  }

  switch (product.type) {
    case ProductType.ACCOMMODATION:
      await client.query<IAccommodationProductMetaFieldsRes>({ query: ACCOMMODATION_PRODUCT_META_FIELDS });
      break;
    case ProductType.TICKET:
      await client.query<ITicketProductMetaFieldsRes>({ query: TICKET_PRODUCT_META_FIELDS });
      break;
    case ProductType.RENTAL:
      await client.query<IRentalProductMetaFieldsRes>({ query: RENTAL_PRODUCT_META_FIELDS });
      break;
    case ProductType.GIFT_CARD:
      await client.query<IRentalProductMetaFieldsRes>({ query: GIFT_CARD_PRODUCT_META_FIELDS });
      break;
  }

  return {
    props: {
      user,
      shop,
      initialApolloState: client.cache.extract(),
    },
  };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withProductsMenu(resoveFn)));

const EditProductPage = () => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);

  const handleBack = React.useCallback(() => {
    router.push(`/products/activity/${router.query.activityId}`);
  }, [router]);

  const { data: productData } = useProductQuery({ shopId: shop?.id, id: router.query.productId as string });
  const product = productData?.product;

  if (!product) {
    return null;
  }

  let content;
  let title;

  const name = product.name.find(({ value }) => !!value)?.value || '';

  switch (product.type) {
    case ProductType.TICKET: {
      content = <EditTicketProduct />;
      title = `Edit ticket: ${name}`;

      break;
    }
    case ProductType.RENTAL: {
      content = <EditRentalProduct />;
      title = `Edit rental: ${name}`;

      break;
    }
    case ProductType.GIFT_CARD: {
      content = <EditGiftCardProduct />;
      title = `Edit gift card: ${name}`;

      break;
    }
    case ProductType.ACCOMMODATION: {
      content = <EditAccommodationProduct />;
      title = `Edit accommodation: ${name}`;

      break;
    }
  }

  return (
    <PageContentLayout
      header={<PageHeaderLayout title={title} goBack={<CloseIcon onClick={handleBack} />} />}
      content={content}
    />
  );
};

const EditProductPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['PRODUCTS']}>{page}</AppLayout>
);
EditProductPage.getLayout = EditProductPageLayout;

export default EditProductPage;
