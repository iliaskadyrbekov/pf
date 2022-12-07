import React from 'react';
import { useQuery } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import MenuLayout from './MenuLayout';
import { Button } from '@components/common/Button';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { IMenuItemsRes, IMenuItemsVars, MENU_ITEMS } from 'src/graphql/queries/menuItems';
import { ShopContext } from 'src/context/ShopContext';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { useActivitiesQuery } from 'src/graphql/queries/activities';
import { useCreateMenuItem } from './mutations/createMenuItem';
import { getOptions } from './helpers';
import { MenuItemContainer } from './components/MenuItemContainer';
import { useReorderMenuItems } from './mutations/reorderMenuItems';
import { useListNewsQuery } from 'src/graphql/queries/listNews';
import { useListPageQuery } from 'src/graphql/queries/listPage';
import { TLinkedPage } from 'src/shared/interfaces/MenuItem';
import { ELinkedPageType } from 'src/shared/enums/LinkedPageType';

const Menu = () => {
  const { shop } = React.useContext(ShopContext);
  const { lang, availableLangs } = React.useContext(FormLanguageContext);

  const { mutate: createMenuItem } = useCreateMenuItem();
  const { mutate: reorderMenuItems } = useReorderMenuItems();

  const { data: menuData } = useQuery<IMenuItemsRes, IMenuItemsVars>(MENU_ITEMS, { variables: { shopId: shop?.id } });
  const { data: activitiesData } = useActivitiesQuery({ shopId: shop?.id });
  const { data: newsData } = useListNewsQuery({ shopId: shop?.id, withDraft: true });
  const { data: customPagesData } = useListPageQuery({ shopId: shop?.id, withDraft: true });

  const activities = activitiesData?.activities || [];
  const news = newsData?.listNews || [];
  const customPages = customPagesData?.listPage || [];

  const options = getOptions({ helpers: { lang, availableLangs }, activities, news, customPages });

  const menuItems = [...(menuData?.menuItems || [])].sort((a, b) => a.order - b.order);

  const handleMoveRow = (dragIndex: number, hoverIndex: number) => {
    const result = Array.from(menuItems);
    const [removed] = result.splice(dragIndex, 1);
    result.splice(hoverIndex, 0, removed);

    const orderedResult = result.map((el, index) => ({ id: el.id, order: index }));

    reorderMenuItems({ variables: { shopId: shop?.id, input: orderedResult } });
  };

  const handleCreateItem = () => {
    createMenuItem({
      variables: {
        shopId: shop?.id,
        menuItem: {
          name: [],
          order: menuItems.length,
          linkedPages: { activities: [], customPages: [], news: [] },
        },
      },
    });
  };

  const getSelectedMenuItems = (linkedPages: TLinkedPage[]) => {
    // TODO try to use objects instead of switch case
    return linkedPages.reduce<string[]>((acc, page) => {
      switch (page.type) {
        case ELinkedPageType.ACTIVITY:
          return page.activity?.id ? [...acc, page.activity?.id] : acc;
        case ELinkedPageType.NEWS:
          return page.news?.id ? [...acc, page.news?.id] : acc;
        case ELinkedPageType.CUSTOM_PAGE:
          return page.customPage?.id ? [...acc, page.customPage?.id] : acc;
      }
    }, []);
  };

  return (
    <MenuLayout
      items={
        <DndProvider backend={HTML5Backend}>
          {menuItems.map(({ name, id, linkedPages }, index) => (
            <MenuItemContainer
              id={id}
              key={id}
              index={index}
              menuName={name}
              selectedMenuItems={getSelectedMenuItems(linkedPages)}
              moveRow={handleMoveRow}
              options={options}
            />
          ))}
        </DndProvider>
      }
      actions={
        <PageActionsPortal
          actions={[
            <Button onClick={handleCreateItem} key="1" variant="contained" color="primary">
              New Menu
            </Button>,
          ]}
        />
      }
    />
  );
};

export default Menu;
