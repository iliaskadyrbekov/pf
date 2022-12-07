import React from 'react';

import { getCellValue, IHeadRow } from '@components/common';

interface ICollapsableTableRowProps<T, Props> {
  items: T;
  headRow: IHeadRow<T, Props>[];
  renderContent: (items: T) => React.ReactNode;
}

const CollapsableTableRow = <T,>({ headRow, items, renderContent }: ICollapsableTableRowProps<T, any>) => {
  const [isOpenExpander, setOpenExpander] = React.useState<boolean>(false);

  const handleToggleSubTable = () => {
    setOpenExpander(!isOpenExpander);
  };

  const [firstCell, ...otherCells] = headRow;

  return (
    <React.Fragment>
      <tr className="border-t border-gray-200 cursor-pointer bg-gray-50" onClick={handleToggleSubTable}>
        <React.Fragment key="cell-0">
          {firstCell.renderCell?.({
            item: getCellValue(items, firstCell.accessor),
            index: 0,
            props: { ...firstCell.props, isOpenExpander },
          })}
        </React.Fragment>
        {otherCells.map(({ accessor, renderCell = () => null, props }, rowIndex) => (
          <React.Fragment key={`cell-${rowIndex + 1}`}>
            {renderCell({ item: getCellValue(items, accessor), index: rowIndex + 1, props })}
          </React.Fragment>
        ))}
      </tr>
      {isOpenExpander ? renderContent(items) : null}
    </React.Fragment>
  );
};

export default CollapsableTableRow;
