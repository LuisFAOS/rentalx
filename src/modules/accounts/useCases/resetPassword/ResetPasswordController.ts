import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { container } from "tsyringe";
import { IControllers } from "../../../../usualInterfaces/IControllers";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

type queryParamsType = {token: string}
type bodyType = {password: string}

export class ResetPasswordController implements IControllers{
   async handle(queryParams?: queryParamsType, body?: bodyType): Promise<{ status: "created" | "ok"; result: Object; }> {
      const { token } = queryParams

      const { password } = body
      
      const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
      await resetPasswordUseCase.execute({token, password})

      return {
         status: "ok",
         result: {}
      }
   }
}