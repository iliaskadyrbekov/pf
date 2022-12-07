import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { SpinnerIcon } from '@components/Icons';
import { Button } from '@components/common/Button';
import { TicketProductForm } from '../TicketProductForm';

import { ShopContext } from 'src/context/ShopContext';
import { useEventsQuery } from 'src/graphql/queries/events';
import { getDefaultLanguageWithCountry } from 'src/helpers';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { useEditTicketProduct } from './mutations/editTicketProduct';
import { ITicketProduct } from 'src/shared/interfaces/Product';
import { useArchiveTicketProduct } from './mutations/archiveTicketProduct';
import { prepareCheckoutFields } from '../../components/CheckoutForm/helpers';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { useTicketProductMetaFields } from 'src/graphql/queries/ticketProductMetaFields';
import { useProductQuery } from 'src/graphql/queries/product/product.query';

const EditTicketProduct = () => {
  const router = useRouter();
  const activityId = router.query.activityId as string;
  const productId = router.query.productId as string;

  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const { mutate: archiveProduct } = useArchiveTicketProduct();
  const { mutate: editTicketProduct, loading } = useEditTicketProduct();

  const { data: productData } = useProductQuery({ shopId: shop?.id, id: productId as string });
  const product = productData?.product as ITicketProduct | undefined;

  const { data: metaData } = useTicketProductMetaFields();
  const meta = metaData?.ticketProductMetaFields;

  const { data: eventsData } = useEventsQuery({ productId });
  const events = eventsData?.events || [];

  if (!product) {
    return null;
  }

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = meta?.visibility.options ? meta.visibility.options[0]?.id : undefined;

  const { id, name, shortDescription, pricing, duration, checkoutEnabled, availabilityType, checkoutForm } =
    product as ITicketProduct;

  const orderedFields = [...checkoutForm].sort((a, b) => a.order - b.order);

  const handleArchiveClick = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Archive product',
        message: 'Are you sure you want to archive this product?',
        onConfirm: async () => {
          await archiveProduct({ variables: { shopId: shop?.id, id: router.query.productId as string } });
          await router.push(`/products/activity/${router.query.activityId}`);
        },
      },
    });
  };

  return (
    <FormLanguageSwitcherProviderComponent>
      <Formik
        initialValues={{
          product: {
            name: name || defaultText,
            shortDescription: shortDescription || defaultText,
            visibility: product.visibility?.id || defaultVisibility,
            VAT: product.VAT?.id,
            pricing,
            duration,
            checkoutEnabled,
            availabilityType,
            checkoutForm: orderedFields,
          },
        }}
        onSubmit={async (values, { setStatus }) => {
          try {
            const { product } = values;

            const checkoutForm = prepareCheckoutFields(product.checkoutForm);

            await editTicketProduct({
              variables: { id, shopId: shop?.id, ...product, checkoutForm },
            });

            await router.push(`/products/activity/${activityId}`);
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError, 'product.'));
          }
        }}
      >
        {({ handleSubmit }) => (
          <TicketProductForm
            VATOptions={product.activity.shop.VATs}
            events={events}
            loading={loading}
            meta={meta}
            actions={[
              <Button variant="contained" color="default" key="1" onClick={handleArchiveClick}>
                Archive
              </Button>,
              <Button
                onClick={() => handleSubmit()}
                icon={loading ? <SpinnerIcon /> : null}
                key="2"
                variant="contained"
                color="primary"
              >
                Save
              </Button>,
            ]}
          />
        )}
      </Formik>
    </FormLanguageSwitcherProviderComponent>
  );
};

export default EditTicketProduct;
