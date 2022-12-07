import { ResourceType } from '../enums/ResourceType';
import { IAreaResource } from './AreaResource';
import { IAvailabilityResource } from './AvailabilityResource';
import { MultiLanguageField } from './MultiLanguageField';
import { IShop } from './Shop';

export interface IResource {
  id: string;
  name: [MultiLanguageField];
  shop: IShop;
  type: ResourceType;
}

export type TResource = IAvailabilityResource | IAreaResource;
