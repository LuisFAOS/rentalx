import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../shared/errors/AppError"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import auth from "../../../../config/auth"
import { IDateProvider } from "../../../../shared/infra/providers/date/IDateProvider"



interface IRequest{
   email: string;
   password: string;
}

interface IResponse{
   user: {
      name: string;
      email: string;
   };
   token: string;
   refresh_token: string
}


@injectable()
class AuthenticateUserUseCase{
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      @inject("UsersTokensRepository")
      private usersTokensRepository: IUsersTokensRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider
   ){}

   async execute({ email, password }: IRequest): Promise<IResponse>{
      const user = await this.usersRepository.findByEmail(email)

      if(!user) throw new AppError("invalid email or password!", 401)

      const isPasswordMatch = await compare(password, user.password)

      if(!isPasswordMatch) throw new AppError("invalid email or password!", 401)

      const token = sign({}, auth.secret_token, {
         subject: user.id,
         expiresIn: auth.expires_in_token,
      })

      const refresh_token = sign({email}, auth.secret_refresh_token, {
         subject: user.id,
         expiresIn: auth.expires_in_refresh_token
      })

      await this.usersTokensRepository.create({
         user_id: user.id,
         expires_date: this.dateProvider.addDays(30),
         refresh_token 
      })

      return {
         user: {
            name: user.name,
            email: user.email
         },
         token,
         refresh_token
      }
   }
}

export { AuthenticateUserUseCase }