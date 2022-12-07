import React from 'react';
import moment from 'moment-timezone';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { CheckoutField } from './components';
import { Badge } from '@components/common/Badge';

import { classNames } from '@utils/classNames';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { TOrderItemCheckoutFormField } from 'src/shared/interfaces/OrderItem';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import { CellLayout } from '../Cell';

interface ICheckoutFormCellProps {
  item: {
    checkoutForm: [TOrderItemCheckoutFormField];
  };
}

const classes = {
  td: 'relative',
};

const CheckoutFormCell = ({ item }: ICheckoutFormCellProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  if (!item?.checkoutForm?.length) {
    return <CellLayout>-</CellLayout>;
  }

  const renderCheckoutField = (checkoutField: TOrderItemCheckoutFormField, index: number) => {
    switch (checkoutField.type) {
      case CHECKOUT_FORM_FIELD_TYPE.CALENDAR:
        return (
          <CheckoutField
            key={index}
            name={getMultiLanguageValue(checkoutField.name)}
            value={moment(checkoutField.dateValue).format('DD/MM/yyyy')}
          />
        );
      default:
        return <CheckoutField name={getMultiLanguageValue(checkoutField.name)} value={checkoutField.value} />;
    }
  };

  return (
    <CellLayout className={classes.td}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="focus:outline-none">
              <Badge
                variant="contained"
                color="indigo"
                className={classNames(open ? '' : 'text-opacity-70', 'hover:text-opacity-100 flex')}
              >
                Checkout form
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </Badge>
            </Popover.Button>
            {open && (
              <Popover.Panel className="absolute z-10 w-max-content">
                <div className="p-4 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-50">
                  <div className="grid gap-1">{item.checkoutForm.map(renderCheckoutField)}</div>
                </div>
              </Popover.Panel>
            )}
          </>
        )}
      </Popover>
    </CellLayout>
  );
};

export default CheckoutFormCell;
