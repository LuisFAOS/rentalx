import { v4 as uuidv4 } from 'uuid'
import { Expose } from "class-transformer"

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("users")
class User {
   @PrimaryColumn()
   id?: string;

   @Column()
   name: string;
   
   @Column()
   username: string;
   
   @Column()
   password: string;
   
   @Column()
   email: string;

   @Column()
   driver_license: string;

   @Column()
   isAdmin: boolean;
   
   @Column()
   avatar?: string;

   @CreateDateColumn()
   created_at: Date;

   @Expose({ name: "avatar_url" })
   avatar_url(): string {
      switch(process.env.disk){
         case "s3":
         return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;

         case "local":

         return `${process.env.API_URL}/avatar/${this.avatar}`;

         default:
            console.log("invalid disk")
         return;
      }
   }

   constructor(){
      if(!this.id){
         this.id = uuidv4();
      }
   }
}

export { User }
