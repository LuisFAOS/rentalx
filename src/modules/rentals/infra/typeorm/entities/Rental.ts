import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"

@Entity("rentals")
export class Rental {
   @PrimaryColumn()
   id?: string;

   @Column()
   car_id: string;

   @Column()
   user_id: string;

   @Column()
   start_date: Date;

   @Column()
   end_date: Date;

   @Column()
   expected_return_date: Date;

   @Column()
   total: Number;

   @CreateDateColumn()
   created_at: Date;

   @CreateDateColumn()
   updated_at: Date;

   constructor(){
      if(!this.id) this.id = uuidv4()
   }
}