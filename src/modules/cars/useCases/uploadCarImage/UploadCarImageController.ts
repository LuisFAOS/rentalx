import { container } from "tsyringe";
import { controllerArgs, IControllers } from "../../../../usualInterfaces/IControllers";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";


class UploadCarsImageController implements IControllers{
   async handle({queryParams, others}: controllerArgs): Promise<{ status: "created" | "ok"; result: Object; }> {
      const id = queryParams.id as string
      const images = others.files as Array<{filename: string}>

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