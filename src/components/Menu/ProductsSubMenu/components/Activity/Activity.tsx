import React from 'react';

import ActivityLayout from './ActivityLayout';
import {
  AccommodationIcon,
  MembershipIcon,
  MerchandiseIcon,
  RentalsIcon,
  ServicesIcon,
  TicketIcon,
} from '@components/Icons';
import { ActivityType } from 'src/shared/enums/ActivityType';
import { CakeIcon, DotsVerticalIcon, FlagIcon, GiftIcon } from '@heroicons/react/solid';
import { useDnd } from '@hooks/useDnd';

interface IActivityProps {
  id: string;
  name: string;
  type: ActivityType;
  isActive: boolean;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const Activity = ({ name, type, id, isActive, index, moveRow }: IActivityProps) => {
  const getIconByType = React.useCallback((type: ActivityType) => {
    switch (type) {
      case ActivityType.TICKET:
        return <TicketIcon />;
      case ActivityType.SERVICE:
        return <ServicesIcon />;
      case ActivityType.RENTAL:
        return <RentalsIcon />;
      case ActivityType.MERCHANDISE:
        return <MerchandiseIcon />;
      case ActivityType.MEMBERSHIP:
        return <MembershipIcon />;
      case ActivityType.ACCOMMODATION:
        return <AccommodationIcon />;
      case ActivityType.ADD_ON_PRODUCTS:
        return <CakeIcon />;
      case ActivityType.EVENTS:
        return <FlagIcon />;
      case ActivityType.GIFT_CARD:
        return <GiftIcon />;
    }
  }, []);

  const { preview, dropRef, dragRef, isDragging } = useDnd<HTMLDivElement, HTMLDivElement>({
    type: 'row',
    index,
    moveFn: moveRow,
  });

  const previewRef = preview(dropRef);

  return (
    <ActivityLayout
      previewRef={previewRef}
      dragRef={dragRef}
      dragIcon={<DotsVerticalIcon className={`${isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab'} h-5 w-5`} />}
      href={`/products/activity/${id}`}
      isActive={isActive}
      name={name}
      icon={getIconByType(type)}
    />
  );
};

export default Activity;
