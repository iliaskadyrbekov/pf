import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import TextAccordionLayout from './TextAccordionLayout';

interface ITextAccordionProps {
  title: string;
  children: React.ReactNode;
}

const TextAccordion = ({ title, children }: ITextAccordionProps) => {
  const [collapsed, toggle] = React.useState(false);

  return (
    <TextAccordionLayout
      title={title}
      onClick={() => toggle(!collapsed)}
      icon={
        collapsed ? (
          <ChevronUpIcon className="w-6 h-6 text-indigo-600" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-indigo-600" />
        )
      }
    >
      {collapsed && children}
    </TextAccordionLayout>
  );
};

export default TextAccordion;
