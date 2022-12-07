import { ApolloClient, InMemoryCache } from '@apollo/client';
import { IncomingMessage, ServerResponse } from 'http';
import { ICurrentUser, ICurrentShop } from 'src/api';
import { initializeApollo } from './apolloClient';
import { ACTIVITIES, IActivitiesRes, IActivitiesVars } from 'src/graphql/queries/activities';

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
  query: Record<string, unknown>;
  params: Record<string, unknown>;
}

export type TWithProductsHandlerProps = IHandlerProps & IGetServerSideProps;

interface IHandlerReturn {
  props: Record<string, unknown>;
}

type THandler = (props: IHandlerProps & IGetServerSideProps) => Promise<IHandlerReturn>;

export const withProductsMenu =
  (handler: THandler) =>
  async ({ shop, req, ...rest }: IGetServerSideProps) => {
    const client = initializeApollo(null, req);

    await client.query<IActivitiesRes, IActivitiesVars>({
      query: ACTIVITIES,
      variables: { shopId: shop?.id },
    });
    return handler({ shop, req, client, ...rest });
  };
