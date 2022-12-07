import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { Counter } from '@components/common';
import { FormField } from '@components/common';
import { CustomSelect } from '@components/Modals/CreateOrderItemModal/components/components';
import { OptionLayout } from '@components/Modals/CreateOrderItemModal/components/components/CustomSelect/components';

interface IProductSelectProps {
  productItems: IProductSelectItem[];
  text: string;
  countChosenProducts: number;
}

interface IProductSelectItem {
  id: string;
  name: string;
  leftPlaces: number;
  minimumCount: number;
}

const ProductSelect = ({ productItems, text, countChosenProducts }: IProductSelectProps) => {
  const [selected, setSelected] = React.useState(productItems[0].name);

  return (
    <CustomSelect
      selected={selected}
      setSelected={setSelected}
      rightIcon={
        <ChevronDownIcon
          className="h-5 w-5 text-[#2A2C32] group-hover:text-indigo-600 transition duration-300 ease-in-out"
          aria-hidden="true"
        />
      }
      listBox={productItems.map(({ name, leftPlaces, minimumCount }, index) => (
        <OptionLayout value={name} name={name} key={name}>
          {leftPlaces > 2 ? (
            <FormField name={`events[${index}].value`} component={Counter} remain={leftPlaces} minimum={minimumCount} />
          ) : null}
        </OptionLayout>
      ))}
      tipText={text}
      countItems={countChosenProducts > 0 ? `${countChosenProducts}x ` : ''}
    />
  );
};

export default ProductSelect;
