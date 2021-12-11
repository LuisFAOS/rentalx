import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";

interface IInput{
   car_id: string,
   images_name: string[]
}

@injectable()
class UploadCarImageUseCase{
   constructor(
      @inject("CarsImageRepository") private carsImageRepository: ICarsImageRepository
   ){}

   async execute({car_id, images_name}: IInput) {
      const carsImage = images_name.map(async image_name => {
         await this.carsImageRepository.create(car_id, image_name)
      })
   }
}

export { UploadCarImageUseCase }