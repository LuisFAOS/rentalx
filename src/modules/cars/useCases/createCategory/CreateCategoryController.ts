import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { controllerArgs, IControllers } from '../../../../usualInterfaces/IControllers';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

type returnType = { status: "created" | "ok"; result: Object }
type bodyType = { name: string; description: string}

class CreateCategoryController implements IControllers{
   async handle({body}: controllerArgs): Promise<returnType> {
      const { name, description } = body as bodyType

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
      await createCategoryUseCase.execute({ name, description })

      return {
         status: "created",
         result: {}
      }
   }
}

export { CreateCategoryController }