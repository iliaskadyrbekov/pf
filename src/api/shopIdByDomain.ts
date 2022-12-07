import { IncomingMessage } from 'http';

const getShopIdByDomainQuery = `
  query ShopIdByDomain($domain: String!) {
    shopIdByDomain(domain: $domain)
  }
`;

interface IShopIdByDomainResponse {
  data: {
    shopIdByDomain: string;
  };
  errors: unknown;
}

export const shopIdByDomain = async (req: IncomingMessage | undefined) => {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req?.headers?.cookie || '',
    },
    body: JSON.stringify({ query: getShopIdByDomainQuery, variables: { domain: req?.headers.host } }),
  };

  const response = await fetch(process.env.GRAPHQL_ENDPOINT as string, opts);

  return response.json() as Promise<IShopIdByDomainResponse>;
};
