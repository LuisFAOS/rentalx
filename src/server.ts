import "reflect-metadata"

import "./shared/container"
import "./database"

import express from "express";
import swaggerUI from 'swagger-ui-express'

import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler"

import swaggerFile from './swagger.json'

const app = express();

app.use(express.json())

app.use(errorHandler)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.get("/", (_, res) => {
   return res.send("Welcome to Rentalx API!")
})

app.use(router)

app.listen(3333, () => console.log("server is running on http://localhost:3333"))
