import React from 'react';

interface IPricingRowLayoutProps {
  title: React.ReactNode;
  button: React.ReactNode;
}

const PricingRowLayout = ({ title, button }: IPricingRowLayoutProps) => {
  return (
    <div>
      {title}
      {button}
    </div>
  );
};

export default PricingRowLayout;
