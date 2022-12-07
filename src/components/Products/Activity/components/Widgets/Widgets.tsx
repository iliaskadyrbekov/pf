import React from 'react';
import { VisibilityType } from 'src/shared/enums/VisibilityType';
import { VisibilityWidget } from '../VisibilityWidget';
import WidgetsLayout from './WidgetsLayout';

interface IWidgetsProps {
  visibility: {
    label: string;
    id: VisibilityType;
  };
}

const Widgets = ({ visibility }: IWidgetsProps) => {
  const color = visibility.id === VisibilityType.VISIBLE ? 'text-green-500' : 'text-yellow-500';

  return (
    <WidgetsLayout>
      <VisibilityWidget title="Activity status" value={visibility.label} color={color} />
    </WidgetsLayout>
  );
};

export default Widgets;
