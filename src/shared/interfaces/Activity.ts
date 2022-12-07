import { MultiLanguageField } from './MultiLanguageField';
import { TProduct } from './Product';
import { IShop } from './Shop';
import { ActivityType } from '../enums';
import { TContentMedia } from './MediaContent';
import { IVisibilityOption } from './Visibility';
import { ILocation } from './Location';
import { ICategory } from './Category';
import { IAccommodationActivitySpecification } from './Specification';

export interface IActivity extends IRentalActivity, IAccommodationActivity {
  id: string;
  icon?: string;
  type: ActivityType;
  name: MultiLanguageField[];
  description: MultiLanguageField[];
  headImage: string;
  products: TProduct[];
  content: TContentMedia[];
  order: number;
  visibility: IVisibilityOption;
  shop: IShop;
  location?: ILocation;
  locationEnabled?: boolean;
}

export interface IRentalActivity {
  categories?: ICategory[];
}

export interface IAccommodationActivity {
  specificationFilterEnabled?: boolean;
  specificationFilter?: IAccommodationActivitySpecification[];
}
