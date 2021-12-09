import { Car } from "../../infra/typeorm/entities/Car"
import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let carsRepository: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase
describe("LISTING CARS", () => {

   beforeEach(() => {
      carsRepository = new CarsRepositoryInMemory()
      listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository)
   })

   it("[ListCarsUseCase]", async () => {
      const car1 = {
         name: "Audi TT",
         brand: "Audi",
         daily_rate: 123,
         description: "Carro esportista",
         fine_amount: 19999,
         license_plate: "xxxxx",
         category_id: "blablablalbalblablalb"
      }
      
      const car2 = {
         name: "Audi A3",
         brand: "Audi",
         daily_rate: 1232,
         description: "Carro esportista",
         fine_amount: 1992299,
         license_plate: "xxxxx",
         category_id: "blablablalbalblablalb"
      }

      await carsRepository.create(car1)
      await carsRepository.create(car2)

      const cars = await listAvailableCarsUseCase.execute({name: "Audi A3"})

      expect(cars.length).toEqual(1)
   })
})