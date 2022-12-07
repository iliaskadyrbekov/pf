import { IShop } from './Shop';
import { MultiLanguageField } from './MultiLanguageField';
import { TContentMedia } from './MediaContent';
import { IVisibilityOption } from './Visibility';

export interface ICustomPage {
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

export interface ICustomPageMeta {
  fields: {
    visibility: {
      options: IVisibilityOption[];
    };
  };
}
