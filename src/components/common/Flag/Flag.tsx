import React from 'react';

import FlagLayout from './components/FlagLayout';
import FlagDefaultLayout from './components/FlagDefaultLayout';

import { getS3FileUrl } from '@utils/getS3FileUrl';

interface IFlagProps {
  countryId?: string;
}

const Flag = ({ countryId }: IFlagProps) => {
  return (
    <React.Fragment>
      {countryId ? <FlagLayout src={getS3FileUrl(`flags/${countryId}.svg`)} /> : <FlagDefaultLayout />}
    </React.Fragment>
  );
};

export default Flag;
