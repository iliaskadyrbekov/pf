import { gql } from '@apollo/client';

import { ICustomer } from 'src/shared/interfaces/Customer';
import { IInvitedUser, IShopUserWithRole } from 'src/shared/interfaces';

interface ICountry {
  name: string;
  id: string;
  native: string;
}

interface IShopProfile {
  selling: string;
  revenue: string;
  industry: string;
  isForClient: boolean;
  legalBusinessName: string;
  streetAndHouseNumber: string;
  apartment: string;
  postalCode: string;
  city: string;
  phone: string;
  website: string;
  isBusiness: boolean;
}

export interface ICurrentUser {
  id: string;
  email: string;
  createdAt: Date;
}

export interface ICurrentShop {
  id: string;
  domain: string;
  name: string;
  profile?: IShopProfile;
  country?: ICountry;
  customers: ICustomer[];
  users: IShopUserWithRole[];
  invitedUsers?: IInvitedUser[];
  timezone: {
    id: string;
  };
}

export interface IAdminLoginRes {
  adminLogin: {
    user: ICurrentUser;
    shop: ICurrentShop;
  };
}

export interface IAdminLoginVars {
  shopId: string;
}

export const ADMIN_LOGIN = gql`
  query AdminLogin($shopId: String!) {
    adminLogin(shopId: $shopId) {
      user {
        id
        email
        createdAt
      }
      shop {
        customers {
          id
          name
          phone
          email
        }
        id
        logo
        name
        domain
        country {
          id
          native
          latLng {
            lat
            lng
          }
        }
        legal {
          type
          content {
            value
            lang
            country
          }
        }
        timezone {
          id
        }
        language {
          availableLanguages {
            country {
              id
            }
            language {
              id
              name
              native
              rtl
            }
          }
          defaultLanguage {
            country {
              id
            }
            language {
              id
              name
              native
              rtl
            }
          }
        }
        payment {
          stripe {
            id
            mode
            chargesEnabled
            detailsSubmitted
            settings {
              dashboard {
                displayName
              }
            }
          }
        }
        currency {
          id
          decimalDigits
          symbolNative
        }
        profile {
          legalBusinessName
          streetAndHouseNumber
          apartment
          postalCode
          city
          contactEmail
        }
        invitedUsers(shopId: $shopId) {
          email
          status
          user {
            profile {
              firstName
              lastName
              avatar
            }
          }
        }
        users(shopId: $shopId) {
          shopRole
          user {
            email
            profile {
              firstName
              lastName
              avatar
            }
          }
        }
      }
    }
  }
`;

// export const adminLogin = async (req: IncomingMessage | undefined, shopId: string) => {
//   const opts = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       cookie: req?.headers?.cookie || '',
//     },
//     body: JSON.stringify({ query: loginQuery, variables: { shopId } }),
//   };

//   const response = await fetch(process.env.GRAPHQL_ENDPOINT as string, opts);

//   return response.json() as Promise<IAdminLoginResponse>;
// };
