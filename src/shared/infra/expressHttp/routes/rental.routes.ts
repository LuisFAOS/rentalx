import { Router } from "express"
import { ExpressAdapter } from "../../../../adapters/ExpressAdapter"
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const rentalsRoutes = Router()

rentalsRoutes.post(
   "/", 
   ensureAuthenticated,
   ExpressAdapter.create(new CreateRentalController().handle)
)

export { rentalsRoutes }