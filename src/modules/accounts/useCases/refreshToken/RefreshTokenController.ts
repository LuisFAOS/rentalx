import { ParamsDictionary } from "express-serve-static-core";
import { container } from "tsyringe";
import { IControllers } from "../../../../usualInterfaces/IControllers";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

type tokenType = { 
   authToken: string
}

type returnType = { status: "created" | "ok"; result: Object; }

class RefreshTokenController implements IControllers {
   async handle(queryParams?: tokenType, body?: tokenType, others?: tokenType): Promise<returnType> {
      const { authToken } = body || others || queryParams
      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
      const refresh_token = await refreshTokenUseCase.execute(authToken)

      return {
         status: "created",
         result: {
            refresh_token
         }
      }
   }
}

export { RefreshTokenController }