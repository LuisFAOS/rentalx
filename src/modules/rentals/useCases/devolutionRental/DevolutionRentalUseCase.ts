import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/infra/providers/date/IDateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
   rental_id: string;
   user_id: string
}

const MINIMUM_DAILY = 1

@injectable()
class DevolutionRentalUseCase{
   constructor(
      @inject("RentalsRepository")
      private rentalsRepository: IRentalsRepository,
      @inject("CarsRepository")
      private carsRepository: ICarsRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider
   ){}

   async execute({rental_id, user_id}: IRequest): Promise<void>{
      const rental = await this.rentalsRepository.findById(rental_id)
      if(!rental) throw new AppError("Rental doesn't exists!", 404)
   
      const car = await this.carsRepository.findById(rental.car_id)

      const dateNow = this.dateProvider.dateNow
      let daily = await this.dateProvider.compareInDays(
         rental.start_date,
         dateNow
      ) 
      if(daily <= 0) daily=MINIMUM_DAILY

      const delay = await this.dateProvider.compareInDays(
         dateNow,
         rental.expected_return_date
      )
      let calculate_fine = 0
      if(delay > 0) calculate_fine = (delay * car.fine_amount) + (daily * car.daily_rate)
         
      rental.end_date = dateNow
      rental.total = calculate_fine

      await this.rentalsRepository.create(rental)
      this.carsRepository.updateAvailable(rental.car_id, true)
   }
}

export { DevolutionRentalUseCase }