import React from 'react';

interface IProductsLayoutProps {
  imageUrl: string;
  caption: string;
  button: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col w-full items-center mt-40 space-y-6',
  caption: 'text-2xl font-bold leading-7 text-gray-300',
};

const ProductsLayout = ({ imageUrl, caption, button }: IProductsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <img src={imageUrl} />
      <p className={classes.caption}>{caption}</p>
      {button}
    </div>
  );
};

export default ProductsLayout;
