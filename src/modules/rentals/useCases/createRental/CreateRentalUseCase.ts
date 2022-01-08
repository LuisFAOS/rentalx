import { inject, injectable } from "tsyringe"

import { AppError } from "../../../../shared/errors/AppError"
import { IDateProvider } from "../../../../shared/infra/providers/date/IDateProvider"
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository"

@injectable()
export class CreateRentalUseCase {

   constructor(
      @inject("RentalsRepository")
      private rentalsRepository: IRentalsRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider,
      @inject("CarsRepository")
      private carsRepository: ICarsRepository
      ){}

   async execute(rental: ICreateRentalDTO): Promise<void>{
      const isRentedCar = await this.rentalsRepository.findOpenRentalByCar(rental.car_id)
      if(isRentedCar) throw new AppError("Car is unavailable")

      const isUserRented = await this.rentalsRepository.findOpenRentalByUser(rental.user_id)
      if(isUserRented) throw new AppError("There's a rental in progress for this user!")

      const compare = await this.dateProvider.compareInHours(this.dateProvider.dateNow, rental.expected_return_date)

      if(compare < 24) throw new AppError("Invalid expected return date!")

      await this.rentalsRepository.create({...rental})
      
      await this.carsRepository.updateAvailable(rental.car_id, false)
   }
}