import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { SpecificationsRepository } from "../../infra/typeorm/repositories/SpecificationsRepository";

@injectable()
class ListSpecificationUseCase{

   constructor(
      @inject("SpecificationsRepository") private specificationsRepository: SpecificationsRepository
   ){}

   async execute(): Promise<Specification[]>{
      const specifications = await this.specificationsRepository.list()

      return specifications
   }
}

export { ListSpecificationUseCase }