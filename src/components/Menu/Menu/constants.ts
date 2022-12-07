import {
  HomeIcon as HomeIconOutline,
  CubeIcon as CubeIconOutline,
  ClipboardListIcon as ClipboardListIconOutline,
  UsersIcon as UsersIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
  CogIcon as CogIconOutline,
} from '@heroicons/react/outline';

import {
  HomeIcon as HomeIconSolid,
  CubeIcon as CubeIconSolid,
  ClipboardListIcon as ClipboardListIconSolid,
  UsersIcon as UsersIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  CogIcon as CogIconSolid,
} from '@heroicons/react/solid';

export enum MENU_ITEMS {
  HOME = 'home',
  PRODUCTS = 'products',
  BOOKINGS = 'bookings',
  CUSTOMERS = 'customers',
  ONLINE_SHOP = 'shop',
  SETTINGS = 'settings',
}

export const MENU_TREE = [
  { items: [{ name: MENU_ITEMS.HOME, link: '/', OutlineIcon: HomeIconOutline, SolidIcon: HomeIconSolid }] },
  {
    items: [
      { name: MENU_ITEMS.PRODUCTS, link: '/products', OutlineIcon: CubeIconOutline, SolidIcon: CubeIconSolid },
      {
        name: MENU_ITEMS.BOOKINGS,
        link: '/bookings/orders',
        OutlineIcon: ClipboardListIconOutline,
        SolidIcon: ClipboardListIconSolid,
      },
      { name: MENU_ITEMS.CUSTOMERS, link: '/customers', OutlineIcon: UsersIconOutline, SolidIcon: UsersIconSolid },
    ],
  },
  {
    items: [
      {
        name: MENU_ITEMS.ONLINE_SHOP,
        link: '/online-shop',
        OutlineIcon: ShoppingCartIconOutline,
        SolidIcon: ShoppingCartIconSolid,
      },
    ],
  },
  {
    items: [{ name: MENU_ITEMS.SETTINGS, link: '/settings', OutlineIcon: CogIconOutline, SolidIcon: CogIconSolid }],
  },
];
