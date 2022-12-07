import { gql } from '@apollo/client';

import { PRODUCT_FIELDS } from './product';

export const PRODUCT_FORM_FIELDS = gql`
  ${PRODUCT_FIELDS}

  fragment ProductFormFields on ProductForm {
    data {
      ...ProductFields
    }
  }
`;
