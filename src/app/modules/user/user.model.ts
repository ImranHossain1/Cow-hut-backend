/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { userRole } from './user.constant';
import config from '../../../config';
import bcrypt from 'bcrypt';
const UserSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'> | null> {
  return await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
};
UserSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / User.save()
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

//exclude password field
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model<IUser, UserModel>('User', UserSchema);
