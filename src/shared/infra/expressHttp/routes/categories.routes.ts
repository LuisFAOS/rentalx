import { Router } from 'express'
import multer from 'multer'
import { uploadConfig } from '../../../../config/upload';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router()

const upload = multer(uploadConfig("./tmp"))

categoriesRoutes.post("/", 
   ensureAuthenticated,
   ensureAdmin,
   new CreateCategoryController().handle)

categoriesRoutes.get("/", new ListCategoriesController().handle)

categoriesRoutes.post("/import-file", 
   ensureAuthenticated,
   ensureAdmin,
   upload.single("file"), new ImportCategoryController().handle)

export { categoriesRoutes }
