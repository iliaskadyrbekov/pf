import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { IGiftCardProductMetaFields } from 'src/shared/interfaces';

export interface IGiftCardProductMetaFieldsRes {
  giftCardProductMetaFields: IGiftCardProductMetaFields;
}

export const GIFT_CARD_PRODUCT_META_FIELDS = gql`
  query GiftCardProductMetaFields {
    giftCardProductMetaFields {
      visibility {
        options {
          id
          label
        }
      }
    }
  }
`;

export const useGiftCardProductMetaFields = () => {
  return useQuery<IGiftCardProductMetaFieldsRes>(GIFT_CARD_PRODUCT_META_FIELDS);
};
