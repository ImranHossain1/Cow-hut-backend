import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { Order } from './order.model';
import mongoose, { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IOrder } from './order.interface';
import { paginationHelpers } from '../../helpers/paginationHelpers';

const createOrder = async (cowId: string, buyerId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cow = await Cow.findById(cowId).session(session);
    const buyer = await User.findById(buyerId).session(session);

    if (!cow || !buyer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cow or buyer not found');
    }

    if (cow.label === 'sold out') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The cow is already sold out');
    }

    // Check if the buyer has enough budget
    if (buyer.budget < cow.price) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Insufficient budget to buy the cow'
      );
    }

    //cow.label = 'sold out';
    await Cow.findOneAndUpdate(
      { _id: cowId },
      { label: 'sold out' },
      {
        session,
      }
    );

    buyer.budget -= cow.price;
    //await buyer.save({ session });
    await User.findOneAndUpdate(
      { _id: buyerId },
      { budget: buyer.budget - cow.price },
      {
        session,
      }
    );
    const seller = await User.findById(cow.seller).session(session);
    if (!seller) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Cow, buyer, or seller not found'
      );
    }

    // const updatedPrice = {seller.income + cow.price};
    await User.findOneAndUpdate(
      { _id: cow.seller },
      { income: seller.income + cow.price },
      {
        session,
      }
    );

    const order = await Order.create([{ buyer: buyerId, cow: cowId }], {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return order; // Return the first object in the array
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to complete the transaction'
    );
  }
};

const getAllOrders = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Order.find()
    .populate('cow') // Populate the 'cow' field in the Order model
    .populate('buyer') // Populate the 'buyer' field in the Order model
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Order.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id).populate('cow').populate('buyer');
  return result;
};
export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
