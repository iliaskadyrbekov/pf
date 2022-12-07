import React from 'react';

interface IEventsLayoutProps {
  loader: React.ReactNode;
  products: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4 py-4',
  loader: 'w-20 h-20 mx-auto my-6',
};

const ProductsLayout = ({ loader, products }: IEventsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {!!loader && <div className={classes.loader}>{loader}</div>}
      {products}
    </div>
  );
};

export default ProductsLayout;
