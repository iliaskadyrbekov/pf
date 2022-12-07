import { MENU_ITEMS } from '@components/Menu';
import { CreditCardIcon, GlobeIcon, OfficeBuildingIcon, UsersIcon } from '@heroicons/react/outline';

export enum SETTINGS_ITEMS {
  HOME = 'Home',
  GENERAL = 'General',
  TEAM_MEMBERS = 'Team members',
  NOTIFICATIONS = 'Notifications',
  PAYMENTS = 'Payments',
  TAXES = 'Taxes',
  LANGUAGES = 'Languages',
  PLAN_AND_BILLING = 'Plan and billing',
}

const SETTINGS_TREE = [
  { name: SETTINGS_ITEMS.GENERAL, link: '/settings/general', Icon: OfficeBuildingIcon },
  { name: SETTINGS_ITEMS.TEAM_MEMBERS, link: '/settings/team-members', Icon: UsersIcon },
  { name: SETTINGS_ITEMS.LANGUAGES, link: '/settings/languages', Icon: GlobeIcon },
  { name: SETTINGS_ITEMS.PAYMENTS, link: '/settings/payments', Icon: CreditCardIcon },
];

export const SUB_MENU_TREE = {
  [MENU_ITEMS.SETTINGS]: SETTINGS_TREE,
  [MENU_ITEMS.HOME]: null,
  [MENU_ITEMS.PRODUCTS]: null,
  [MENU_ITEMS.BOOKINGS]: null,
  [MENU_ITEMS.CUSTOMERS]: null,
  [MENU_ITEMS.ONLINE_SHOP]: null,
};

export type SUB_MENU_ITEMS = SETTINGS_ITEMS;
