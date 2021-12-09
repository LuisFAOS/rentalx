import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
   async handle(req: Request, res: Response): Promise<Response>{
      const car:ICreateCarDTO = req.body.car

      const createCarUseCase = container.resolve(CreateCarUseCase)
      await createCarUseCase.execute(car)

      return res.status(201).send()
   }
}

export { CreateCarController }