import { container } from "tsyringe"
import { IControllers } from "../../../../usualInterfaces/IControllers"
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase"

type returnType = { status: "created" | "ok"; result: Object }

class DevolutionRentalController implements IControllers{
   async handle({others}): Promise<returnType> {
      const { user_id } = others
      const { id } = others.params
      
      const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

      await devolutionRentalUseCase.execute({
         rental_id: id,
         user_id
      })

      return {
         status: "ok",
         result: {}
      }
   }
   
}

export { DevolutionRentalController }