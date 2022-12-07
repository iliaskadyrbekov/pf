import React from 'react';
import RecommendedLayout from './RecommendedLayout';

interface IRecommendedProps {
  button: React.ReactNode;
}

const Recommended = ({ button }: IRecommendedProps) => {
  return (
    <RecommendedLayout
      description="Upload your logo, add languages and set the correct timezone. Also add important information like your VAT."
      learnMore="Learn more"
      skip="Skip for now"
      button={button}
    />
  );
};

export default Recommended;
