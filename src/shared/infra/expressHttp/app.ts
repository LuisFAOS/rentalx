import "reflect-metadata"
import "dotenv/config"
import cors from "cors"

import "../../container"
import createConnection from "../typeorm"
createConnection()

import express from "express";
import "express-async-errors"
import swaggerUI from 'swagger-ui-express'

import swaggerFile from "../../../swagger.json"

import { errorHandler } from "./middlewares/errorHandler";

import { router } from "./routes";
import upload from "../../../config/upload"

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.get("/", (_, res) => {
   return res.send("Welcome to Rentalx API!")
})

app.use(router)

app.use(errorHandler)

export { app }
