import {v4 as uuidv4} from "uuid"
import { hash } from "bcryptjs"
import request from "supertest"
import { Connection, createConnection } from "typeorm"

import { app } from "../../../../shared/infra/expressHttp/app"

let connection: Connection
describe("CREATE CATEGORY CONTROLLER", () => {
   beforeAll(async () => {
      connection = await createConnection()
      await connection.runMigrations()

      const id = uuidv4()
      const password = await hash("test", 8)

      await connection.query(
         `INSERT INTO USERS(id, name, username, email, password, "isAdmin", created_at, driver_license)
            VALUES('${id}', 'tester', 'test','test@test', '${password}', true, 'now()', 'XXXXXX')
         `
      )
   })

   afterAll(async () => {
      await connection.dropDatabase()
      await connection.close()
   })
   
   it("should be able to list all categories", async () => {
      const responseToken = await request(app)
         .post("/sessions")
         .send({
            email: "test@test",
            password: "test"
         })

      const {token} = responseToken.body

      await request(app)
         .post("/categories")
         .send({
            name: "SUV",
            description: "A sigla SUV significa Sport Utility Vehicle -- ou seja, veículo utilitário esportivo"
         })
         .set({
            authorization: token
         })

      const response = await request(app).get("/categories")
         
      expect(response.body.length).toBe(1)   
      expect(response.status).toBe(200)
   })
}) 