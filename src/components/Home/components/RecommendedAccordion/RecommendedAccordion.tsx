import React from 'react';

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { ItemLayout } from './components';
import RecommendedAccordionLayout from './RecommendedAccordionLayout';

interface IRecommendedAccordionProps {
  items: { title: React.ReactNode; content: React.ReactNode }[];
}

const RecommendedAccordion = ({ items }: IRecommendedAccordionProps) => {
  const [activeItemIndex, setActiveItemIndex] = React.useState(2);

  const isActiveItem = (index: number) => activeItemIndex === index;

  return (
    <RecommendedAccordionLayout
      items={items.map((item, index) => (
        <ItemLayout
          key={index}
          isActiveItem={isActiveItem(index)}
          title={item.title}
          icon={
            isActiveItem(index) ? (
              <ChevronRightIcon width="24" height="24" />
            ) : (
              <ChevronDownIcon width="24" height="24" onClick={() => setActiveItemIndex(index)} />
            )
          }
        >
          {item.content}
        </ItemLayout>
      ))}
    />
  );
};

export default RecommendedAccordion;
