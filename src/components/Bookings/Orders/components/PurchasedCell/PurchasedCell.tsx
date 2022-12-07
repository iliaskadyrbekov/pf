import moment from 'moment-timezone';
import { CellLayout } from '@components/common/Table/components';
import React from 'react';

interface IPurchasedCellProps {
  item: {
    payment?: {
      created: Date;
    };
  };
  index: number;
}

const classes = {
  td: 'px-6 py-4',
  wrapper: 'flex flex-col',
  date: 'text-sm font-medium leading-tight text-gray-900',
  time: 'text-sm leading-tight text-gray-500',
};

const PurchasedCell = ({ item, index }: IPurchasedCellProps) => {
  return item?.payment ? (
    <td key={index} className={classes.td}>
      <div className={classes.wrapper}>
        <p className={classes.date}>{moment(item.payment.created).format('DD/MM/yyyy')}</p>
        <p className={classes.time}>{moment(item.payment.created).format('HH:mm')}</p>
      </div>
    </td>
  ) : (
    <CellLayout>-</CellLayout>
  );
};

export default PurchasedCell;
