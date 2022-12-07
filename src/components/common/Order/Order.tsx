import React from 'react';

import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from '@components/Icons';
import { ItemLayout } from './components';

interface IOrderProps<T> {
  items: T[];
  onOrderChange: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

enum OrderType {
  UP,
  DOWN,
}

const Order = <T,>({ items, renderItem, onOrderChange }: IOrderProps<T>) => {
  const handleOrderChange = React.useCallback(
    (from: number, type: OrderType) => () => {
      const to = type === OrderType.UP ? from - 1 : from + 1;

      const newItems = [...items];
      newItems.splice(to, 0, newItems.splice(from, 1)[0]);

      onOrderChange(newItems);
    },
    [items, onOrderChange],
  );

  const handleRemoveItem = React.useCallback(
    (from: number) => () => {
      const newItems = [...items];
      newItems.splice(from, 1);

      return onOrderChange(newItems);
    },
    [items, onOrderChange],
  );

  const isFirst = React.useCallback((index: number) => index === 0, []);
  const isLast = React.useCallback((index: number, length: number) => index === length - 1, []);

  return (
    <>
      {items.map((item, index) => (
        <ItemLayout
          onUpClick={handleOrderChange(index, OrderType.UP)}
          onDownClick={handleOrderChange(index, OrderType.DOWN)}
          isUpDisabled={isFirst(index)}
          isDownDisabled={isLast(index, items.length)}
          key={index}
          upIcon={<ArrowUpIcon color={isFirst(index) ? '#9D9D9D' : '#6366F1'} />}
          downIcon={<ArrowDownIcon color={isLast(index, items.length) ? '#9D9D9D' : '#6366F1'} />}
          trashIcon={<TrashIcon onClick={handleRemoveItem(index)} />}
        >
          {renderItem(item, index)}
        </ItemLayout>
      ))}
    </>
  );
};

export default Order;
