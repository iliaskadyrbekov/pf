import React from 'react';
import { BlockLayout } from '../Block';
import AccordionLayout from './AccordionLayout';

interface IAccordionProps {
  expanded?: boolean;
  error?: string[];
  title: React.ReactNode;
  caption?: React.ReactNode;
  toggle: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

const Accordion = ({ expanded = false, title, toggle, content, error, className, caption }: IAccordionProps) => {
  return (
    <BlockLayout className={className} error={error}>
      <AccordionLayout title={title} toggle={toggle} caption={caption} content={expanded ? content : null} />
    </BlockLayout>
  );
};

export default Accordion;
