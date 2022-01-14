import dayjs from "dayjs"

import { AppError } from "../../../../shared/errors/AppError";
import { DayjsDateProvider } from "../../../../shared/infra/providers/date/implementations/DayjsDateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../../cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: ICarsRepository

describe("CREATING RENTAL", () => {

   const tomorrow = dayjs().add(1, "day").toDate()

   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory()
      rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
      dayjsDateProvider = new DayjsDateProvider()
      createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
   })

   it("[CreateRentalUseCase] - should be able to create a new rental", async () => {
      await carsRepositoryInMemory.create({
         brand: "Audi",
         name: "A4",
         description: "speed car",
         fine_amount: 10000,
         daily_rate: 200,
         license_plate: "GAY2469",
         category_id: "blabs8fiof"
      })

      const car = await carsRepositoryInMemory.findByLicensePlate("GAY2469")

      await createRentalUseCase.execute({
         user_id: "1234",
         car_id: car.id,
         expected_return_date: dayjs().add(25, "hour").toDate()
      })
   })

   it("[CreateRentalUseCase] - should not be able to create a new rental if there's another open to the same user", async () => {
      await rentalsRepositoryInMemory.create({
         car_id: "456789s",
         expected_return_date: tomorrow,
         user_id: "1234"
      })

      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "456789",
            expected_return_date: tomorrow
         })
      }).rejects.toEqual(new AppError("There's a rental in progress for this user!"))
   })

   it("[CreateRentalUseCase] - should not be able to create a new rental if there's another open to the same car", async () => {
      await rentalsRepositoryInMemory.create({
         car_id: "456789",
         expected_return_date: tomorrow,
         user_id: "1234"
      })

      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "456789",
            expected_return_date: tomorrow
         })
      }).rejects.toEqual(new AppError("Car is unavailable"))
   })
   
   it("[CreateRentalUseCase] - should not be able to create a new rental with expected return date less today + 24", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "1234s",
            car_id: "456789x",
            expected_return_date: dayjs().toDate()
         })
      }).rejects.toEqual(new AppError("Invalid expected return date!"))
   })
})