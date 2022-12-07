import React from 'react';

import { SpinnerIcon } from '@components/Icons';

const classes = {
  wrapper: 'w-full h-full',
};

const Spinner = () => {
  return (
    <div className={classes.wrapper}>
      <SpinnerIcon />
    </div>
  );
};

export default Spinner;
