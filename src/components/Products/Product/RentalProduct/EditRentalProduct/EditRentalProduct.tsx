import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { SpinnerIcon } from '@components/Icons';
import { Button } from '@components/common/Button';
import { RentalProductForm } from '../RentalProductForm';

import { ShopContext } from 'src/context/ShopContext';
import { getDefaultLanguageWithCountry } from 'src/helpers';
import { IRentalProduct } from 'src/shared/interfaces/Product';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useEditRentalProduct } from './mutations/editRentalProduct';
import { useProductQuery } from 'src/graphql/queries/product/product.query';
import { useRentalEventsQuery } from 'src/graphql/queries/rentalEvents';
import { useArchiveRentalProduct } from './mutations/archiveRentalProduct';
import { prepareCheckoutFields } from '../../components/CheckoutForm/helpers';
import { FormLanguageContext, FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { useRentalProductMetaFields } from 'src/graphql/queries/rentalProductMetaFields';

const EditRentalProduct = () => {
  const router = useRouter();
  const activityId = router.query.activityId as string;
  const productId = router.query.productId as string;

  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const { mutate: archiveProduct } = useArchiveRentalProduct();
  const { mutate: editRentalProduct, loading } = useEditRentalProduct();

  const { data: productData } = useProductQuery({ shopId: shop?.id, id: productId as string });
  const product = productData?.product as IRentalProduct | undefined;

  const { data: metaData } = useRentalProductMetaFields();
  const meta = metaData?.rentalProductMetaFields;

  const { data: rentalEventsData } = useRentalEventsQuery({ productId });
  const rentalEvents = rentalEventsData?.rentalEvents || [];

  if (!product) {
    return null;
  }

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = meta?.visibility.options ? meta.visibility.options[0]?.id : undefined;

  const handleArchiveClick = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Archive product',
        message: 'Are you sure you want to archive this product?',
        onConfirm: () => {
          archiveProduct({ variables: { shopId: shop?.id, id: router.query.productId as string } });
          router.push(`/products/activity/${router.query.activityId}`);
        },
      },
    });
  };

  return (
    <FormLanguageSwitcherProviderComponent>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: product.name || defaultText,
          shortDescription: product.shortDescription || defaultText,
          visibility: product.visibility?.id || defaultVisibility,
          media: product.media,
          pricing: product.pricing,
          checkoutEnabled: product.checkoutEnabled,
          checkoutForm: product.checkoutForm,
          category: product.category?.id,
          VAT: product.VAT?.id,
        }}
        onSubmit={async (values, { setStatus }) => {
          const checkoutForm = prepareCheckoutFields(values.checkoutForm);

          try {
            await editRentalProduct({
              variables: { shopId: shop?.id, input: { id: product.id, ...values, checkoutForm, shopId: shop?.id } },
            });

            await router.push(`/products/activity/${activityId}`);
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <RentalProductForm
            VATOptions={product.activity.shop.VATs}
            events={rentalEvents}
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

export default EditRentalProduct;
