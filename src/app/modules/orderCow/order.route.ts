import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);
router.get('/:id', OrderController.getSingleOrder);
router.get('/', OrderController.getAllOrders);

export const OrderRoutes = router;
