import { gql, useMutation } from '@apollo/client';

import { MENU_ITEM_FIELDS } from 'src/graphql/fragments/menuItem';
import { MultiLanguageField } from 'src/shared/interfaces';
import { IMenuItem } from 'src/shared/interfaces/MenuItem';

export interface ICreateMenuItemVars {
  shopId?: string;
  menuItem: ICreateMenuItem;
}

export interface ICreateMenuItem {
  name: MultiLanguageField[];
  order: number;
  linkedPages: ILinkedPage;
}

export interface ILinkedPage {
  activities: string[];
  customPages: string[];
  news: string[];
}

export interface ICreateMenuItemRes {
  createMenuItem: IMenuItem;
}

export const CREATE_MENU_ITEM = gql`
  mutation CreateMenuItem($menuItem: MenuItemInput!, $shopId: ObjectId!) {
    createMenuItem(menuItem: $menuItem, shopId: $shopId) {
      ...MenuItemFields
    }
  }
  ${MENU_ITEM_FIELDS}
`;

export const useCreateMenuItem = () => {
  const [mutate, { data, error }] = useMutation<ICreateMenuItemRes, ICreateMenuItemVars>(CREATE_MENU_ITEM, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          menuItems(exisingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.createMenuItem,
              fragment: MENU_ITEM_FIELDS,
            });

            return [...exisingItems, newItemRef];
          },
        },
      });
    },
  });
  return { mutate, data, error };
};
