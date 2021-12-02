import { Request, Response } from "express"

import { container } from "tsyringe"
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase"


class UpdateUserAvatarController {
   async handle(req: Request, res: Response): Promise<Response>{
      const {user_id} = req
    
      const avatar_file = req.file.filename
   
      console.log(avatar_file)
      const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
      await updateUserAvatarUseCase.execute({ user_id, avatar_file })
   
      return res.status(204).send()
   }
}

export { UpdateUserAvatarController }