import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IOthers{
   params,
   file,
   files:Array<{filename: string}> 
}

interface IOutput{
   status: string;
   result: Object;
}

class UploadCarsImageController{
   async handle(queryParams: {id: string}, body, others: IOthers): Promise<IOutput>{
      const { id } = queryParams
      const images = others.files

      const images_name = images.map(image => image.filename)

      const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)
      
      await uploadCarImageUseCase.execute({
         car_id: id,
         images_name
      }) 

      return {
         status: "created",
         result: {}
      }
   }
}

export { UploadCarsImageController }