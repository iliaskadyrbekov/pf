import React from 'react';

import { CellLayout } from '@components/common/Table/components';
import CreatedCheckoutSessionCellLayout from './CreatedCheckoutSessionCellLayout';

interface ICreatedCheckoutSessionCellProps {
  action: string;
  sessionId: string;
}

const CreatedCheckoutSessionCell = ({ action, sessionId }: ICreatedCheckoutSessionCellProps) => {
  return (
    <CellLayout>
      <CreatedCheckoutSessionCellLayout action={action} sessionId={sessionId} />
    </CellLayout>
  );
};

export default CreatedCheckoutSessionCell;
