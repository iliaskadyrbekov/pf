import { ILocation } from './Location';
import { MultiLanguageField } from './MultiLanguageField';

export interface IShopPreferences {
  id: string;
  homepageTitle: MultiLanguageField[];
  homepageDescription: MultiLanguageField[];
  homepageHeadImage: string;
  location?: ILocation;
  locationEnabled?: boolean;
  newsEnabled?: boolean;
}
