import { container } from 'tsyringe'
import { controllerArgs, IControllers } from '../../../../usualInterfaces/IControllers'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

type returnType = { status: "created" | "ok"; result: Object }
type bodyType = { name: string; description: string}

class CreateSpecificationController implements IControllers{
   async handle({body}: controllerArgs): Promise<returnType> {
      const { name, description } = body as bodyType

      const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
      await createSpecificationUseCase.execute({ name, description })

      return {
         status: "created",
         result: {}
      }
   }
}

export { CreateSpecificationController }