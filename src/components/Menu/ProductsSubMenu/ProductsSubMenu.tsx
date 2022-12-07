import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/router';
import { ViewGridAddIcon } from '@heroicons/react/solid';

import ProductsSubMenuLayout from './ProductsSubMenuLayout';
import { ActivitiesGroupLayout } from './components';
import { AddIcon } from '@components/Icons';
import { Activity } from './components/Activity';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { useActivitiesQuery } from 'src/graphql/queries/activities';
import { ShopContext } from 'src/context/ShopContext';
import { useReorderActivities } from './mutations/reorderActivities';
import { SubMenuGroupLayout, SubMenuItemLayout } from '../Menu/components';

const ProductsSubMenu = () => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { mutate: reorderActivities } = useReorderActivities();

  const { data } = useActivitiesQuery({ shopId: shop?.id });
  const activities = data?.activities || [];
  const orderedActivities = Array.from(activities).sort((a, b) => a.order - b.order);

  const onModalOpen = () => {
    handleOpenModal({ type: ModalType.CREATE_ACTIVITY, props: { order: orderedActivities.length } });
  };

  const handleMoveRow = (dragIndex: number, hoverIndex: number) => {
    const result = Array.from(orderedActivities);
    const [removed] = result.splice(dragIndex, 1);
    result.splice(hoverIndex, 0, removed);

    const orderedResult = result.map((el, index) => ({ id: el.id, order: index }));

    reorderActivities({ variables: { shopId: shop?.id, input: orderedResult } });
  };

  return (
    <ProductsSubMenuLayout>
      <ActivitiesGroupLayout
        onAddClick={onModalOpen}
        title="Category"
        items={
          <DndProvider backend={HTML5Backend}>
            {orderedActivities.map(({ name, type, id }, index) => (
              <Activity
                moveRow={handleMoveRow}
                index={index}
                key={id}
                isActive={id === router.query?.activityId}
                name={getMultiLanguageValue(name)}
                type={type}
                id={id}
              />
            ))}
          </DndProvider>
        }
        addIcon={<AddIcon />}
      />
      <SubMenuGroupLayout>
        <SubMenuItemLayout
          icon={<ViewGridAddIcon />}
          name="Resources"
          link="/products/resources"
          isActive={router.pathname.includes('/products/resources')}
        />
      </SubMenuGroupLayout>
    </ProductsSubMenuLayout>
  );
};

export default ProductsSubMenu;
