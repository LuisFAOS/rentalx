import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalsRepository{
   findOpenRentalByCar(car_id: string): Promise<Rental>;
   findOpenRentalByUser(user_id: string): Promise<Rental>;
   create(rental: ICreateRentalDTO): Promise<void>
   findById(id: string): Promise<Rental>
}