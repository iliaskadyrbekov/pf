import gql from 'graphql-tag';

export const MENU_ITEM_FIELDS = gql`
  fragment MenuItemFields on MenuItem {
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
        activity {
          id
        }
      }
    }
  }
`;
