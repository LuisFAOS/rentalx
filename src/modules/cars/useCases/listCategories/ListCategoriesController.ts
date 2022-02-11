import { container } from 'tsyringe'
import { Category } from '../../infra/typeorm/entities/Category'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

type returnType = {
   status: "ok" | "created",
   result: Category[]
}

class ListCategoriesController {
   async handle(): Promise<returnType> {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
      const categories = await listCategoriesUseCase.execute()

      return {
         status: "ok",
         result: categories
      }
   }
}

export { ListCategoriesController }