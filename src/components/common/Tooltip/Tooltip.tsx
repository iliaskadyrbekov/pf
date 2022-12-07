import React from 'react';
import Tippy from '@tippyjs/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

import 'tippy.js/dist/tippy.css';

interface ITooltipProps {
  children: React.ReactNode;
  Element?: React.ReactNode;
}

const Tooltip = ({ children, Element }: ITooltipProps) => {
  return (
    <Tippy content={children}>
      <button type="button" className="focus:outline-none text-gray-500">
        {Element || <QuestionMarkCircleIcon className="h-4 w-4" />}
      </button>
    </Tippy>
  );
};

export default Tooltip;
