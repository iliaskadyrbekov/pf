import React from 'react';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import moment from 'moment-timezone';
import { Settings } from 'luxon';

import { useApollo } from '../lib/apolloClient';
import { ICurrentShop, ICurrentUser } from 'src/api';

import '../styles/index.scss';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/resource-timeline/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/timeline/main.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';

import { UserProvider } from 'src/context/UserContext';
import { ShopProvider } from 'src/context/ShopContext';
import { FormLanguageProvider } from 'src/context/FormLanguageContext';
import { ModalProvider } from 'src/context/ModalContext';
import { ILanguageWithCountry } from '../shared/interfaces/Shop';

type TComponent = NextComponentType<NextPageContext> & {
  getLayout: (page: React.ReactNode) => JSX.Element;
};

interface IAppProps extends AppProps {
  user: ICurrentUser | null;
  shop: ICurrentShop | null;
  Component: TComponent;
}

const MyApp = ({ Component, pageProps }: IAppProps) => {
  const { user, shop, initialApolloState } = pageProps;
  const { availableLanguages = [], defaultLanguage = {} } = shop?.language || {};

  const apolloClient = useApollo(initialApolloState);

  moment.tz.setDefault(shop?.timezone.id);

  // DEV-321. RRule uses luxon lib for handling timezones, backend timezone is utc, but frontend is another.
  // This code makes frontend rrule behaves like backend rrule
  Settings.defaultZoneName = 'utc';

  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  const defaultLang = { languageId: defaultLanguage.language?.id, countryId: defaultLanguage.country?.id };
  const availableLangs = availableLanguages.map(({ language, country }: ILanguageWithCountry) => ({
    languageId: language.id,
    countryId: country.id,
  }));

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider user={user}>
        <ShopProvider shop={shop}>
          <FormLanguageProvider availableLanguages={availableLangs} defaultLanguage={defaultLang}>
            <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
          </FormLanguageProvider>
        </ShopProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default MyApp;
