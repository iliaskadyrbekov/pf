import React from 'react';

import { CogIcon } from '@heroicons/react/outline';
import { CellLayout } from '@components/common/Table/components';

interface ISettingsCellProps {
  index: number;
  onOpen: (index: number) => void;
}

const SettingsCell = ({ index, onOpen }: ISettingsCellProps) => {
  const handleSettings = () => {
    onOpen(index);
  };

  return (
    <CellLayout>
      <CogIcon onClick={handleSettings} className="h-5 w-5 cursor-pointer" />
    </CellLayout>
  );
};

export default SettingsCell;
