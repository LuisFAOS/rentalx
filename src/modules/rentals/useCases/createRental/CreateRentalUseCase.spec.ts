import dayjs from "dayjs"

import { AppError } from "../../../../shared/errors/AppError";
import { DayjsDateProvider } from "../../../../shared/infra/providers/date/implementations/DayjsDateProvider";
import { RentalsRepositoryInMemory } from "../../repositories/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider
let createRentalUseCase: CreateRentalUseCase;

describe("CREATING RENTAL", () => {

   const tomorrow = dayjs().add(1, "day").toDate()

   beforeEach(() => {
      rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
      dayjsDateProvider = new DayjsDateProvider()
      createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
   })

   it("[CreateRentalUseCase] - should be able to create a new rental", async () => {
      await createRentalUseCase.execute({
         user_id: "1234",
         car_id: "456789",
         expected_return_date: dayjs().add(25, "hour").toDate()
      })
   })

   it("[CreateRentalUseCase] - should not be able to create a new rental if there's another open to the same user", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "456789s",
            expected_return_date: tomorrow
         })
   
         await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "456789",
            expected_return_date: tomorrow
         })
      }).rejects.toBeInstanceOf(AppError)
   })

   it("[CreateRentalUseCase] - should not be able to create a new rental if there's another open to the same car", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "1234s",
            car_id: "456789",
            expected_return_date: tomorrow
         })
   
         await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "456789",
            expected_return_date: tomorrow
         })
      }).rejects.toBeInstanceOf(AppError)
   })
   
   it("[CreateRentalUseCase] - should not be able to create a new rental with expected return date less today + 24", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "1234s",
            car_id: "456789x",
            expected_return_date: dayjs().toDate()
         })
      }).rejects.toBeInstanceOf(AppError)
   })
})