import { Router } from 'express'
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

specificationsRoutes.post("/", 
   ensureAuthenticated,
   ensureAdmin,
   new CreateSpecificationController().handle)

export { specificationsRoutes }