import { ILegal } from './Legal';
import { ICustomer } from './Customer';
import { ILocation } from './Location';
import { EStripeMode } from '../enums';
import { IInvitedUser } from './InvitedUser';
import { IShopUserWithRole } from './ShopUserWithRole';

export interface IShopProfile {
  VAT: string;
  legalBusinessName: string;
  streetAndHouseNumber: string;
  apartment: string;
  postalCode: string;
  city: string;
  phone: string;
  website: string;
  isBusiness: boolean;
  contactEmail?: string;
  senderEmail?: string;
}

export interface ITimezone {
  id: string;
  alternativeName: string;
  group: string[];
  continentCode: string;
  continentName: string;
  countryName: string;
  countryCode: string;
  mainCities: string[];
  rawOffsetInMinutes: number;
  abbreviation: string;
  rawFormat: string;
}

export interface ILanguageWithCountry {
  country: ICountry;
  language: ILanguage;
}

export interface ILanguage {
  id: string;
  native: string;
  name: string;
  rtl: number;
}

export interface ICountry {
  id: string;
  currency: string[];
  languages: string[];
  latLng: ILocation;
  name: string;
  native: string;
  phone: string;
  timezones: string[];
}

export interface IShopLanguage {
  defaultLanguage: ILanguageWithCountry;
  availableLanguages: ILanguageWithCountry[];
}

export interface IStripe {
  id: string;
  chargesEnabled: boolean;
  mode: EStripeMode;
  detailsSubmitted: boolean;
  settings: {
    dashboard: {
      displayName: string | null;
    };
  };
}

export enum EPaymentProviders {
  STRIPE = 'stripe',
}

export interface IPayment {
  stripe: IStripe;
}

export interface IVAT {
  id: string;
  value: number;
}

export interface IShop {
  id: string;
  logo?: string;
  name: string;
  domain: string;
  profile?: IShopProfile;
  language: IShopLanguage;
  timezone: ITimezone;
  payment?: IPayment;
  VATs: IVAT[];
  legal?: ILegal[];
  country: {
    id: string;
    name: string;
    latLng: {
      lat: number;
      lng: number;
    };
  };
  customers: ICustomer[];
  currency: {
    id: string;
    symbol: string;
    name: string;
    symbolNative: string;
    decimalDigits: number;
    rounding: number;
    namePlural: string;
  };
  users: IShopUserWithRole[];
  invitedUsers?: IInvitedUser[];
}
