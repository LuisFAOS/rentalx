import { Category } from '../../models/Category'
import { ICategoryRepository } from '../../repositories/ICategoriesRepository'

class ListCategoriesUseCase{

   constructor(private categoriesRepository: ICategoryRepository){
      this.categoriesRepository = categoriesRepository
   }

   execute(): Category[]{  
      const categories = this.categoriesRepository.list()
      
      return categories
   }
}

export { ListCategoriesUseCase }
