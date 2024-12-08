import * as jwt from 'jsonwebtoken';
import { User } from '@src/modules/users/entities/user.entity';
import { IAccessJwt, ISingleJwt } from './jwt.interface';

export interface ITokenGenerator {
  generate(
    user: User,
    jwtOptions: jwt.SignOptions,
    jwtRefreshConfig: IAccessJwt | ISingleJwt,
    tokenId?: string | undefined,
  ): Promise<string>;
}
