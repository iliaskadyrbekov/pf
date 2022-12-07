import React from 'react';

import { BadgesLayout } from '../Badges';

interface IBadgeCellProps {
  item: string;
  index: number;
}

const BadgeCell = ({ item, index }: IBadgeCellProps) => {
  return (
    <BadgesLayout color="blue" variant="contained" key={index}>
      {item}
    </BadgesLayout>
  );
};

export default BadgeCell;
