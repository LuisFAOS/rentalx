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
      const {         
         id,
         name,
         description,
         daily_rate,
         license_plate,
         brand,
         category_id,
         fine_amount,
         specifications,
      } = newCar

      const car = this.repository.create({
         id,
         name,
         description,
         daily_rate,
         license_plate,
         brand,
         category_id,
         fine_amount,
         specifications
      })

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

      typeof options === "object" && Object.entries(options).forEach(([key, value]) => {
         carsQuery.andWhere(`${key} = :${key}`, {[key]: value})
      })

      const cars = await carsQuery.getMany()

      return cars
   }

   async findById(car_id: string): Promise<Car> {
      const car = await this.repository.findOne({id: car_id})

      return car
   }
}

export { CarsRepository }