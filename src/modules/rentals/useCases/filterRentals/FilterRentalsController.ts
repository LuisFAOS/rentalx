import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { container } from "tsyringe";
import { IControllers } from "../../../../usualInterfaces/IControllers";
import { IRentalFilterDTO } from "../../dtos/IRentalFilterDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { FilterRentalsUseCase } from "./FilterRentalsUseCase";

type returnType = { status: "created" | "ok"; result: Rental[]; }
type bodyType = {rentalFilter: IRentalFilterDTO}

class FilterRentalsController implements IControllers{
   async handle(_, body?: bodyType, others?: { user_id?: string}): Promise<returnType> {

      const { user_id } = others
      const {rentalFilter} = body

      const filterRentalsUseCase = container.resolve(FilterRentalsUseCase)
      const rentals = await filterRentalsUseCase.execute({...rentalFilter, user_id})

      return {
         status: "ok",
         result: rentals
      }
   }

}

export { FilterRentalsController }