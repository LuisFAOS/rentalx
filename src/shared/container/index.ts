import { container } from 'tsyringe'

import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"

import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImageRepository } from '../../modules/cars/repositories/ICarsImageRepository'
import { CarsImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImageRepository'
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IDateProvider } from '../infra/providers/date/IDateProvider'
import { DayjsDateProvider } from '../infra/providers/date/implementations/DayjsDateProvider'
import { IUsersTokensRepository } from '../../modules/accounts/repositories/IUsersTokensRepository'
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository"
import { IMailProvider } from '../infra/providers/mail/IMailProvider'
import { EtherealMailProvider } from '../infra/providers/mail/implementations/EtherealMailProvider'
import { IStorageProvider } from '../infra/providers/storage/IStorageProvider'
import { LocalStorageProvider } from '../infra/providers/storage/implementations/LocalStorageProvider'
import { S3StorageProvider } from '../infra/providers/storage/implementations/S3StorageProvider'

import injectionTokensMap from './injectionTokensMap'


container.registerSingleton<ICategoriesRepository>(
   "CategoriesRepository",
   CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
   "SpecificationsRepository",
   SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
   "UsersRepository",
   UsersRepository
)

container.registerSingleton<ICarsRepository>(
   "CarsRepository",
   CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
   "CarsImageRepository",
   CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
   "RentalsRepository",
   RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
   "UsersTokensRepository",
   UsersTokensRepository
)

// ---------------------------------------------- PROVIDERS ----------------------------------------------

container.registerSingleton<IDateProvider>(
   "DayjsDateProvider",
   DayjsDateProvider
)

container.registerInstance<IMailProvider>(
   "EtherealMailProvider",
   new EtherealMailProvider()
)

const diskStorage = {
   local: LocalStorageProvider,
   s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
   injectionTokensMap.StorageProvider,
   diskStorage[process.env.disk],
)