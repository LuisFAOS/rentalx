import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("CREATING A CATEGORY", () => {
   beforeEach(() => {
      categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
      createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
   })

   it("[CreateCategoryUseCase] - should be able to create a new category", async () => {
      const category = {
         name: "Category name test",
         description: "Category created only to test the func"
      }

      await createCategoryUseCase.execute(category)

      const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

      expect(categoryCreated).toHaveProperty("id")
   })  

   it("[CreateCategoryUseCase] - should not be able to create a category with a already exist name", async () => {
      

      expect(async () => {
         const category = {
            name: "Category name test",
            description: "Category created only to test the func"
         }
   
         await createCategoryUseCase.execute(category)
         
         await createCategoryUseCase.execute(category)
      }).rejects.toBeInstanceOf(AppError)
   })  
})