import { container } from "tsyringe"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

interface IBody {
   expected_return_date: Date,
   car_id: string
}

export class CreateRentalController {
   async handle(_, body:IBody, others: {user_id: string}){
      const { expected_return_date, car_id} = body
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