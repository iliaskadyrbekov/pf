import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { SpinnerIcon } from '@components/Icons';
import { Button } from '@components/common/Button';
import { GiftCardProductForm } from '../GiftCardProductForm';

import { getDefaultLanguageWithCountry } from 'src/helpers';
import { IGiftCardProduct } from 'src/shared/interfaces/Product';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useProductQuery } from 'src/graphql/queries/product/product.query';
import { useEditGiftCardProduct } from './mutations/editGiftCardProduct';
import { prepareCheckoutFields } from '../../components/CheckoutForm/helpers';
import { useArchiveGiftCardProduct } from './mutations/archiveGiftCardProduct';
import {
  FormLanguageContext,
  FormLanguageSwitcherProviderComponent,
  ModalContext,
  ModalType,
  ShopContext,
} from 'src/context';
import { useGiftCardProductMetaFields } from 'src/graphql/queries/giftCardProductMetaFields';

const EditGiftCardProduct = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const activityId = router.query.activityId as string;

  const { shop } = React.useContext(ShopContext);
  const { availableLangs } = React.useContext(FormLanguageContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const { mutate: archiveProduct } = useArchiveGiftCardProduct();
  const { mutate: editGiftCardProduct, loading } = useEditGiftCardProduct();

  const { data: productData } = useProductQuery({ shopId: shop?.id, id: productId as string });
  const product = productData?.product as IGiftCardProduct | undefined;

  const { data: metaData } = useGiftCardProductMetaFields();
  const meta = metaData?.giftCardProductMetaFields;

  if (!product) {
    return null;
  }

  const defaultText = getDefaultLanguageWithCountry(availableLangs);
  const defaultVisibility = meta?.visibility.options ? meta?.visibility.options[0]?.id : undefined;

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
        enableReinitialize={true}
        initialValues={{
          name: product.name || defaultText,
          shortDescription: product.shortDescription || defaultText,
          visibility: product.visibility?.id || defaultVisibility,
          pricing: (product as IGiftCardProduct).pricing,
          checkoutEnabled: product.checkoutEnabled,
          checkoutForm: product.checkoutForm,
          expiresAt: (product as IGiftCardProduct).expiresAt,
          VAT: product.VAT?.id,
        }}
        onSubmit={async (values, { setStatus }) => {
          const checkoutForm = prepareCheckoutFields(values.checkoutForm);

          try {
            await editGiftCardProduct({
              variables: { shopId: shop?.id, id: product.id, ...values, checkoutForm },
            });

            await router.push(`/products/activity/${activityId}`);
          } catch (err) {
            setStatus(getValidationErrors(err as IGraphqlError));
          }
        }}
      >
        {({ handleSubmit }) => (
          <GiftCardProductForm
            VATOptions={product.activity.shop.VATs}
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

export default EditGiftCardProduct;
