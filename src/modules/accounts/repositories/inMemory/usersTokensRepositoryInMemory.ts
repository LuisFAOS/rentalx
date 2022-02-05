import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository{
   usersTokens: UserTokens[] = []

   async create(user_token: ICreateUserTokenDTO): Promise<void> {
      const newUsersTokens = new UserTokens()
      Object.assign(newUsersTokens, {
         ...user_token
      })
      this.usersTokens.push(newUsersTokens)
   }
   async findByUserIdAndRefreshToken(user_id: string, refreshToken: string): Promise<UserTokens> {
      return this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refreshToken)
   }
   async deleteById(id: string): Promise<void> {
      const UserTokenIndexOf = this.usersTokens.findIndex(userToken => userToken.id === id)
      this.usersTokens.splice(UserTokenIndexOf)
   }
   async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
      return this.usersTokens.find(userToken => userToken.refresh_token === refresh_token)
   }
   
}