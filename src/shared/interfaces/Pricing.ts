import { TariffType } from '../enums';
import { IDuration } from './Duration';
import { MultiLanguageField } from './MultiLanguageField';

export interface IProductPricing {
  name: MultiLanguageField[];
  price: number;
  comparedWithPrice?: number;
}

export interface ITicketPricingVariation extends IProductPricing {
  id: string;
  order: number;
}

export interface IRentalPricingVariation extends IProductPricing {
  id: string;
  duration: IDuration;
  minPurchase?: number;
  maxPurchase?: number;
  order: number;
}

export interface IAccommodationPricing extends IProductPricing {
  tariff: TariffType;
}

export type TPricingVariation = ITicketPricingVariation | IRentalPricingVariation | IAccommodationPricing;
