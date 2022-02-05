import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import injectionTokensMap from "../../../../shared/container/injectionTokensMap";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/infra/providers/date/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
   token: string, 
   password: string
}

@injectable()
export class ResetPasswordUseCase {
   constructor(
      @inject(injectionTokensMap.UsersTokensRepository)
      private usersTokensRepository: IUsersTokensRepository,
      @inject(injectionTokensMap.DayjsDateProvider)
      private dateProvider: IDateProvider,
      @inject(injectionTokensMap.UsersRepository)
      private usersRepository: IUsersRepository,
   ){}

   async execute({ token, password }: IRequest){
      const userToken = await this.usersTokensRepository.findByRefreshToken(token)
      if(!userToken) throw new AppError("invalid token!")
      if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow)){
         throw new AppError("Token expired! Try other.")
      }

      const user = await this.usersRepository.findById(userToken.user_id)
      user.password = await hash(password, 8)
      await this.usersRepository.create(user)

      await this.usersTokensRepository.deleteById(userToken.id)
   }
}