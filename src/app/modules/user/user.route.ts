import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  UserController.getMyProfile
);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  UserController.updateMyProfile
);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
