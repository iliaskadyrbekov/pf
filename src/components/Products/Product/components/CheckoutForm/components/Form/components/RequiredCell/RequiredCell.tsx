import React from 'react';

import { Toggle } from '@components/common/Toggle';
import { CellLayout } from '@components/Products/Product/components';
import { FormField } from '@components/common/FormFields/FormField';

import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';

interface IRequiredCellProps {
  name: string;
  type: CHECKOUT_FORM_FIELD_TYPE;
}

const RequiredCell = ({ name, type }: IRequiredCellProps) => {
  if (type === CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO) {
    return <CellLayout className="pt-3.5">{null}</CellLayout>;
  }

  return (
    <CellLayout className="pt-3.5">
      <FormField onChange={(val) => val} component={Toggle} name={`${name}.isRequired`} />
    </CellLayout>
  );
};

export default RequiredCell;
