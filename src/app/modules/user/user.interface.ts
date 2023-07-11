import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUserRole = 'seller' | 'buyer';

export type IUser = {
  phoneNumber: string;
  role: IUserRole;
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  role?: string;
};
