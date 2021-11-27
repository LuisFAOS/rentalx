import { Router } from 'express'

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController"

const authenticatesRoutes = Router()

authenticatesRoutes.post("/sessions", new AuthenticateUserController().handle)

export { authenticatesRoutes }