import { DurationType } from 'src/shared/enums/DurationType';

// TODO options from backend ???
export const getDurationOptions = () => [
  { value: DurationType.MINUTES, label: 'Minutes' },
  { value: DurationType.HOURS, label: 'Hours' },
  { value: DurationType.DAYS, label: 'Days' },
];
