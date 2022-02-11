import { container } from "tsyringe"
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers"
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase"


class UpdateUserAvatarController implements IControllers{
   async handle({others}: controllerArgs): Promise<{ status: "created" | "ok"; result: Object; }> {
      const {user_id} = others
    
      const avatar_file = others.file.filename
   
      const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
      await updateUserAvatarUseCase.execute({ user_id, avatar_file })
   
      return {
         status: "ok",
         result: {}
      }
   }
}

export { UpdateUserAvatarController }