import React from 'react';

import CellLayout from '../../layouts/CellLayout';
import { Select } from '@components/common/Select';
import { FormField } from '@components/common/FormFields/FormField';
import { IconTextOption } from '@components/common/Select/components';

import { ISpecificationOption } from '@components/Products/Product/AccommodationProduct/components/Specification/Specification';

interface ITypeCellProps {
  name: string;
  specificationOptions: ISpecificationOption[];
}

const TypeCell = ({ name, specificationOptions }: ITypeCellProps) => {
  return (
    <CellLayout>
      <FormField
        onChange={(val) => val}
        options={specificationOptions}
        name={`${name}.type`}
        renderSelectedOption={(opt: any) => {
          const selected = specificationOptions.find(({ value }) => value === opt.value);
          return selected ? <IconTextOption Icon={selected.Icon} label={selected.label} /> : null;
        }}
        renderOption={(opt: any) => (
          <IconTextOption
            Icon={specificationOptions.find(({ value }) => value === opt.value)?.Icon}
            disabled={opt.disabled}
            {...opt}
          />
        )}
        component={Select}
        disabled={true}
      />
    </CellLayout>
  );
};

export default TypeCell;
