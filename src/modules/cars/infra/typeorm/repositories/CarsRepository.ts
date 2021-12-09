import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { IFindAvailableCarsOptionsDTO } from "../../../dtos/IFindAvailableCarsOptionsDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
   private repository: Repository<Car>

   constructor(){
      this.repository = getRepository(Car)
   }

   async create(newCar: ICreateCarDTO): Promise<void> {
      const car = this.repository.create(newCar)
   
      await this.repository.save(car)
   }

   async findByLicensePlate(license_plate: string): Promise<Car>{
      const car = await this.repository.findOne({license_plate})

      return car
   }

   async findAvailableCars(options?:IFindAvailableCarsOptionsDTO): Promise<Car[]> {
      const carsQuery = await this.repository
         .createQueryBuilder("c")
         .where("available = :available", {available: true})

      Object.entries(options).forEach(([key, value]) => {
         carsQuery.andWhere(`${key} = :${key}`, {[key]: value})
      })

      const cars = await carsQuery.getMany()

      return cars
   }
}

export { CarsRepository }