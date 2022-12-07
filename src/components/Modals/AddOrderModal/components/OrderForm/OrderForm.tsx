import React from 'react';
import { Formik } from 'formik';

import { IOrderItem } from 'src/shared/interfaces/OrderItem';
import { OrderItemType } from 'src/shared/enums/OrderItemType';
import { TCheckoutFormField } from 'src/shared/interfaces/CheckoutForm';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import { FormLanguageContext } from 'src/context';
import { Button } from '@components/common/Button';
import IconWithTextLayout from 'src/layouts/IconWithTextLayout';
import { OrderLayout, OrderFields } from '..';
import OrderFormLayout from './OrderFormLayout';
import { getIconByType } from 'src/helpers';

interface IOrderItemCheckoutField {
  type: CHECKOUT_FORM_FIELD_TYPE;
  value: string | Date | boolean;
}

interface IOrderFormProps {
  onSubmit(values: Record<string, Record<string, IOrderItemCheckoutField>>, helpers: { setStatus(): void }): void;
  onClose(): void;
  orderItems: IOrderItem[];
}

const OrderForm = ({ orderItems, onSubmit, onClose }: IOrderFormProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const getCheckoutFieldInitialValue = (field: TCheckoutFormField) => {
    switch (field.type) {
      case CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO:
        return getMultiLanguageValue(field.text);
      case CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX:
        return false;
      default:
        return '';
    }
  };

  const getCheckoutForm = (checkoutForm: TCheckoutFormField[]) => {
    return checkoutForm.reduce<Record<string, IOrderItemCheckoutField>>((acc, cur) => {
      return {
        ...acc,
        [cur.id]: { value: getCheckoutFieldInitialValue(cur), type: cur.type },
      };
    }, {});
  };

  const initialValues = orderItems.reduce<Record<string, Record<string, IOrderItemCheckoutField>>>((acc, cur) => {
    switch (cur.orderItem.type) {
      case OrderItemType.TICKET:
        return {
          ...acc,
          [cur.orderItem.id]: getCheckoutForm(cur.event.product.checkoutForm),
        };
      case OrderItemType.RENTAL:
        return {
          ...acc,
          [cur.orderItem.id]: getCheckoutForm(cur.orderItem.event.product.checkoutForm),
        };
      case OrderItemType.GIFT_CARD:
        return {
          ...acc,
          [cur.orderItem.id]: getCheckoutForm(cur.orderItem.product.checkoutForm),
        };
      case OrderItemType.ACCOMMODATION:
        return {
          ...acc,
          [cur.orderItem.id]: getCheckoutForm(cur.orderItem.product.checkoutForm),
        };
    }
  }, {});

  const getOrderItem = (orderItem: IOrderItem) => {
    const item = orderItem.orderItem;
    const commonProps = { key: item.id, ticketIcon: getIconByType(item.type) };

    switch (item.type) {
      case OrderItemType.TICKET:
        const product = orderItem.event.product;
        return (
          <OrderLayout
            title={getMultiLanguageValue(product.name)}
            ticketName={getMultiLanguageValue(item.pricing.name)}
            fields={<OrderFields orderId={item.id} checkoutForm={product.checkoutForm} />}
            {...commonProps}
          />
        );
      case OrderItemType.RENTAL:
        return (
          <OrderLayout
            title={getMultiLanguageValue(item.event.product.name)}
            ticketName={getMultiLanguageValue(item.pricing.name)}
            fields={<OrderFields orderId={item.id} checkoutForm={item.event.product.checkoutForm} />}
            {...commonProps}
          />
        );
      case OrderItemType.ACCOMMODATION:
        return (
          <OrderLayout
            title={getMultiLanguageValue(item.product.name)}
            ticketName={getMultiLanguageValue(item.pricing.name)}
            fields={<OrderFields orderId={item.id} checkoutForm={item.product.checkoutForm} />}
            {...commonProps}
          />
        );
      default:
        return;
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <OrderFormLayout
          orderItems={orderItems.map((orderItem) => getOrderItem(orderItem))}
          cancelButton={
            <Button onClick={onClose} color="primary" className="w-full">
              <IconWithTextLayout text="Cancel order" />
            </Button>
          }
          goToCartButton={
            <Button onClick={() => handleSubmit()} className="w-full">
              <IconWithTextLayout text="Submit" />
            </Button>
          }
        />
      )}
    </Formik>
  );
};

export default OrderForm;
