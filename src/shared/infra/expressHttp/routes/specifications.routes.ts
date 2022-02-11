import { Router } from 'express'
import { ExpressAdapter } from '../../../../adapters/ExpressAdapter';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '../../../../modules/cars/useCases/listSpecifications/ListSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

specificationsRoutes.post("/", 
   ensureAuthenticated,
   ensureAdmin,
   ExpressAdapter.create(new CreateSpecificationController().handle))

specificationsRoutes.get("/", ExpressAdapter.create(new ListSpecificationController().handle))

export { specificationsRoutes }