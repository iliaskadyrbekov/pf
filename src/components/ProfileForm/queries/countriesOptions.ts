import { gql } from '@apollo/client';

import { ICountry } from 'src/shared/interfaces/Shop';

export interface ICountriesOptions {
  countriesOptions: ICountry[];
}

export const COUNTRIES_OPTIONS = gql`
  query CountriesOptions {
    countriesOptions {
      native
      name
      id
      phone
    }
  }
`;
