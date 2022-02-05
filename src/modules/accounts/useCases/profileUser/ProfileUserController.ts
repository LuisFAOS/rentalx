import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { container } from "tsyringe";

import { IControllers } from "../../../../usualInterfaces/IControllers";
import { ProfileUserUseCase } from "./ProfileUserUseCase";


type returnType = { status: "created" | "ok"; result: Object; }

export class ProfileUserController implements IControllers{
   async handle(others?: { user_id?: string; }): Promise<returnType> {
      const { user_id: id} = others
      const profileUserUseCase = container.resolve(ProfileUserUseCase)

      const user = await profileUserUseCase.execute(id)

      return {
         status: "ok",
         result: user
      }
   }
}