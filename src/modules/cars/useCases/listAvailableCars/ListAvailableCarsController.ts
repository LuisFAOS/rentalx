import { container } from "tsyringe";
import { IFindAvailableCarsOptionsDTO } from "../../dtos/IFindAvailableCarsOptionsDTO";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


class ListAvailableCarsController{
   async handle(params: IFindAvailableCarsOptionsDTO, body){
      const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
      const cars = await listAvailableCarsUseCase.execute(params)

      return {
         status: "ok",
         result: cars
      }
   }
}

export { ListAvailableCarsController }