import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { IFindAvailableCarsOptionsDTO } from "../../dtos/IFindAvailableCarsOptionsDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


type returnType = { status: "created" | "ok"; result: Car[]; }

class ListAvailableCarsController implements IControllers{
   async handle({body}: controllerArgs): Promise<returnType> {
      const options: IFindAvailableCarsOptionsDTO = body.options

      const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
      const cars = await listAvailableCarsUseCase.execute(options)

      return {
         status: "ok",
         result: cars
      }
   }
}

export { ListAvailableCarsController }