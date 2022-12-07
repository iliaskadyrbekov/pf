import { ApolloClient, InMemoryCache } from '@apollo/client';
import { IncomingMessage, ServerResponse } from 'http';
import { ICurrentUser, ICurrentShop } from 'src/api';

import { initializeApollo } from './apolloClient';

type TUser = ICurrentUser | null;
type TShop = ICurrentShop | null;

interface IHandlerProps {
  client: ApolloClient<InMemoryCache>;
}

interface IGetServerSideProps {
  user: TUser;
  shop: TShop;
  req: IncomingMessage;
  res: ServerResponse;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

interface IHandlerReturn {
  props: Record<string, unknown>;
}

export type TWithApolloClientHandlerProps = IHandlerProps & IGetServerSideProps;

type THandler = (props: IHandlerProps & IGetServerSideProps) => Promise<IHandlerReturn>;

export const withApolloClient =
  (handler: THandler) =>
  async ({ shop, req, ...rest }: IGetServerSideProps) => {
    const client = initializeApollo(null, req);

    return handler({ shop, req, client, ...rest });
  };
