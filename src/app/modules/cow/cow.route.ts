import express from 'express';

//import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.get('/', CowController.getAllCows);
router.get('/:id', CowController.getSingleCow);
router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);
router.delete('/:id', CowController.deleteCow);
router.get('/', CowController.getAllCows);

export const CowRoutes = router;
