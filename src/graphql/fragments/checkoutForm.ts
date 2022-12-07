import gql from 'graphql-tag';

export const CHECKOUT_FIELD_FIELDS = gql`
  fragment CheckoutField on CheckoutField {
    type
    name {
      lang
      value
      country
    }
    isRequired
    shouldBePrinted
    order
  }
`;

export const CHECKOUT_EXTRA_INFO_FIELD_FIELDS = gql`
  fragment CheckoutExtraInfoField on CheckoutExtraInfoField {
    type
    name {
      lang
      value
      country
    }
    isRequired
    shouldBePrinted
    order
    text {
      lang
      value
      country
    }
  }
`;
export const CHECKOUT_TERMS_CHECKBOX_FIELD_FIELDS = gql`
  fragment CheckoutTermsCheckboxField on CheckoutTermsCheckboxField {
    type
    name {
      lang
      value
      country
    }
    isRequired
    shouldBePrinted
    order
    url {
      lang
      value
      country
    }
  }
`;

export const CHECKOUT_OPTIONS_FIELD_FIELDS = gql`
  fragment CheckoutOptionsField on CheckoutOptionsField {
    type
    name {
      lang
      value
      country
    }
    isRequired
    shouldBePrinted
    order
    options {
      lang
      value
      country
    }
  }
`;

export const CHECKOUT_FORM_FIELDS = gql`
  ${CHECKOUT_FIELD_FIELDS}
  ${CHECKOUT_EXTRA_INFO_FIELD_FIELDS}
  ${CHECKOUT_TERMS_CHECKBOX_FIELD_FIELDS}
  ${CHECKOUT_OPTIONS_FIELD_FIELDS}

  fragment CheckoutFields on CheckoutFieldUnion {
    ... on CheckoutField {
      ...CheckoutField
    }
    ... on CheckoutExtraInfoField {
      ...CheckoutExtraInfoField
    }
    ... on CheckoutOptionsField {
      ...CheckoutOptionsField
    }
    ... on CheckoutTermsCheckboxField {
      ...CheckoutTermsCheckboxField
    }
  }
`;
