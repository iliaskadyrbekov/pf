import { IVisibilityOption } from './Visibility';

import { ProductType } from '../enums/ProductType';
import { AvailabilityType, DurationType } from '../enums';

export interface ITicketProductMetaFields {
  type: ProductType.TICKET;
  availabilityType: {
    options: ITicketProductAvailabilityMetaField[];
  };
  durationType: {
    options: ITicketProductDurationMetaField[];
  };
  visibility: {
    options: IVisibilityOption[];
  };
}

interface ITicketProductAvailabilityMetaField {
  value: AvailabilityType;
  label: string;
}

interface ITicketProductDurationMetaField {
  value: DurationType;
  label: string;
}
