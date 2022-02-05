import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository"
import { UserTokens } from "../entities/UserTokens";

import { Repository, getRepository } from "typeorm"

class UsersTokensRepository implements IUsersTokensRepository{
   private repository: Repository<UserTokens>

   constructor() {
      this.repository = getRepository(UserTokens)
   }

   async create({user_id, expires_date, refresh_token}: ICreateUserTokenDTO): Promise<void> {
      const newUserToken = this.repository.create({
         user_id,
         expires_date,
         refresh_token
      })
   
      this.repository.save(newUserToken)
   }

   async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
      const userToken = await this.repository.findOne({
         user_id,
         refresh_token
      })
   
      return userToken
   }

   async deleteById(id: string): Promise<void> {
      this.repository.delete({id})
   }

   async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
       return this.repository.findOne({refresh_token})
   }
}

export { UsersTokensRepository }