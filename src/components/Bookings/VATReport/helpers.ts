import React from 'react';

import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { IActivity } from 'src/shared/interfaces/Activity';

export const getActivitiesOptions = (activities: IActivity[]) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  return activities.map(({ name, id }) => ({ label: getMultiLanguageValue(name), value: id }));
};
