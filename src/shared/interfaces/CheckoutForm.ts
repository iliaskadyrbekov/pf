import { CHECKOUT_FORM_FIELD_TYPE } from '../enums/CheckoutFormFieldType';
import { MultiLanguageArrayField } from './MultiLanguageArrayField';
import { MultiLanguageField } from './MultiLanguageField';

export interface IBaseCheckoutField {
  id: string;
  type: CHECKOUT_FORM_FIELD_TYPE;
  name: MultiLanguageField[];
  isRequired: boolean;
  shouldBePrinted: boolean;
  order: number;
}

export interface ICheckoutField extends IBaseCheckoutField {
  type:
    | CHECKOUT_FORM_FIELD_TYPE.NAME
    | CHECKOUT_FORM_FIELD_TYPE.NUMBER
    | CHECKOUT_FORM_FIELD_TYPE.CALENDAR
    | CHECKOUT_FORM_FIELD_TYPE.FREE_TEXT;
}

export interface ICheckoutOptionsField extends IBaseCheckoutField {
  type: CHECKOUT_FORM_FIELD_TYPE.OPTIONS;
  options: MultiLanguageArrayField[];
}

export interface ICheckoutTermsCheckboxField extends IBaseCheckoutField {
  type: CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX;
  url: MultiLanguageField[];
}

export interface ICheckoutExtraInfoField extends IBaseCheckoutField {
  type: CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO;
  text: MultiLanguageField[];
}

export type TCheckoutFormField =
  | ICheckoutField
  | ICheckoutOptionsField
  | ICheckoutExtraInfoField
  | ICheckoutTermsCheckboxField;

export interface ICheckoutFormRequest {
  fields: ICheckoutField[];
  termsCheckboxFields: ICheckoutTermsCheckboxField[];
  optionsFields: ICheckoutOptionsField[];
  extraInfoFields: ICheckoutExtraInfoField[];
}
