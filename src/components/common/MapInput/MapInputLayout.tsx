import React from 'react';

interface IMapInputLayoutProps {
  searchBox: React.ReactNode;
  map: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-4 w-full',
  mapWrapper: 'w-full h-80',
};

const MapInputLayout = ({ searchBox, map }: IMapInputLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {searchBox}
      <div className={classes.mapWrapper}>{map}</div>
    </div>
  );
};

export default MapInputLayout;
