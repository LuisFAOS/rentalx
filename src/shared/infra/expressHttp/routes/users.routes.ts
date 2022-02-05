import { Router } from 'express'
import multer from "multer"
import uploadConfig from '../../../../config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ExpressAdapter } from '../../../../adapters/ExpressAdapter'
import { ProfileUserController } from '../../../../modules/accounts/useCases/profileUser/ProfileUserController'

const uploadAvatar = multer(uploadConfig)

const usersRoutes = Router()

usersRoutes.post("/", new CreateUserController().handle)

usersRoutes.patch("/avatar", 
   ensureAuthenticated,
   uploadAvatar.single("file"),
   new UpdateUserAvatarController().handle
)

usersRoutes.get("/profile", ensureAuthenticated, ExpressAdapter.create(ProfileUserController))

export { usersRoutes }