import React from 'react';

interface IAvatarLayoutProps {
  url: string;
}

const classes = {
  wrapper: 'rounded-full h-14 w-14',
};

const AvatarLayout = ({ url }: IAvatarLayoutProps) => {
  return <img className={classes.wrapper} src={url} />;
};

export default AvatarLayout;
