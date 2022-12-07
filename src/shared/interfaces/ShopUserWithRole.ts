import { IUser } from './User';
import { ShopRoleStatus } from '../enums';

export interface IShopUserWithRole {
  shopRole: ShopRoleStatus;
  user: IUser;
}
