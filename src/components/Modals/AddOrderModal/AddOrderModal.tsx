import React from 'react';
import { XIcon } from '@heroicons/react/solid';

import { OrderForm } from './components';
import { SpinnerIcon } from '@components/Icons';
import AddOrderModalLayout from './AddOrderModalLayout';
import AddToCartIcon from '@components/Icons/AddToCartIcon';

import { ShopContext } from 'src/context';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import { useCheckoutOrderItemsQuery } from '@components/Modals/CreateOrderItemModal/queries/checkoutOrderItems';
import {
  IConfirmOrderItemsInput,
  IOrderItemCheckoutFormInput,
  useCancelOrderItems,
  useConfirmOrderItems,
} from 'src/graphql/mutations';

interface IAddOrderModalProps {
  onClose: () => void;
  orderId: string;
}

interface IOrderItemCheckoutField {
  type: CHECKOUT_FORM_FIELD_TYPE;
  value: string | Date | number | boolean;
}

const AddOrderModal = ({ onClose, orderId }: IAddOrderModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { data, loading } = useCheckoutOrderItemsQuery({ orderId });
  const { mutate: cancelOrderItems } = useCancelOrderItems();

  const { mutate: confirmOrderItems } = useConfirmOrderItems();

  const orderItems = data?.checkoutOrderItems || [];

  const handleClose = React.useCallback(async () => {
    await cancelOrderItems({
      variables: { input: orderItems.map(({ orderItem }) => orderItem.id), notRemoveOrder: true, shopId: shop?.id },
      context: { orderId },
    });
    onClose();
  }, [orderItems]);

  const handleConfirm = React.useCallback(
    async (values: Record<string, Record<string, IOrderItemCheckoutField>>, { setStatus }) => {
      const getCheckoutForm = (checkoutForm: Record<string, IOrderItemCheckoutField>) => {
        return Object.entries(checkoutForm).reduce<IOrderItemCheckoutFormInput>(
          (acc, [key, { type, value }]) => {
            if (!value) {
              return acc;
            }

            switch (type) {
              case CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX:
                return { ...acc, termsFields: [...acc.termsFields, { id: key, value: value as boolean }] };
              case CHECKOUT_FORM_FIELD_TYPE.NUMBER:
                return { ...acc, numberFields: [...acc.numberFields, { id: key, value: value as number }] };
              case CHECKOUT_FORM_FIELD_TYPE.CALENDAR:
                return { ...acc, calendarFields: [...acc.calendarFields, { id: key, value: value as Date }] };
              default:
                return { ...acc, fields: [...acc.fields, { id: key, value: value as string }] };
            }
          },
          { fields: [], calendarFields: [], numberFields: [], termsFields: [] },
        );
      };

      const input = Object.entries(values).reduce<IConfirmOrderItemsInput[]>(
        (acc, [itemId, form]) => [...acc, { itemId, checkoutForm: getCheckoutForm(form) }],
        [],
      );

      try {
        await confirmOrderItems({ variables: { input } });

        onClose();
      } catch (err) {
        setStatus(getValidationErrors(err as IGraphqlError));
      }
    },
    [orderItems],
  );

  return (
    <AddOrderModalLayout
      loader={loading ? <SpinnerIcon /> : null}
      addToCartIcon={<AddToCartIcon className="w-[5.875rem] h-24" />}
      closeIcon={<XIcon onClick={handleClose} />}
      iconLabel="Added to cart"
      form={!loading && <OrderForm onClose={handleClose} onSubmit={handleConfirm} orderItems={orderItems} />}
    />
  );
};

export default AddOrderModal;
