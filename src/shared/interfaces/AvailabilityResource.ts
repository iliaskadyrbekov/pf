import { ResourceType } from '../enums/ResourceType';
import { IResource } from './Resource';

export interface IResourceCategory {
  id: string;
  name: string;
  group: string;
  groupName: string;
}

export interface IAvailabilityResourceMeta {
  fields: {
    category: {
      options: IResourceCategory[];
    };
  };
}

export interface IAvailabilityResource extends IResource {
  type: ResourceType.AVAILABILITY;
  category: IResourceCategory;
  availability: number;
  SKU?: string;
}
