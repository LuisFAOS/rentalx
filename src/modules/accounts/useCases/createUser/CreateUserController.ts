import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

type returnType = { status: "created" | "ok"; result: Object; }

class CreateUserController implements IControllers{
   async handle({body}: controllerArgs): Promise<returnType> {
      const { 
         name, 
         username, 
         driver_license, 
         email, 
         password 
      }:ICreateUserDTO = body

      const createUserUseCase = container.resolve(CreateUserUseCase)
      await createUserUseCase.execute({
         name, 
         username, 
         driver_license, 
         email, 
         password 
      })

      return {
         status: "created",
         result: {}
      }
   }
}

export { CreateUserController }