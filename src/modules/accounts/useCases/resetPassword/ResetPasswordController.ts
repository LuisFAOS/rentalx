
import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController implements IControllers{
   async handle({queryParams, body}: controllerArgs): Promise<{ status: "created" | "ok"; result: Object; }> {
      const token = queryParams.token as string

      const { password } = body
      
      const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
      await resetPasswordUseCase.execute({token, password})

      return {
         status: "ok",
         result: {}
      }
   }
}