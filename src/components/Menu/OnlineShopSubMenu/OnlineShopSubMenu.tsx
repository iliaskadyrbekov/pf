import React from 'react';
import { useRouter } from 'next/router';
import {
  AdjustmentsIcon,
  CalendarIcon,
  MenuIcon,
  BriefcaseIcon,
  NewspaperIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/outline';

import OnlineShopSubMenuLayout from './OnlineShopSubMenuLayout';
import { SubMenuGroupLayout, SubMenuItemLayout } from '../Menu/components';

import { ShopContext } from 'src/context/ShopContext';
import { useListNewsQuery } from 'src/graphql/queries/listNews';
import { useListPageQuery } from 'src/graphql/queries/listPage';

const OnlineShopSubMenu = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);

  const { data: listPageData } = useListPageQuery({ shopId: shop?.id, withDraft: true });
  const listPage = listPageData?.listPage || [];

  const { data: listNewsData } = useListNewsQuery({ shopId: shop?.id, withDraft: true });
  const listNews = listNewsData?.listNews || [];

  return (
    <OnlineShopSubMenuLayout>
      <SubMenuGroupLayout>
        <SubMenuItemLayout
          icon={<CalendarIcon />}
          name="Overview"
          link="/online-shop"
          isActive={router.pathname === '/online-shop'}
        />
        <SubMenuItemLayout
          icon={<NewspaperIcon />}
          name="News"
          link="/online-shop/news"
          isActive={router.pathname === '/online-shop/news'}
          count={listNews.length}
        />
        <SubMenuItemLayout
          icon={<DocumentDuplicateIcon />}
          name="Pages"
          link="/online-shop/pages"
          isActive={router.pathname === '/online-shop/pages'}
          count={listPage.length}
        />
      </SubMenuGroupLayout>
      <SubMenuGroupLayout>
        <SubMenuItemLayout
          icon={<AdjustmentsIcon />}
          name="Preferences"
          link="/online-shop/preferences"
          isActive={router.pathname === '/online-shop/preferences'}
        />
        <SubMenuItemLayout
          icon={<MenuIcon />}
          name="Menu"
          link="/online-shop/menu"
          isActive={router.pathname === '/online-shop/menu'}
        />
        <SubMenuItemLayout
          icon={<BriefcaseIcon />}
          name="Legal"
          link="/online-shop/legal"
          isActive={router.pathname === '/online-shop/legal'}
        />
      </SubMenuGroupLayout>
      {/* <SubMenuGroupLayout>
        {[].map(({ name, type, id }) => (
          <MenuItemLayout
            key={id}
            isActive={id === router.query?.activityId}
            name={getMultiLangFieldValue(defaultLang, name, availableLangs) as string}
            link="some href"
          />
        ))}
      </SubMenuGroupLayout> */}
    </OnlineShopSubMenuLayout>
  );
};

export default OnlineShopSubMenu;
