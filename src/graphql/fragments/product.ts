import gql from 'graphql-tag';

import { CHECKOUT_FORM_FIELDS } from './checkoutForm';

export const PRODUCT_FIELDS = gql`
  ${CHECKOUT_FORM_FIELDS}
  fragment ProductFields on Product {
    id
    type

    visibility {
      label
      id
    }

    VAT {
      id
    }

    shortDescription {
      lang
      value
      country
    }

    name {
      lang
      value
      country
    }

    ... on TicketProduct {
      availabilityType
      checkoutEnabled
      checkoutForm {
        ...CheckoutFields
      }
      duration {
        type
        value
      }
      pricing {
        name {
          lang
          value
          country
        }
        order
        comparedWithPrice
        price
      }
      activity {
        id
        shop {
          id
          VATs {
            id
            value
          }
        }
      }
    }
    ... on RentalProduct {
      category {
        id
      }
      media
      checkoutEnabled
      checkoutForm {
        ...CheckoutFields
      }
      pricing {
        name {
          lang
          value
          country
        }
        comparedWithPrice
        order
        duration {
          type
          value
        }
        minPurchase
        maxPurchase
        price
      }
      activity {
        id
        shop {
          id
          VATs {
            id
            value
          }
        }
      }
    }
    ... on GiftCardProduct {
      pricing {
        name {
          country
          lang
          value
        }
        order
        comparedWithPrice
        price
      }
      checkoutEnabled
      expiresAt {
        type
        value
      }
      checkoutForm {
        ...CheckoutFields
      }
      activity {
        id
        shop {
          id
          VATs {
            id
            value
          }
        }
      }
    }
    ... on AccommodationProduct {
      accommodationMedia: media {
        isMain
        key
        order
      }
      accommodationPricing: pricing {
        name {
          country
          lang
          value
        }
        comparedWithPrice
        price
        tariff
      }
      checkoutEnabled
      checkoutForm {
        ...CheckoutFields
      }
      specificationsEnabled
      specifications {
        type
        order
        amount
      }
      activity {
        id
        shop {
          id
          VATs {
            id
            value
          }
        }
      }
    }
  }
`;
