import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getSingleOrder
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);

export const OrderRoutes = router;
