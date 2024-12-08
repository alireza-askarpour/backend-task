import { IAccessToken } from '../interfaces/access-token.interface';
import { IRefreshToken } from '../interfaces/refresh-token.interface';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { User } from '@src/modules/users/entities/user.entity';

export interface IJwtService {
  generateToken(user: User, tokenType: TokenTypeEnum, domain?: string | null, tokenId?: string): Promise<string>;
  verifyToken<T extends IAccessToken | IRefreshToken>(token: string, tokenType: TokenTypeEnum): Promise<T>;
  generateAuthTokens(user: User, domain?: string, tokenId?: string): Promise<[string, string]>;
}
