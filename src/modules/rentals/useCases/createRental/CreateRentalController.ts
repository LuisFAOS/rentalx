import { container } from "tsyringe"
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

interface IBody {
   expected_return_date: Date,
   car_id: string
}

type returnType = { status: "created" | "ok"; result: Object; }


export class CreateRentalController implements IControllers{
   async handle({others, body}: controllerArgs): Promise<returnType> {
      const { expected_return_date, car_id} = body as IBody
      const { user_id } = others
      
      const createRentalUseCase = container.resolve(CreateRentalUseCase)

      await createRentalUseCase.execute({
         car_id,
         expected_return_date,
         user_id
      })

      return {
         status: "created",
         result: {}
      }
   }
}