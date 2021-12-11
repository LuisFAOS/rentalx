import { Specification } from "../../infra/typeorm/entities/Specification"
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository"


class SpecificationsRepositoryInMemory implements ISpecificationsRepository{
   
   specifications = []
   
   async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
      const newSpecification = new Specification()

      Object.assign(newSpecification, {
         name, description
      })

      this.specifications.push({name, description})
   }

   async findByName(name: string): Promise<Specification> {
      const specification = this.specifications.find(specification => specification.name === name)

      return specification
   }

   async findByIds(ids: string[]): Promise<Specification[]> {
      let filteredSpecifications = this.specifications.filter(specification => ids.includes(specification.id)) 
   
      return filteredSpecifications
   }

   async list(): Promise<Specification[]> {
      return this.specifications
   }
}

export { SpecificationsRepositoryInMemory }