import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { IRentalProductMetaFields } from 'src/shared/interfaces';

export interface IRentalProductMetaFieldsRes {
  rentalProductMetaFields: IRentalProductMetaFields;
}

export const RENTAL_PRODUCT_META_FIELDS = gql`
  query RentalProductMetaFields {
    rentalProductMetaFields {
      visibility {
        options {
          id
          label
        }
      }
    }
  }
`;

export const useRentalProductMetaFields = () => {
  return useQuery<IRentalProductMetaFieldsRes>(RENTAL_PRODUCT_META_FIELDS);
};
