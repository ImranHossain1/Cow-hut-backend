import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AdminValidation.loginZodSchema),
  AdminController.loginAdmin
);
router.post(
  '/refresh-token',
  validateRequest(AdminValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);

export const AdminRoutes = router;

/* 
router.get('/:id', AdminController.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);
router.delete('/:id', AdminController.deleteAdmin);
router.get('/', AdminController.getAllAdmins); */
