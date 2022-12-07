import React from 'react';

import { Select } from '@components/common/Select';
import { FormField } from '@components/common/FormFields/FormField';
import { CellLayout } from '@components/Products/Product/components';
import { IconTextOption } from '@components/common/Select/components';

import { CHECKOUT_FORM_TYPE_OPTIONS } from 'src/shared/constants/checkoutFormTypeOptions';

interface ITypeCellProps {
  name: string;
}

const TypeCell = ({ name }: ITypeCellProps) => {
  return (
    <CellLayout>
      <FormField
        onChange={(val) => val}
        options={CHECKOUT_FORM_TYPE_OPTIONS}
        name={`${name}.type`}
        renderSelectedOption={(opt: any) => {
          // TODO add typescript to FormField
          const Icon = CHECKOUT_FORM_TYPE_OPTIONS.find(({ value }) => value === opt.value)?.Icon;
          return Icon ? <Icon className="h-5 w-5" /> : null;
        }}
        renderOption={(opt: any) => (
          <IconTextOption Icon={CHECKOUT_FORM_TYPE_OPTIONS.find(({ value }) => value === opt.value)?.Icon} {...opt} />
        )}
        component={Select}
      />
    </CellLayout>
  );
};

export default TypeCell;
