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

export type controllerArgs = {queryParams?: queryParamsType, body?: any, others?: othersType}

export interface IControllers {
   handle(args: controllerArgs): 
      Promise<{status: "created" | "ok", result: Object | Object[]}>
}