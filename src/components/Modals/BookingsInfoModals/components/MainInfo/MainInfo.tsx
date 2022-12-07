import React from 'react';

import { DescriptionListItem } from '../../../../common/DescriptionList';

interface IMainInfoProps {
  dateStart: string;
  dateEnd: string;
  booked: number;
  available: number | string;
}

const MainInfo = ({ dateStart, dateEnd, booked, available }: IMainInfoProps) => {
  return (
    <>
      <DescriptionListItem key="date-time" label="Date & time" item={`${dateStart} - ${dateEnd}`} />
      <DescriptionListItem key="booked-available" label="Booked & available" item={`${booked}/${available}`} />
    </>
  );
};

export default MainInfo;
