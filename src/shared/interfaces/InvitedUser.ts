import { IUser } from './User';
import { InviteTokenStatusType } from '../enums';

export interface IInvitedUser {
  email: string;
  status: InviteTokenStatusType;
  user?: IUser;
}
