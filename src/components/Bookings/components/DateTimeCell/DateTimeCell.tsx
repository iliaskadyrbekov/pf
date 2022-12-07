import moment from 'moment-timezone';
import { CellLayout } from '@components/common/Table/components';
import React from 'react';

interface IDateTimeCellProps {
  item: Date | string;
  index: number;
  emptyValue?: string;
}

const classes = {
  td: 'px-6 py-4',
  wrapper: 'flex flex-col',
  date: 'text-sm font-medium leading-tight text-gray-900',
  time: 'text-sm leading-tight text-gray-500',
};

const DateTimeCell = ({ item, index, emptyValue }: IDateTimeCellProps) => {
  return item && item !== emptyValue ? (
    <td key={index} className={classes.td}>
      <div className={classes.wrapper}>
        <p className={classes.date}>{moment(item).format('DD/MM/yyyy')}</p>
        <p className={classes.time}>{moment(item).format('HH:mm')}</p>
      </div>
    </td>
  ) : (
    <CellLayout>-</CellLayout>
  );
};

export default DateTimeCell;
