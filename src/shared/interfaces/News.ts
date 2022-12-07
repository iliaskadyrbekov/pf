import { IShop } from './Shop';
import { MultiLanguageField } from './MultiLanguageField';
import { TContentMedia } from './MediaContent';
import { IVisibilityOption } from './Visibility';

export interface INews {
  id: string;
  name: MultiLanguageField[];
  createdAt: Date;
  shop: IShop;
  tags?: string[];
  headImage?: string;
  content?: TContentMedia[];
  visibility?: IVisibilityOption;
  description?: MultiLanguageField[];
}

export interface INewsMeta {
  fields: {
    visibility: {
      options: IVisibilityOption[];
    };
  };
}
