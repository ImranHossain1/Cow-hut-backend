import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import { IOrder } from './order.interface';
import { paginationFields } from '../../constants/pagination';
import pick from '../../../shared/pick';
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { buyer, cow } = req.body;
  const result = await OrderService.createOrder(cow, buyer);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created Successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getAllOrders(paginationOptions);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders found successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await OrderService.getSingleOrder(id);
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully!',
      data: result,
    });
  });
export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder
};
