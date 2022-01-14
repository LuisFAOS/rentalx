import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepository } from "../../infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let carsRepository: ICarsRepository
let createCarUseCase: CreateCarUseCase;

describe("CREATING A CAR", () => {

   beforeEach(() => {
      carsRepository = new CarsRepositoryInMemory()
      createCarUseCase = new CreateCarUseCase(carsRepository)
   })

   it("[CreateCarUseCase] - should be able to crete a new car", async () => {
      const car = {
         name: "name car",
         description: "description car",
         daily_rate: 100,
         license_plate: "ABC 1234",
         fine_amount: 44,
         brand: "brand car",
         category_id: "category id"
      }

      await createCarUseCase.execute(car);
   });

   it("[CreateCarUseCase] - should not be able to create a car with exists license plate", async() => {
      const car1 = {
         name: "name car",
         description: "description car",
         daily_rate: 100,
         license_plate: "ABC 1234",
         fine_amount: 44,
         brand: "brand car",
         category_id: "category id"
      }

      const car2 = {
         name: "name car",
         description: "description car",
         daily_rate: 100,
         license_plate: "ABC 1234",
         fine_amount: 44,
         brand: "brand car",
         category_id: "category id"
      }
      
      await createCarUseCase.execute(car1);
      
      expect(async () => {
         await createCarUseCase.execute(car2);
      }).rejects.toEqual(new AppError("Car already exists"))
   })
})