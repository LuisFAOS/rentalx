import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction){
   const { user_id } = req

   const usersRepository = new UsersRepository();
   const user = await usersRepository.findById(user_id);

   if(!user.isAdmin) throw new AppError("User isn't admin!", 401)

   next()
}