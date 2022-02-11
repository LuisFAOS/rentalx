import { container } from "tsyringe"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers"

type returnType = { status: "created" | "ok"; result: Object; }

class AuthenticateUserController implements IControllers{
   async handle({body}: controllerArgs): Promise<returnType> {
      const { email, password } = body

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
      const authenticateInfos = await authenticateUserUseCase.execute({ email, password })

      return {
         status: "ok",
         result: authenticateInfos
      }
   }
}

export { AuthenticateUserController }