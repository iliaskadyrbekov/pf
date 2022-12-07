import { IncomingMessage, ServerResponse } from 'http';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ICurrentUser, ICurrentShop, shopIdByDomain, ADMIN_LOGIN } from 'src/api';
import { initializeApollo } from './apolloClient';

type TUser = ICurrentUser | null;
type TShop = ICurrentShop | null;

export interface IHandlerProps {
  user: TUser;
  shop: TShop;
  req: IncomingMessage;
  res: ServerResponse;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
  client: ApolloClient<InMemoryCache>;
}

interface IHandlerReturn {
  props: Record<string, unknown>;
}

export type THandler = ({ user, shop }: IHandlerProps) => Promise<IHandlerReturn>;

export const withUserCheck =
  (handler: THandler) =>
  async ({ req, res, ...rest }: any) => {
    const client = initializeApollo(null, req);

    let user: ICurrentUser | null = null;
    let shop: ICurrentShop | null = null;

    // TODO not commit !!!;
    // req.headers.host = 'ilyas4.payfaction.com';

    try {
      const { data: shopData, errors: shopErrors } = await shopIdByDomain(req);

      if (shopErrors) {
        throw shopErrors;
      }

      const { data: adminData, errors } = await client.query({
        query: ADMIN_LOGIN,
        variables: {
          shopId: shopData.shopIdByDomain,
        },
      });

      if (errors) {
        throw errors;
      }

      user = adminData.adminLogin.user;
      shop = adminData.adminLogin.shop;

      if (!shop?.profile && req.url !== '/account-setup') {
        return {
          redirect: { destination: '/account-setup', permanent: false },
          props: {
            shop,
            user,
          },
        };
      }
    } catch (errors) {
      console.error(errors, 'errors');
      if (req.url !== '/access-denied') {
        return {
          redirect: { destination: '/access-denied', permanent: false },
          props: {
            shop,
            user,
          },
        };
      }
    }

    return handler({ user, shop, req, client, res, ...rest });
  };
