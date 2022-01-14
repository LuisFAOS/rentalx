import { Request } from "express";

let req: Request

type othersType = {
   authToken?: string,
   params?: typeof req.params,
   user_id?: string,
   file?: typeof req.file,
   files?: typeof req.files 
}
type queryParamsType = typeof req.query

export interface IControllers {
   handle(queryParams?: queryParamsType, body?: any, others?: othersType): 
      Promise<{status: "created" | "ok", result: Object}>
}