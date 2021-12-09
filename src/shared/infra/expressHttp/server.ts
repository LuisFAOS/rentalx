import "reflect-metadata"

import "../../container"
import createConnection from "../typeorm"
createConnection()

import express from "express";
import "express-async-errors"
import swaggerUI from 'swagger-ui-express'

import swaggerFile from "../../../swagger.json"

import { errorHandler } from "./middlewares/errorHandler";

import { router } from "./routes";

const app = express();

app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.get("/", (_, res) => {
   return res.send("Welcome to Rentalx API!")
})

app.use(router)

app.use(errorHandler)

app.listen(3333, () => console.log("server is running on http://localhost:3333"))
