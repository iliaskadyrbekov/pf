import React from 'react';
import Link from 'next/link';

import { CellLayout } from '@components/common/Table/components';
import { Button, Tooltip } from '@components/common';

interface IOrderInfoCellProps {
  item: {
    shortId: string;
    id: string;
    note?: string;
  };
  index: number;
  onClick?: () => void;
}

const OrderInfoCell = ({ item, onClick, index }: IOrderInfoCellProps) => {
  return (
    <CellLayout key={index}>
      <div className="flex flex-row space-x-2 items-center">
        <Link href={`/bookings/orders/${item.id}`}>
          <a>
            <Button onClick={onClick} variant="link" color="primary">
              {item.shortId}
            </Button>
          </a>
        </Link>
        {item.note ? <Tooltip>{item.note}</Tooltip> : null}
      </div>
    </CellLayout>
  );
};

export default OrderInfoCell;
