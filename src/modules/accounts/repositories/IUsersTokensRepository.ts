import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
   create(user_token: ICreateUserTokenDTO): Promise<void>
   findByUserIdAndRefreshToken(user_id: string, refreshToken: string): Promise<UserTokens>
   deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository }