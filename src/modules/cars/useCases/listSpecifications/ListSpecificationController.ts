import { container } from "tsyringe"
import { IControllers } from "../../../../usualInterfaces/IControllers"
import { Specification } from "../../infra/typeorm/entities/Specification"
import { ListSpecificationUseCase } from "./ListSpecificationUseCase"

type returnType = {
   status: "ok" | "created",
   result: Specification[]
}

class ListSpecificationController implements IControllers{
   async handle(): Promise<returnType> {
      const listSpecificationsUseCase = container.resolve(ListSpecificationUseCase)
      const specifications = await listSpecificationsUseCase.execute()

      return {
         status: "ok",
         result: specifications
      }
   }
}

export { ListSpecificationController }