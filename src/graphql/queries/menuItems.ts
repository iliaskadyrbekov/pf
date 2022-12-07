import { gql } from '@apollo/client';
import { IMenuItem } from 'src/shared/interfaces/MenuItem';

export interface IMenuItemsVars {
  shopId?: string;
}

export interface IMenuItemsRes {
  menuItems: IMenuItem[];
}

export const MENU_ITEMS = gql`
  query Menu($shopId: ObjectId!) {
    menuItems(shopId: $shopId) {
      id
      order
      name {
        lang
        value
        country
      }
      linkedPages {
        ... on ActivityLinkedPage {
          type
          activity(withDraft: true) {
            id
          }
        }
        ... on NewsLinkedPage {
          type
          news(withDraft: true) {
            id
          }
        }
        ... on CustomPageLinkedPage {
          type
          customPage(withDraft: true) {
            id
          }
        }
      }
    }
  }
`;
