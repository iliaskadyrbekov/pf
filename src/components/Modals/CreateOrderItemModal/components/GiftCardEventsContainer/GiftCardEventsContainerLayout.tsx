import React from 'react';

interface IGiftCardEventsContainerLayoutProps {
  products: React.ReactNode;
}

const GiftCardEventsContainerLayout = ({ products }: IGiftCardEventsContainerLayoutProps) => {
  return <div>{products}</div>;
};

export default GiftCardEventsContainerLayout;
