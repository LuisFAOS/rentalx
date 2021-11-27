import { Router } from 'express'
import { authenticatesRoutes } from './authenticates.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use("/users", usersRoutes)
router.use("/categories", categoriesRoutes)          
router.use("/specifications", specificationsRoutes)
router.use(authenticatesRoutes)

export { router }