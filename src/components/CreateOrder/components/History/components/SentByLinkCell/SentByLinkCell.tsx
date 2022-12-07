import React from 'react';

import { CellLayout } from '@components/common/Table/components';

interface ISentByLinkCellProps {
  action: string;
}

const SentByLinkCell = ({ action }: ISentByLinkCellProps) => {
  return (
    <CellLayout>
      <p className="text-sm font-medium leading-tight text-gray-800">{action}</p>
    </CellLayout>
  );
};

export default SentByLinkCell;
