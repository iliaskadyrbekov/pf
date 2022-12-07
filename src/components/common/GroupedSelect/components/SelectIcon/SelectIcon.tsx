import React from 'react';

import { SelectorIcon } from '@heroicons/react/outline';

const SelectIcon = () => {
  return (
    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <SelectorIcon className="h-5 w-5 text-gray-400" />
    </span>
  );
};

export default SelectIcon;
