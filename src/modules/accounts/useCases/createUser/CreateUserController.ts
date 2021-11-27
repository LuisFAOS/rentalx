import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController{
   async handle(req: Request, res: Response): Promise<Response>{
      const user:ICreateUserDTO = req.body

      const createUserUseCase = container.resolve(CreateUserUseCase)
      await createUserUseCase.execute(user)

      return res.status(201).send("user was created!")
   }
}

export { CreateUserController }