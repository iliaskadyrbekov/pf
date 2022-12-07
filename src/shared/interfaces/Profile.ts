import { IUser } from './User';

export interface IProfile {
  id: string;
  email: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  roles: string[];
  updatedAt: Date;
  user: IUser;
  phone?: string;
  avatar?: string;
}
