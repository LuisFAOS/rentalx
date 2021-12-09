import { Request, Response } from "express";

interface IOutput {
   status: string,
   result: Object,
}

const statusCodeMap = {
   "ok": 200,
   "created": 201
}

class ExpressAdapter{
   static create(controller: Function){
      return async function(req: Request, res: Response){
         const output:IOutput = await controller(req.query, req.body)

         return res.status(statusCodeMap[output.status]).json(output.result)
      }
   }
}

export { ExpressAdapter }