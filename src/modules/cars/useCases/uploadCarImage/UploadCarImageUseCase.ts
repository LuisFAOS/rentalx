import { inject, injectable } from "tsyringe";
import injectionTokensMap from "../../../../shared/container/injectionTokensMap";
import { IStorageProvider } from "../../../../shared/infra/providers/storage/IStorageProvider";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";

interface IInput{
   car_id: string,
   images_name: string[]
}

@injectable()
class UploadCarImageUseCase{
   constructor(
      @inject("CarsImageRepository") private carsImageRepository: ICarsImageRepository,
      @inject(injectionTokensMap.StorageProvider)
      private storageProvider: IStorageProvider
   ){}

   async execute({car_id, images_name}: IInput) {
      images_name.forEach(async image_name => {
         await this.carsImageRepository.create(car_id, image_name)
         await this.storageProvider.save(image_name, "cars")
      })
   }
}

export { UploadCarImageUseCase }