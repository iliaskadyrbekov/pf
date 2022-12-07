import { IAvailabilityResource } from './AvailabilityResource';

export interface IConnectedAvailabilityResource {
  order: number;
  resource: IAvailabilityResource;
}
