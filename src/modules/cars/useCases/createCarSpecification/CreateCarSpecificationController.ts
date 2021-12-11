import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

interface IRequest {
   car_id: string,
   specifications_id: string[];
}

class CreateCarSpecificationController {
   async handle(params: {car_id: string}, body: {specifications_id: string[]}){
      
      const { car_id } = params
      const { specifications_id } = body
      
      const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

      await createCarSpecificationUseCase.execute({car_id, specifications_id})

      return {
         status: "created",
         result: {}
      }

   }
}

export { CreateCarSpecificationController }