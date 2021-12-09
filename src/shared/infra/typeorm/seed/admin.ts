import { hash } from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

import createConnection from "../index"

async function create() {
   const connection = await createConnection("localhost")

   const id = uuidv4()
   const password = await hash("iamtheadmin!", 8)

   await connection.query(
      `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_license)
         VALUES('${id}', 'faos', 'admin','admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `
   )

   await connection.close()
}


create().then(() => console.log("user admin was created!"))