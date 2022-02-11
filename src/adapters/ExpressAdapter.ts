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
         const others = {
            authToken: req.headers["authorization"] || req.headers["Authorization"],
            params: req.params,
            user_id: req.user_id,
            file: req.file,
            files: req.files
         }

         const output:IOutput = await controller({
            queryParams: req.query,
            body: req.body,
            others
         })

         return res.status(statusCodeMap[output.status]).json(output.result)
      }
   }
}

export { ExpressAdapter }