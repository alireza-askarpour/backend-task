import * as jwt from 'jsonwebtoken';
import { IAccessPayload, IAccessToken } from './access-token.interface';
import { IEmailToken } from './email-token.interface';
import { IRefreshPayload, IRefreshToken } from './refresh-token.interface';

export interface IJwtServiceConfig {
  generateTokenAsync(
    payload: IAccessPayload | IRefreshPayload,
    secret: string,
    options: jwt.SignOptions,
  ): Promise<string>;

  verifyTokenAsync<T>(token: string, secret: string, options: jwt.VerifyOptions): Promise<T>;

  throwBadRequest<T extends IAccessToken | IRefreshToken | IEmailToken>(promise: Promise<T>): Promise<T>;
}
