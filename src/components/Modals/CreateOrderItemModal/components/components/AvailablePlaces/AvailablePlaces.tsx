import React from 'react';
import { ColorSwatchIcon } from '@heroicons/react/outline';

import AvailablePlacesLayout from './AvailablePlacesLayout';

import { isDefined } from '@utils/isDefined';

interface IAvailablePlacesProps {
  total: number;
  leftPlaces: number;
}

const AvailablePlaces = ({ total, leftPlaces }: IAvailablePlacesProps) => {
  const color = isDefined(leftPlaces)
    ? total / 2 >= leftPlaces
      ? 'text-yellow-500'
      : 'text-green-500'
    : 'text-green-500';

  return (
    <AvailablePlacesLayout
      total={total}
      left={isDefined(leftPlaces) ? leftPlaces : 'Unlimited'}
      icon={<ColorSwatchIcon />}
      label="Available"
      color={color}
    />
  );
};

export default AvailablePlaces;
