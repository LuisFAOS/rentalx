import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController implements IControllers{
   async handle({body, queryParams}: controllerArgs): Promise<{ status: "created" | "ok"; result: Object; }> {
      
      const car_id  = queryParams.car_id as string
      const specifications_id = body.specifications_id as string[]
      
      const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

      await createCarSpecificationUseCase.execute({car_id, specifications_id})

      return {
         status: "created",
         result: {}
      }

   }
}

export { CreateCarSpecificationController }