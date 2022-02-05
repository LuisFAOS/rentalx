import { Router } from "express"
import { ExpressAdapter } from '../../../../adapters/ExpressAdapter'
import { ResetPasswordController } from "../../../../modules/accounts/useCases/resetPassword/ResetPasswordController"
import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

const passwordRoutes = Router()

passwordRoutes.post("/forgot", ExpressAdapter.create(new SendForgotPasswordMailController().handle))
passwordRoutes.post("/reset", ExpressAdapter.create(new ResetPasswordController().handle))

export {passwordRoutes}