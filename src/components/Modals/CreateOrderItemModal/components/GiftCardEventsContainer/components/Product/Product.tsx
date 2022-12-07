import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import ProductLayout from './ProductLayout';
import { Button } from '@components/common/Button';
import IconWithTextLayout from 'src/layouts/IconWithTextLayout';

import { FormLanguageContext, ModalContext, ShopContext } from 'src/context';
import { IGiftCardProduct } from 'src/shared/interfaces/Product';
import { useCreateGiftCardOrderItems } from './mutations/createGiftCardOrderItems';

interface IProductProps {
  product: IGiftCardProduct;
}

const Product = ({ product }: IProductProps) => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);
  const { handleCloseModal } = React.useContext(ModalContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { mutate: createGiftCardOrderItems } = useCreateGiftCardOrderItems();

  if (!shop) {
    return null;
  }

  const orderId = router.query.orderId as string;

  const getPrice = (symbolNative: string, price: number) => `${symbolNative}${price}`;

  return (
    <Formik
      initialValues={{ product: product.id, pricing: product.pricing[0].id }}
      onSubmit={async (values) => {
        const orderInfoInput: { orderId?: string; shopId?: string } = { orderId, shopId: shop?.id };

        await createGiftCardOrderItems({
          variables: {
            input: [values],
            orderInfoInput,
          },
        });

        handleCloseModal();
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <ProductLayout
          name={getMultiLanguageValue(product.name)}
          description={product.shortDescription ? getMultiLanguageValue(product.shortDescription) : ''}
          price={getPrice(shop.currency.symbolNative, product.pricing[0].price)}
          button={
            <Button className="font-inter lg:font-roboto" onClick={() => handleSubmit()}>
              <IconWithTextLayout text="Buy" />
            </Button>
          }
        />
      )}
    </Formik>
  );
};

export default Product;
