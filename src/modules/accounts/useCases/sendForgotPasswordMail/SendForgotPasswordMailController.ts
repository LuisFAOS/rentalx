import { container } from "tsyringe";
import { IControllers } from "../../../../usualInterfaces/IControllers";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


class SendForgotPasswordMailController implements IControllers{
   async handle(_, body?: {email: string}): Promise<{ status: "created" | "ok"; result: Object; }> {
      const { email } = body

      const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

      await sendForgotPasswordMailUseCase.execute(email)

      return {
         status: "ok",
         result: {}
      }
   }
}

export { SendForgotPasswordMailController }