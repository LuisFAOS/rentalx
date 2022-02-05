import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../../../errors/AppError";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "../../../../config/auth";

interface iJWTpayload {sub: string}


export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
   
   const usersTokensRepository = new UsersTokensRepository()
   const authHeader = req.headers.authorization;

   if(!authHeader) throw new AppError("token missing!", 401)

   let token;

   if(authHeader.includes(" ")) [, token] = authHeader.split(" ")
   else token = authHeader

   try {

      const { sub: user_id } = verify(
         token, 
         auth.secret_refresh_token
      ) as iJWTpayload
      
      const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)
      
      if(!user) throw new AppError("User does not exists", 404)

      req.user_id = user_id

      next()
   } catch (error) {
      throw new AppError("Invalid token!", 401)
   }
}