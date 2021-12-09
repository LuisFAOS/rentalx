import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"

import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ExpressAdapter } from "../../../../adapters/ExpressAdapter"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController"

const carsRoutes = Router()

carsRoutes.post("/",
   ensureAuthenticated,
   ensureAdmin,
   new CreateCarController().handle)

carsRoutes.get("/available",
   ExpressAdapter.create(new ListAvailableCarsController().handle)
)

export { carsRoutes }