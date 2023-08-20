import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelper';
import { User } from '../modules/user/user.model';
import { Order } from '../modules/orderCow/order.model';
import { Cow } from '../modules/cow/cow.model';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; // role  , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      if (req.user.role === 'buyer' && req.method === 'GET') {
        const user = await User.findOne({
          phoneNumber: req.user.userPhoneNumber,
        });

        if (req.params.id) {
          const order = await Order.findById(req.params.id);
          if (
            user?._id &&
            order?.buyer &&
            user?._id.toString() !== order?.buyer.toString()
          ) {
            throw new ApiError(
              httpStatus.FORBIDDEN,
              'This is not your order, so you are not authorized to get this!!'
            );
          }
        }
      }
      if (req.user.role === 'seller' && req.method === 'GET') {
        //find who wants to authenticated
        const user = await User.findOne({
          phoneNumber: req.user.userPhoneNumber,
        });

        // find cow's seller
        const order = await Order.findById(req.params.id);
        const cow = await Cow.findById(order?.cow);
        if (
          user?._id &&
          cow?.seller &&
          user?._id.toString() !== cow?.seller.toString()
        ) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            'This is not your order, so you are not authorized to get this!!'
          );
        }
      }
      if (
        req.user.role === 'seller' &&
        (req.method === 'PATCH' || req.method === 'DELETE')
      ) {
        //find who wants to authenticated
        const user = await User.findOne({
          phoneNumber: req.user.userPhoneNumber,
        });

        const cow = await Cow.findById(req.params.id);
        if (
          user?._id &&
          cow?.seller &&
          user?._id.toString() !== cow?.seller.toString()
        ) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            'This is not your cow, so you are not authorized to modify this!!'
          );
        }
      }

      //const user = await User.find(req.user.userPhoneNumber);

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
