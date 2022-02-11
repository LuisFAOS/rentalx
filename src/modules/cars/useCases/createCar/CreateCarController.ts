import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController implements IControllers{
   async handle({body}: controllerArgs): Promise<{ status: "created" | "ok"; result: Object; }> {
      const car:ICreateCarDTO = body.car

      const createCarUseCase = container.resolve(CreateCarUseCase)
      await createCarUseCase.execute(car)

      return {
         status: "created",
         result: {}
      }
   }
}

export { CreateCarController }