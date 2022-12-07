import { SubMenuItemLayout } from '@components/Menu/SubMenu/components';
import React from 'react';

import { useCustomField } from 'src/lib/useCustomField';
import { ACTIVITIES } from '../../constants';
import ActivitiesLayout from './ActivitiesLayout';

const Activities = () => {
  const [{ value }, , { setValue }] = useCustomField('type');

  const handleClick = React.useCallback(
    (type) => () => {
      setValue(type);
    },
    [setValue],
  );

  const items = ACTIVITIES.map((activity, index) => {
    const props = {
      key: index,
      name: activity.name,
      icon: <activity.Icon />,
    };

    return activity.isReady ? (
      <SubMenuItemLayout isActive={value === activity.type} onClick={handleClick(activity.type)} {...props} />
    ) : (
      <SubMenuItemLayout isInactive={true} {...props} />
    );
  });

  return <ActivitiesLayout activities={items} title="Select what you want to sell" />;
};

export default Activities;
