import { IncomingMessage } from 'http';
import { fetchAPI } from 'src/lib/fetchApi';
import { ICountry, ILanguage, ILanguageWithCountry, IShop, ITimezone } from 'src/shared/interfaces/Shop';
import { ICurrency } from '../shared/interfaces/Currency';

type TShopFormVars = {
  id?: string;
  shopId?: string;
};

export interface IShopFormMeta {
  fields: {
    country: {
      options: ICountry[];
    };
    currency: {
      options: ICurrency[];
    };
    language: {
      options: ILanguage[];
    };
    timezone: {
      options: ITimezone[];
    };
    languageWithCountry: {
      options: ILanguageWithCountry[];
    };
  };
}

export interface IShopForm {
  shopForm: {
    data?: IShop;
    meta: IShopFormMeta;
  };
}

const SHOP_FORM = `
  query ShopForm($shopId: ObjectId!) {
    shopForm(shopId: $shopId) {
      data {
        id
        logo
        name
        country {
          id
          native
        }
        language {
          defaultLanguage {
            country {
              id
            }
            language {
              id
            }
          }
          availableLanguages{
            country {
              id
            }
            language {
              id
            }
          }
        }
        timezone {
          id
          rawFormat
        }
        currency {
          id
          symbolNative
        }
        profile {
          VAT
          contactEmail
          senderEmail
          legalBusinessName
          streetAndHouseNumber
          apartment
          city
          postalCode
          phone
          website
        }
      }
      meta {
        fields {
          country {
            options {
              id
              native
              phone
            }
          }
          currency {
            options {
              id
              name
            }
          }
          language {
            options {
              id
              native
            }
          }
          languageWithCountry {
            options {
              country {
                id
                name
                phone
              }
              language {
                id
                name
                native
              }
            }
          }
          timezone {
            options {
              id
              rawFormat
              rawOffsetInMinutes
            }
          }
        }
      }
    }
  }
`;

export const getShopForm = (req: IncomingMessage, variables: TShopFormVars): Promise<IShopForm> => {
  return fetchAPI(req, SHOP_FORM, { variables });
};
