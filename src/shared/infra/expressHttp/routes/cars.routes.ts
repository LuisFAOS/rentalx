import { Router } from "express"
import multer from "multer"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

import { ExpressAdapter } from "../../../../adapters/ExpressAdapter"
import { uploadConfig } from '../../../../config/upload'

import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { UploadCarsImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController"

const carsRoutes = Router()

const uploadCar = multer(uploadConfig("./tmp/cars"))

carsRoutes.post("/",
   ensureAuthenticated,
   ensureAdmin,
   new CreateCarController().handle)

carsRoutes.post("/images", 

   uploadCar.array("images"),
   ExpressAdapter.create(new UploadCarsImageController().handle))

carsRoutes.get("/available",
   ExpressAdapter.create(new ListAvailableCarsController().handle)
)

carsRoutes.post("/specifications", 
   ExpressAdapter.create(new CreateCarSpecificationController().handle)
)

export { carsRoutes }