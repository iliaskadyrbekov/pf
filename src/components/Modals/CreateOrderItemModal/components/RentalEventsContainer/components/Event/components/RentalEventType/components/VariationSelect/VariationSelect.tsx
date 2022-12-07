import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { CustomSelect } from '@components/Modals/CreateOrderItemModal/components/components';
import { OptionLayout } from '@components/Modals/CreateOrderItemModal/components/components/CustomSelect/components';

interface IVariationSelectProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  text: string;
  variations: { id: string; name: string }[];
}

const VariationSelect = ({ text, value, variations, onChange }: IVariationSelectProps) => {
  const selected = variations.find((variation) => variation.id === value)?.name || '';

  return (
    <CustomSelect
      selected={selected}
      setSelected={onChange}
      tipText={text}
      listBox={variations.map(({ id, name }) => (
        <OptionLayout name={name} value={id} isActive={name === selected} key={name} />
      ))}
      rightIcon={
        <ChevronDownIcon
          className="h-5 w-5 text-[#2A2C32] group-hover:text-indigo-600 transition duration-300 ease-in-out"
          aria-hidden="true"
        />
      }
    />
  );
};

export default VariationSelect;
