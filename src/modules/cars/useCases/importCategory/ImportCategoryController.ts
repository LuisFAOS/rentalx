import { container } from 'tsyringe';
import { controllerArgs, IControllers } from '../../../../usualInterfaces/IControllers';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

type returnType = { status: "created" | "ok"; result: Object }

class ImportCategoryController implements IControllers{
   async handle({others}: controllerArgs): Promise<returnType> {
      const { file } = others

      const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
      await importCategoryUseCase.execute(file)
         
      return {
         status: "created",
         result: {}
      }
   }
}

export { ImportCategoryController }