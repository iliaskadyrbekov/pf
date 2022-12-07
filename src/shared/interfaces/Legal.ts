import { LegalType } from '../enums/LegalType';
import { MultiLanguageField } from './MultiLanguageField';
import { IShop } from './Shop';

export interface ILegal {
  content: MultiLanguageField[];
  type: LegalType;
  shop: IShop;
}
