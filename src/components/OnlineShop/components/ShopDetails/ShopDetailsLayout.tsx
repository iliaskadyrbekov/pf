import React from 'react';

interface IShopDetailsLayoutProps {
  visibility: React.ReactNode;
  tags: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-3',
};

const ShopDetailsLayout = ({ visibility, tags }: IShopDetailsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {visibility}
      {tags}
    </div>
  );
};

export default ShopDetailsLayout;
