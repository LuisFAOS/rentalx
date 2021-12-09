import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { IFindAvailableCarsOptionsDTO } from "../../dtos/IFindAvailableCarsOptionsDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
   cars: Car[] = []

   async create(newCar: ICreateCarDTO): Promise<void> {
      const car = new Car()

      Object.assign(car, newCar)

      this.cars.push(car)
   }

   async findByLicensePlate(license_plate: string): Promise<Car> { 
      return this.cars.find(car => car.license_plate === license_plate)
   }

   async findAvailableCars(options?:IFindAvailableCarsOptionsDTO): Promise<Car[]> {
      let filteredCars: Car[]

      filteredCars = this.cars.filter(car => car.available)

      Object.entries(options).forEach(([key, value]) => {
         filteredCars = filteredCars.filter(car => car[key] === value)
      })
      
      return filteredCars
   }
}

export { CarsRepositoryInMemory }