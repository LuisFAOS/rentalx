import { Router } from 'express'
import multer from "multer"
import { uploadConfig } from '../config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const usersRoutes = Router()

usersRoutes.post("/", new CreateUserController().handle)

usersRoutes.patch("/avatar", 
   ensureAuthenticated,
   uploadAvatar.single("file"),
   new UpdateUserAvatarController().handle
)

export { usersRoutes }