import { inject, injectable } from "tsyringe";
import { IRentalFilterDTO } from "../../dtos/IRentalFilterDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class FilterRentalsUseCase {
   constructor(
      @inject("RentalsRepository")
      private rentalsRepository: IRentalsRepository
   ){}

   async execute(rentalFilter: IRentalFilterDTO): Promise<Rental[]>{
      const rentalsByUser = await this.rentalsRepository.filter(rentalFilter)

      return rentalsByUser
   }
}

export { FilterRentalsUseCase }