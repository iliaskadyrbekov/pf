import React from 'react';

import ProductsLayout from './ProductsLayout';
import { Button } from '@components/common/Button';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { useActivitiesQuery } from 'src/graphql/queries/activities';
import { ShopContext } from 'src/context/ShopContext';

const Products = () => {
  const { handleOpenModal } = React.useContext(ModalContext);

  const { shop } = React.useContext(ShopContext);

  const { data } = useActivitiesQuery({ shopId: shop?.id });
  const activities = data?.activities || [];

  const onModalOpen = () => {
    handleOpenModal({ type: ModalType.CREATE_ACTIVITY, props: { order: activities.length } });
  };

  return (
    <ProductsLayout
      imageUrl="images/add-product.png"
      caption="Welcome to product page"
      button={
        <Button variant="contained" color="primary" onClick={onModalOpen}>
          Add new activity
        </Button>
      }
    />
  );
};

export default Products;
