import { IncomingMessage } from 'http';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const GRAPHQL_ENDPOINT = publicRuntimeConfig?.GRAPHQL_ENDPOINT;

interface IProps {
  variables?: Record<string, unknown>;
}

export async function fetchAPI(req: IncomingMessage | undefined, query: string, { variables }: IProps = {}) {
  const res = await fetch(GRAPHQL_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req?.headers?.cookie || '',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}
