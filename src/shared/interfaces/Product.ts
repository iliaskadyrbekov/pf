import { TNewTicketEvent } from './TicketEvent';
import { TRentalEvent } from './RentalEvent';
import { ProductType } from '../enums/ProductType';
import { MultiLanguageField } from './MultiLanguageField';
import { IActivity } from './Activity';
import { TCheckoutFormField } from './CheckoutForm';
import { IDuration } from './Duration';
import { AvailabilityType } from '../enums';
import { IAccommodationPricing, IRentalPricingVariation, ITicketPricingVariation } from './Pricing';
import { IVisibilityOption } from './Visibility';
import { IAccommodationSpecification } from './Specification';
import { ICategory } from './Category';
import { IMultipleMedia } from './Media';
import { IVAT } from '.';

export interface IBaseProduct {
  id: string;
  name: MultiLanguageField[];
  VAT?: IVAT;
  shortDescription?: MultiLanguageField[];
  order: number;
  type: ProductType;
  visibility: IVisibilityOption;
}

export interface ITicketProduct extends IBaseProduct {
  type: ProductType.TICKET;
  duration: IDuration;
  availabilityType: AvailabilityType;
  events: TNewTicketEvent[];
  checkoutEnabled: boolean;
  checkoutForm: TCheckoutFormField[];
  pricing: [ITicketPricingVariation];
  firstAvailableDate?: Date;
  activity: IActivity;
}

export interface IRentalProduct extends IBaseProduct {
  type: ProductType.RENTAL;
  media?: string;
  events: TRentalEvent[];
  activity: IActivity;
  pricing: [IRentalPricingVariation];
  checkoutEnabled: boolean;
  checkoutForm: TCheckoutFormField[];
  category?: ICategory;
  firstAvailableDate?: Date;
}

export interface IGiftCardProduct extends IBaseProduct {
  type: ProductType.GIFT_CARD;
  activity: IActivity;
  pricing: [ITicketPricingVariation];
  checkoutEnabled: boolean;
  checkoutForm: TCheckoutFormField[];
  expiresAt: IDuration;
}

export interface IAccommodationProduct extends IBaseProduct {
  type: ProductType.ACCOMMODATION;
  activity: IActivity;
  checkoutEnabled: boolean;
  availableDays: Date[];
  availablePlaces: number;
  firstAvailableDay: Date;
  checkoutForm: TCheckoutFormField[];
  accommodationMedia?: IMultipleMedia[];
  accommodationPricing: IAccommodationPricing;
  specificationsEnabled?: boolean;
  specifications: IAccommodationSpecification[];
  visibility: IVisibilityOption;
}

export type TProductWithEventsField = ITicketProduct | IRentalProduct;

export type TProduct = ITicketProduct | IRentalProduct | IGiftCardProduct | IAccommodationProduct;
