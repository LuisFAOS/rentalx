import { AppError } from "../../../../shared/errors/AppError"
import { DayjsDateProvider } from "../../../../shared/infra/providers/date/implementations/DayjsDateProvider"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/inMemory/usersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/inMemory/usersTokensRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider

describe("AUTHENTICATING A USER", () => {
   beforeEach(() => {
      usersRepositoryInMemory = new UsersRepositoryInMemory()
      usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
      dateProvider = new DayjsDateProvider()
      authenticateUserUseCase = new AuthenticateUserUseCase(
         usersRepositoryInMemory, 
         usersTokensRepositoryInMemory, 
         dateProvider
      )
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
   })
   
   it("[AuthenticateUserUseCase] - should be able to authenticate an user", async () => {
      const user: ICreateUserDTO = {
         driver_license: "888123",
         email: "user@test.com",
         password: "1234",
         name: "User Test",
         username: "tester"
      }

      await createUserUseCase.execute(user)

      const result = await authenticateUserUseCase.execute({
         email: user.email,
         password: user.password
      })

      expect(result).toHaveProperty("token")
   })

   it("[AuthenticateUserUseCase] - should not be able to authenticate an nonexistent user", () => {
      expect(async () => {
         await authenticateUserUseCase.execute({
            email: "false@test.com",
            password: "1234"
         })
      }).rejects.toEqual(new AppError("invalid email or password!", 401))
   })

   it("[AuthenticateUserUseCase] - should not be able to authenticate with wrong password", async () => {
      const user: ICreateUserDTO = {
         driver_license: "888123",
         email: "user@test.com",
         password: "1234",
         name: "User Test",
         username: "tester"
      }

      await createUserUseCase.execute(user)
      
      expect(async () => {

         await authenticateUserUseCase.execute({
            email: "user@test.com",
            password: "1234a"
         })
      }).rejects.toEqual(new AppError("invalid email or password!", 401))
   })
})