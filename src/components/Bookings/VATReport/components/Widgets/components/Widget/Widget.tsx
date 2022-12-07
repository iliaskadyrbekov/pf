import { BlockLayout } from '@components/common/Block';
import React from 'react';
import WidgetLayout from './WidgetLayout';

interface IWidgetProps {
  title: string;
  value: string;
}

const Widget = ({ title, value }: IWidgetProps) => {
  return (
    <BlockLayout className="flex-1 shadow rounded-md">
      <WidgetLayout title={title} value={value} />
    </BlockLayout>
  );
};

export default Widget;
