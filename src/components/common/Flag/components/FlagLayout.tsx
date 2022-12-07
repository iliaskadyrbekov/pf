import React from 'react';

interface IFlagLayoutProps {
  src: string;
}

const classes = {
  wrapper: 'rounded h-[1.625rem] w-[2.125rem] object-cover shadow bg-white',
};

const FlagLayout = ({ src }: IFlagLayoutProps) => {
  return <img className={classes.wrapper} src={src} alt="Lang icon" />;
};

export default FlagLayout;
