import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import { TOrderItemCheckoutFormField, IOrderItemCheckoutFormCommonField } from 'src/shared/interfaces/OrderItem';

export const getBuyerNameFromCheckoutForm = (checkoutForm?: TOrderItemCheckoutFormField[]) => {
  const nameFromChechoutForm = checkoutForm?.find(
    ({ type }) => type === CHECKOUT_FORM_FIELD_TYPE.NAME,
  ) as IOrderItemCheckoutFormCommonField;

  return nameFromChechoutForm?.value;
};
