import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindAvailableCarsOptionsDTO } from "../dtos/IFindAvailableCarsOptionsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
   create(newCar: ICreateCarDTO): Promise<void>
   findByLicensePlate(license_plate: string): Promise<Car>
   findAvailableCars(options?: IFindAvailableCarsOptionsDTO): Promise<Car[]>
   findById(car_id: string): Promise<Car>
}

export { ICarsRepository }