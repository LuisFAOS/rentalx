import { container } from "tsyringe";

import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { ProfileUserUseCase } from "./ProfileUserUseCase";


type returnType = { status: "created" | "ok"; result: Object; }

export class ProfileUserController implements IControllers{
   async handle({others}: controllerArgs): Promise<returnType> {
      const { user_id } = others
      const profileUserUseCase = container.resolve(ProfileUserUseCase)

      const user = await profileUserUseCase.execute(user_id)

      return {
         status: "ok",
         result: user
      }
   }
}