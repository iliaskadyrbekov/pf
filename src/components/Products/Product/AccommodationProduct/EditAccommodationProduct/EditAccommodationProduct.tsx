import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '@components/common';
import { SpinnerIcon } from '@components/Icons';
import { AccommodationProductForm } from '../AccommodationProductForm';

import { getDefaultLanguageWithCountry } from 'src/helpers';
import { IAccommodationPricing } from 'src/shared/interfaces';
import { ModalContext, ModalType, ShopContext } from 'src/context';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { prepareCheckoutFields } from '../../components/CheckoutForm/helpers';
import { IAccommodationProduct } from 'src/shared/interfaces/Product';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { useAccommodationEventsQuery, useArchiveAccommodationProduct, useEditAccommodationProduct } from './mutations';
import { useAccommodationProductMetaFields } from 'src/graphql/queries/accommodationProductMetaFields';
import { useProductQuery } from 'src/graphql/queries/product/product.query';

const EditAccommodationProduct = () => {
  const router = useRouter();
  const activityId = router.query.activityId as string;
  const productId = router.query.productId as string;

  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const { mutate: archiveProduct } = useArchiveAccommodationProduct();
  const { mutate: editAccommodationProduct, loading } = useEditAccommodationProduct();

  const { data: productData } = useProductQuery({ shopId: shop?.id, id: productId as string });
  const product = productData?.product as IAccommodationProduct | undefined;

  const { data: metaData } = useAccommodationProductMetaFields();
  const meta = metaData?.accommodationProductMetaFields;

  const { data: eventsData } = useAccommodationEventsQuery({ productId });
  const events = eventsData?.accommodationEvents || [];

  if (!product) {
    return null;
  }

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = meta?.visibility.options ? meta.visibility.options[0]?.id : undefined;

  const {
    id,
    name,
    shortDescription,
    accommodationPricing,
    checkoutEnabled,
    checkoutForm,
    specificationsEnabled,
    specifications,
    accommodationMedia,
  } = product as IAccommodationProduct;

  const orderedCheckoutForm = [...checkoutForm].sort((a, b) => a.order - b.order);
  const orderedMedia = accommodationMedia ? [...accommodationMedia].sort((a, b) => a.order - b.order) : [];

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

  const pricing: IAccommodationPricing = {
    ...accommodationPricing,
    comparedWithPrice: accommodationPricing.comparedWithPrice ? accommodationPricing.comparedWithPrice : 0,
  };

  return (
    <FormLanguageSwitcherProviderComponent>
      <Formik
        initialValues={{
          name: name || defaultText,
          shortDescription: shortDescription || defaultText,
          visibility: product.visibility?.id || defaultVisibility,
          pricing,
          media: orderedMedia,
          checkoutEnabled,
          checkoutForm: orderedCheckoutForm,
          specifications,
          specificationsEnabled,
          VAT: product.VAT?.id,
        }}
        onSubmit={async (values, { setStatus }) => {
          try {
            const checkoutForm = prepareCheckoutFields(values.checkoutForm);
            const media = values.media.filter((item) => item.key);

            await editAccommodationProduct({
              variables: {
                input: { id, ...values, checkoutForm, media, shopId: shop?.id },
                shopId: shop?.id,
              },
            });

            await router.push(`/products/activity/${activityId}`);
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <AccommodationProductForm
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

export default EditAccommodationProduct;
