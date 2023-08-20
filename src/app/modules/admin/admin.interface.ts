/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';

export type AdminName = {
  firstName: string;
  lastName: string;
};
export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};
export type IAdminRole = 'admin';

export type IAdmin = {
  phoneNumber: string;
  role: IAdminRole;
  password: string;
  name: AdminName;
  address: string;
};

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
//export type AdminModel = Model<IAdmin, Record<string, unknown>>;
