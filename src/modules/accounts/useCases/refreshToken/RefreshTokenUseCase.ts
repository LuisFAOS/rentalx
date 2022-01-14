import { sign, verify } from "jsonwebtoken"

import { inject, injectable } from "tsyringe"
import auth from "../../../../config/auth"
import { AppError } from "../../../../shared/errors/AppError"
import { IDateProvider } from "../../../../shared/infra/providers/date/IDateProvider"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"

@injectable()
class RefreshTokenUseCase {

   constructor(
      @inject("UsersTokensRepository")
      private usersTokensRepository: IUsersTokensRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider
   ){}

   async execute(token: string): Promise<string> {
      const { sub, email } = verify(token, auth.secret_refresh_token) as {sub: string, email: string}
      const user_id = sub

      const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)
      if(!userToken) throw new AppError("Refresh token doesn't exists!")
   
      await this.usersTokensRepository.deleteById(userToken.id)
      const refresh_token = sign({email}, auth.secret_refresh_token, {
         subject: user_id,
         expiresIn: auth.expires_in_refresh_token
      })
      await this.usersTokensRepository.create({
        refresh_token,
        user_id,
        expires_date: this.dateProvider.addDays(30) 
      })

      return refresh_token
   }
}

export {RefreshTokenUseCase}