import { Router } from 'express'
import multer from 'multer'
import { uploadConfig } from '../../../../config/upload';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router()

const upload = multer(uploadConfig("./tmp"))

categoriesRoutes.post("/", new CreateCategoryController().handle)

categoriesRoutes.get("/", new ListCategoriesController().handle)

categoriesRoutes.post("/import-file", upload.single("file"), new ImportCategoryController().handle)

export { categoriesRoutes }
