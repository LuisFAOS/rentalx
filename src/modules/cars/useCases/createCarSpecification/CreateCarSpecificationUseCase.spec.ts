import { AppError } from "../../../../shared/errors/AppError"
import { Car } from "../../infra/typeorm/entities/Car"
import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "../../repositories/inMemory/SpecificationsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase

describe("CREATING CAR SPECIFICATION", () => {

   beforeEach(() => {
      specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
   })

   it("[CreateCarSpecificationUseCase] - should be able to add a new specification to the car", async () => {
      const car = {
         name: "Audi TT",
         brand: "Audi",
         category_id: "3456789ojn",
         daily_rate: 100,
         description: "Carro veloz, versátil, bonito e com cara esportista",
         fine_amount: 45678,
         license_plate: "ABS4549"
      }
      await carsRepositoryInMemory.create(car)
      const cars = await carsRepositoryInMemory.findAvailableCars(car)

      const specifications = [
         {name: "fala", description: "derick kkkkkkkkkkkkkkk"},
         {name: "humor", description: "neandertal kkkkkkkkk"}
      ]

      await specificationsRepositoryInMemory.create(specifications[0])
      await specificationsRepositoryInMemory.create(specifications[1])

      const [specification1, specification2] = [
         await specificationsRepositoryInMemory.findByName("fala"),
         await specificationsRepositoryInMemory.findByName("humor")
      ]
      await createCarSpecificationUseCase.execute({
         car_id: cars[0].id, 
         specifications_id: [specification1.id, specification2.id]
      })
   
      const registeredCars = await carsRepositoryInMemory.findAvailableCars()

      expect(registeredCars[0]).toHaveProperty("specifications")
      expect(registeredCars[0].specifications.length).toEqual(2)
   })

   it("[CreateCarSpecificationUseCase] - should not be able to add a new specification with a nonexistents specifications", async () => {
      const car = {
         name: "Audi TT",
         brand: "Audi",
         category_id: "3456789ojn",
         daily_rate: 100,
         description: "Carro veloz, versátil, bonito e com cara esportista",
         fine_amount: 45678,
         license_plate: "ABS4549"
      }

      await carsRepositoryInMemory.create(car)

      const cars = await carsRepositoryInMemory.findAvailableCars(car)

      const specifications_id = ["2345t6", "3245"]

      expect(async () => {
         await createCarSpecificationUseCase.execute({car_id: cars[0].id, specifications_id})
      }).rejects.toEqual(new AppError("No specification was found!"));
   })

   it("[CreateCarSpecificationUseCase] - should not be able to add a specification car with a nonexistent car", () => {
      const car_id = "kkkkkkkkkkkk fala derick"
      const specifications_id = ["2345t6", "3245"]
      
      expect(async () => {
         await createCarSpecificationUseCase.execute({car_id, specifications_id})
      }).rejects.toEqual(new AppError("Car doesn't exists!"))
   })
})