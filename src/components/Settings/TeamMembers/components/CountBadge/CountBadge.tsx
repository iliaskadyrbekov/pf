import React from 'react';

import { Badge } from '@components/common';

interface ICountBadgeProps {
  isActive: boolean;
  usersLength: number;
}

const CountBadge = ({ isActive, usersLength }: ICountBadgeProps) => {
  return usersLength ? (
    <Badge color={isActive ? 'blue' : 'gray'} variant="contained" className="ml-2">
      {usersLength}
    </Badge>
  ) : null;
};

export default CountBadge;
