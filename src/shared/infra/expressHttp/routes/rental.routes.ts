import { Router } from "express"
import { ExpressAdapter } from "../../../../adapters/ExpressAdapter"
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController"
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController"
import { FilterRentalsController } from "../../../../modules/rentals/useCases/filterRentals/FilterRentalsController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const rentalsRoutes = Router()

rentalsRoutes.post(
   "/", 
   ensureAuthenticated,
   ExpressAdapter.create(new CreateRentalController().handle)
)

rentalsRoutes.post(
   "/devolution/:id", 
   ensureAuthenticated, 
   ExpressAdapter.create(new DevolutionRentalController().handle)
)

rentalsRoutes.get(
   "/filter",
   ensureAuthenticated,
   ExpressAdapter.create(new FilterRentalsController().handle)
)

export { rentalsRoutes }