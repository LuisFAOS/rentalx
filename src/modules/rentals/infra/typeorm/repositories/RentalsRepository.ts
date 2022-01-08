import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository{
   private repository: Repository<Rental>

   constructor(){
      this.repository = getRepository(Rental)
   }

   async findOpenRentalByCar(car_id: string): Promise<Rental> {
      const openRentalFilteredByCar = await this.repository.findOne({ car_id, end_date: null })

      return openRentalFilteredByCar
   }
   async findOpenRentalByUser(user_id: string): Promise<Rental> {
      const openRentalFilteredByUser = await this.repository.findOne({ user_id, end_date: null })

      return openRentalFilteredByUser
   }
   async create(rental: ICreateRentalDTO): Promise<void> {
      const newRental = this.repository.create(rental)

      await this.repository.save(newRental)
   }
   async findById(id: string): Promise<Rental> {
      const rental = await this.repository.findOne({id})
      return rental
   }

}