import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
   static toDTO({ email, username, name, driver_license, avatar_url, avatar}: User): IUserResponseDTO {
      const user = instanceToInstance({ email, username, name, driver_license, avatar_url, avatar})
      return user
   }
}