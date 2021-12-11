import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async(host = "db"): Promise<Connection> => {
   const defaultOptions = await getConnectionOptions()

   const connection = await createConnection(
      Object.assign(defaultOptions, {
         host
      })
   )

   return connection
}
