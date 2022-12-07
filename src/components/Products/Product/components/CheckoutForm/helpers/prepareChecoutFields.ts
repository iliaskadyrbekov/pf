import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import {
  ICheckoutExtraInfoField,
  ICheckoutField,
  ICheckoutOptionsField,
  ICheckoutTermsCheckboxField,
  TCheckoutFormField,
} from 'src/shared/interfaces/CheckoutForm';

export const prepareCheckoutFields = (checkoutFields: TCheckoutFormField[]) => {
  return checkoutFields.reduce(
    (acc, cur) => {
      switch (cur.type) {
        case CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO:
          acc.extraInfoFields.push(cur as ICheckoutExtraInfoField);
          break;
        case CHECKOUT_FORM_FIELD_TYPE.OPTIONS:
          acc.optionsFields.push(cur as ICheckoutOptionsField);
          break;
        case CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX:
          acc.termsCheckboxFields.push(cur as ICheckoutTermsCheckboxField);
          break;
        case CHECKOUT_FORM_FIELD_TYPE.CALENDAR:
        case CHECKOUT_FORM_FIELD_TYPE.FREE_TEXT:
        case CHECKOUT_FORM_FIELD_TYPE.NAME:
        case CHECKOUT_FORM_FIELD_TYPE.NUMBER:
          acc.fields.push(cur);
          break;
      }

      return acc;
    },
    {
      fields: [] as ICheckoutField[],
      termsCheckboxFields: [] as ICheckoutTermsCheckboxField[],
      optionsFields: [] as ICheckoutOptionsField[],
      extraInfoFields: [] as ICheckoutExtraInfoField[],
    },
  );
};
