import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { ICarsRepository } from "../../repositories/ICarsRepository"
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest {
   car_id: string,
   specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

   constructor(
      @inject("CarsRepository") private carsRepository: ICarsRepository,
      @inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository
   ){}

   async execute({ car_id, specifications_id }: IRequest): Promise<void>{
      const cars = await this.carsRepository.findById(car_id)
      if(!cars) throw new AppError("Car doesn't exists!")
      
      const specifications = await this.specificationsRepository.findByIds(specifications_id)
      if(specifications.length === 0) throw new AppError("No specification was found!")

      cars.specifications = specifications

      await this.carsRepository.create(cars)
   }
}

export { CreateCarSpecificationUseCase }