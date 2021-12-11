import { container } from "tsyringe"
import { Specification } from "../../infra/typeorm/entities/Specification"
import { ListSpecificationUseCase } from "./ListSpecificationUseCase"

interface IOutput{
   status: string,
   result: Specification[]
}

class ListSpecificationController{

   async handle():Promise<IOutput>{
      const listSpecificationsUseCase = container.resolve(ListSpecificationUseCase)
      const specifications = await listSpecificationsUseCase.execute()

      return {
         status: "ok",
         result: specifications
      }
   }
}

export { ListSpecificationController }