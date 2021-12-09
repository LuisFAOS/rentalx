import { inject, injectable } from "tsyringe"
import { IFindAvailableCarsOptionsDTO } from "../../dtos/IFindAvailableCarsOptionsDTO"
import { Car } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../../repositories/ICarsRepository"

@injectable()
class ListAvailableCarsUseCase{

   constructor(
      @inject("CarsRepository") private carsRepository: ICarsRepository
   ){}

   async execute(options?: IFindAvailableCarsOptionsDTO): Promise<Car[]> {
      const cars = await this.carsRepository.findAvailableCars(options)

      return cars
   }

}

export { ListAvailableCarsUseCase }