/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUserRole = 'admin' | 'seller' | 'buyer';

export type IUser = {
  phoneNumber: string;
  role: IUserRole;
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  role?: string;
};
