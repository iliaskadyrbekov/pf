import React from 'react';

import { DefaultTableCell, getCellValue, IHeadRow } from '@components/common';
import { useDnd } from '@hooks/useDnd';
import { classNames } from '@utils/classNames';
import { isNumber } from '@utils/isNumber';

interface IDraggableTableRowProps<T, Props> {
  item: T;
  index: number;
  headRow: IHeadRow<T, Props>[];
  emptyValue?: string;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

interface IFieldProps {
  dragRef: React.Ref<HTMLTableCellElement>;
  isDragging: boolean;
}

const DraggableTableRow = <T,>({ headRow, item, index, moveRow, emptyValue }: IDraggableTableRowProps<T, any>) => {
  const { preview, dropRef, dragRef, isDragging, isOver, itemIndex } = useDnd<
    HTMLTableRowElement,
    HTMLTableCellElement
  >({
    type: 'row',
    index,
    moveFn: moveRow,
  });

  const [firstCell, ...others] = headRow;
  const showPlacement = !!isOver && isNumber(itemIndex) && !isDragging;

  return (
    <>
      {showPlacement && itemIndex > index && <tr className="h-4" />}
      <tr ref={preview(dropRef) as any} className={classNames(isDragging && 'bg-gray-100')}>
        {firstCell.renderCell?.({
          item: getCellValue(item, firstCell.accessor),
          index,
          props: { dragRef, isDragging },
        }) || null}
        {others.map(({ accessor, renderCell, props }, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {renderCell ? (
              renderCell({ item: getCellValue(item, accessor), index, props: props as IFieldProps })
            ) : (
              <DefaultTableCell item={item} accessor={accessor} index={index} emptyValue={emptyValue} />
            )}
          </React.Fragment>
        ))}
      </tr>
      {showPlacement && itemIndex < index && <tr className="h-4" />}
    </>
  );
};

export default DraggableTableRow;
