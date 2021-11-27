import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase{
   constructor(
      @inject("UsersRepository") 
      private usersRepository: IUsersRepository
   ){}

   async execute(user: ICreateUserDTO): Promise<void>{
      const userEmailAlreadyExists = await this.usersRepository.findByEmail(user.email)

      if(userEmailAlreadyExists) throw new AppError("user email already exists!")

      const passwordHashed = await hash(user.password, 8)
      await this.usersRepository.create({...user, password: passwordHashed})
   }
}

export { CreateUserUseCase }