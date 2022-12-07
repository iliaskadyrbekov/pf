import { IResource, IResourceCategory } from '.';
import { ResourceType } from '../enums/ResourceType';

export interface IAreaResourceMeta {
  fields: {
    category: {
      options: IResourceCategory[];
    };
    group: {
      options: IAreaResourceGroup[];
    };
  };
}

export interface IAreaResourceGroup {
  id: string;
  name: string;
}

export interface IAreaResource extends IResource {
  type: ResourceType.AREA;
  category: IResourceCategory;
  group?: IAreaResourceGroup;
  SKU?: string;
}
