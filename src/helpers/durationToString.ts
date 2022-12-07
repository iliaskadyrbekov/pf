import pluralize from 'pluralize';

import { DurationType } from 'src/shared/enums/DurationType';
import { IDuration } from 'src/shared/interfaces/Duration';

export const durationToString = ({ type, value }: IDuration) => {
  return {
    [DurationType.DAYS]: pluralize('day', value, true),
    [DurationType.HOURS]: pluralize('hour', value, true),
    [DurationType.MINUTES]: pluralize('minute', value, true),
  }[type];
};
