import { BlockLayout } from '@components/common/Block';
import React from 'react';
import VisibilityWidgetLayout from './VisibilityWidgetLayout';

interface IVisibilityWidgetProps {
  title: string;
  value: string;
  color: string;
}

const VisibilityWidget = ({ title, value, color }: IVisibilityWidgetProps) => {
  return (
    <BlockLayout className="w-80 shadow rounded-md">
      <VisibilityWidgetLayout title={title} value={value} color={color} />
    </BlockLayout>
  );
};
export default VisibilityWidget;
