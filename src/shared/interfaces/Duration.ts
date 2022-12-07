import { DurationType } from '../enums/DurationType';

export interface IDuration {
  type: DurationType;
  value: number;
}

export interface IOptionalDuration {
  type: DurationType;
  value: number | null;
}
