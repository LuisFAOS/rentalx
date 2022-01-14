import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { IRentalFilterDTO } from "../dtos/IRentalFilterDTO";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "./IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository{
   rentals: Rental[] = []

   async findOpenRentalByCar(car_id: string): Promise<Rental> {
      return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)
   }
   async findOpenRentalByUser(user_id: string): Promise<Rental> {
      return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
   }
   async create(rental: ICreateRentalDTO): Promise<void> {
      const newRental = new Rental()

      Object.assign(newRental, {...rental, start_date: new Date()})

      this.rentals.push(newRental)
   }
   async findById(id: string): Promise<Rental> {
      return this.rentals.find(rental => rental.id === id)
   }
   async filter(rentalFilter: IRentalFilterDTO): Promise<Rental[]> {
      if(Object.keys(rentalFilter).length == 0) return this.rentals

      let filteredRentals: Rental[] | []
      Object.keys(rentalFilter).forEach((key, index) => {
         if(index === 0) filteredRentals = this.rentals.filter(rental => rental[key] === rentalFilter[key])
         filteredRentals = filteredRentals.filter(filteredRental => filteredRental[key] === rentalFilter[key])
      });
      return filteredRentals
   }
}