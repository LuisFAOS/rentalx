import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"



interface IRequest{
   email: string;
   password: string;
}

interface IResponse{
   user: {
      name: string;
      email: string;
   };
   token: string
}


@injectable()
class AuthenticateUserUseCase{
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
   ){}

   async execute({ email, password }: IRequest): Promise<IResponse>{
      const user = await this.usersRepository.findByEmail(email)

      if(!user) throw new AppError("invalid email or password!", 401)

      const isPasswordMatch = await compare(password, user.password)

      if(!isPasswordMatch) throw new AppError("invalid email or password!", 401)

      const token = sign({}, "c544SxcdHUd57S88DxxbgfkjpTE68sadR77", {
         subject: user.id,
         expiresIn: "3d",
      })

      return {
         user: {
            name: user.name,
            email: user.email
         },
         token
      }
   }
}

export { AuthenticateUserUseCase }