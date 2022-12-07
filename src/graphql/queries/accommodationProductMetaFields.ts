import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { IAccommodationProductMetaFields } from 'src/shared/interfaces';

export interface IAccommodationProductMetaFieldsRes {
  accommodationProductMetaFields: IAccommodationProductMetaFields;
}

export const ACCOMMODATION_PRODUCT_META_FIELDS = gql`
  query AccommodationProductMetaFields {
    accommodationProductMetaFields {
      visibility {
        options {
          id
          label
        }
      }
      tariff {
        options {
          id
          label
        }
      }
      specification {
        options {
          id
          label
        }
      }
    }
  }
`;

export const useAccommodationProductMetaFields = () => {
  return useQuery<IAccommodationProductMetaFieldsRes>(ACCOMMODATION_PRODUCT_META_FIELDS);
};
