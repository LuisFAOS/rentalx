import { Router } from 'express'
import multer from 'multer'
import { ExpressAdapter } from '../../../../adapters/ExpressAdapter';
import uploadConfig from '../../../../config/upload';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router()

const upload = multer(uploadConfig)

categoriesRoutes.post("/", 
   ensureAuthenticated,
   ensureAdmin,
   ExpressAdapter.create(new CreateCategoryController().handle))

categoriesRoutes.get("/", ExpressAdapter.create(new ListCategoriesController().handle))

categoriesRoutes.post("/import-file", 
   ensureAuthenticated,
   ensureAdmin,
   upload.single("file"), ExpressAdapter.create(new ImportCategoryController().handle))

export { categoriesRoutes }
