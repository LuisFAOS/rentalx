import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { v4 as uuidv4 } from "uuid" 
import { IDateProvider } from "../../../../shared/infra/providers/date/IDateProvider";
import injectionTokensMap from "../../../../shared/container/injectionTokensMap";
import { IMailProvider } from "../../../../shared/infra/providers/mail/IMailProvider";
import { resolve } from "path"

@injectable()
export class SendForgotPasswordMailUseCase {
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      @inject("UsersTokensRepository")
      private usersTokensRepository: IUsersTokensRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider,
      @inject(injectionTokensMap.MailProvider)
      private mailProvider: IMailProvider
   ){}

   async execute(email: string) {
      const user = await this.usersRepository.findByEmail(email)

      if(!user) throw new AppError("User doesn't exists!")

      const token:string = uuidv4()

      const expires_date = this.dateProvider.addHours(3)

      await this.usersTokensRepository.create({
         refresh_token: token,
         user_id: user.id,
         expires_date
      })

      const templatePath = resolve(__dirname, "..","..","views", "emails", "forgotPassword.hbs")
      const variables = {
         name: user.name,
         link: process.env.FORGOT_PASSWORD_URL+token 
      }
      await this.mailProvider.sendMail(
         email, 
         "Recuperação de senha!",
         variables,
         templatePath, 
      )
   }
}