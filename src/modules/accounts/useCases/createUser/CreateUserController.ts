import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController{
   async handle(req: Request, res: Response): Promise<Response>{
      const { 
         name, 
         username, 
         driver_license, 
         email, 
         password 
      }:ICreateUserDTO = req.body

      const createUserUseCase = container.resolve(CreateUserUseCase)
      await createUserUseCase.execute({
         name, 
         username, 
         driver_license, 
         email, 
         password 
      })

      return res.status(201).send("user was created!")
   }
}

export { CreateUserController }