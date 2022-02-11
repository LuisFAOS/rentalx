import { Router } from 'express'
import { ExpressAdapter } from '../../../../adapters/ExpressAdapter'

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController"
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController'

const authenticatesRoutes = Router()

authenticatesRoutes.post("/sessions", ExpressAdapter.create(new AuthenticateUserController().handle))
authenticatesRoutes.post("/refresh_token", ExpressAdapter.create(new RefreshTokenController().handle))

export { authenticatesRoutes }