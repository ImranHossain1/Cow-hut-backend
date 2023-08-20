import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { IUser } from './user.interface';
import { userFilterableFields } from './user.constant';
import { paginationFields } from '../../constants/pagination';
import { UserService } from './user.service';
import { User } from './user.model';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created Successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retried successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findOne({
    phoneNumber: req.user?.userPhoneNumber,
  });
  const id: string | undefined = user?._id?.toString();
  if (id) {
    const result = await UserService.getSingleUser(id);
    // Rest of your code
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: result,
    });
  }
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findOne({
    phoneNumber: req.user?.userPhoneNumber,
  });
  const id: string | undefined = user?._id?.toString();
  const updatedData = req.body;
  if (id) {
    const result = await UserService.updateUser(id, updatedData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully !',
      data: result,
    });
  }
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted successfully!',
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
