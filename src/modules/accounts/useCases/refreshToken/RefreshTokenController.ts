import { ParamsDictionary } from "express-serve-static-core";
import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

type returnType = { status: "created" | "ok"; result: Object; }

class RefreshTokenController implements IControllers {
   async handle({queryParams}: controllerArgs): Promise<returnType> {
      const token = queryParams.token as string
      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
      const refresh_token = await refreshTokenUseCase.execute(token)

      return {
         status: "created",
         result: {
            refresh_token
         }
      }
   }
}

export { RefreshTokenController }