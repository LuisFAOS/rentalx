import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface iJWTpayload {sub: string}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
   const authHeader = req.headers.authorization;

   if(!authHeader) throw new AppError("token missing!", 401)

   let token;

   if(authHeader.includes(" ")) [, token] = authHeader.split(" ")
   else token = authHeader

   try {

      const { sub: user_id } = verify(token, "c544SxcdHUd57S88DxxbgfkjpTE68sadR77") as iJWTpayload
      
      const usersRepository = new UsersRepository()

      const user = await usersRepository.findById(user_id)
      if(!user) throw new AppError("User does not exists", 404)

      req.user_id = user_id

      next()
   } catch (error) {
      throw new AppError("Invalid token!", 401)
   }
}