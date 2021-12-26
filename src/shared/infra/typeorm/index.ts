import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async(host = "db"): Promise<Connection> => {
   const defaultOptions = await getConnectionOptions()

   const connection = await createConnection(
      Object.assign(defaultOptions, {
         host: process.env.NODE_ENV === "test" ? "localhost" : host,
         database: process.env.NODE_ENV === "test" ? "rentx_test": defaultOptions.database
      })
   )

   return connection
}
