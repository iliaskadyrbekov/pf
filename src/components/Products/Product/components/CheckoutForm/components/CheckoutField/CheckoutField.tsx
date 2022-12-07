import React from 'react';

import { getCellValue, IHeadRow } from '@components/common/Table';

import { useDnd } from '@hooks/useDnd';

interface ICheckoutFieldProps<T, Props> {
  item: T;
  index: number;
  headRow: IHeadRow<T, Props>[];
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

interface IFieldProps {
  dragRef: React.RefObject<HTMLTableDataCellElement>;
  isDragging: boolean;
}

const CheckoutField = <T,>({ item, index, headRow, moveRow }: ICheckoutFieldProps<T, IFieldProps>) => {
  const { preview, dropRef, dragRef, isDragging } = useDnd<HTMLTableDataCellElement, HTMLTableDataCellElement>({
    type: 'row',
    index,
    moveFn: moveRow,
  });

  const [firstCell, ...others] = headRow;

  return (
    <tr ref={preview(dropRef) as any}>
      {firstCell.renderCell?.({
        item: getCellValue(item, firstCell.accessor),
        index,
        props: { dragRef, isDragging },
      }) || null}
      {others.map(({ accessor, renderCell = () => null, props }, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {renderCell({ item: getCellValue(item, accessor), index, props: props as IFieldProps })}
        </React.Fragment>
      ))}
    </tr>
  );
};

export default CheckoutField;
