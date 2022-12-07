import { IShop } from './Shop';
import { IProfile } from './Profile';

export interface IUser {
  id: string;
  email: string;
  createdAt: Date;
  roles: {
    shopId?: string;
    roleInShop?: string;
  }[];
  updatedAt: Date;
  shops?: IShop[];
  profile?: IProfile;
}
