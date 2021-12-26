import { Router } from 'express'
import { authenticatesRoutes } from './authenticates.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { rentalsRoutes } from './rental.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use("/users", usersRoutes)
router.use("/cars", carsRoutes)
router.use("/categories", categoriesRoutes)          
router.use("/specifications", specificationsRoutes)
router.use("/rentals", rentalsRoutes)
router.use(authenticatesRoutes)

export { router }