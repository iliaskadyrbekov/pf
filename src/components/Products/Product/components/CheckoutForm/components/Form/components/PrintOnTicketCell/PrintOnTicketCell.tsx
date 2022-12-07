import React from 'react';

import { Toggle } from '@components/common/Toggle';
import { CellLayout } from '@components/Products/Product/components';
import { FormField } from '@components/common/FormFields/FormField';

import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';

interface IPrintOnTicketCellProps {
  name: string;
  type: CHECKOUT_FORM_FIELD_TYPE;
}

const PrintOnTicketCell = ({ name, type }: IPrintOnTicketCellProps) => {
  if (type === CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO) {
    return <CellLayout className="pt-3.5">{null}</CellLayout>;
  }

  return (
    <CellLayout className="pt-3.5">
      <FormField onChange={(val) => val} component={Toggle} name={`${name}.shouldBePrinted`} />
    </CellLayout>
  );
};

export default PrintOnTicketCell;
