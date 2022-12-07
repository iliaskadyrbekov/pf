import React from 'react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/solid';

import { Counter } from '@components/common';
import { FormField } from '@components/common';
import { ITicketVariations } from '../../Event';
import { CustomSelect } from '@components/Modals/CreateOrderItemModal/components/components';
import { OptionLayout } from '@components/Modals/CreateOrderItemModal/components/components/CustomSelect/components';

interface IVariationSelectProps {
  variations: ITicketVariations[];
  currency: string;
  text: string;
  countChosenProducts: number;
  getMinimumCount(value: number, countChosenProducts: number): number;
}

const VariationSelect = ({
  variations,
  currency,
  text,
  countChosenProducts,
  getMinimumCount,
}: IVariationSelectProps) => {
  const selected = variations
    .filter((variation) => variation.value)
    .map((variation) => `${variation.value}x ${variation.name}`)
    .join(', ');

  return (
    <CustomSelect
      selected={selected}
      setSelected={() => null} // TODO
      tipText={text}
      listBox={variations.map(({ id, name, leftPlaces, pricing, value }, index) => (
        <OptionLayout name={name} value={name} pricing={`${pricing} ${currency}`} key={id}>
          <FormField
            name={`variations[${index}].value`}
            leftPlaces={leftPlaces}
            component={Counter}
            minimumCount={getMinimumCount(value, countChosenProducts)}
            maxCount={variations.reduce((acc, { value }) => acc + value, 0)}
          />
        </OptionLayout>
      ))}
      rightIcon={
        <ChevronDownIcon
          className="h-5 w-5 text-[#2A2C32] group-hover:text-indigo-600 transition duration-300 ease-in-out"
          aria-hidden="true"
        />
      }
      leftIcon={<UserIcon className="text-[#4F49F5]" width="24" height="24" />}
    />
  );
};

export default VariationSelect;
