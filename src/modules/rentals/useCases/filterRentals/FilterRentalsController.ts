import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { IRentalFilterDTO } from "../../dtos/IRentalFilterDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { FilterRentalsUseCase } from "./FilterRentalsUseCase";

type returnType = { status: "created" | "ok"; result: Rental[]; }
type bodyType = {rentalFilter: IRentalFilterDTO}

class FilterRentalsController implements IControllers{
   async handle({body, others}: controllerArgs): Promise<returnType> {

      const { user_id } = others
      const {rentalFilter} = body as bodyType

      const filterRentalsUseCase = container.resolve(FilterRentalsUseCase)
      const rentals = await filterRentalsUseCase.execute({...rentalFilter, user_id})

      return {
         status: "ok",
         result: rentals
      }
   }

}

export { FilterRentalsController }