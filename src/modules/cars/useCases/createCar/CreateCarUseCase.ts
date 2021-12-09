import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
class CreateCarUseCase{

   constructor(
      @inject("CarsRepository") private carsRepository: ICarsRepository
   ){}

   async execute(car: ICreateCarDTO): Promise<void> {
      
      const carAlreadyExists = await this.carsRepository.findByLicensePlate(car.license_plate)

      if(carAlreadyExists) throw new AppError("Car already exists")
      
      await this.carsRepository.create(car)
   }
}

export { CreateCarUseCase }